# APP BASE CON API MELI + NEXT.JS + EXPRESS.JS

Base de una APP para manejar publicaciones desde una cuenta de Mercado Libre, donde se puede modificar activar, modificar precio a uno o varios productos por modelo.
Desde una web externa, creada con Next.js + Express.js usando la libreria [Mercadolibre-nodejs](https://github.com/pentagramacs/mercadolibre-nodejs) 

La app esta codeada para modificar maximo 20 publicaciones a la vez.

La idea del repositorio es una base para poder seguir codeando y agregar mas funciones con la documentacion de Meli [DOC](https://developers.mercadolibre.com.ar/es_ar/nodejs-es)

## Development server

Editar archivo .env:
PORT=3000
CLIENT_ID= DATOS CREANDO APP EN DEVELOPER MELI (APP ID)
CLIENT_SECRET= DATOS CREANDO APP EN DEVELOPER MELI (SECRET KEY)
REDIRECT_URI=http://localhost:3000
SYS_USER= (USER PARA AUTH PARA PODER LOGUEARSE)
SYS_PWD= (PASSWORD PARA AUTH PARA PODER LOGUEARSE)


- NPM INSTALL

## ENTORNO DEV
- NPM RUN DEV

## ENTORNO PRODUC
si estas en windows modificar el package.json de start por:
		"start": "cross-env NODE_ENV=production node server/ssr-server.js -p $PORT"

- NPM RUN BUILD
- NPM RUN START

## DEPLOY HEROKU

Crear app en heroku, y hacer deploy, y editar el archivo middlewares/tokens.js
En la linea 22 cambiar por:
const redirect_uri = REDIRECT_URI + req.baseUrl + 'api/auth';

para volver a trabajar en forma local, volver como estaba:
const redirect_uri = REDIRECT_URI + req.baseUrl + req.path;

Agregar Variables de entorno o Config Vars en settings de heroku:

O por comandos:
- heroku config:set CLIENT_ID= API ID
- heroku config:set CLIENT_SECRET= CLIENT KEY
- heroku config:set REDIRECT_URI=https://xxxx.herokuapp.com/api/auth
En las x el nombre q te da heroku, de la url.
- heroku config:set SYS_USER=(USER PARA AUTH PARA PODER LOGUEARSE)
- heroku config:set SYS_PWD=(PASSWORD PARA AUTH PARA PODER LOGUEARSE)

## MERCADO LIBRE DEVELOPER
[ML DEV](https://developers.mercadolibre.com.ar/)

Editar en la APP 

Modificar la url de Redirect URI *
- PARA DEV LOCAL
http://localhost:3000/api/auth

- PARA HEROKU
https://xxxx.herokuapp.com/api/auth
En las x el nombre q te da heroku, de la url.

Para Notificaciones callbacks URL no hace falta.

## Demo (Video)
[![Demo CountPages alpha](https://j.gifs.com/0YpqyX.gif)](https://www.youtube.com/watch?v=-MdFxTf0IIk)