import { Component, OnInit, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContainerComponent } from '~/home/container/container.component';
import { DataService } from '~/home/services/data.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [FormsModule, CommonModule, ContainerComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})

export class AlertComponent implements OnInit {
  message: string | null = null;
  titulo: string | null = null;

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.getAlert().subscribe(data => {
      if (data) {
        this.titulo = data[0]; 
        this.message = data[1];
      } else {
        if (this.titulo || this.message) {
          //this.closeAlert();
        }
      }
    });
  }
  
  confirmar(): void {
    this.dataService.confirmAction(true);
  }

  closeAlert(): void {
    this.titulo = this.message = null;
  }
  
}
