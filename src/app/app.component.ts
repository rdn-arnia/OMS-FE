import { Component, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { filter, Subject, takeUntil } from 'rxjs';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean | undefined;
  userName: string | undefined;
  isAdmin: boolean | undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef,
      private media: MediaMatcher,
      private authService: MsalService) {

      this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      // tslint:disable-next-line: deprecation
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getAllAccounts().length > 0;
  }

  logout(): void {
    this.authService.logoutRedirect();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      // tslint:disable-next-line: deprecation
      this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
      this.changeDetectorRef.detectChanges();
  }
}
