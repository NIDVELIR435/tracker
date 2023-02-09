import * as dotenv from 'dotenv';
import {Express, Request, Response} from "express";
const express = require('express');
dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? 3000;

app.get('/', (_request: Request, response: Response) => {
    response.send('Hello World!')
})

app.listen(port, () => console.info(`App listening on port ${port}`))
