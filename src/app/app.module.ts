import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { FolderEditComponent } from './folder-edit/folder-edit.component';
import { TypeMarker } from './type-marker';

import { TraversalModule } from 'angular-traversal';
import { Resolver } from 'angular-traversal';
import { Marker } from 'angular-traversal';
import { BasicHttpResolver, BACKEND_BASE_URL } from 'angular-traversal';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ListComponent,
    FolderEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TraversalModule.forRoot(),
  ],
  entryComponents: [
    EditComponent,
    ListComponent,
    FolderEditComponent,
  ],
  providers: [
    { provide: Resolver, useClass: BasicHttpResolver },
    { provide: BACKEND_BASE_URL, useValue: 'http://localhost:8080/Plone' },
    { provide: Marker, useClass: TypeMarker },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
