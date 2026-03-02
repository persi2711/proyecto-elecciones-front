import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-process-section',
  templateUrl: 'process-section.component.html',
  styleUrls: ['process-section.component.scss'],
})
export class ProcessSectionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
