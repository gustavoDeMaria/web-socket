

import Moment from "moment-timezone";

export class DateTime {
    public now: Date = Moment.tz("America/Sao_Paulo").utcOffset(0, true).toDate();

    public static Now(): Date{
        return new DateTime().now
    }
}