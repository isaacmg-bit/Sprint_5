import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Gallery } from './gallery/gallery';
import { Image } from './image';

@Component({
  selector: 'app-root',
  imports: [Gallery],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sprint_5');

  Gallery: Image = { 
    id: 123,
    url: 'https://picsum.photos/id/237/300/200',
    featured: true,
  }
}
