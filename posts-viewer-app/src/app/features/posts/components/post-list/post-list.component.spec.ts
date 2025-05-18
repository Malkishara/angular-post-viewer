import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { PostsService } from '../../../../core/services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../../../../core/models/post.model';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let mockPostsService: jasmine.SpyObj<PostsService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockPosts: Post[] = [
    { id: 1,
      title: 'Post 1',
      body: 'This is the body of post 1',
      userId: 100,
     createdAt: "Jan 7, 2025, 3:00:00 PM",
     tags: ['tag1', 'tag2']
   },
    { id: 2,
      title: 'Post 2',
      body: 'This is the body of post 2',
      userId: 100,
     createdAt: "Jan 7, 2025, 3:00:00 PM",
     tags: ['tag1', 'tag2']
  }
  ];

  beforeEach(async () => {
    mockPostsService = jasmine.createSpyObj('PostsService', ['getPosts']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PostListComponent],
      providers: [
        { provide: PostsService, useValue: mockPostsService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    mockPostsService.getPosts.and.returnValue({
      result: mockPosts,
      next: false
    });

    fixture.detectChanges();

    expect(component.posts.length).toBe(2);
    expect(component.hasMore).toBeFalse();
    expect(mockPostsService.getPosts).toHaveBeenCalled();
  });

  it('should append posts on loadMorePosts', () => {
    mockPostsService.getPosts.and.returnValue({
      result: mockPosts,
      next: true
    });

    component.loadMorePosts();
    expect(component.posts.length).toBe(2);
    expect(component.hasMore).toBeTrue();

    // Load more again
    component.loadMorePosts();
    expect(component.posts.length).toBe(4);
  });

  describe('truncate()', () => {
    it('should truncate text longer than maxLength', () => {
      const result = component.truncate('This is a very long post body.', 10, 5);
      expect(result).toBe('This is a ...');
    });

    it('should pad text shorter than minLength', () => {
      const result = component.truncate('Short', 20, 10);
      expect(result.length).toBeGreaterThanOrEqual(10);
      expect(result).toBe('Short     ');
    });

    it('should return the original text if within limits', () => {
      const result = component.truncate('ExactLength', 20, 5);
      expect(result).toBe('ExactLength');
    });
  });
});
