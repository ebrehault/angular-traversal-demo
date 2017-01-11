# Angular Traversal

**When routing is not good enough**

## Why routing is not always good

Routing is the most common way to associate a given rendering to a given URL.

Let's think about a blog, `/` (the root) displays a list of the last blog posts, and each post has an URL like `/2017/01/11/angular-traversal`, and when the manager edits such a post, the URL is `/2017/01/11/angular-traversal/edit`.

Routing allows to manage that easily with 3 routes:

- `/` => use the home page template,
- `/:year/:month/:postid` => use the post template.
- `/:year/:month/:postid/edit` => use the post edition template.

And Angular provides a very good routing implementation (see [Angular Router](https://angular.io/docs/ts/latest/guide/router.html)).

This mechanism works perfectly for application-oriented websites (let's say an issue tracker for instance) or simple websites (like a blog). But, it does not fit the needs of complex websites.

Let's imagine a company website which can contain two types of pages: folders or simple pages:

- `/about` is a page,
- `/news` is a folder,
- `/news/welcome-our-new-president` is a page,
- `/news/archives` is a folder.

There is no way to enumerate all the possible routes for such a website: it would be too difficult to maintain (because the site structure will probably evolve regularly).

That's why CMSes usually do not use routing.

We can imagine another example: we want to build an application to display a Git repository and we want to render differently the folders and the files.

We certainly want to use the current file or folder path as our current URL and as we cannot predict the repository tree structure, here again routing is not an option.

Note: and something routing is the appropriate solution, but our backend service already implements it very well and we do not want to re-implement it another time in our frontend application.

## Meet traversal

Traversal is another approach, it analyses the current URL starting from its end to identify the appropriate rendering (we name it the *view*) and the rest of the URL is supposed to indicate the context we want to render.

We use `@@` as a prefix to our view identifiers.

For instance, in `/news/@@edit`, `edit` is the view identifier, and `/news` is the context, so we know we want to display the `/news` content using the edit form template.

Depending on the context, the same view identifier might be associated to a specific view implementation, (for instance we probably have two different forms to edit a folder and to edit a page, but their respective URLs will both end with `/@@edit`).

The default view is `view`, so `/about` is equivalent to `/about/@@view`.

## Angular Traversal features

Angular Traversal allows to associate a component to a view name for a given *context marker*, like:

```javascript
traverser.addView('view', 'Folder', FolderViewComponent);
traverser.addView('view', 'Document', DocumentViewComponent);
traverser.addView('edit', 'Folder', FolderEditComponent);
traverser.addView('edit', 'Document', DocumentEditComponent);
traverser.addView('history', '*', HistoryComponent);
```

Just like the router, we specify the view rendering location using an outlet directive:
```html
<traverser-outlet></traverser-outlet>
```

And we create navigation links using a traverse directive:
```html
<a traverseTo="/news/2017/happy-new-year/@@edit">Edit</a>
```

The context is obtained from a *resolver* which takes the context path (here `/news/2017/happy-new-year`) as parameter and returns the corresponding context as an object.

In many cases, we will retrieve this context from a backend, so Angular Traversal provides a basic HTTP resolver which just makes a GET using the context path and convert the resulting JSON into an object. But we can provide a custom resolver implementation easily.

The traverser will give this context object to the view component so it can be rendered.

As mentionned earlier, the view mapping is based on a *context marker* (in our example, we have `'Document'` and `'Folder'`). It is a string computed from the context object using a custom *marker* class.

For instance, if we want to associate a view according the content-type, assuming the backend JSON response contains a `type` property, our marker class would do:

```javascript
return context.type
```

And `'*'` allows to match any context.

## Usage

### Create a view component

A valid view component must have a `context` property, it must inject the `Traverser` service, and subscribe to it to get the context:

```javascript
import { Component, OnInit } from '@angular/core';
import { Traverser } from '../traverser/traverser';

@Component({
  selector: 'app-folder-edit',
  templateUrl: './folder-edit.component.html',
  styleUrls: ['./folder-edit.component.css']
})
export class FolderEditComponent implements OnInit {

  private context: any;

  constructor(private traverser: Traverser) { }

  ngOnInit() {
    this.traverser.target.subscribe(target => {
      this.context = target.context;
    });
  }

}
```

Warning: it must be declared in the app module **in both `declarations` and `entryComponents`**.

## Implement a marker

A valid marker must extend the `Marker` class and implent a `mark` method returning a string.

```javascript
import { Injectable } from '@angular/core';
import { Marker } from './traverser/marker';

@Injectable()
export class TypeMarker extends Marker {
  mark(context: any): string {
      return context['@type']
  }
}
```

## Define a resolver

A valid resolver must extend the `Resolver` class and implement a `resolve` method returning an observable.

See BasicHttpResolver as example.

## Register views

We register view using the Traverser's `addView` method.
It can be done anywhere, but our main AppComponent class seems like a good place.

```javascript
import { Component } from '@angular/core';
import { Traverser } from './traverser/traverser';
import { EditComponent } from './edit/edit.component';
import { FolderEditComponent } from './folder-edit/folder-edit.component';
import { HistoryComponent } from './history/history.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(traverser:Traverser) {
      traverser.addView('edit', 'Folder', FolderEditComponent);
      traverser.addView('edit', 'Document', EditComponent);
      traverser.addView('history', '*', HistoryComponent);
  }
}
```

## Insert the outlet and the links

To insert the veiw rendering:
```html
<traverser-outlet></traverser-outlet>
```

To create navigation links:
```html
<a traverseTo="/news/2017/happy-new-year/@@edit">Edit</a>
```

## Declare everything in the module

In `declarations` we need all our view components plus ``TraverserOutlet`` and ``TraverserLink``.

In `entryComponents`, we need all our view components.

In `providers`, we need:

- Location and a LocationStrategy,
- Traverser
- a resolver (if we use `BasicHttpResolver`, we also need the `BACKEND_BASE_URL` value),
- our custom marker.

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { HistoryComponent } from './list/list.component';
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
    HistoryComponent,
    FolderEditComponent,
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
    HistoryComponent,
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
```
