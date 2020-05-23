import { Injectable } from '@angular/core';
import { Toast, ToastModel } from '@syncfusion/ej2-notifications';
import { ToastType, CLASS_TOAST } from './constants';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  public toastInstance: Toast;

  constructor() { }

  // To create the toast component
  createToast(element: HTMLElement, model: ToastModel) {
    if (!element.classList.contains(CLASS_TOAST)) {
      // Create a toast in the DOM
      this.toastInstance = new Toast(model, element);

      // Give a breather to the user before showing the first message
      setTimeout(() => this.toastInstance.show(), 1500);
    } else {
      // Recycle an existing toast
      this.toastInstance.show(model);
    }
    return this.toastInstance;
  };

  // Show the toast component
  showSuccessToast(element: HTMLElement, model: ToastModel) {
    this.toastInstance = this.createToast(element, {
      ...ToastType.success,
      ...model
    });
  }

  // Show the toast component as a warning
  showWarningToast(element: HTMLElement, model: ToastModel) {
    this.toastInstance = this.createToast(element, {
      ...ToastType.warning,
      ...model
    });
  }

  // Show the toast component as infomration message
  showInformationToast(element: HTMLElement, model: ToastModel) {
    this.toastInstance = this.createToast(element, {
      ...ToastType.information,
      ...model
    });
  }

  // Show the toast component as an error
  showErrorToast(element: HTMLElement, model: ToastModel) {
    this.toastInstance = this.createToast(element, {
      ...ToastType.error,
      ...model
    });
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
