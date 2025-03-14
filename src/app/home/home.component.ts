import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AddressService, Address } from '../address.service';
import { KeyValuePipe, NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    NgForOf,
    KeyValuePipe,
  ]
})
export class HomeComponent implements OnInit {
  addresses: Map<number, Address> = new Map();
  deleteUrl: string = './assets/delete.svg';
  editUrl: string = './assets/edit.svg';

  constructor(
    private addressService: AddressService,
    private router: Router,
    private cdr: ChangeDetectorRef  // ✅ Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  navigateToAddAddress(): void {
    this.router.navigate(['/add-address']);
  }

  navigateToEditAddress(id: number): void {
    this.router.navigate(['/edit-address', id]);
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe(data => {
      this.addresses = new Map();
      data.forEach((address: Address) => {
        this.addresses.set(Number(address.id), address);
      });
      this.cdr.detectChanges(); // ✅ Force UI to update
    }, error => {
      console.error('Error loading addresses:', error);
    });
  }

  deleteAddress(id: number): void {
    this.addressService.deleteAddress(id).subscribe(
      () => {
        console.log("Deleted successfully");
        this.loadAddresses(); // Refresh UI
      },
      (error) => {
        if (error.status === 200) {
          console.log("Handled: Delete successful, ignoring error");
          this.loadAddresses(); // Refresh UI even if error occurs
        } else {
          console.error('Error deleting address:', error);
        }
      }
    );
  }

}
