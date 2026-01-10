import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { ImageItem } from '../image-item/image-item';
import { Image } from '../image';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, ImageItem, CdkDropList, CdkDrag],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements OnInit {
  private readonly DEFAULT_GALLERY_SIZE = 32;
  images = signal<Image[]>([]);
  liveMessage = signal('');

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

  drop(event: CdkDragDrop<Image[]>) {
    const updatedImages = [...this.images()];
    moveItemInArray(updatedImages, event.previousIndex, event.currentIndex);
    this.images.set(updatedImages);
    this.updateAlts();
    this.liveMessage.set('Images reordered');
  }

  onTrashClick(image: Image): void {
    if (!confirm('Are you sure you want to delete this image?')) return;

    this.images.update((images) => images.filter((img) => img.id !== image.id));

    this.updateAlts();
    this.checkAndResetGallery();
    this.liveMessage.set('Image deleted');

    queueMicrotask(() => {
      const items = document.querySelectorAll(
        'app-image-item [tabindex="0"]'
      ) as NodeListOf<HTMLElement>;

      items[0]?.focus();
    });
  }

  updateAlts(): void {
    this.images.update((images) => {
      if (images.length === 0) return images;

      return images.map((img, index) => ({
        ...img,
        featured: index === 0,
        alt: index === 0 ? 'Featured gallery image' : `Gallery image ${index + 1}`,
      }));
    });
  }

  checkAndResetGallery(): void {
    if (this.images().length === 0) {
      this.handleImages();
    }
  }
}
