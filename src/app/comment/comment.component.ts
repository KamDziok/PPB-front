import { Component, OnInit, OnDestroy } from '@angular/core';
import {Advertisement} from '../interface/advertisement';
import {Comment} from '../interface/comment';
import {User} from '../interface/user';
import {CommentService} from '../service/comment.service';
import {UserService} from '../service/user.service';
import {AdvertisementService} from '../service/advertisement.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  comments: Comment[];
  advertisements: Advertisement[];
  users: User[];
  disabledEdit: boolean[] = [];
  newComment = {date: null, contents: '', advertisement: null, user: null};
  constructor(private commentService: CommentService, private userService: UserService,
              private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    this.getAllComment();
  }

  getAllComment() {
    this.commentService.getAll().subscribe((result: Comment[]) => {
      this.comments = result;
      this.disabledEdit = result.map(r => true);
      this.getAllAdvertisement();
      this.getAllUsers();
    }, (error) => {});
  }

  getAllAdvertisement() {
    this.subscriptions.add(this.advertisementService.getAll().subscribe((result: Advertisement[]) => {
      this.advertisements = result;
      for (const comment of this.comments) {
        for (const advertisement of this.advertisements) {
          if (comment.advertisement.id === advertisement.id) {
            comment.advertisement = advertisement;
          }
        }
      }
    }, (error) => {}));
  }

  getAllUsers() {
    this.subscriptions.add(this.userService.getAll().subscribe((result: User[]) => {
      this.users = result;
      for (const user of this.users) {
        for (const comment of this.comments) {
          if (comment.user.id === user.id) {
            comment.user = user;
          }
        }
      }
    }, (error) => {}));
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addComment() {
    this.commentService.addComment(this.newComment).subscribe((success) => {
      console.log('Sukces');
      this.getAllComment();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.commentService.updateComment(this.comments[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllComment();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.commentService.delete(this.comments[id]).subscribe((success) => {
        this.comments.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
