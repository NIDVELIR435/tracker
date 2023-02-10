import {DateTime, DayNumbers, Info, WeekdayNumbers} from "luxon";

export const getDayInfo = (): { weekday: WeekdayNumbers, weekdayIndex: number, day: DayNumbers, dayNames: string[] } => {
    const now = DateTime.now();
    const dayNames = Info.weekdays();

    const weekday = now.weekday;
    const weekdayIndex = weekday - 1;
    const day = now.day;

    return {weekday, weekdayIndex, day, dayNames};
}
