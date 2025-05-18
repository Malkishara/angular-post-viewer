import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';

import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.model';
import { Comment } from '../../../../core/models/comment.model';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

      let mockPostsService: jasmine.SpyObj<PostsService>;

  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    body: 'Test Body',
    userId: 100,
    createdAt: "Jan 7, 2025, 3:00:00 PM",
    tags: ['angular', 'unit-test']
  };

  const mockComments: Comment[] = [
    { id: 1, postId: 1, name: 'Jane', email: 'jane@example.com', body: 'Great post!' },
    { id: 2, postId: 1, name: 'John', email: 'john@example.com', body: 'Very helpful!' }
  ];

  beforeEach(async () => {
    mockPostsService = jasmine.createSpyObj('PostsService', ['getPost', 'getComments']);
    mockPostsService.getPost.and.returnValue(mockPost);
    mockPostsService.getComments.and.returnValue(mockComments);

    await TestBed.configureTestingModule({
      imports: [PostDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        },
        { provide: PostsService, useValue: mockPostsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPost with the correct ID', () => {
    expect(mockPostsService.getPost).toHaveBeenCalledWith(1);
  });

  it('should call getComments with the correct ID', () => {
    expect(mockPostsService.getComments).toHaveBeenCalledWith(1);
  });

  it('should set post and comments correctly', () => {
    expect(component.post).toEqual(mockPost);
    expect(component.comments).toEqual(mockComments);
  });
});
