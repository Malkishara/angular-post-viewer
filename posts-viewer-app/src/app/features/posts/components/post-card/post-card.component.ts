import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
 @Input() id!: number;
 @Input() title: string = '';
 @Input() body: string = '';

 constructor(private router: Router) {}

  goToDetails(): void {
    console.log("id: ",this.id);
    this.router.navigate(['/post', this.id]);
  }
}
