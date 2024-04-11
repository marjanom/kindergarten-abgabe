import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { CHILDREN_PER_PAGE, KINDERGARDEN_PER_PAGE } from '../shared/constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kindergarden-detail',
  templateUrl: './kindergarden-detail.component.html',
  styleUrls: ['./kindergarden-detail.component.scss']
})
export class KindergardenDetailComponent implements OnInit{
  image: any;
  kindergarten: any;

  constructor(public storeService: StoreService, public backendService: BackendService, private route: ActivatedRoute) {
  }
  public addKindergardenForm: any;
  @Input() currentPage!: number;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.storeService.isLoading = true;
      this.backendService.getKindergartenById(id).subscribe((data: any) => {
        this.kindergarten = data;
        this.storeService.isLoading = false;
      });
    }
  }
}
