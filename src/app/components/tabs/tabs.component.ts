import {Component, OnInit} from '@angular/core';
import {TabComponent} from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  // templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  template: `
    <div style="" class="tabs">

      <div style="" class="tabTitle" [class.tabActive]="tab.active" *ngFor="let tab of tabs" (click)="selectTab(tab)">
        <p>
          {{tab.tabTitle}}
        </p>
      </div>
    </div>
    <ng-content></ng-content>
  `
})
export class TabsComponent implements OnInit {

  tabs: TabComponent[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  addTab(tab: TabComponent): void {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab: TabComponent): void {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

}
