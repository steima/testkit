import {action, computed, observable} from "mobx";
import * as H from 'history';

class UiStateStore {

    readonly history: H.History;
    @observable currentError?: string;

    constructor() {
        this.history = H.createBrowserHistory();
    }

    @action resetError() {
        this.currentError = undefined;
    }

    @action navigate(path: string) {
        this.history.push(path);
    }

}

export const uiStateStore = new UiStateStore();
