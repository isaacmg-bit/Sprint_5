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
  private readonly DEFAULT_GALLERY_SIZE = 32;

  images = signal<Image[]>([]);

  ngOnInit() {
    this.handleImages();
  }

  handleImages(): void {
    const imageList: Image[] = [];

    for (let i = 0; i < this.DEFAULT_GALLERY_SIZE; i++) {
      imageList.push({
        id: i,
        url: `https://picsum.photos/1920/1080?random=${Date.now()}-${i}`,
        featured: i === 0,
        alt: i === 0 ? 'Featured gallery image' : `Gallery image ${i + 1}`,
      });
    }

    this.images.set(imageList);
  }

  onImageClick(image: Image): void {
    console.log('Selected image:', image);
  }

  async onTrashClick(image: Image) {
    
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      this.images.update((images) => {
        return images.filter((img) => img.id !== image.id);
      });

      await this.updateAlts();
      await this.checkAndResetGallery();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  async updateAlts() {
    await new Promise((resolve) => setTimeout(resolve, 0));

    this.images.update((images) => {
      if (images.length === 0) return images;

      return images.map((img, index) => ({
        ...img,
        featured: index === 0,
        alt: index === 0 ? 'Featured gallery image' : `Gallery image ${index + 1}`,
      }));
    });
  }

  async checkAndResetGallery() {
    await new Promise((resolve) => setTimeout(resolve, 0));

    if (this.images().length === 0) {
      this.handleImages();
    }
  }
}
