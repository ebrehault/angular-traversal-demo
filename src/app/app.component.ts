import { Component } from '@angular/core';
import { Traverser } from './traverser/traverser';
import { EditComponent } from './edit/edit.component';
import { FolderEditComponent } from './folder-edit/folder-edit.component';
import { ListComponent } from './list/list.component';

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
      traverser.addView('list', '*', ListComponent);
  }
}
