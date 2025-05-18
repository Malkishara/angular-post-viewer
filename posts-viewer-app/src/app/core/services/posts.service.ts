import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import posts from '../../../assets/data/posts.json';
import comments from '../../../assets/data/comments.json';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

private postData: Post[] = posts;
private commentData: Comment[] = comments;
private batchSize = 10;
private currentIndex = 0;

  constructor() { }

  getPosts(): { next: boolean; result: Post[] } {
const result = this.postData.slice(this.currentIndex, this.currentIndex + this.batchSize);
this.currentIndex += this.batchSize;
return {
next: this.currentIndex < this.postData.length,
result,
};
}

getPost(id: number): Post | undefined {
return this.postData.find(post => post.id === id);
}

 getComments(postId: number): Comment[] {
return this.commentData.filter(comment => comment.postId === postId);
}

resetIndex() {
this.currentIndex = 0;
}

}
