import {Api} from "./api";
import {Condition, TestkitUser, UpdateConditionRequest} from "../domain";
import {isoDate, luxonDate} from "../helper";

export class UsersProvider {

    static async getCurrentUser(): Promise<TestkitUser> {
        return Api.GET<{ userid: string, name: string, imported: string, currentCondition: Condition }>('/users/current').then((response) => {
            return mapUserResponse(response);
        });
    }

    static async updateCondition(updateConditionRequest: UpdateConditionRequest): Promise<TestkitUser> {
        const request = {
            condition: updateConditionRequest.condition,
            swabTakenAt: isoDate(updateConditionRequest.swabTakenAt),
            testResultsAt: isoDate(updateConditionRequest.testResultsAt),
            labName: updateConditionRequest.labName
        };
        return Api.POST<{ userid: string, name: string, imported: string, currentCondition: Condition }>('/users/update-condition', request).then((response) => {
            return mapUserResponse(response);
        });
    }

}

function mapUserResponse(response: { userid: string, name: string, imported: string, currentCondition: Condition }) {
    return {
        userid: response.userid,
        name: response.name,
        imported: luxonDate(response.imported),
        currentCondition: response.currentCondition,
    };
}
