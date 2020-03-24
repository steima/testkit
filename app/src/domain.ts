import {DateTime} from "luxon";

export enum Condition {
    Unknown = "Unknown",
    Positive =  "Positive",
    Negative = "Negative",
}

export interface ConditionLog {
    condition: Condition,
    submitted: DateTime
}

export interface TestkitUser {

    userid: string;
    imported: DateTime;
    name?: string;

    currentCondition: Condition;

}
