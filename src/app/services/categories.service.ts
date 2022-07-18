import { Injectable } from '@angular/core';
import * as dataCategories from "./categories.json";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getCategories(){
    return fetch("https://jsonplaceholder.typicode.com/users").then(
      (response) => response.json()
    );
  }
  
  getCategoriessFromJson(){
    return dataCategories;
  }
}
