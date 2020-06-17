import { Injectable } from '@angular/core';
import {SetUpHttpService} from "../set-up-http.service";

@Injectable({
  providedIn: 'root'
})
export class MassageService {
  url = 'massage';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(massage) {
    return this.httpClient.delete(this.url, massage);
  }

  updateMassage(massage) {
    return this.httpClient.put(this.url, massage);
  }

  addMassage(massage) {
    return this.httpClient.post(this.url, massage);
  }
}
