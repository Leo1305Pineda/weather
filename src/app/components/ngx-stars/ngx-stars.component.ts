import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

@Component({
  selector: 'ngx-stars',
  standalone: true,
  imports: [
    IonicModule,
    NgClass,
    NgFor,
    NgIf
  ],
  templateUrl: './ngx-stars.component.html',
  styleUrls: ['./ngx-stars.component.scss'],
})
export class NgxStarsComponent implements OnInit {
  @Input() set value(value: any) {
    this.stars.forEach((star) => {
      if (star.id <= value) {
        star.class = 'star-gold star';
      } else {
        star.class = 'star-gray star-hover star';
      }
    });
  }
  @Input() maxLength = 5;
  @Input() readonly = false;
  @Input() height: string = '40px';
  @Input() width: string = '40px';
  @Input() isShort: boolean = false;
  @Input() className = 'star-rating-container star-rating-animation'
  title = '';
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }
  ];
  rowData: any;

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor(el: ElementRef, private cdr: ChangeDetectorRef) {
    addIcons({ star })
  }

  ngOnInit(): void {
    this.stars = this.stars.filter(x => x.id <= this.maxLength)
  }
  selectStar(value: any, readonly = true): void {
    this.onSelect.emit(value);
    this.cdr.detectChanges();
  }

}
