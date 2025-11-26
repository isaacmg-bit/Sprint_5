import { Component, signal } from '@angular/core';
import { Gallery } from './gallery/gallery';
import { Image } from './image';

@Component({
  selector: 'app-root',
  imports: [Gallery],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('sprint_5');
}
