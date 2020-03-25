import {Condition} from "../../libs/domain/user";

export interface UpdateConditionRequest {
    condition: Condition;
    swabTakenAt?: string;
    testResultsAt?: string;
    labName?: string;
}
