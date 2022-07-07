import { Component, OnInit } from '@angular/core';

interface snowfalkeInfo {
  depth: number;
  left: number;
  speed: number;
}

@Component({
  selector: 'app-background-page',
  templateUrl: './background-page.component.html',
  styleUrls: ['./background-page.component.css'],
  animations: []
})
export class BackgroundPageComponent implements OnInit {

  snowflakes = Array(200).fill(0).map(e => {
    return {
      depth: Math.round(Math.random() * 4 + 1),
      left: Math.round(Math.random() * 100),
      speed: Math.round(Math.random() * 4 + 1),
    };
  })

  constructor() { }

  ngOnInit(): void {
    console.log(this.snowflakes)
  }

}
