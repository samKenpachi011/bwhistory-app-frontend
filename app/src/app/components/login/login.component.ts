import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppApiService } from 'src/app/services/app-api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  logInForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private apiService: AppApiService
  ) {}

  ngOnInit() {
    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get f() {
    return this.logInForm.controls;
  }

  onLogIn() {
    if (this.logInForm.invalid) {
      return;
    }

    this.apiService.attemptLogIn(this.logInForm.value).subscribe({
      next: () => {
        alert('Authenticated !! :-)\n\n');
        this.router.navigate(['/dashboard']);
      },
      error: (e) => this.showErrorMessage(e),
    });
  }

  showErrorMessage(e: any) {
    this.toastr.error(e.message);
  }
}
