import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.model';
import { Comment } from '../../../../core/models/comment.model';
import { CommonModule } from '@angular/common';
import { PostContentComponent } from '../post-content/post-content.component';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, PostContentComponent,CommentsComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit{

  post: Post | undefined;
comments: Comment[] = [];

constructor(private route: ActivatedRoute, private postsService: PostsService) {}

ngOnInit(): void {
const postId = Number(this.route.snapshot.paramMap.get('id'));
//get post by id
this.post = this.postsService.getPost(postId);
//get comments by post id
this.comments = this.postsService.getComments(postId);

console.log("post: ",this.post);
console.log("comments: ",this.comments);
}
}
