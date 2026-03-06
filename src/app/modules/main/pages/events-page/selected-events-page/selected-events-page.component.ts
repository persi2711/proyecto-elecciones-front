import { Component, input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-selected-events-page',
  templateUrl: 'selected-events-page.component.html',
  styleUrls: ['selected-events-page.component.scss'],
})
export class SelectedEventsPageComponent implements OnInit {
  id = input.required<string>();

  constructor() {}

  ngOnInit() {}
}
