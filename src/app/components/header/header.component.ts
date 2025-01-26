import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonMenuButton, IonIcon, IonButton, IonPopover, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { globe } from 'ionicons/icons';
import moment from 'moment';
import { LANGS } from 'src/app/services/constants';

const ION_IMPORTS = [
  IonMenuButton,
  IonIcon,
  IonButton,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonLabel
];
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    ...ION_IMPORTS,
    NgForOf,
    TranslateModule
  ]
})
export class HeaderComponent  implements OnInit {

  isLanguage: boolean = false;
  languages: any[] = LANGS

  constructor(
    private translateService: TranslateService
  ) {
    addIcons({ globe })
  }

  ngOnInit() {}

  setLanguage(item: string) {
    localStorage.setItem('lang', item);
    this.translateService.setDefaultLang(item);
    this.isLanguage = false;
  }

}
