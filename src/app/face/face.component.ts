import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';

import 'tracking/build/tracking-min';
import 'tracking/build/data/face-min';

declare var tracking: any;

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css']
})
export class FaceComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('video') video: ElementRef;

  constructor(private _ngZone: NgZone) { }

  ngOnInit() {
    let canvas = this.canvas.nativeElement;
    var context = canvas.getContext('2d');
    context.strokeStyle = '#a64ceb';
    context.strokeRect(20, 20, 100, 100);
  }

  onPress() {
    let video = this.video.nativeElement;
    let canvas = this.canvas.nativeElement;

    var context = canvas.getContext('2d');

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(1);
    tracker.setEdgesDensity(0.1);

    tracking.track(video, tracker, { camera: true });

    tracker.on('track', function (event) {
      console.log(event);
      context.clearRect(0, 0, canvas.width, canvas.height);

      event.data.forEach(function (rect) {
        console.log('RECT:', rect);
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    });
  }

}
