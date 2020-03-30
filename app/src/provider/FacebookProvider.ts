import {authStore} from "../stores/authStore";
import {Api} from "./api";
import {FacebookFriendListPage} from "../domain";

export class FacebookProvider {

    static async listFriends(limit?: number, after?: string): Promise<FacebookFriendListPage> {
        const accessToken = authStore.accessToken;
        let url = `https://graph.facebook.com/me/friends?access_token=${accessToken}`;
        if(limit) {
            url += `&limit=${limit}`;
        }
        if(after) {
            url += `&after=${after}`;
        }
        return Api.GET<{}>(url).then((r) => {
            return mapResponse(r);
        });
    }

    static async next(currentPage: FacebookFriendListPage): Promise<FacebookFriendListPage> {
        return this.listFriends(currentPage.data.length, currentPage.paging.cursors.after);
    }

}

function mapResponse(r: any): FacebookFriendListPage {
    return r as FacebookFriendListPage;
}
