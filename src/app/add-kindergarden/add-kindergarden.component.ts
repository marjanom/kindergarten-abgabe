import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { CHILDREN_PER_PAGE, KINDERGARDEN_PER_PAGE } from '../shared/constants';

@Component({
  selector: 'app-add-kindergarden',
  templateUrl: './add-kindergarden.component.html',
  styleUrls: ['./add-kindergarden.component.scss']
})
export class AddKindergardenComponent implements OnInit{
  image: any;

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService) {
  }
  public addKindergardenForm: any;
  @Input() currentPage!: number;

  ngOnInit(): void {
    this.backendService.getKindergarden(this.currentPage);
    this.addKindergardenForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      address: ['', Validators.required],
      availableSpots: [null, Validators.required],
      image: [null]
    })
  }

  onSubmit() {
    if(this.addKindergardenForm.valid) {
      if (this.image) {
        this.storeService.isLoading = true;
      this.backendService.addKindergardenData(this.addKindergardenForm?.value, this.image, this.currentPage).subscribe(response => {
        console.log('Kindergarten added successfully:', response);
        this.backendService.getKindergarden(this.currentPage);
        this.image = null;
        this.addKindergardenForm.reset();
        this.storeService.isLoading = false;
      }, (error: any) => {
        console.error('Error adding kindergarten:', error);
        // Handle errors here
      });
    } else {
      window.alert('Please select an image');
    }
    }
  }

  public cancelRegistration(childId: any) {
    this.backendService.deleteKindergardenData(childId, this.currentPage);
  }

  selectPage(i: any) {
    let currentPage = i;
    this.backendService.getKindergarden(currentPage);
  }

  public returnAllPages() {
    let res = [];
    const pageCount = Math.ceil(this.storeService.kindergardenTotalCount / KINDERGARDEN_PER_PAGE);
    for (let i = 0; i < pageCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
