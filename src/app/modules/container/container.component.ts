import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DescriptionComponent } from '~/modules/container/description/description.component';
import { CategoryComponent } from '~/modules/container/category/category.component';

import { DataService } from '../../services/data.service';

import { Data } from '../../interfaces/data.interface';
import { Category } from '~/interfaces/category.interface';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DescriptionComponent,
    CategoryComponent
  ],
  templateUrl: './container.component.html',
  styles: [`.mirror {transform: scaleX(-1);}`],
})

export class ContainerComponent implements OnInit {
  //State
  estado: number = 0;
  estadoDescription: boolean = false;

  //Category
  category: Category[] = [];
  categories: { category: string, subcategories: string[] }[] = [];
  isCategorySelected: boolean = false;

  //Subcategory
  subcategoryNames: { [key: string]: string } = {};

  //Data
  data: Data[] = [];
  filteredData: { [subcategory: string]: Data[] } = {};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.category = this.dataService.getCategories();
    this.categories = this.dataService.getCategoriesData();
    this.buildSubcategoryNames();
  }

  updateEstado(newEstado: number) {
    this.isCategorySelected = true;
    this.estado = newEstado;
    const categoryObj = this.getCategoryByState(newEstado);
    if (categoryObj) {
      this.dataService.getJson(categoryObj.category).subscribe(data => {
        this.data = data;
        this.filteredData = this.filterDataBySubcategories(data, categoryObj.subcategories);
      });
    }
  }

  getCategoryByState(estado: number): { category: string, subcategories: string[] } | null {
    return this.categories[estado - 1] || null;
  }

  buildSubcategoryNames(): void {
    this.subcategoryNames = {};
    this.categories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        const name = this.dataService.getSubCategoryName(subcategory);
        if (name) {
          this.subcategoryNames[subcategory] = name;
        }
      });
    });
  }

  filterDataBySubcategories(data: Data[], subcategories: string[]): { [subcategory: string]: Data[] } {
    const filtered: { [subcategory: string]: Data[] } = {};
    subcategories.forEach(subcategory => {
      filtered[subcategory] = data.filter(item => item.subcategory === subcategory);
    });
    return filtered;
  }
}