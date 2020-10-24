import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent implements OnInit {

  @Input()
  readonly title: string;

  @Input()
  readonly date: string;

  constructor() { }

  ngOnInit(): void {
  }

}
