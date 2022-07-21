import Swal from 'sweetalert2'

export const confirmSwalMixin = Swal.mixin({
  text: 'Êtes-vous sûr de vouloir effectué cette action ?',
  showDenyButton: false,
  showCancelButton: true,
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-dim btn-secondary',
  },
  buttonsStyling: false,
})

export const toastSwalMixin = Swal.mixin({
  toast: true,
  position: 'top-right',
  timer: 5000,
  showCloseButton: false,
  timerProgressBar: true,
  customClass: 'swal-width',
  showConfirmButton: false,
  didOpen: (toast) => {
    toast.addEventListener('mousehover', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export const toast = async (type, message) => {
  await toastSwalMixin.fire({
    icon: type,
    html: message,
  })
}
