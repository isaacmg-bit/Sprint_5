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

  imageSelect = output<Image>();

  onKeyPress(): void {
    this.imageSelect.emit(this.image());
  }

  imageDelete = output<Image>();

  onClickTrash(event: MouseEvent) {
    event.stopPropagation();
    this.imageDelete.emit(this.image());
  }
}
