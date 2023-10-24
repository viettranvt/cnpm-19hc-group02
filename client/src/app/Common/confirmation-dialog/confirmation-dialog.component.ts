import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() messageDetail: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() dialogType: number;
  @Input() lineVal: number;

  messArr: string[];
  messDetailArr: string[];
  alertClass: string;
  iconClass: string;

  constructor(
    private _ActiveModal: NgbActiveModal,
    private _ElementRef: ElementRef
  ) { }

  ngOnInit() {
    const modalHeader = this._ElementRef.nativeElement.querySelector('#modalHeader');
    const btnOK = this._ElementRef.nativeElement.querySelector('#btnOK');

    if (this.dialogType === DialogType.ERROR) {
      modalHeader.classList.add('modal-header-danger');
    } else if (this.dialogType === DialogType.SUSSCESS) {
      modalHeader.classList.add('modal-header-success');
    } else {
      modalHeader.classList.add('modal-header-info');
    }

    if (this.message !== '') {
      this.messArr = this.message.split('<br>');
    }

    if (this.messageDetail !== '') {
      this.messDetailArr = this.messageDetail.split('<br>');
    }

    btnOK.focus();
  }

  public decline() {
    this._ActiveModal.close(false);
  }

  public accept() {
    this._ActiveModal.close(true);
  }

  public dismiss() {
    this._ActiveModal.dismiss();
  }

  public isShowCancel(): boolean {
    return (this.dialogType === DialogType.CONFIRMATION);
  }

}

export enum DialogType {
  ERROR = 1,
  SUSSCESS = 2,
  CONFIRMATION = 3,
  ALERT_INFO = 4,
  ALERT_WARNING = 5
}

export enum AlertType {
  INFO = 'Info',
  WARNING = 'Warning'
}