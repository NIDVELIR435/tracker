import * as dotenv from 'dotenv';
import {Express, Request, Response} from "express";
import * as process from "process";
import {FilterEnum, getTrackingInfo} from "./tracker";

const express = require('express');
dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? 3000;
const employees: { [key in string]: number } = JSON.parse(process.env.EMPLOYEES as string) ?? [];
app.get('/this-week', async (_request: Request, response: Response) => {
    const values = Object.values(employees);
    const keys = Object.keys(employees);
    response.send(await Promise
        .all(values.map((value) => getTrackingInfo(value, FilterEnum.THIS_WEEK)))
        .then((result )=> {
            return result.reduce((previousValue, currentValue, currentIndex)=> {
                //@ts-expect-error
                previousValue[keys[currentIndex]] = currentValue;
                return previousValue;
            }, {} as any)
        }))
})

app.get('/last-week', async (_request: Request, response: Response) => {
    const values = Object.values(employees);
    const keys = Object.keys(employees);
    response.send(await Promise
        .all(values.map((value) => getTrackingInfo(value, FilterEnum.LAST_WEEK)))
        .then((result )=> {
            return result.reduce((previousValue, currentValue, currentIndex)=> {
                //@ts-expect-error
                previousValue[keys[currentIndex]] = currentValue;
                return previousValue;
            }, {} as any)
        }))
})

app.get('/last-day', async (_request: Request, response: Response) => {
    const values = Object.values(employees);
    const keys = Object.keys(employees);
    response.send(await Promise
        .all(values.map((value) => getTrackingInfo(value, FilterEnum.LAST_DAY)))
        .then((result )=> {
            return result.reduce((previousValue, currentValue, currentIndex)=> {
                //@ts-expect-error
                previousValue[keys[currentIndex]] = currentValue;
                return previousValue;
            }, {} as any)
        }))
})

app.listen(port, () => console.info(`App listening on port ${port}`))
