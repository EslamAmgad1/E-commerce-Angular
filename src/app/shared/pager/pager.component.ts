import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  standalone: true,
  imports: [PaginationModule,CommonModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss'
})
export class PagerComponent {
  @Input() totalCount?: number;
  @Input() pageSize?: number;
  @Output() pageChanged = new EventEmitter<number>();

  onPagerChanged(event: any) {
    this.pageChanged.emit(event.page);
  }
}
