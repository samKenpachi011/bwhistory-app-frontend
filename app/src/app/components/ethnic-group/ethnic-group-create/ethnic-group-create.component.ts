import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ethnic-group-create',
  templateUrl: './ethnic-group-create.component.html',
  styleUrls: ['./ethnic-group-create.component.css'],
})
export class EthnicGroupCreateComponent {
  ethnicGroupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.ethnicGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  get f() {
    return this.ethnicGroupForm.controls;
  }
  onSubmit() {
    console.log(this.ethnicGroupForm.value.name);
  }
}
