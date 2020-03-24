import {stage, Stage} from "../stage";
import {authStore} from "../stores/authStore";

interface ErrorMessage {
    message?: string;
}

const BaseHeaders = {
    'Content-Type': 'application/json'
};

export class Api {

    static serviceUrl() {
        const currentStage: Stage = stage();
        return `https://api-${currentStage}.testkit.link`;
    }

    static buildHeaders() {
        if(authStore.authenticated) {
            return {
                'Authorization': `Bearer ${authStore.accessToken}`,
                ... BaseHeaders
            };
        }else {
            return BaseHeaders;
        }
    }

    static handle401s(response: Response) {
        if(response.status == 401) {
            this.logoutUser('Unauthorized Request, trying to send user back to login');
        }
    }

    static async handleError(response: Response): Promise<Error> {
        console.error(response);
        if(response.body) {
            console.error(await response.text());
        }
        return new Error(`Failed to fetch resource, server returns status ${response.status}.`);
    }

    static logoutUser(message: string) {
        console.error(message);
        authStore.logout();
    }

    static buildUrl(path: string) {
        if(!path.startsWith('/')) {
            path = '/' + path;
        }
        return `${Api.serviceUrl()}${path}`;
    }

    static async GET<T>(path: string): Promise<T> {
        const response = await fetch(Api.buildUrl(path), {
            method: 'GET',
            headers: Api.buildHeaders()
        });
        if(response.ok) {
            return await response.json() as T;
        }
        this.handle401s(response);
        throw await this.handleError(response);
    }

    static async PUT<T>(path: string, object: any): Promise<T> {
        const response = await fetch(Api.buildUrl(path), {
            method: 'PUT',
            headers: Api.buildHeaders(),
            body: JSON.stringify(object)
        });
        if(response.ok) {
            return await response.json() as T;
        }
        this.handle401s(response);
        throw await this.handleError(response);
    }

    static async POST<T>(path: string, object: any): Promise<T> {
        const response = await fetch(Api.buildUrl(path), {
            method: 'POST',
            headers: Api.buildHeaders(),
            body: JSON.stringify(object)
        });
        if(response.ok) {
            return await response.json() as T;
        }
        this.handle401s(response);
        throw await this.handleError(response);
    }


    static async DELETE<T>(path: string): Promise<T> {
        const response = await fetch(Api.buildUrl(path), {
            method: 'POST',
            headers: Api.buildHeaders()
        });
        if(response.ok) {
            return await response.json() as T;
        }
        this.handle401s(response);
        throw await this.handleError(response);
    }

}
