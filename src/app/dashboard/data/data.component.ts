import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService, private router: Router) {}
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  selectPage(i: any) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage)
    this.backendService.getChildren(currentPage);
  }

  public returnAllPages() {
    let res = [];
    const pageCount = Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE);
    for (let i = 0; i < pageCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

  navigateToDetail(id: any) {
    this.router.navigate(['/kindergarden-detail/', id]);
  }
}


