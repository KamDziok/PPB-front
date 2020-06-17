import { Injectable } from '@angular/core';
import {SetUpHttpService} from "../set-up-http.service";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  url = 'advertisement';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(advertisement) {
    return this.httpClient.delete(this.url, advertisement);
  }

  updateAdvertisement(advertisement) {
    return this.httpClient.put(this.url, advertisement);
  }

  addAdvertisement(advertisement) {
    return this.httpClient.post(this.url, advertisement);
  }
}
