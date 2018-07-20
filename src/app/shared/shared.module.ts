import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPreloaderComponent } from './components/ui/main-preloader/main-preloader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainPreloaderComponent],
  exports: [ MainPreloaderComponent]

})
export class SharedModule { }
