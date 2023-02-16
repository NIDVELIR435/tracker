import {stringify} from "node:querystring";
import process from "process";
import * as dotenv from "dotenv";
import {JSDOM} from "jsdom";
import {getDayInfo} from "./date-handler";
import axios, {AxiosRequestConfig} from "axios";
import {isNil} from "lodash";
dotenv.config()

const Cookie = process.env.COOKIE ?? null;
const baseUrl = process.env.BASE_URL ?? null;

export enum FilterEnum {
    TODAY = 'td',
    LAST_DAY = 'ld',
    LAST_WEEK = 'lw',
    THIS_WEEK = 'w',
}

export const getTrackingInfo =  async (id: number, filter: FilterEnum) => {
    const { weekday, weekdayIndex, day, dayNames } = getDayInfo();
    const params = stringify({
        'utf8': '✓',
        set_filter: 1,
        sort :'spent_on:desc',
        'f[]': ['spent_on','user_id'],
        'op[spent_on]': filter,
        'op[user_id]': '=',
        'v[user_id][]': [id],
        'c[]': ['spent_on', 'user'],
        't[]': ['hours']
    })

    const config: AxiosRequestConfig = {
        headers: { Cookie },
    };

    const response = await axios.get<string>(`${baseUrl}?${params}`, config)

    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const trRows = document.getElementsByClassName('spent_on');

    const dates = [];
    const names: {[kei in string]: number} = {};
    for (const date1 of document.getElementsByClassName('user')) {
        const textContent = date1.textContent as string;
        if(textContent as string)
            if(isNil(names[textContent])) names[textContent] = 1
            else names[textContent] = (names[textContent] ?? 1) + 1;
    }

    const workDay = weekday <= 5;

    if(workDay) {
        for (const trElement of trRows) {
            const date = trElement.textContent;
            dates.push(date)
        }
    }

   return {
        dates,
       today: `${dayNames[weekdayIndex]}(${day})`
    }
};
