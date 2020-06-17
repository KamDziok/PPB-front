import { Injectable } from '@angular/core';
import {SetUpHttpService} from "../set-up-http.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = 'comment';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(comment) {
    return this.httpClient.delete(this.url, comment);
  }

  updateComment(comment) {
    return this.httpClient.put(this.url, comment);
  }

  addComment(comment) {
    return this.httpClient.post(this.url, comment);
  }
}
