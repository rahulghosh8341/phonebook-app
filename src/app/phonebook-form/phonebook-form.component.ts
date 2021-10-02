import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { PhoneBook } from '../shared/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phonebook-form',
  templateUrl: './phonebook-form.component.html',
  styleUrls: ['./phonebook-form.component.css'],
})
export class PhonebookFormComponent implements OnInit {
  id: string = '';
  function: string = '';
  number: number = 0;

  dummyuser: PhoneBook = {
    firstName: '',
    lastName: '',
    phoneNumber: 0,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _service: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.number = this.route.snapshot.params['number'];

    console.log(this.route.snapshot.params['number']);
    this.function = this.id === 'add' ? 'Add' : 'Update';

    if (this.function === 'Update') {
      this.dummyuser = this._service.getUser(this.number);
      console.log(this.dummyuser);
    }
  }

  userForm = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-z]*$')]],
    lastName: [''],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
  });

  onSubmit = () => {
    let user: PhoneBook = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      phoneNumber: this.userForm.value.phoneNumber,
    };
    if (this.function == 'Add') {
      if (this._service.checkForUniqueNumber(user.phoneNumber)) {
        this._service.addUser(user);
        Swal.fire('Added👍', 'Contact added succesfully!', 'success').then(
          (result) => {
            if (result.value) {
              this.router.navigateByUrl('');
            }
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The phone number already exists!',
        });
      }
    } else {
      this._service.updateUser(user, this.number);

      Swal.fire('Updated!', 'Contact got updated', 'success').then((result) => {
        if (result.value) {
          this.router.navigateByUrl('');
        }
      });
    }
    this.userForm.reset();
  };

  displayStyle = 'none';
}
