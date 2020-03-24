import {ReactFacebookLoginInfo} from "react-facebook-login";
import {computed} from "mobx";
import {uiStateStore} from "./uiStateStore";

const TOKEN_NAME = "testkit-auth-token";

interface LoginToken {
    facebookLoginInfo?: ReactFacebookLoginInfo;
}

class AuthStore {

    async processToken(facebookLoginInfo: ReactFacebookLoginInfo): Promise<void> {
        const token: LoginToken = {
            facebookLoginInfo: facebookLoginInfo
        };
        localStorage.setItem(TOKEN_NAME, JSON.stringify(token));
    }

    get token(): LoginToken | undefined {
        const stringItem = localStorage.getItem(TOKEN_NAME);
        if(stringItem) {
            return JSON.parse(stringItem);
        }
        return undefined;
    }

    @computed
    get authenticated(): boolean {
        return this.token != undefined;
    }

    @computed
    get name(): string | undefined {
        if(this.authenticated) {
            const token = this.token;
            if(token && token.facebookLoginInfo && token.facebookLoginInfo.name) {
                return token.facebookLoginInfo.name;
            }
        }
        return undefined;
    }

    @computed
    get accessToken(): string {
        if(this.authenticated) {
            const token = this.token;
            if(token && token.facebookLoginInfo && token.facebookLoginInfo.accessToken) {
                return token.facebookLoginInfo.accessToken;
            }
        }
        throw new Error('Not authenticated');
    }

    logout() {
        localStorage.removeItem(TOKEN_NAME);
        uiStateStore.navigate('/');
    }
}

export const authStore = new AuthStore();
