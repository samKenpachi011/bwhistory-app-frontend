import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AppApiService } from 'src/app/services/app-api-service.service';
@Component({
  selector: 'app-ethnic-group-detail',
  templateUrl: './ethnic-group-detail.component.html',
  styleUrls: ['./ethnic-group-detail.component.css']
})
export class EthnicGroupDetailComponent {
  group_id: any;
  group_data: any;
  constructor(
    private _router: ActivatedRoute,
    private toastr: ToastrService,
    private apiService: AppApiService,
  ) { };

  ngOnInit() {

    this._router.params.subscribe(params => {
      this.group_id = params['id'];
      if (this.group_id) {
        this._getEGroup();
      } else {
        this.toastr.error('Group not found');
      }

    })

  }

  private _getEGroup() {
    this.apiService.getEthnicGroupById(this.group_id).subscribe({
      next: (res) => this.group_data=res,
      error: (e) => this.showErrorMessage(e)
    })
  }

  showErrorMessage(e: any) {
    this.toastr.error(e.message);
  }

}
