import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  constructor() {}
  layoutService = inject(LayoutService);
  loading = this.layoutService.loading;

  ngOnInit() {}
}
