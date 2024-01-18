import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { AppApiService } from 'src/app/services/app-api-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CultureCreateComponent } from '../culture-create/culture-create.component';

@Component({
  selector: 'app-culture-list',
  templateUrl: './culture-list.component.html',
  styleUrls: ['./culture-list.component.css'],
})
export class CultureListComponent {
  isDataLoaded: boolean = false;
  dialogConfig = new MatDialogConfig();

  constructor(
    private toastr: ToastrService,
    private apiService: AppApiService,
    private dialog: MatDialog
  ) {}

  displayColumns = ['id', 'name','view', 'edit', 'delete'];

  dataSource = new MatTableDataSource();

  //TODO: to add load overlay + no data overlay
  ngOnInit() {
    //call get all cultures
    this.getAllCultures();

    /**Dialog Configurations */
    this.dialogConfig.width = '700px';
    this.dialogConfig.autoFocus = true;
  }

  getAllCultures() {
    this.apiService.getAllCultures().subscribe({
      next: (res) => {
        if (res != null && res.length > 0) {
          this.isDataLoaded = true;
          this.dataSource = res;
        }

        //   if (array === undefined || array.length == 0) {
        //     // array does not exist or is empty
        // }
        //  optional chaining operator (Elvis operator)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      },
      error: (e) => this.showErrorMessage(e),
    });
  }

  onViewCultureDetails(id: number) {}
  openCultureEditDialog(id: number) {}
  onCultureDelete(id: number) {}

  onCreateCulture() {
    this.dialogConfig.data = {
      name: null,
    };
    this.dialog
      .open(CultureCreateComponent, this.dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log('Dialog closed');
      });
  }
  showErrorMessage(e: any) {
    this.toastr.error(e.message);
  }
}
