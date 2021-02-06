import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'officeman';
  loading = false;
  subscription: Subscription;
  constructor(private uiServices: UiService) {
  }
  ngOnInit(): void {
    this.subscription = this.uiServices.loadingStateChanged.subscribe(isLoading => {
      this.loading = isLoading;
      console.log(this.loading);
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
