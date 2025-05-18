import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { Post } from '../models/post.model';

import posts from '../../../assets/data/posts.json';
import comments from '../../../assets/data/comments.json';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsService);
    service.resetIndex();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return first batch of posts with next=true', () => {
    const result = service.getPosts();
    expect(result.result.length).toBeLessThanOrEqual(10);
    expect(result.next).toBe(posts.length > 10);
  });

   it('should return all posts in batches', () => {
    let allPosts: Post[] = [];
    let hasNext = true;

    while (hasNext) {
      const result = service.getPosts();
      allPosts = allPosts.concat(result.result);
      hasNext = result.next;
    }

    expect(allPosts.length).toBe(posts.length);
  });

  it('should reset index and return first batch again', () => {
    const firstBatch = service.getPosts();
    service.getPosts(); // move to next batch
    service.resetIndex();
    const afterResetBatch = service.getPosts();
    expect(afterResetBatch.result).toEqual(firstBatch.result);
  });

  it('should return a post by ID', () => {
    const post = service.getPost(posts[0].id);
    expect(post).toEqual(posts[0]);
  });

  it('should return undefined for non-existent post ID', () => {
    const post = service.getPost(999999); // assuming this ID doesn't exist
    expect(post).toBeUndefined();
  });

  it('should return comments for a post', () => {
    const postId = posts[0].id;
    const expectedComments = comments.filter(c => c.postId === postId);
    const actualComments = service.getComments(postId);
    expect(actualComments).toEqual(expectedComments);
  });

  it('should return empty array for post with no comments', () => {
    const noCommentPostId = -1; // assuming no post has this ID
    const result = service.getComments(noCommentPostId);
    expect(result.length).toBe(0);
  });
});
