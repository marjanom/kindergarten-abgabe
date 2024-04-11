import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { Child, ChildResponse } from './interfaces/Child';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public kindergardens: Kindergarden[] = [];
  public kindergardenTotalCount: number = 0;
  public children: ChildResponse[] = []
  public childrenTotalCount: number = 0;
  public isLoading = false;
}
