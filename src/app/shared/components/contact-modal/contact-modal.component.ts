import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  selector: 'contact-modal',
  templateUrl: 'contact-modal.component.html',
  styleUrls: ['contact-modal.component.scss'],
})
export class ContactModalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
