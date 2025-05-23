import { Routes } from '@angular/router';
import { PostListComponent } from './features/posts/components/post-list/post-list.component';
import { PostDetailComponent } from './features/posts/components/post-detail/post-detail.component';

export const routes: Routes = [
{ path: '', component: PostListComponent },
{ path: 'post/:id', component: PostDetailComponent }
];
