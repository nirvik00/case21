$(function () {
	$.ajax({
		url: '/allfiles',
		method: 'GET',
		contentType: 'application/JSON',
		success: function (res) {
			updateDataFromFiles(res);
		},
	});
	$('#sendPost').on('click', function (e) {
		let filename = document.getElementById('filename').value;
		if (filename === '') {
			filename = 'abcd' + parseInt(Math.random() * 1000).toString();
		}
		console.log(filename);
		let jsonData = {
			filename,
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

function updateDataFromFiles(files) {
	files.forEach((e) => {
		var o = document.createElement('option');
		o.text = e.name;
		o.value = e.filedata;
		var s = document.getElementById('filesId');
		s.appendChild(o);
	});
	updateData();
}

function updateData() {
	var e = document.getElementById('filesId');
	let c = JSON.parse(e.value);
	console.log(c);
	document.getElementById('dataFromFilesId').value = JSON.stringify(c);
}
