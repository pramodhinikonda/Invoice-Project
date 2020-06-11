import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ProfileService } from './profile.service';
import { PersistanceService } from '../../../services/persistance.service';
import { IOrganization, IUser, UserInfo, User, UserStatus } from 'src/app/shared/models/auth.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private readonly userInfo: string;
    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient, private persistance: PersistanceService, private profileService: ProfileService) {
        this.userInfo = 'invoice:user';
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string) {
        //return this.http.post<UserStatus>(`${environment.apiEndpoint}Login`, { username, password })
        //  .pipe(map(user => {
        //    // login successful if there's a jwt token in the response
        //    if (user.UserDetails) {
        //      this.activateUser(user.UserDetails);
        //    }
        //    else // Need to Remove after login implementation
        //      this.activateUser({ Email: 'sivanraj@live.in', FullName: 'Sivanraj', ID: '1', IsEmailVerified: 'true', IsMobileVerified: 'true', Mobile: '9578044569', Password: '', RoleID: 'SuperUser', Status: '' });

        //    return user;
        //  }));
        this.activateUser({ Email: 'sivanraj@live.in', FullName: 'Sivanraj', ID: '1', IsEmailVerified: 'true', IsMobileVerified: 'true', Mobile: '9578044569', Password: '', RoleID: 'SuperUser', Status: '' });
    }

    async activateUser(profile: User) {
        if (profile) {
            this.currentUserSubject.next(profile);
            let user = await this.profileService.getByEmail(profile.Email).toPromise();
            if (user) {
                let organizations = await this.profileService.getOrganizations(user.userID).toPromise();
                if (organizations && organizations.length) {
                    let organization = organizations.find(x => x.isDefaultOrganization === true);
                    if (!organization)
                        organization = organizations[0];
                    this.setAuth(user, organization);
                }
            }
        }
    }

    setAuth(user: IUser, organization: IOrganization): void {
        let auth: UserInfo = {
            ClientID: user.clientID,
            UserID: user.userID,
            OrganizationID: organization.organizationID
        }
        this.persistance.set(this.userInfo, auth);
    }

    getAuth(): string {
        let token: string = '';
        let authData: any = this.persistance.get(this.userInfo);

        if (authData)
            token = btoa(JSON.stringify(authData));

        return token
    }

    async logout() {
        // Temp Code
        this.currentUserSubject.next(null);
        this.persistance.deleteAll([this.userInfo]);
    }
}
