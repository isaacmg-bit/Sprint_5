import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ImageItem } from './image-item';
import { Image } from '../image';

const mockImageTrue: Image = {
  id: 0,
  url: 'mock-url-test-true.jpg',
  featured: true,
  alt: 'Gallery image',
};

const mockImageFalse: Image = {
  id: 31,
  url: 'mock-url-test-false.jpg',
  featured: false,
  alt: 'Gallery image',
};

@Component({
  imports: [ImageItem],
  template: '<app-image-item [image]="testImage" [featured]="testFeatured"></app-image-item>',
})
class TestHostTrue {
  testImage = mockImageTrue;
  testFeatured = mockImageTrue.featured;
}

@Component({
  imports: [ImageItem],
  template: '<app-image-item [image]="testImage" [featured]="testFeatured"></app-image-item>',
})
class TestHostFalse {
  testImage = mockImageFalse;
  testFeatured = mockImageFalse.featured;
}

describe('ImageItem true tests', () => {
  let component: ImageItem;
  let fixture: ComponentFixture<TestHostTrue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostTrue],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostTrue);
    fixture.detectChanges();
    const imageItemElement = fixture.debugElement.children[0];
    component = imageItemElement.componentInstance as ImageItem;
    await fixture.whenStable();
  });

  it('should create and receive required inputs', () => {
    expect(component).toBeTruthy();
    expect(component.image().url).toBe('mock-url-test-true.jpg');
    expect(component.featured()).toBe(true);
  });

  it('should bind the image url to the <img> element src attribute', () => {
    const imageElement: HTMLImageElement = fixture.nativeElement.querySelector('img');

    expect(imageElement.src).toContain(mockImageTrue.url);
  });

  it('delete button renders correctly', () => {
    const deleteButton = fixture.nativeElement.querySelector('button');
    expect(deleteButton).toBeTruthy();
  });
  
  it('should emit imageDelete with correct image', () => {
    const emitSpy = vi.spyOn(component.imageDelete, 'emit');
    const mockEvent = { stopPropagation: vi.fn() } as any;

    component.onClickTrash(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should have the "featured-image" class when Input featured is true', () => {
    const hostElement: HTMLElement = fixture.debugElement.children[0].nativeElement;

    expect(hostElement.classList.contains('featured-image')).toBe(true);
  });

  it('should not re-render view if external data changes without explicit change detection', () => {
    const imageElementBefore: HTMLImageElement = fixture.nativeElement.querySelector('img');
    const originalUrl = imageElementBefore.src;

    fixture.componentInstance.testImage.url = 'FORCED_CHANGE.jpg';

    const imageElementAfter: HTMLImageElement = fixture.nativeElement.querySelector('img');

    expect(imageElementAfter.src).toBe(originalUrl);
  });
});

describe('ImageItem false tests', () => {
  let fixture: ComponentFixture<TestHostFalse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostFalse],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostFalse);
    fixture.detectChanges();
  });

  it('should NOT have the "featured-image" class when Input featured is false', () => {
    const hostElement: HTMLElement = fixture.debugElement.children[0].nativeElement;

    expect(hostElement.classList.contains('featured-image')).toBe(false);
  });
});
