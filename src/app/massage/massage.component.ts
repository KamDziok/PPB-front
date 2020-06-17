import { Component, OnInit } from '@angular/core';
import {Massage} from "../interface/massage";
import {User} from "../interface/user";
import {Subscription} from "rxjs";
import {Advertisement} from "../interface/advertisement";
import {MassageService} from "../service/massage.service";
import {UserService} from "../service/user.service";
import {AdvertisementService} from "../service/advertisement.service";
import {Comment} from "../interface/comment";

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.css']
})
export class MassageComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  massages: Massage[];
  users: User[];
  advertisements: Advertisement[];
  disabledEdit: boolean[] = [];
  newMassage = {date: null, contents: '', sender: null, recipient: null, advertisement: null};
  constructor(private massageService: MassageService, private userService: UserService,
              private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    this.getAllMassage();
  }

  getAllMassage() {
    this.massageService.getAll().subscribe((result: Massage[]) => {
      this.massages = result;
      this.disabledEdit = result.map(r => true);
      this.getAllAdvertisement();
      this.getAllUsers();
    }, (error) => {});
  }

  getAllAdvertisement() {
    this.subscriptions.add(this.advertisementService.getAll().subscribe((result: Advertisement[]) => {
      this.advertisements = result;
      for (const massage of this.massages) {
        for (const advertisement of this.advertisements) {
          if (massage.advertisement.id === advertisement.id) {
            massage.advertisement = advertisement;
          }
        }
      }
    }, (error) => {}));
  }

  getAllUsers() {
    this.subscriptions.add(this.userService.getAll().subscribe((result: User[]) => {
      this.users = result;
      this.getAllSender();
      this.getAllRecipient();
    }, (error) => {}));
  }

  getAllSender(){
    for (const user of this.users) {
      for (const massage of this.massages) {
        if (massage.sender.id === user.id) {
          massage.sender = user;
        }
      }
    }
  }

  getAllRecipient(){
    for (const user of this.users) {
      for (const massage of this.massages) {
        if (massage.recipient.id === user.id) {
          massage.recipient = user;
        }
      }
    }
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addMassage() {
    this.massageService.addMassage(this.newMassage).subscribe((success) => {
      console.log('Sukces');
      this.getAllMassage();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.massageService.updateMassage(this.massages[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllMassage();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.massageService.delete(this.massages[id]).subscribe((success) => {
        this.massages.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
