import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppApiService } from 'src/app/services/app-api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerform!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: AppApiService
  ) { }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get f() { return this.registerform.controls }

  onRegister() {

    if (this.registerform.invalid){
      return
    }
    this.apiService.registerUser(this.registerform.value).subscribe(
      {
        next: () => {
          alert('Registration Success :-)\n\n' + JSON.stringify(this.registerform.value['email'], null, 4));
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (e) => console.log(e)
      }
    );

  }
}
