import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { FolderEditComponent } from './folder-edit/folder-edit.component';
import { TraverserOutlet } from './traverser/traverser.directive';
import { TraverserLink } from './traverser/traverser.link';
import { Traverser } from './traverser/traverser';
import { Resolver } from './traverser/resolver';
import { Marker } from './traverser/marker';
import { TypeMarker } from './type-marker';
import { BasicHttpResolver, BACKEND_BASE_URL } from './traverser/http.resolver';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ListComponent,
    TraverserOutlet,
    TraverserLink,
    FolderEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  entryComponents: [
    EditComponent,
    ListComponent,
    FolderEditComponent,
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    Traverser,
    { provide: Resolver, useClass: BasicHttpResolver },
    { provide: BACKEND_BASE_URL, useValue: 'http://localhost:8080/Plone' },
    { provide: Marker, useClass: TypeMarker },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
