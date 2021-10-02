import { Injectable } from '@angular/core';
import { PhoneBook } from './shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor() {
    const initial_data = [
      { firstName: 'Rahul', lastName: 'Ghosh', phoneNumber: '2134287456' },
      { firstName: 'Eric', lastName: 'Elliot', phoneNumber: '2225556575' },
      { firstName: 'Steve', lastName: 'Jobs', phoneNumber: '2204546754' },
      { firstName: 'Bill', lastName: 'Gates', phoneNumber: '2345679789' },
    ];
    localStorage.setItem('userdata', JSON.stringify(initial_data));
  }

  addUser(user: PhoneBook) {
    let users = [];
    if (localStorage.getItem('userdata')) {
      users = [user, ...JSON.parse(localStorage.getItem('userdata')!)];
    } else {
      users = [user];
    }

    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      console.log(localStorage.getItem(keys[i]));
    }
    localStorage.setItem('userdata', JSON.stringify(users));
  }

  getUser(number: number) {
    return JSON.parse(localStorage.getItem('userdata')!).find(
      (user: { phoneNumber: number }) => user.phoneNumber === number
    );
  }
  checkForUniqueNumber(p: number): boolean {
    if (
      JSON.parse(localStorage.getItem('userdata')! || '[]').find(
        (user: { phoneNumber: number }) => user.phoneNumber === p
      )
    ) {
      return false;
    } else {
      return true;
    }
  }

  updateUser(user: PhoneBook, number: number) {
    let USERS = JSON.parse(localStorage.getItem('userdata')!);
    let INDEX = 0;
    USERS.forEach((user: PhoneBook, index: number) => {
      if (user.phoneNumber === number) {
        INDEX = index;
        return;
      }
    });

    USERS[INDEX] = user;

    localStorage.setItem('userdata', JSON.stringify(USERS));
  }

  deleteUser(number: number) {
    let USERS = JSON.parse(localStorage.getItem('userdata')!);
    let INDEX = 0;
    console.log(USERS);

    USERS.forEach((user: PhoneBook, index: number) => {
      if (user.phoneNumber === number) {
        INDEX = index;
        return;
      }
    });
    USERS.splice(INDEX, 1);
    console.log(USERS);
    localStorage.setItem('userdata', JSON.stringify(USERS));
  }
}
