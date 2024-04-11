import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE, KINDERGARDEN_PER_PAGE } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getKindergardens() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

// Method to get kindergarten details by ID
getKindergartenById(id: string): Observable<any> {
  return this.http.get<any>(`http://localhost:5000/kindergardens/${id}`);
}

  public getChildren(page: number) {
    this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${CHILDREN_PER_PAGE}`, { observe: 'response' }).subscribe(data => {
      this.storeService.children = data.body!;
      this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
      this.storeService.isLoading = false;
    });
  }



  public addChildData(child: Child, page: number) {
    // First, decrease the available spots for the kindergarten associated with the child
    const kindergartenId = child.kindergardenId;
    const kindergarten = this.storeService.kindergardens.find(k => k.id === kindergartenId);
    this.storeService.isLoading = true;
    if (kindergarten && kindergarten.availableSpots > 0) {
      kindergarten.availableSpots--;
      // Update the available spots on the backend
      this.http.put(`http://localhost:5000/kindergardens/${kindergartenId}`, kindergarten).subscribe(_ => {
        // Once the available spots are updated on the backend, add the child
        this.http.post('http://localhost:5000/childs', child).subscribe(_ => {
          this.storeService.isLoading = false;
          this.getChildren(page);
        });
      });
    } else {
      this.storeService.isLoading = false;
      // Handle case where kindergarten is not found or has no available spots
      window.alert('Kindergarten not found or no available spots');
    }
  }

  public deleteChildData(childId: string, page: number) {
    // First, retrieve the child to find out which kindergarten it belongs to
    const childToDelete = this.storeService.children.find(child => child.id === childId);

    // If the child is not found, log an error and return
    if (!childToDelete) {
      window.alert(`Child with ID ${childId} not found`);
      return;
    }

    const kindergartenId = childToDelete.kindergardenId;
    const kindergarten = this.storeService.kindergardens.find(k => k.id === kindergartenId);

    // If the kindergarten is not found, log an error and return
    if (!kindergarten) {
      window.alert(`Kindergarten with ID ${kindergartenId} not found`);
      return;
    }

    // Increase the available spots for the kindergarten
    kindergarten.availableSpots++;
    this.storeService.isLoading = true;
    // Update the available spots on the backend
    this.http.put(`http://localhost:5000/kindergardens/${kindergartenId}`, kindergarten).subscribe(_ => {
      // Once the available spots are updated on the backend, proceed to delete the child
      this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe(_ => {
        this.storeService.isLoading = false;
        this.getChildren(page);
      });
    });
  }


  public addKindergardenData(Kindergarden: any, image: any, page: number): Observable<any> {
    Kindergarden = { ...Kindergarden, image: image }
    return this.http.post('http://localhost:5000/kindergardens', Kindergarden);
  }

  public deleteKindergardenData(kindergardenId: string, page: number) {
    // Check if any child is associated with the kindergarten
    const isChildAssociated = this.storeService.children.some((child: any) => child.kindergardenId === kindergardenId);

    // If any child is associated, do not delete the kindergarten
    if (isChildAssociated) {
      window.alert('Cannot delete kindergarten because it has associated children');
      return;
    }
    this.storeService.isLoading = true;
    // If no child is associated, proceed with deletion
    this.http.delete(`http://localhost:5000/kindergardens/${kindergardenId}`).subscribe(_ => {
      this.getKindergarden(page);
      this.storeService.isLoading = false;
    });
  }


  public getKindergarden(page: number) {
    this.http.get<Kindergarden[]>(`http://localhost:5000/kindergardens?_page=${page}&_limit=${KINDERGARDEN_PER_PAGE}`, { observe: 'response' }).subscribe(data => {
      this.storeService.kindergardens = data.body!;
      this.storeService.kindergardenTotalCount = Number(data.headers.get('X-Total-Count'));
      this.storeService.isLoading = false;
      console.log('this is the value here', this.storeService.kindergardens);

    });
  }
}
