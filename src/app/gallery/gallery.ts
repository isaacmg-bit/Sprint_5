import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ImageItem } from '../image-item/image-item';
import { Image } from '../image';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, ImageItem],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  images = signal<Image[]>([]);

  ngOnInit() {
    this.handleImages();
  }

  handleImages() {
    const imageList: Image[] = [];

    for (let i = 0; i < 35; i++) {
      imageList.push({
        id: i,
        url: `https://picsum.photos/300/200?random=${Date.now()}-${i}`,
      });
    }

    this.images.set(imageList);
  }
  trackByImageId(index: number, image: Image): number {
    return image.id;
  }
}
