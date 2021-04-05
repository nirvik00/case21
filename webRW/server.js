const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/readData', (req, res) => {
	fs.readFile(
		path.join(__dirname, '/static/read_me.json'),
		'utf8',
		(err, data) => {
			if (err) {
				console.error(err);
				return JSON.stringify({ msg: 'no data' });
			}
			console.log(data);
			res.send({ data: data });
		}
	);
});

app.post('/sendData', (req, res) => {
	let data = req.body;
	let write_data = JSON.stringify(req.body);
	fs.writeFile(
		path.join(__dirname, '/static/write_me.json'),
		write_data,
		(err) => {
			console.log('errors', err);
		}
	);
	console.log(write_data);
	res.send({ 'success write to file': write_data });
});

app.use(express.static(path.join(__dirname, '/static')));
app.get('/', (req, res) => {
	res.sendFile('/index.html');
});

const port = 5200;
app.listen(port, () => console.log('server started on port ' + port));
