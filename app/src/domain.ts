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

export interface UpdateConditionRequest {
    condition: Condition;
    swabTakenAt?: DateTime;
    testResultsAt?: DateTime;
    labName?: string;
}

export interface FacebookFriend {
    name: string,
    id: string
}

export interface FacebookFriendListPage {
    data: FacebookFriend[],
    paging: {
        cursors: {
            before: string,
            after: string
        }
    },
    summary: {
        total_count: number
    }
}

export interface Contact {
    from: string;
    to: string;
    lastMetAt: DateTime;
    meetingLog: DateTime[];
}
