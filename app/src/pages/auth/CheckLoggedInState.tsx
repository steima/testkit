import * as React from "react";
import {Redirect, RouteComponentProps} from "react-router"
import {authStore} from "../../stores/authStore";

interface CheckLoggedInStateProps extends RouteComponentProps<{}> {
}

interface CheckLoggedInStateState {

}

export class CheckLoggedInState extends React.Component<CheckLoggedInStateProps, CheckLoggedInStateState> {

    constructor(props: CheckLoggedInStateProps) {
        super(props);
    }

    render() {
        if(authStore.authenticated) {
            return (<Redirect to="/home" />);
        }else {
            return (<Redirect to="/login" />);
        }
    }

}
