import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EthnicGroupCreateComponent } from '../ethnic-group-create/ethnic-group-create.component';

@Component({
  selector: 'app-ethnic-group-list',
  templateUrl: './ethnic-group-list.component.html',
  styleUrls: ['./ethnic-group-list.component.css'],
})
export class EthnicGroupListComponent implements OnInit {
  //The MatDialogConfig has a position property to set the position of the dialog. The position property takes the instance of DialogPosition.
  dialogConfig = new MatDialogConfig();
  constructor(private dialog: MatDialog,
    ) {}

  ngOnInit() {
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

  //implement a matDialog
}
