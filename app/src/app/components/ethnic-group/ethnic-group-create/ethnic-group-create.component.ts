import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppApiService } from 'src/app/services/app-api-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Tag } from 'src/app/shared/models/ethnic-group.model';

@Component({
  selector: 'app-ethnic-group-create',
  templateUrl: './ethnic-group-create.component.html',
  styleUrls: ['./ethnic-group-create.component.css'],
})
export class EthnicGroupCreateComponent {
  ethnicGroupForm!: FormGroup;
  data: any;
  dropdownTagsList:any[] = [];
  selectedItems:any[] = [];
  dropdownTagsSettings:IDropdownSettings = {};

  constructor(
    private formBuilder: FormBuilder,
    private apiService: AppApiService
  ) {}

  ngOnInit() {
    //TODO: implement tags
    //get all tags or for filter by ethnic group instance



    this.dropdownTagsList = [
      { item_id: 1, name: 'Item1' },
      { item_id: 2, name: 'Item2' },
      { item_id: 3, name: 'Item3' }
    ];
      this.dropdownTagsSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        noDataAvailablePlaceholderText: "There is no item availabale to show"

      };

      // default tag items
      this.selectedItems = [
        { item_id: 1, name: 'Item1'  },
        {item_id: 2, name: 'Item2' }
      ];

      //TODO pull from Tag objects else add a tag using a modal

      //TODO: implement image + tags
    this.ethnicGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      language: ['', Validators.required],
      population: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      geography: ['', Validators.required],
      history: ['', Validators.required],
      tags: [''],
    });
  }

  get f() {
    return this.ethnicGroupForm.controls;
  }
  onSubmit() {

    //get the current user to patch to the data
    this.apiService.isUserStaff().subscribe({
      next: (v) => {
        if (v) {
          // User is staff, proceed with form submission logic

          if (this.ethnicGroupForm.invalid) {
            return;
          }
          this.data = this.ethnicGroupForm.value;

          //update tags
          this.data.tags = this.data.tags.map( ({...rest}) => {return {name: rest['name']}});

          this.submitFormData(this.data);
        } else {
          alert('User cannot add form. Insufficient privileges.');
        }
      },
      error: (e) => console.log(e),
    });
  }

  submitFormData(data: any) {
    this.apiService.createEthnicGroup(data).subscribe({
      next: () => {
        alert(
          'Creation Success of group :-)\n\n' +
            JSON.stringify(this.ethnicGroupForm.value['name'], null, 4)
        );
        //reload the data
      },
      error: (e) => console.log(e),
    });
  }

  getTags(){
    //get tags
  }
}
