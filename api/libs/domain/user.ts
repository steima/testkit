import {nowIsoString} from "../helper";

export enum Condition {
    Unknown = "Unknown",
    Positive =  "Positive",
    Negative = "Negative",
}

export interface ConditionLog {
    condition: Condition;
    submittedAt: string;
    swabTakenAt?: string;
    testResultsAt?: string;
    labName?: string;
}

export interface TestkitUser {

    userid: string;
    imported: string;
    name?: string;

    currentCondition: Condition;

    conditionLogs: ConditionLog[];

}

export function userBlueprint(userid: string, name: string): TestkitUser {
    return {
        userid: userid,
        imported: nowIsoString(),
        name: name,
        currentCondition: Condition.Unknown,
        conditionLogs: []
    };
}
