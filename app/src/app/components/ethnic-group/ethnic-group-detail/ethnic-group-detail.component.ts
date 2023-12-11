import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ethnic-group-detail',
  templateUrl: './ethnic-group-detail.component.html',
  styleUrls: ['./ethnic-group-detail.component.css']
})
export class EthnicGroupDetailComponent {
  group_id: any;

  constructor(
    private _router: ActivatedRoute,
  ){};

  ngOnInit() {

    this._router.params.subscribe(params => {
      this.group_id = params['id'];

    })

    // check id
    console.log(`group_id = ${this.group_id}`)

  }

}
