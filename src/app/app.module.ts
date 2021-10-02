import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookComponent } from './phone-book/phone-book.component';
import { PhonebookListComponent } from './phonebook-list/phonebook-list.component';
import { PhonebookFormComponent } from './phonebook-form/phonebook-form.component';
import { ServicesService } from './services.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    PhoneBookComponent,
    PhonebookListComponent,
    PhonebookFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
