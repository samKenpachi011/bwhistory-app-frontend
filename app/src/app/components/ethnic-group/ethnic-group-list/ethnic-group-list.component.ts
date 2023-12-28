import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppApiService } from 'src/app/services/app-api-service.service';
import { EthnicGroupCreateComponent } from '../ethnic-group-create/ethnic-group-create.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from 'src/app/shared/models/ethnic-group.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ethnic-group-list',
  templateUrl: './ethnic-group-list.component.html',
  styleUrls: ['./ethnic-group-list.component.css'],
})
export class EthnicGroupListComponent implements OnInit {
  //The MatDialogConfig has a position property to set the position of the dialog. The position property takes the instance of DialogPosition.
  dialogConfig = new MatDialogConfig();
  edata = [];
  constructor(
    private dialog: MatDialog,
    private apiService: AppApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  //datasource config
  displayedColumns = [
    'id',
    'name',
    'language',
    'history',
    'population',
    'view',
    'edit',
    'delete',
  ];

  dataSource = new MatTableDataSource();

  applyFilter(event: KeyboardEvent) {
    var filterValue = event.target as HTMLTextAreaElement;

    var trimfilterValue = filterValue.value.trim(); // Remove whitespace
    var lcfilterValue = trimfilterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = lcfilterValue;
  }

  ngOnInit() {
    //all groups
    this.getAllGroups();
    /**Dialog Configurations */
    this.dialogConfig.width = '700px';
    this.dialogConfig.autoFocus = true;
  }

  onCreate() {
    this.dialogConfig.data = {
      name: null,
    };
    this.dialog
      .open(EthnicGroupCreateComponent, this.dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log('Dialog closed');
      });
  }

  //get filtered list of groups

  //get all groups
  getAllGroups() {
    //add loading spinner
    this.apiService.getAllEthnicGroups().subscribe({
      next: (res) => (this.dataSource = res),
      error: (e) => this.showErrorMessage(e),
    });
  }

  // open detailed view
  onViewEthnicGroupDetails(group_id: number) {
    const urlParams = { id: group_id };
    this.router.navigate(['ethnic-groups/details', urlParams]);
  }

  // edit
  openGroupEditDialog(group_id: number) {
    this.dialogConfig.data = {
      id: group_id,
    };
    this.dialog
      .open(EthnicGroupCreateComponent, this.dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log('Dialog closed');
      });
  }

  showErrorMessage(e: any) {
    this.toastr.error(e.message);
  }
}
