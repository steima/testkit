import {authStore} from "../stores/authStore";
import {Api} from "./api";
import {FacebookFriendListPage} from "../domain";

export class FacebookProvider {

    static async listFriends(): Promise<FacebookFriendListPage> {
        const accessToken = authStore.accessToken;
        const url = `https://graph.facebook.com/me/friends?access_token=${accessToken}`;
        return Api.GET<{}>(url).then((r) => {
            return mapResponse(r);
        });
    }

}

function mapResponse(r: any): FacebookFriendListPage {
    return r as FacebookFriendListPage;
}
