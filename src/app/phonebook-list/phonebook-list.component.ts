import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PhoneBook } from '../shared/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phonebook-list',
  templateUrl: './phonebook-list.component.html',
  styleUrls: ['./phonebook-list.component.css'],
})
export class PhonebookListComponent implements OnInit {
  private _userdata: PhoneBook = {
    firstName: '',
    lastName: '',
    phoneNumber: 0,
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}
  @Input()
  set User(data: PhoneBook) {
    this._userdata = data;
  }
  get User(): PhoneBook {
    return this._userdata;
  }

  @Input() deleteNumber!: number;
  @Output() deletenumber: EventEmitter<number> = new EventEmitter<number>();

  onDelete(p: number): void {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able recover it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.deletenumber.emit(p);
        Swal.fire(
          'Deleted!',
          'The contact has been deleted from your phone.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Delete cancelled!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  onUpdate(p: number): void {
    Swal.fire({
      title: 'Are you sure want to update?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/users/functionupdate/update/' + p);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Update cancelled!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
