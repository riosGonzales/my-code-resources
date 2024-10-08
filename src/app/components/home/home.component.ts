import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ContainerComponent } from '../../modules/container/container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ContainerComponent],
  templateUrl: './home.component.html',

  styleUrl: './home.component.css'
})
export class HomeComponent {

}
