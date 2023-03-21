import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SigninModalService } from '../../services/form-module/signup.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;
  isForgot: boolean = false;
  returnHeader: boolean = false;
  closeBtn: boolean = false;
  return: string = '';

  constructor(
    public router: Router,
    public signinService: SigninModalService,
    public storageService: StorageService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/search') {
          this.returnHeader = true;
          this.return = '/home';
        } else if (event.url === '/details') {
          this.returnHeader = true;
          this.return = '/search';
        } else if (event.url === '/info-paiement') {
          this.returnHeader = true;
          this.return = '/details';
        } else if (event.url === '/paiement') {
          this.returnHeader = true;
          this.return = '/info-paiement';
        } else if (event.url === '/signup') {
          this.closeBtn = true;
          this.return = '/signin';
        } else if (event.url === '/signin') {
          this.closeBtn = true;
          this.return = '/home';
        } else if (event.url === '/forgot') {
          this.closeBtn = true;
          this.return = '/signin';
        } else {
          this.returnHeader = false;
          this.closeBtn = false;
        }
      }
    });
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  logout() {
    this.storageService.clear();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}

  onToggle() {
    this.isMobile = true;
  }
}
