import {Api} from "./api";
import {Condition, TestkitUser} from "../domain";
import {luxonDate} from "../helper";

export class UsersProvider {

    static async getCurrentUser(): Promise<TestkitUser> {
        return Api.GET<{ userid: string, name: string, imported: string, currentCondition: Condition }>('/users/current').then((response) => {
            return {
                userid: response.userid,
                name: response.name,
                imported: luxonDate(response.imported),
                currentCondition: response.currentCondition,
            };
        });
    }

}
