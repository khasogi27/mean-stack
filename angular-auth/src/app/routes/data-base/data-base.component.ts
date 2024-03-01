import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-data-base',
  standalone: true,
  imports: [CommonModule, OverlayModule, HttpClientModule],
  templateUrl: './data-base.component.html',
  styleUrl: './data-base.component.scss'
})
export class DataBaseComponent implements AfterViewInit {
  hide_user_select: boolean = true;
  hide_object_select: boolean = true;
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

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    // this.refresh();
  }

  on_user_selected(name: string) {
    this.hide_user_select = !this.hide_user_select;
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
    this.hide_object_select = !this.hide_object_select;
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
    this.hide_object_select = true;
    this.hide_user_select = true;
    this.selected_obj_type = '';
    this.selected_user = '';

    // this.http.get<ApiResponse>(environment.api_server + '/target/users')
    this.http.get<any>(environment.api_service + '/target/users')
    .subscribe(resp => {
      if (resp.code != 0) {
        return;
      }
      this.ds_users = resp.data;
    });
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

    this.isProgress = true;
    setInterval(() => {
      if (this.progress < 100) {
        this.progress++;
      } else {
        this.progress = 0;
        this.isProgress = false;
      }
    },100);
  }

  show_text() {
    for (let item of this.ds_filtered_objects) {
      if (item['id'] == 73010) {
        item['status_type'] = 'text';
        break;
      }
    }
  }

  show_bar() {
    for (let item of this.ds_filtered_objects) {
      if (item['id'] == 73010) {
        item['status_type'] = 'bar';
        item['value'] = 5;
        item['max'] = 7;
        item['width'] = ~~(5 * 100 / 7) + '%';
        break;
      }
    }
  }

  get progressDasharray(): string {
    return this.progress + ' '  + (100 - this.progress);
  }

  get updateBarColor(): 'positive' | 'informative' | 'critical' {
    return this.progress >= 90 ? 'positive' : this.progress >= 60 ? 'informative' : 'critical';
  }
}
