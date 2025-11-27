import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../image';

@Component({
  selector: 'app-image-item',
  imports: [CommonModule],
  templateUrl: './image-item.html',
  styleUrl: './image-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.featured-image]': 'featured()'
  }
})
export class ImageItem {
  image = input.required<Image>();
  featured = input.required<boolean>();
}
