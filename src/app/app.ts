import { Component } from '@angular/core';
import { Gallery } from './gallery/gallery';

@Component({
  selector: 'app-root',
  imports: [Gallery],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
