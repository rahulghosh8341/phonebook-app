import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { PhoneBook } from '../shared/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css'],
})
export class PhoneBookComponent implements OnInit {
  User_data: PhoneBook[] = [];
  filter_array: PhoneBook[] = [];
  filterdata: string = '';
  sort_by: string = '';

  update_number: number = 0;

  constructor(private _service: ServicesService) {}

  ngOnInit(): void {
    this.User_data = JSON.parse(localStorage.getItem('userdata')!);
    this.filter_array = this.User_data;
  }

  filter_users = () => {
    if (this.filterdata) {
      this.filter_array = this.User_data.filter((user: PhoneBook) => {
        return (
          user.firstName.toLowerCase().indexOf(this.filterdata.toLowerCase()) >
            -1 ||
          user.lastName.toLowerCase().indexOf(this.filterdata.toLowerCase()) >
            -1 ||
          user.phoneNumber
            .toString()
            .toLowerCase()
            .indexOf(this.filterdata.toLowerCase()) > -1
        );
      });
    } else {
      this.filter_array = this.User_data;
    }
  };
  handle_delete = (p: number) => {
    console.log(p);
    let index: number = 0;
    this._service.deleteUser(p);
    this.filter_array = JSON.parse(localStorage.getItem('userdata')!);
  };

  handleSort = () => {
    if (this.sort_by === 'firstName') {
      this.filter_array = this.filter_array.sort((a, b) => {
        var string_a = a.firstName.toLocaleUpperCase().trim();
        var string_b = b.firstName.toLocaleUpperCase().trim();

        if (string_a < string_b) {
          return -1;
        }
        if (string_b < string_a) {
          return 1;
        }
        return 0;
      });
    } else if (this.sort_by === 'lastName') {
      this.filter_array = this.filter_array.sort((a, b) => {
        var string_a = a.lastName.toLocaleUpperCase().trim();
        var string_b = b.lastName.toLocaleUpperCase().trim();

        if (string_a < string_b) {
          return -1;
        }
        if (string_b < string_a) {
          return 1;
        }
        return 0;
      });
    } else {
      this.filter_array = this.filter_array.sort(
        (a, b) => a.phoneNumber - b.phoneNumber
      );
    }
  };
}
