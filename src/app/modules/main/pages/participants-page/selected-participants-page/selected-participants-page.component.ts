import { Component, input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-selected-participants-page',
  templateUrl: 'selected-participants-page.component.html',
  styleUrls: ['selected-participants-page.component.scss'],
})
export class SelectedParticipantsPageComponent implements OnInit {
  id = input.required<string>();
  constructor() {}

  ngOnInit() {}
}
