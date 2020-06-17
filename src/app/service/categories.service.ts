import { Injectable } from '@angular/core';
import {SetUpHttpService} from "../set-up-http.service";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = 'category';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(category) {
    return this.httpClient.delete(this.url, category);
  }

  updateCategory(category) {
    return this.httpClient.put(this.url, category);
  }

  addCategory(category) {
    return this.httpClient.post(this.url, category);
  }
}
