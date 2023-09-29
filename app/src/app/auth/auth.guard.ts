import { inject } from "@angular/core";
import { LocalStoragManagerService } from "../services/local-storagemanager.service";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

export const authGuard = ( )=> {
  const router = inject(Router)
  const storagemanager = inject(LocalStoragManagerService)
  const toastr = inject(ToastrService)

  if (storagemanager.getToken() === null) {
    toastr.error("Sorry, Permission denied");
    router.navigate(['/login']);
    return false;
  }

  return true;
}
