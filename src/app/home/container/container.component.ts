import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertComponent } from '~/home/alert/alert.component';
import { DescriptionComponent } from '~/description/description.component';

import { DataService } from '../services/data.service';
import { Data } from './data.interface';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AlertComponent,
    DescriptionComponent
  ],
  templateUrl: './container.component.html',
  styles: [`.mirror {transform: scaleX(-1);}`],
})

export class ContainerComponent implements OnInit {


  data: Data[] = [];
  estado: number = 0;
  estadoDescription: boolean = false;
  filteredData: { [subcategory: string]: Data[] } = {};
  subcategoryNames: { [key: string]: string } = {};
  previousEstado: number = 1;
  isCategorySelected: boolean = false;

  items = [
    { id: 1, name: 'Diseño UX/UI' },
    { id: 2, name: 'Backend' },
    { id: 3, name: 'Frontend' },
    { id: 4, name: 'Otros' }
  ];

  categories: { category: string, subcategories: string[] }[] = [
    { category: 'design', subcategories: ['colors', 'fonts', 'icons', 'images'] },
    { category: 'backend', subcategories: ['learningTools', 'onlineCompilers', 'exercisesChallenges'] },
    { category: 'frontend', subcategories: ['onlineCompilers2', 'CSS_Tools', 'apis'] },
    { category: 'other', subcategories: ['extensions', 'security', 'dba'] }
  ];

  constructor(private dataService: DataService, private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.buildSubcategoryNames();
  }

  private buildSubcategoryNames(): void {
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

  filterDataBySubcategories(data: Data[], subcategories: string[]): { [subcategory: string]: Data[] } {
    const filtered: { [subcategory: string]: Data[] } = {};
    subcategories.forEach(subcategory => {
      filtered[subcategory] = data.filter(item => item.subcategory === subcategory);
    });
    return filtered;
  }


  //Description

  handleRightClick(event: MouseEvent, item: Data) {
    event.preventDefault();
    this.estadoDescription = true;
    if (this.estadoDescription) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    }
    this.loadDataByName(item.name);
    this.dataService.setData(item);
  }

  loadDataByName(name: string) {
    this.dataService.getByName(name).subscribe(data => {
      this.data = data;
    });
  }


}
