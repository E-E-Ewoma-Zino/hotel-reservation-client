const swalWithBootstrapButtons = Swal.mixin({
	customClass: {
		confirmButton: 'btn btn-primary mx-1',
		cancelButton: 'btn btn-gray mx-1'
	},
	buttonsStyling: false
});

window.swalWithBootstrapButtons = swalWithBootstrapButtons;