import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AddressService} from '../address.service';
import {NgForOf} from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-window',
  templateUrl: './add-window.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrl: './add-window.component.css'
})
export class AddWindowComponent implements OnInit {
  person = {
    id: 0,
    fullName: '',
    phone: 0,
    address: '',
    city: '',
    state: '',
    zip: 0
  };

  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  states = ['New York', 'California', 'Illinois', 'Texas', 'Arizona'];

  constructor(
    private router: Router,
    private addressService: AddressService
  ) { }

  onSubmit() {
    let tempId = uuidv4();
    this.person.id = (Number(tempId) + 1);
    this.addressService.addAddress(this.person).subscribe(
      (response) => {
        console.log('Submitted:', response);
        alert('Address added successfully!');
        this.resetForm();
        this.router.navigate(['/home']).then(r => true); // Navigate to home after submission
      },
      (error) => {
        if (error.status === 201) {
          console.log("Handled: Created successful, ignoring error");
          this.navigatetohome(); // Refresh UI even if error occurs
        } else {
          console.error('Error deleting address:', error);
        }
      }
    );
  }

  resetForm() {
    this.person = {id: 0 ,fullName: '', phone: 0, address: '', city: '', state: '', zip: 0};
  }

  navigatetohome() {
    this.router.navigate(['/home']).then(r => true);
  }

  ngOnInit(): void {
  }
}


