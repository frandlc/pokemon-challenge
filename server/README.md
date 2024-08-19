# Pokemon Battle Server

## Project Info

Hola buen día a quien sea que esté leyendo esto
Mi nombre es Francisco Agustín De La Colina, este es el proyecto de Pokemon que desarrolle para aplicar al puesto de Developer ajustandose a los requisitos del challenge que me fue enviado, me encantaría tener la oportunidad de charlar con ustedes.

El proyecto está preparado utilizando NestJS como BackEnd Framework, TypeORM como ORM para el manejo de entidades de la database y sqlite3 como SQL DB engine. La migración para la creación de la DB está realizada, esta incluye también la populación de esta desde el archivo pokemon.json.

Hi, I hope you are having a great day
I'm Francisco Agustín De La Colina, this is the Pokemon project that i made to apply to the developer job. If anyone has a question about this please contact me in LinkedIn that i would love to give you answers and a little chat.

The project it's made with NestJS as a BackEnd Framework, TypeORM as a ORM for the management of repositories and entities of the database and sqlite3 as a SQL database engine. The migrations are ready for running to create the database and to populate it with the pokemon.json file.

## Some notes

Este proyecto fue muy interesante en esta parte del back ya que estaba buscando expandir mis conocimientos NestJS, siento que todavía me queda camino para seguir aprendiendo good practices y distintas formas de hacer más escalable el código. Este proyecto en particular no estaría listo todavía para producción por distintos hechos como el manejo de errores que no está armado de buena manera

This project was fun in the backend side because i am looking to expand my knowledge in NestJS, there is a lot of room for improvement in good practices and better patterns. This project isn't ready to production yet for things like the Error Handling that isn't ready.

## Installation

```bash
$ npm install
```

## DB setup and seed

```bash
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
