import { ToastModel } from '@syncfusion/ej2-notifications';

export const CLASS_TOAST = "e-toast";

const toastDefaults: ToastModel = {
  position: { X: "Right", Y: "Top" },
  showCloseButton: true,
  animation: {
    show: { effect: 'SlideRightIn', duration: 300, easing: 'ease' },
    hide: { effect: 'FadeOut', duration: 150, easing: 'ease' }
  }
}

/**
 * Define toast type defaults for a warning, success, error and notice.
 */
export const ToastType: Record<string, ToastModel> = {
  warning: {
    ...toastDefaults,
    title: 'Warning',
    cssClass: 'e-toast-warning',
    icon: 'e-warning toast-icons'
  },
  success: {
    ...toastDefaults,
    title: 'Success',
    cssClass: 'e-toast-success',
    icon: 'e-success toast-icons'
  },
  error: {
    ...toastDefaults,
    title: 'Error',
    cssClass: 'e-toast-danger',
    icon: 'e-error toast-icons'
  },
  information: {
    ...toastDefaults,
    title: 'Information',
    cssClass: 'e-toast-info',
    icon: 'e-info toast-icons'
  }
}
