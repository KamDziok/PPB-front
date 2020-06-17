import { Component, OnInit } from '@angular/core';
import {User} from '../interface/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  disabledEdit: boolean[] = [];
  newUser = {firstName: '', lastName: '', login: '', password: ''};
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAll().subscribe((result: User[]) => {
      this.users = result;
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe((success) => {
      console.log('Sukces');
      this.getAllUsers();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.userService.updateUser(this.users[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllUsers();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.userService.delete(this.users[id]).subscribe((success) => {
        this.users.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
}
