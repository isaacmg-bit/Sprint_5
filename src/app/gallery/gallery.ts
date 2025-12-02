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

    for (let i = 0; i < 32; i++) {
      imageList.push({
        id: i,
        url: `https://picsum.photos/650/450?random=${Date.now()}-${i}`,
        featured: i === 0,
        alt: i === 0 ? 'Featured gallery image' : `Gallery image ${i + 1}`,
      });
    }

    this.images.set(imageList);
  }

  onImageClick(image: Image) {
    console.log('Selected image:', image);
  }

  onTrashClick(image: Image) {
    if(confirm("Are you sure you want to delete this image?"))

    this.images.update((images) => {
      const filtered = images.filter((img) => img.id !== image.id);

      if (filtered.length === 0) {
        return filtered;
      } else {
        filtered[0].featured = true;
        return filtered;
      }
    });
    if (this.images().length === 0) {
      this.handleImages();
    }
  }
}
