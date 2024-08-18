import { CommonModule } from '@angular/common';
import { Component, Renderer2, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data } from '~/interfaces/data.interface';
import { DataService } from '~/services/data.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html'
})

export class CategoryComponent {
  @Input() categories: any[] = [];
  @Input() filteredData: any = {};
  @Input() estado: number = 0;
  @Input() subcategoryNames: any = {};
  @Input() estadoDescription = true;
  data: Data[] = [];

  constructor(private renderer: Renderer2, private dataService: DataService){}

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
