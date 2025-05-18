import { Component,OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.model';
import { Router } from '@angular/router';
import { PostCardComponent } from '../post-card/post-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, PostCardComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
hasMore: boolean = true;

constructor(private postsService: PostsService, private router: Router) {}

ngOnInit(): void {
    this.loadMorePosts();
  }

  //load more posts
  loadMorePosts(): void {
    const { result, next } = this.postsService.getPosts();
    this.posts = [...this.posts, ...result];
    this.hasMore = next;
  }

//truncate body
 truncate(text: string, maxLength: number, minLength: number ): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else if (text.length < minLength) {
    return text.padEnd(minLength, ' ');
  } else {
    return text;
  }
}



}
