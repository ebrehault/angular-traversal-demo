import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { TraverserOutlet } from './traverser/traverser.directive';
import { TraverserLink } from './traverser/traverser.link';
import { Traverser } from './traverser/traverser';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ListComponent,
    TraverserOutlet,
    TraverserLink,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  entryComponents: [
    EditComponent,
    ListComponent,
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    Traverser,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
