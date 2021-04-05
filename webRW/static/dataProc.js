$(function () {
	$('#sendPost').on('click', function (e) {
		let jsonData = {
			uname: 'abc',
			fname: 'def',
			addr: 'pqr',
		};
		e.preventDefault();
		$.ajax({
			url: '/sendData',
			method: 'POST',
			contentType: 'application/JSON',
			data: JSON.stringify(jsonData),
			success: function (res) {
				console.log(res);
			},
		});
	});
	$('#readGet').on('click', function (e) {
		console.log('read get initialted...');
		e.preventDefault();
		$.ajax({
			url: '/readData',
			method: 'GET',
			contentType: 'application/JSON',
			success: function (res) {
				console.log(res);
			},
		});
	});
});
