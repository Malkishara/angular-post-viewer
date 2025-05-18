import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostContentComponent } from './post-content.component';

describe('PostContentComponent', () => {
  let component: PostContentComponent;
  let fixture: ComponentFixture<PostContentComponent>;

  const mockPost = {
    title: 'Test Post Title',
    body: 'This is a test post body.',
    userId: 101,
    createdAt: new Date('2024-01-01T10:00:00Z'),
    tags: ['angular', 'unit-testing', 'component']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PostContentComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display post title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(mockPost.title);
  });

  it('should display post body', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(mockPost.body);
  });

  it('should display userId', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.textContent?.replace(/\s+/g, ' ');
    expect(text).toContain(`Author ID: ${mockPost.userId}`);
  });

  it('should display formatted createdAt date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.textContent ?? '';

    const expectedDatePart = 'Jan 1, 2024';
    expect(text).toContain(expectedDatePart);
  });

  it('should render all tags separated by commas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tagsLine = compiled.querySelector('.post-content')?.textContent?.replace(/\s+/g, ' ');
    expect(tagsLine).toContain('angular, unit-testing, component');
  });
});
