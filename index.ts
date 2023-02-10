import * as dotenv from 'dotenv';
import {Express, Request, Response} from "express";
import * as process from "process";
import {FilterEnum} from "./tracker";
import {configureInfo} from "./configure-info";

const express = require('express');
dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? 3000;
const employees: { [key in string]: number } = JSON.parse(process.env.EMPLOYEES as string) ?? [];

const values = Object.values(employees);
const keys = Object.keys(employees);


app.get('/this-week', async (_request: Request, response: Response) => {
    response.send(await configureInfo(values, keys, FilterEnum.THIS_WEEK));
})

app.get('/last-week', async (_request: Request, response: Response) => {
    response.send(await configureInfo(values, keys, FilterEnum.LAST_WEEK));
})

app.get('/last-day', async (_request: Request, response: Response) => {
    response.send(await configureInfo(values, keys, FilterEnum.LAST_DAY));
})

app.listen(port, () => console.info(`App listening on port ${port}`))
