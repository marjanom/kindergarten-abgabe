import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { CHILDREN_PER_PAGE, KINDERGARDEN_PER_PAGE } from '../shared/constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kindergarden-list',
  templateUrl: './kindergarden-list.component.html',
  styleUrls: ['./kindergarden-list.component.scss']
})
export class KindergardenListComponent implements OnInit{
  image: any;
  kindergarten: any;

  constructor(public storeService: StoreService, public backendService: BackendService, private route: ActivatedRoute) {
  }
  public addKindergardenForm: any;
  @Input() currentPage!: number;

  ngOnInit(): void {
    this.backendService.getKindergardens();
  }
}
