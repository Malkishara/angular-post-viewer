import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-content',
  imports: [CommonModule],
  templateUrl: './post-content.component.html',
  styleUrl: './post-content.component.scss'
})
export class PostContentComponent {
@Input() post: any;
}
