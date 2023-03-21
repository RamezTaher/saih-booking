import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'sharedServices';
@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss'],
})
export class UserPopupComponent implements OnInit {
  openModal = false;
  @Input() color_class = 'text-white';
  constructor(public storageService: StorageService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.storageService.clear();
    this.router.navigateByUrl('/');
  }
}
