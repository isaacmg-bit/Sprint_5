import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gallery } from './gallery';

describe('Gallery', () => {
  let component: Gallery;
  let fixture: ComponentFixture<Gallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gallery],
    }).compileComponents();

    fixture = TestBed.createComponent(Gallery);
    component = fixture.componentInstance;
  });

  it('should create the Gallery component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the images signal without items before init', async () => {
    expect(component.images().length).toBe(0);
  });

  it('should call handleImages once on initialization', async () => {
    const handleImagesSpy = vi.spyOn(component, 'handleImages');

    fixture.detectChanges();
    await fixture.whenStable();

    expect(handleImagesSpy).toHaveBeenCalledTimes(1);
  });

  it('should set the images signal to 32 items after init', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.images().length).toBe(32);
  });

  it('image i===0 has featured = true', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.images()[0].featured).toBe(true);
  });
  it('image i!=0 has featured = false', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.images()[1].featured).toBe(false);
    expect(component.images()[11].featured).toBe(false);
    expect(component.images()[31].featured).toBe(false);
  });

  it('should render 32 <app-image-item> components', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const imageItems = fixture.nativeElement.querySelectorAll('app-image-item');

    expect(imageItems.length).toBe(32);
  });
});
