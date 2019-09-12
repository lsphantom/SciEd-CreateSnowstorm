import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  //Animation Video Source
  videoSource = '../assets/snow-ani.mp4';

  togglePlayVideo() {
    this.videoplayer.nativeElement.play();
  }

  constructor() { }

  @ViewChild('videoPlayer', null) videoplayer: ElementRef;

  ngOnInit() {}

}
