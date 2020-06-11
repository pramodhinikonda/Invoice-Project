import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../../../models/auth.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent {

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService
  ) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }
}
