import { Injectable } from '@angular/core';
import { StaffService } from './staff.service';
import { Staff } from '../Common/models/staff.model';
import { Constant } from '../Common/constants';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    loggedIn = false;
    isManager = false;
    isReceptionist = false;
    isStaff = false;

    currentStaff: Staff = new Staff();

    constructor(private userService: StaffService, ) {
        const token = localStorage.getItem(Constant.TOKEN_KEY);
        if (token) {
            const staff = JSON.parse(localStorage.getItem(Constant.STAFF_KEY));
            this.setCurrentUser(staff);
        }
    }

    login(userName: string, password: string) {
        return this.userService.login(userName, password).pipe(
            map(
                res => {
                    localStorage.setItem(Constant.TOKEN_KEY, res.staff.token);
                    localStorage.setItem(Constant.STAFF_KEY, JSON.stringify(res.staff));
                    this.setCurrentUser(res.staff);
                    this.loggedIn = true;
                    console.log(res.staff);
                },
            )
        );
    }

    logout() {
        localStorage.removeItem(Constant.TOKEN_KEY);
        localStorage.removeItem(Constant.STAFF_KEY);
        this.loggedIn = false;
        this.isManager = false;
        this.isReceptionist = false;
        this.isStaff = false;
        this.currentStaff = new Staff();
    }


    setCurrentUser(staff: Staff) {
        this.loggedIn = true;
        this.currentStaff = staff;

        switch (staff.permission.code) {
            case Constant.STAFF:
                this.isStaff = true;
                break;
            case Constant.MANAGER:
                this.isManager = true;
                break;
            case Constant.RECEPTIONIST:
                this.isReceptionist = true;
                break;
            default:
                this.isStaff = true;
                break;
        }
    }
}
