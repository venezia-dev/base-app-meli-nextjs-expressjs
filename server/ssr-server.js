const express = require('express');
const next = require('next');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const session = require('cookie-session');
const meli = require('mercadolibre');
const { validateToken } = require('../middlewares/tokens');
const { meli_get } = require('../utils/index');

const { CLIENT_ID, CLIENT_SECRET, SYS_USER, SYS_PWD } = process.env;

app.prepare()
	.then(() => {
		const server = express();
		
		server.use(express.urlencoded({ extended: false })); //para formularios html
		server.use(cors());

		server.use(bodyParser.json()); //Make sure u have added this line

		server.use(helmet());
		server.use(
			session({
				name: 'session',
				keys: ['bd7126f457237e4aab0d47124ce4aac2', '9009def68579d15d871a5bf346422839'],
				cookie: {
					httpOnly: true,
					expires: new Date(Date.now() + 60 * 60 * 1000 * 6) // 6 horas
				}
			})
		);

		server.get('/api', (req, res) => {
			// TODO
			console.log('Hello! Do you want to use the API?');
			res.send('kursinfo');
		});

		// Login
		server.post('/api/login', (req, res) => {
			console.log(req.body);
			if (req.body.user === SYS_USER && req.body.password === SYS_PWD) {
				console.log(req.session.user);
				req.session.user = true;
				res.redirect('auth');
			} else {
				console.log('error de cuenta');
				const err = 'Error de cuenta, Intentar de nuevo!';
				
				res.redirect('/erroruser');
			}
		});

		// Auth
		server.get('/api/auth', validateToken, async (req, res) => {
			console.log('arranco server api/auth');
			try {
				res.redirect('/home');
			} catch (err) {
				console.log('Something went wroeeng', err);
				res.status(500).send(`Error! ${err}`);
			}
		});

		// Get User (Obtener usuario de meli)
		server.get('/api/user', validateToken, async (req, res) => {
			try {
				const meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET, res.locals.access_token);
				// Datos del usuario
				const user = await meli_get(meliObject, '/users/me');
				res.status(200).send(user);
			} catch (err) {
				console.log('no se encuentra el usuario');
				res.status(500).send('Error de conexion!');
			}
		});

		// Get All Products
		server.get('/api/products', validateToken, async (req, res) => {
			try {
				const meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET, res.locals.access_token);
				// Datos del usuario
				const user = await meli_get(meliObject, '/users/me');
				// Busca los IDS de las publicaciones del usuario
				meliObject.get('users/' + user.id + '/items/search', function (err, response) {
					if (err) {
						res.status(500).send(`Error! ${err}`);
					} else {
						console.log(response.results);
						// Buscar info de los productos del usuario de ml
						meliObject.get(
							'items',
							{
								ids: response.results
							},
							function (err, response) {
								if (err) {
									res.status(500).send(`Error! ${err}`);
								} else {
									//console.log("estamos aca en el server");
									//console.log(response);
									console.log(response);
									res.status(200).send(response);
								}
							}
						);
					}
				});
			} catch (err) {
				console.log('Something went wroeeng', err);
				res.status(500).send(`Error! ${err}`);
			}
		});

		// Increse All Products
		server.post('/api/increaseall', validateToken, async (req, res) => {
			// Lo que llega del frontend
			console.log(req.body);
			const products = req.body;
			try {
				const meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET, res.locals.access_token);
				for (let i = 0; i < products.length; i++) {
					let vari = products[i].variations;
					let variations = [];
					// Recorre cada variacion de cada producto y arma un json para actualizar
					for (let i = 0; i < vari.length; i++) {
						const newVari = {
							id: vari[i].id,
							price: vari[i].price
						};
						variations.push(newVari);
					}
					let id = products[i].id;
					let jsonVari = {
						variations
					};
					setTimeout(() => {
						// Actualizar Publicaciones
						meliObject.put('/items/' + id, jsonVari, (err, response) => {
							if (err) {
								console.log('no hay internet');
								res.status(500).send(`Error! ${err}`);
							} else {
								console.log(response);
							}
						});
					}, 300);
				}
				setTimeout(() => {
					res.status(200).send('Excelente el aumento');
				}, 800);
			} catch (err) {
				console.log('Something went wrong', err);
				res.status(500).send(`Error! ${err}`);
			}
		});

		// Increse 1 Product
		server.post('/api/increase', validateToken, async (req, res) => {
			// Lo que llega del frontend
			console.log(req.body);
			const products = req.body;
			try {
				const meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET, res.locals.access_token);
					let vari = products.variations;
					let variations = [];
					// Recorre cada variacion de cada producto y arma un json para actualizar
					for (let i = 0; i < vari.length; i++) {
						const newVari = {
							id: vari[i].id,
							price: products.newprice
						};
						variations.push(newVari);
					}
					let id = products.id;
					let jsonVari = {
						variations
					};
					setTimeout(() => {
						// Actualizar Publicaciones
						meliObject.put('/items/' + id, jsonVari, (err, response) => {
							if (err) {
								console.log('no hay internet');
								res.status(500).send(`Error! ${err}`);
							} else {
								console.log(response);
							}
						});
					}, 300);
				setTimeout(() => {
					res.status(200).send('Excelente el aumento');
				}, 800);
			} catch (err) {
				console.log('Something went wrong', err);
				res.status(500).send(`Error! ${err}`);
			}
		})
		
		// Change Status Product
		server.post('/api/status', validateToken, async (req, res) => {
			const { id, status } = req.body;
			try {
				const meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET, res.locals.access_token);
				console.log(meliObject.refreshAccessToken);
				const body = {
					status: status
				};
				meliObject.put('/items/' + id, body, null, (err, response) => {
					if (err) {
						throw err;
					} else {
						console.log(response);
						res.redirect('/home');
					}
				});
			} catch (err) {
				console.log('Something went wrong', err);
				res.status(500).send(`Error! ${err}`);
			}
		});

		// Error si entran a otra pagina sin ruta
		server.get('*', (req, res) => {
			return handle(req, res);
		});

		const port = process.env.PORT;
		server.listen(port, (err) => {
			if (err) throw err;
			console.log('> Ready on http://localhost:' + port);
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
