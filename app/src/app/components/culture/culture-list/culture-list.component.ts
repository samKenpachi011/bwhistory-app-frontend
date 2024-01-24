import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { AppApiService } from 'src/app/services/app-api-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CultureCreateComponent } from '../culture-create/culture-create.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private dialog: MatDialog,
    private router: Router
  ) {}

  displayColumns = ['id', 'name','view', 'edit', 'delete'];

  dataSource = new MatTableDataSource();

  applyFilter(event: KeyboardEvent){

    var filterValue = event.target as HTMLTextAreaElement;


    var trimfilterValue = filterValue.value.trim(); // Remove whitespace
    var lcfilterValue = trimfilterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = lcfilterValue;
    //this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }

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
  openCultureEditDialog(id: number) {
    this.dialogConfig.data = {
      id: id,
    };
    this.dialog
      .open(CultureCreateComponent, this.dialogConfig)
      .afterClosed()
      .subscribe({
        next: (res) => this.getAllCultures(),
        error: (e) => this.showErrorMessage(e)
      });
  }
  onCultureDelete(id: number) {
    Swal.fire({
      title:"Are you sure you want to delete this culture?",
      text:"This action won't be undone!",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      icon: "warning",

    }).then((result) => {

      if(result.isConfirmed){
        this.apiService.deleteCulture(id).subscribe({
          next: (res) => {
            Swal.fire({
              title:"Deleted!",
              text:"Culture has been deleted!",
              icon: "success",
            });
            this.getAllCultures();
          },
          error: (err) => this.toastr.error(err.message),
        });
      } else if (result.isDenied){
        Swal.fire("Changes are not saved","","info");
      }
    });


  }

  onCreateCulture() {
    this.dialogConfig.data = {
      name: null,
    };
    this.dialog
      .open(CultureCreateComponent, this.dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        this.getAllCultures();
        //this.reloadPage();

      });
  }
  showErrorMessage(e: any) {
    this.toastr.error(e.message);
  }
  // reloadPage(){
  //   window.location.reload();
  // }


}
