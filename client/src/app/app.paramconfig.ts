import {Injectable} from '@angular/core'

@Injectable()
export class AppParamConfig {
    Application: any;
    urlHistoryMap: Map<string, string>;
    paramMap: Map<string, any[]>;
    pageTitle: string;
    pageTitleStack: Map<string, string>;
    userId: string;
    userNm: string;
    userpass: string;
    permission: string;
    isSignIn: boolean;

    constructor() {}
}