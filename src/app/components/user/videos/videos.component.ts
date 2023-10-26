import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
 
  constructor(
    private router:Router
  ){}

  getVideos(){
 this.router.navigate(['/videoplayer'])
  }
}
