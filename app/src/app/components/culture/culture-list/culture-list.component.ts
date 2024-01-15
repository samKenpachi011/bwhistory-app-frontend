import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { AppApiService } from 'src/app/services/app-api-service.service';


@Component({
  selector: 'app-culture-list',
  templateUrl: './culture-list.component.html',
  styleUrls: ['./culture-list.component.css']
})
export class CultureListComponent {

  isDataLoaded: boolean = false;

  constructor(
    private toastr: ToastrService,
    private apiService: AppApiService,
  ){}

  displayColumns = [
    'id','name',
    'view',
    'edit',
    'delete'
  ]

  cultureDS = new MatTableDataSource();


//TODO: to add load overlay + no data overlay
  ngOnInit(){
    //call get all cultures
    this.getAllCultures();


  }

  getAllCultures(){
    this.apiService.getAllCultures().subscribe({
      next: (res) => {
        if (res != null && res.length > 0){
          this.isDataLoaded = true;
          this.cultureDS = res
        }

      },
      error: (e) => this.showErrorMessage(e),
    })

  }

  onViewCultureDetails(id: number){}
  openCultureEditDialog(id: number){}
  onCultureDelete(id: number){}

  showErrorMessage(e: any){
    this.toastr.error(e.message)
  }

}
