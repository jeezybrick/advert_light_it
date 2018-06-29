import { Component, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { routerTransition } from './app-router.animations';
import { takeUntil } from 'rxjs/internal/operators';
import { ReplaySubject } from 'rxjs';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ routerTransition ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  public loading = true;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private router: Router) {
    router.events
      .pipe(
       // untilComponentDestroyed(this),
        takeUntil(this.destroyed$)
      )
      .subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

   ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  public getState(outlet): string {
    return outlet.activatedRouteData.state;
  }
}
