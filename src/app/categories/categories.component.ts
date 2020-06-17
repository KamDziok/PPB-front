import { Component, OnInit } from '@angular/core';
import {Categories} from '../interface/categories';
import {CategoriesService} from "../service/categories.service";
import {User} from "../interface/user";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Categories[];
  disabledEdit: boolean[] = [];
  newCategory = {name: ''};
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((result: Categories[]) => {
      this.categories = result;
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addCategory() {
    this.categoriesService.addCategory(this.newCategory).subscribe((success) => {
      console.log('Sukces');
      this.getAllCategories();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.categoriesService.updateCategory(this.categories[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllCategories();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.categoriesService.delete(this.categories[id]).subscribe((success) => {
        this.categories.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
}
