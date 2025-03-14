import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService, Address } from '../address.service';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-edit-window',
  templateUrl: './edit-window.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./edit-window.component.css']
})
export class EditWindowComponent implements OnInit {
  person: Address = {
    id: 0,
    fullName: '',
    phone: 0,
    address: '',
    city: '',
    state: '',
    zip: 0
  };

  cities = ['BHOPAL', 'KUHNAU', 'JAIPUR', 'RAIPUR', 'GANDHINAGAR'];
  states = ['MADHYA PRADESH', 'UTTAR PRADESH', 'RAJASTHAN', 'CHHATTISGARH', 'GUJARAT'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getAddress(id);
    }
  }

  getAddress(id: number): void {
    this.addressService.getAddress(id).subscribe(
      (address) => {
        this.person = address;
      },
      (error) => {
        console.error('Error fetching address:', error);
      }
    );
  }

  onSubmit() {
    this.addressService.updateAddress(this.person.id.toString(), this.person).subscribe(
      (response) => {
        console.log('Submitted:', response);
        alert('Address updated successfully!');
        this.resetForm();
        this.router.navigate(['/home']).then(r => true); // Navigate to home after submission
      },
      (error) => {
        if (error.status === 200) {
          console.log("Handled: Edited successful, ignoring error");
          this.navigatetohome(); // Refresh UI even if error occurs
        } else {
          console.error('Error deleting address:', error);
        }
      }
    );
  }

  resetForm() {
    this.person = { id: 0, fullName: '', phone: 0, address: '', city: '', state: '', zip: 0 };
  }

  navigatetohome() {
    this.router.navigate(['/home']).then(r => true);
  }
}
