import {usersRepository} from "../repositories/usersRepository";
import {ConditionLog, TestkitUser, userBlueprint} from "../domain/user";
import {AuthInfo} from "./authService";
import {httpGet} from "./httpsService";
import {UpdateConditionRequest} from "../../services/testkit-api/resources";
import {nowIsoString} from "../helper";

class UsersService {

    public async getUser(authInfo: AuthInfo): Promise<TestkitUser> {
        if(authInfo.facebookUserId == undefined) {
            throw new Error('facebookUserId is undefined');
        }
        return await usersRepository.get(authInfo.facebookUserId);
    }

    async importUser(authInfo: AuthInfo): Promise<TestkitUser> {
        const url = `https://graph.facebook.com/${authInfo.facebookUserId}?fields=name&access_token=${authInfo.token}`;
        return await httpGet<{ id: string, name: string }>(url).then((r) => {
            return this.createUser(r.id, r.name);
        });
    }

    public async createUser(userId: string, name: string): Promise<TestkitUser> {
        const user = userBlueprint(userId, name);
        return usersRepository.put(user);
    }

    public async updateCondition(userid: string, request: UpdateConditionRequest): Promise<TestkitUser> {
        const user = await usersRepository.get(userid);
        user.currentCondition = request.condition;
        const conditionLog: ConditionLog = {
            condition: request.condition,
            submittedAt: nowIsoString(),
            swabTakenAt: request.swabTakenAt,
            testResultsAt: request.testResultsAt,
            labName: request.labName
        };
        if(user.conditionLogs == undefined) {
            user.conditionLogs = [];
        }
        user.conditionLogs.push(conditionLog);
        return usersRepository.put(user);
    }

    async deleteUser(userid: string): Promise<TestkitUser> {
        const user = await usersRepository.get(userid);
        await usersRepository.remove(userid);
        return user;
    }

}

export const usersService = new UsersService();
