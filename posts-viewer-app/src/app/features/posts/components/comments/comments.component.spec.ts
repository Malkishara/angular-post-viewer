import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  const mockComments = [
    {
      name: 'John Doe',
      body: 'This is a test comment.',
      email: 'john@example.com',
    },
    {
      name: 'Jane Smith',
      body: 'Another test comment.',
      email: 'jane@example.com',
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of comments', () => {
    component.comments = mockComments;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const commentElements = compiled.querySelectorAll('.comment');
    expect(commentElements.length).toBe(2);
  });

  it('should render comment details', () => {
    component.comments = [mockComments[0]];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toContain('John Doe');
    expect(compiled.querySelector('p')?.textContent).toContain('This is a test comment.');
    expect(compiled.querySelector('small')?.textContent).toContain('john@example.com');
  });

  it('should display "Comments" heading', () => {
    component.comments = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Comments');
  });
});
