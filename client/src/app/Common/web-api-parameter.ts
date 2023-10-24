import { ApplicationRef, ElementRef, Injector } from '@angular/core';
import { AppParamConfig } from '../app.paramconfig';

export class DBResult {
    constructor(
        public PRZZ_Status: boolean = false,
        public PRZZ_Rtnno: number = 9,
        public PRZZ_Out: string = '',
        public PRZZ_MessageNo: string = '',
        public PRZZ_Message: string = '',
        public PRZZ_ErrorNo: string = ''
    ) { }
}

export class ApplicationParam {
    Injector: Injector;
    ApplicationRef: ApplicationRef;
    AppElementRef: ElementRef;
    AppParamConfig: AppParamConfig;
}

export enum ApiUrl {
    DoLogin = 'http://localhost:3500/api/staffs/login',
    server = 'http://localhost:3500',
    GetWijmoLicense = 'dfdsfd/dfd/dfds'
}

export enum MethodName {
    GetData = 'POST',
    GetList = 'POST',
    Insert = 'PUT',
    Delete = 'DELETE',
}

export enum ReturnValue {
    CRZZ_NORMAL = 0,
    CRZZ_WARNING = 7,
    CRZZ_ERROR = 8,
}

export enum PageType {
    SUB = 'SUB',
    MAIN = 'MAIN',
    RESTAURANT = 'RESTAURANT',
    MANAGEMENT = 'MANAGEMENT',
    RECEPTIONIST = 'RECEPTIONIST'
}

export interface IDDLItem{
    sCode: string;
    sName: string;
}