import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { Observable, Subject, of, switchMap, takeUntil } from 'rxjs';

type IBreakpoints = 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
type ISize = 'sm' | 'md' | 'lg' | 'xl';

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService implements OnDestroy {
  private _destroyed = new Subject<void>();
  private _displayNameMap: Map<string, string> = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  private _sizeNameMap: Map<string, string> = new Map([
    [Breakpoints.XSmall, 'sm'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xl']
  ]);

  private _breakpointObserver = inject(BreakpointObserver);

  constructor() {}

  public getBreakpointObserver(breakpoints?: IBreakpoints[]): Observable<boolean | string | undefined> {
    return this._breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntil(this._destroyed))
      .pipe(switchMap(result => {
        let isSize: boolean = false;
        for (const query of Object.keys(result.breakpoints)) {
          if (breakpoints) {
            for (let point of breakpoints) {
              if (result.breakpoints[query] && point == this._displayNameMap.get(query)) {
                isSize = true;
                break;
              }
            }
          } else {
            if (result.breakpoints[query]) return of(this._sizeNameMap.get(query));
          }
        }
        return of(isSize);
      }));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
