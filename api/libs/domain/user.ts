export enum Condition {
    Unknown = "Unknown",
    Positive =  "Positive",
    Negative = "Negative",
}

export interface ConditionLog {
    condition: Condition;
    submitted: string;
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
        imported: new Date().toISOString(),
        name: name,
        currentCondition: Condition.Unknown,
        conditionLogs: []
    };
}
