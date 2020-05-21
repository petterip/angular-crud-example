import { Injectable } from '@angular/core';
import { Toast, ToastModel, ToastPosition } from '@syncfusion/ej2-notifications';  // Import the toast component
import { ToastType } from './constants';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  public toastInstance: Toast;

  constructor() { }

  // To create the toast component
  createToast(element: HTMLElement, model: ToastModel) {
    if (!element.classList.contains('e-toast')) {
      this.toastInstance = new Toast(model, element);
    }
    return this.toastInstance;
  };

  // Show the toast component
  showSuccessToast(element: HTMLElement, model: ToastModel) {
    this.toastInstance = this.createToast(element, {
      ...ToastType.success,
      ...model
    });
    this.toastInstance.show();
  }

  // Show the toast component as warning
  showWarningToast(element: HTMLElement, model: ToastModel) {
    this.toastInstance = this.createToast(element, {
      ...ToastType.warning,
      ...model
    });
    this.toastInstance.show();
  }

  // Show the toast component as error
  showErrorToast(element: HTMLElement, model: ToastModel) {
    this.toastInstance = this.createToast(element, {
      ...ToastType.error,
      ...model
    });
    this.toastInstance.show();
  }

  // Hide the toast component
  hideToast() {
    if (this.toastInstance) {
      this.toastInstance.hide();
    }
  }

  // Hide all toast component instances
  hideToastAll() {
    if (this.toastInstance) {
      this.toastInstance.hide('All');
    }
  }
}
