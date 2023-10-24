import { Permission } from './permission.model';

export class Staff {
    fullName?:    string;
    userName?:    string;
    email?:       string;
    phoneNumber?: string;
    permission?:  Permission;
    token?:       string;
}