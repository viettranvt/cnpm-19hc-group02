import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent, DialogType, AlertType } from './confirmation-dialog.component'

@Injectable()

export class ConfirmationDialogService {
  constructor(private _modalService: NgbModal) { }

  public showError(
    message: string,
    itemErrName: string,
    useSizeDefault: boolean = true,
    dialogSize: 'sm' | 'lg' = 'sm',
    btnOkText: string = 'OK'
  ): Promise<boolean> {
    return this.getModal(
      'LỖI',
      this.getMessage(message),
      itemErrName,
      useSizeDefault,
      DialogType.ERROR,
      btnOkText,
      '',
      dialogSize
    ).result;
  }

  public showSuccess(
    message: string,
    useSizeDefault: boolean = true,
    dialogSize: 'sm' | 'lg' = 'sm',
    btnOkText: string = 'OK'
  ): Promise<boolean> {
    return this.getModal(
      'THÀNH CÔNG',
      this.getMessage(message),
      '',
      useSizeDefault,
      DialogType.SUSSCESS,
      btnOkText,
      '',
      dialogSize
    ).result;
  }

  public showConfirm(
    message: string,
    useSizeDefault: boolean = true,
    dialogSize: 'sm' | 'lg' = 'sm',
    btnOkText: string = 'YES',
    btnCancelText: string = 'NO'
  ): Promise<boolean> {
    return this.getModal(
      'XÁC NHẬN',
      this.getMessage(message),
      '',
      useSizeDefault,
      DialogType.CONFIRMATION,
      btnOkText,
      btnCancelText,
      dialogSize
    ).result;
  }

  public showAlert(
    message: string,
    itemErrName: string,
    alertType: 'Info' | 'Warning' = 'Info',
    useSizeDefault: boolean = true,
    alertPosition: string = '',
    dialogSize: 'sm' | 'lg' = 'sm',
    btnOkText: string = 'OK'
  ): Promise<boolean> {
    return this.getModal(
      (alertType === AlertType.INFO ? 'THÔNG TIN' : 'CẢNH BÁO!'),
      this.getMessage(message),
      itemErrName,
      useSizeDefault,
      (alertType === AlertType.INFO ? DialogType.ALERT_INFO : DialogType.ALERT_WARNING),
      btnOkText,
      '',
      dialogSize
    ).result;
  }

  private getModal(
    title: string,
    message: string,
    itemErrName: string = '',
    useSizeDefault: boolean,
    dialogType: number = DialogType.ALERT_INFO,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'sm'
  ): NgbModalRef {
    let modalRef: NgbModalRef;
    let messageDetail = '';
    let lineValue = '';
    let dialogOption: any;

    let messageArray: string[] = [];
    let maxlen = 0;
    let modalWidth = '';

    if (message !== undefined && message !== '') {
      messageArray = message.split('<br>');
      messageArray.forEach(str => maxlen = maxlen < str.length ? str.length : maxlen);
    }

    if (maxlen <= 16) {
      modalWidth = 'esc-modal-400';
      lineValue = '-------------------------------------------------';
    } else if (maxlen <= 19) {
      modalWidth = 'esc-modal-450';
      lineValue = '-----------------------------------------------------------';
    } else if (maxlen <= 22) {
      modalWidth = 'esc-modal-500';
      lineValue = '----------------------------------------------------------------------';
    } else if (maxlen <= 25) {
      modalWidth = 'esc-modal-550';
      lineValue = '---------------------------------------------------------------------------------';
    } else {
      modalWidth = 'esc-modal-600';
      lineValue = '--------------------------------------------------------------------------------------------';
    }

    dialogOption = {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'esc-dialog ' + modalWidth,
      backdropClass: 'esc-modal-backdrop'
    }

    if (itemErrName !== '') {
      messageDetail = itemErrName;
    }

    modalRef = this._modalService.open(ConfirmationDialogComponent, dialogOption);

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.messageDetail = messageDetail;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.dialogType = dialogType;
    modalRef.componentInstance.lineValue = lineValue;

    return modalRef;

  }

  getMessage(errCode: string) {
    switch (errCode) {
      case '0005':
        return 'Vui lòng nhập dữ liệu';
      case '200':
        return 'Thao tác được chấp nhận';
      case '400':
        return 'Thao tác không thành công';
      case '401':
        return 'Thao tác không hợp lệ';
      case '404':
        return 'Page not found'
      default:
        return errCode;
    }
  }
}