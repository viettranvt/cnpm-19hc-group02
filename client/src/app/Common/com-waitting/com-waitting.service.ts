import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ComWaittingService {
  private _BackDrop: any;
  private _Watting: any;

  constructor() { }

  public show(elementRef: ElementRef) {
    if (elementRef) {
      this._BackDrop = elementRef.nativeElement.querySelector('#backdrop');
      this._Watting = elementRef.nativeElement.querySelector('#waitting');
    }
    if (this._Watting && this._BackDrop) {
      this._BackDrop.classList.add('waitting-show');
      this._Watting.classList.add('waitting-show');
    }
  }

  public hide() {
    if (this._Watting && this._BackDrop) {
      this._BackDrop.classList.remove('waitting-show');
      this._Watting.classList.remove('waitting-show');
      this._BackDrop = null;
      this._Watting = null;
    }
  }

  public isShow(): boolean {
    return (this._BackDrop || this._Watting) ? true : false;
  }
}