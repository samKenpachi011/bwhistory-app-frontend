import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppApiService } from 'src/app/services/app-api-service.service';

@Component({
  selector: 'app-culture-detail',
  templateUrl: './culture-detail.component.html',
  styleUrls: ['./culture-detail.component.css']
})
export class CultureDetailComponent {
  culture_id: any;
  culture_data: any;

  constructor(
    private _router: ActivatedRoute,
    private apiServ: AppApiService,
    private toastr: ToastrService,
  ){}

  ngOnInit() {
    //get url para
    this._router.params.subscribe(params => {
      this.culture_id = params['id'];
      if (this.culture_id) {}
      else { this.toastr.error('Culture not found!') }
    })


  }

  private _getDetails(){
    this.apiServ.getCultureById(this.culture_id)
      .subscribe({
        next:(res) => this.culture_data = res,
        error: (e) => this.showErrorMessage(e)
      });
  }

  showErrorMessage(e:any){
    this.toastr.error(e.message);
  }

}
