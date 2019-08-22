import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { AccordionComponent } from './accordion/accordion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DroppableDirective } from './droppable.directive';
import { DraggableDirective } from './draggable.directive';
import { DragService } from './drag.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MapContainerComponent,
    AccordionComponent,
    DroppableDirective,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule
  ],
  providers: [
    DragService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
