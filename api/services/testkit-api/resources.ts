import {Condition} from "../../libs/domain/user";

export interface UpdateConditionRequest {
    condition: Condition;
    swabTakenAt?: string;
    testResultsAt?: string;
    labName?: string;
}

export interface Meeting {
    otherUser: string;
    lastMetAt: string;
}

export enum SocialNetworkScoreResultType {
    NotEnoughConnections = "NotEnoughConnections",
    NotComputedYet = "NotComputedYet",
    CurrentResult = "CurrentResult"
}

export interface SocialNetworkScore {
    resultType: SocialNetworkScoreResultType;
    positive: number;
}

export interface LastMetRequest {
    userIds: string[];
}

export interface LastMetRecord {
    userId: string;
    lastMetAt: string;
}

export interface LastMetResponse {
    data: LastMetRecord[];
}
