import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Type, booleanAttribute, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BreakpointState, LayoutModule } from '@angular/cdk/layout';
import { BreakpointObserverService } from '../../shared/services/breakpoint-observer.service';
import { filter, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-data-base',
  standalone: true,
  imports: [CommonModule, OverlayModule, HttpClientModule, LayoutModule],
  templateUrl: './data-base.component.html',
  styleUrl: './data-base.component.scss'
})
export class DataBaseComponent implements AfterViewInit {
  hide_user_select: boolean = true;
  hide_user_side_select: boolean = true;
  ds_users: any[] = [];
  ds_objects: any[] = [];
  ds_filtered_objects: any[] = [];
  ds_object_types: string[] = [];
  selected_user = '';
  selected_obj_type = '';

  // selection = new SelectionModel<any>(true, []);
  selection = null;

  public isProgress: boolean = false;
  public progress: number = 0;

  public isSidepage: boolean = false;

  public mainWidth: number = 0;
  public sideWidth: number = 100;

  public isNewBackup: boolean = false;
  public mobileMode: boolean = false;

  private http: HttpClient = inject(HttpClient);
  private breakpointService: BreakpointObserverService = inject(BreakpointObserverService);

  constructor() {
    this.breakpointService.getBreakpointObserver(['XSmall', 'Small']).subscribe(e => {
      if (typeof e === 'boolean') this.mobileMode = e;
    });

    for (let i = 0; i < 50; i++) {
      this.ds_filtered_objects.push({ name: 'db1', start: 'start1', end: 'end1', type: 'type1', status_type: 'text', value: 10, max: 100, width: 100 });
    }
    if (this.ds_object_types.length == 0) this.onSideVisibleContent();
    else this.onSideVisibleContent('detail');
  }
  
  ngAfterViewInit(): void {
    this.refresh();
  }

  on_user_selected(action: 'mainSelect' | 'sideSelect',name: string) {
    if (action == 'mainSelect') this.hide_user_select = true;
    else if (action == 'sideSelect') this.hide_user_side_select = true;
    if (this.selected_user == name) return;
    this.selected_user = name;

    // this.http.get<ApiResponse>(environment.api_server + '/target/objects', { params: { owner: name } })
    this.http.get<any>(environment.api_service + '/target/objects', { params: { owner: name } })
    .subscribe(resp => {
      if (resp.code != 0) {
        return;
      }
      // this.ds_objects = resp.data;
      this.ds_object_types = [];
      this.ds_object_types.push('ALL');

      for (let data of resp.data) {
        let found = false;
        for (let objtype of this.ds_object_types) {
          if (objtype == data['type']) {
            found = true;
            break;
          }
        }
        if (!found) this.ds_object_types.push(data['type']);
        data['status_type'] = '';
        this.ds_objects.push(data);
      }
      this.selected_obj_type = 'ALL';
      this.ds_filtered_objects = this.ds_objects;
    });

  }

  on_object_type_selected(name: string) {
    this.hide_user_side_select = !this.hide_user_side_select;
    if (this.selected_obj_type == name) return;
    this.selected_obj_type = name;
    if (name == 'ALL') {
      this.ds_filtered_objects = this.ds_objects;
      return;
    }
    this.ds_filtered_objects = [];
    for (let obj of this.ds_objects) {
      if (obj['type'] == name) this.ds_filtered_objects.push(obj);
    }
  }

  refresh() {
    this.ds_object_types = [];
    this.ds_objects = [];
    this.ds_filtered_objects = [];
    this.ds_users = [];
    this.hide_user_side_select = true;
    this.hide_user_select = true;
    this.selected_obj_type = '';
    this.selected_user = '';

    // this.http.get<ApiResponse>(environment.api_server + '/target/users')
    // .subscribe(resp => {
    //   if (resp.code != 0) {
    //     return;
    //   }
    //   this.ds_users = resp.data;
    // });

    this.ds_users = [{ name: 'name1'}, { name: 'name2' }];

    for (let i = 0; i < 50; i++) {
      this.ds_filtered_objects.push({ name: 'db1', start: 'start1', end: 'end1', type: 'type1', status_type: 'text', value: 10, max: 100, width: 100 });
    }
  }

  isAllSelected() {
    // const numSelected = this.selection.selected.length;
    const numSelected = null;
    const numRows = this.ds_filtered_objects.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      // this.selection.clear();
      return;
    }

    // this.selection.select(...this.ds_filtered_objects);
  }

  backup() {
    // let params = { params: this.selection.selected};
    // this.http.post<any>(environment.api_service + '/target/backup', params)
    // .subscribe((resp: any) => {
    //   if (resp.code != 0) {
    //     return;
    //   }
    // });

    this.isProgress = !this.isProgress;
    setInterval(() => {
      if (this.progress < 100) {
        this.progress++;
      } else {
        this.progress = 0;
        this.isProgress = false;
      }
    },100);
  }

  newBackup() {
    this.onSideVisibleContent('new');
  }

  clear() {
    this.ds_filtered_objects = [];  
    this.onSideVisibleContent();
  }

  onDecline() {
    this.onSideVisibleContent();
  }

  
  onSideVisibleContent(action?: 'new' | 'detail') {
    if (action == 'new' || action == 'detail') {
      this.sideWidth = this.mainWidth = 50;
      if (action == 'new') this.isProgress = !(this.isNewBackup = this.isSidepage = true);
      else this.isNewBackup = !(this.isProgress = this.isSidepage = true);
    } else {
      this.isProgress = this.isSidepage = this.isNewBackup = false;
      this.sideWidth = 100;
    }
  }

  get progressDasharray(): string {
    return this.progress + ' '  + (100 - this.progress);
  }

  get updateBarColor(): 'positive' | 'informative' | 'critical' {
    return this.progress >= 90 ? 'positive' : this.progress >= 60 ? 'informative' : 'critical';
  }
}
