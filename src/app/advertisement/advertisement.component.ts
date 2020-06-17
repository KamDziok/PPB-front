import { Component, OnInit, OnDestroy } from '@angular/core';
import {Advertisement} from '../interface/advertisement';
import {User} from '../interface/user';
import {Categories} from '../interface/categories';
import {AdvertisementService} from '../service/advertisement.service';
import {CategoriesService} from '../service/categories.service';
import {UserService} from '../service/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  advertisements: Advertisement[];
  users: User[];
  categories: Categories[];
  disabledEdit: boolean[] = [];
  newAdvertisement = {title: '', description: '', date: null, user: null, category: null};
  constructor(private advertisementService: AdvertisementService, private categoriesService: CategoriesService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getAllAdvertisement();
  }

  getAllAdvertisement() {
    this.advertisementService.getAll().subscribe((result: Advertisement[]) => {
      this.advertisements = result;
      this.disabledEdit = result.map(r => true);
      this.getAllCategories();
      this.getAllUsers();
    }, (error) => {});
  }

  getAllCategories() {
    this.subscriptions.add(this.categoriesService.getAll().subscribe((result: Categories[]) => {
      this.categories = result;
      for (const category of this.categories) {
        for (const advertisement of this.advertisements) {
          if (advertisement.category.id === category.id) {
            advertisement.category = category;
          }
        }
      }
    }, (error) => {}));
  }

  getAllUsers() {
    this.subscriptions.add(this.userService.getAll().subscribe((result: User[]) => {
      this.users = result;
      for (const user of this.users) {
        for (const advertisement of this.advertisements) {
          if (advertisement.user.id === user.id) {
            advertisement.user = user;
          }
        }
      }
    }, (error) => {}));
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addAdvertisement() {
    this.advertisementService.addAdvertisement(this.newAdvertisement).subscribe((success) => {
      console.log('Sukces');
      this.getAllAdvertisement();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.advertisementService.updateAdvertisement(this.advertisements[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllAdvertisement();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.advertisementService.delete(this.advertisements[id]).subscribe((success) => {
        this.advertisements.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
