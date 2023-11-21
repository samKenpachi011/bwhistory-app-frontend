import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppApiService } from 'src/app/services/app-api-service.service';
import { EthnicGroupCreateComponent } from '../ethnic-group-create/ethnic-group-create.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from 'src/app/shared/models/ethnic-group.model';

@Component({
  selector: 'app-ethnic-group-list',
  templateUrl: './ethnic-group-list.component.html',
  styleUrls: ['./ethnic-group-list.component.css'],
})
export class EthnicGroupListComponent implements OnInit {
  //The MatDialogConfig has a position property to set the position of the dialog. The position property takes the instance of DialogPosition.
  dialogConfig = new MatDialogConfig();
  constructor(
    private dialog: MatDialog,
    private apiService: AppApiService,
    private toastr: ToastrService,
    ) {}

    //datasource config
    displayedColumns = ['name', 'language', 'history', 'population'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    applyFilter(event: KeyboardEvent) {
      var filterValue = event.target as HTMLTextAreaElement;

      var trimfilterValue = filterValue.value.trim(); // Remove whitespace
      var lcfilterValue = trimfilterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = lcfilterValue;
    }

  ngOnInit() {

    //all groups
    this.getAllGroups()
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
    console.log('here......')
    this.apiService.getEthnicGroups().subscribe({
      next: (res) => console.log(res),
      error: (e) => this.showErrorMessage(e)
    });

  }

  showErrorMessage(e: any) {
    this.toastr.error(e.message);
  }

  //implement a matDialog
}

const ELEMENT_DATA: Element[] = [
  {name: 'test 1', language: 'test lan 1', history: 'history 1', population: 123},
  {name: 'test 2', language: 'test lan 2', history: 'history 2', population: 123},
  {name: 'test 3', language: 'test lan 3', history: 'history 3', population: 123},
]
