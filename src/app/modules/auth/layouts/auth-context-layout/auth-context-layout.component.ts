import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthContextService } from '../../services/auth-context-layout.service';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-auth-context-layout',
  templateUrl: 'auth-context-layout.component.html',
})
export class AuthContextLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
