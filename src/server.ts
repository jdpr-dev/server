import express from 'express';

const app = express();

app.get('/users', (request, response) => {
	console.log('gettin listagem de usuarios');
	response.json([
		{
			name: "jarvis",
			age: 35,
			sexo: "M"
		},
		{
			name: "Elena",
			age: 32,
			sexo: "F"
		},
		{
			name: "Sarahi",
			age: 10,
			sexo: "F"
		},
	]
	);
});

app.listen(3333);