import { CommonModule, } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data } from '~/interfaces/data.interface';
import { DataService } from '~/services/data.service';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './description.component.html'
})

export class DescriptionComponent implements OnInit {

  name: string | null = null;
  description: string | null = null;
  data: Data | null = null;

  pagina: string | null = null;
  categoria: string | null = null;
  subcategoria: string | null = null;


  constructor(private dataService: DataService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      if (data?.name !== undefined) {
        this.name = data.name;
        this.description = data.description;
        this.pagina = data.url;
        this.categoria = this.dataService.mapCategory(data.category);
        this.subcategoria = this.dataService.getSubCategoryName(data.subcategory);
      } else {
        this.name = null;
      }
    });
  }

  close() {
    this.name = this.description = null;
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

}



