import {FilterEnum, getTrackingInfo} from "./tracker";

export const configureInfo = (values: number[], keys: string[], filter: FilterEnum) => Promise
    .all(values.map((value) => getTrackingInfo(value, filter)))
    .then((result) => {
        return result.reduce((previousValue, currentValue, currentIndex) => {
            previousValue[keys[currentIndex] as string] = currentValue;
            return previousValue;
        }, {} as { [key in string]: { dates: Array<(string | null)>, today: string } })
    })
