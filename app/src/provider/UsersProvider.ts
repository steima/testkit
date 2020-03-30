import {Api} from "./api";
import {Condition, Contact, TestkitUser, UpdateConditionRequest} from "../domain";
import {isoDate, luxonDate} from "../helper";
import {authStore} from "../stores/authStore";
import {DateTime} from "luxon";

export class UsersProvider {

    static async getCurrentUser(): Promise<TestkitUser> {
        return Api.GET<{ userid: string, name: string, imported: string, currentCondition: Condition }>('/users/current').then((response) => {
            return mapUserResponse(response);
        }).catch((error) => {
            console.log(error);
            authStore.logout();
            throw new Error(error);
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

    static async storeSocialContact(otherUser: string, lastMetAt?: DateTime): Promise<Contact> {
        const request = {
            otherUser: otherUser,
            lastMetAt: lastMetAt || luxonDate()
        };
        return Api.POST<{ from: string, to: string, lastMetAt: string, meetingLog: string[] }>('/users/store-social-contact', request).then((response) => {
            return mapContactResponse(response);
        });
    }

}

function mapUserResponse(response: { userid: string, name: string, imported: string, currentCondition: Condition }): TestkitUser {
    return {
        userid: response.userid,
        name: response.name,
        imported: luxonDate(response.imported),
        currentCondition: response.currentCondition,
    };
}

function mapContactResponse(response: { from: string, to: string, lastMetAt: string, meetingLog: string[] }): Contact {
    return {
        from: response.from,
        to: response.to,
        lastMetAt: luxonDate(response.lastMetAt),
        meetingLog: response.meetingLog.map((d) => luxonDate(d))
    };
}
