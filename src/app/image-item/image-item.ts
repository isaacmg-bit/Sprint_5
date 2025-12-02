import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../image';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-image-item',
  imports: [CommonModule, ButtonModule],
  templateUrl: './image-item.html',
  styleUrl: './image-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.featured-image]': 'featured()',
    '[class.col-span-2]': 'featured()',
    '[class.row-span-2]': 'featured()',
  },
})
export class ImageItem {
  image = input.required<Image>();
  featured = input.required<boolean>();

  imageClick = output<Image>();

  onKeyPress() {
    this.imageClick.emit(this.image());
  }

  imageDelete = output<Image>();

  onClickTrash() {
    this.imageDelete.emit(this.image());
  }
}
