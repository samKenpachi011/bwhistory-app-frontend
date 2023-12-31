import { Component } from '@angular/core';
import { LocalStoragManagerService } from 'src/app/services/local-storagemanager.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css'],
})
export class AppNavComponent {
  constructor(
    private _storageManager: LocalStoragManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // TODO: add isAdmin check

  onLogOut() {

    Swal.fire({
      title: 'Are you sure you want to log out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(res => {
      if (res.value) {
        if (this._storageManager.tokenManagerRemove() === true) {
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
        else{
          Swal.fire({
            title: 'LogOut Attempt',
            text: 'LogOut Failed please try again',
            icon: 'warning',
            confirmButtonText:'Ok'
          });
          this.router.navigate(['dashboard']);
        }
      }
    });
  }
}
