const swalWithBootstrapButtons = Swal.mixin({
	customClass: {
		confirmButton: 'btn btn-primary',
		cancelButton: 'btn btn-gray'
	},
	buttonsStyling: false
});

window.swalWithBootstrapButtons = swalWithBootstrapButtons;