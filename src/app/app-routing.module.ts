import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneBookComponent } from './phone-book/phone-book.component';
import { PhonebookFormComponent } from './phonebook-form/phonebook-form.component';

const routes: Routes = [
  { path: 'users/functionadd/:id', component: PhonebookFormComponent },
  { path: '', component: PhoneBookComponent },
  {
    path: 'users/functionupdate/:id/:number',
    component: PhonebookFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
