const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;

app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static('./public'));

const session = {};

app.get('/', (req,res) => {
	const sid = req.cookies.sid;
	if (!sid || !session[sid]) {
		res.send(`
			<form action="/login" typeof="post">
				<input name="username">
				<button>login</button>
			</form>
		`);
		return;
	}
	res.send(`You are logged in as ${session[sid].username}`);
});

app.get('/login', (req, res) => {
	const username = req.query.username;
	if (!username || username === 'dog') {
		res.status(403).send('this is a bad message');
		return;
	}
	const sid = uuidv4();
	res.cookie('sid', sid);
	session[sid] = {
		username,
	}
	res.redirect('/');
})


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
