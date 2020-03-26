import * as React from "react";
import {RouteComponentProps} from "react-router"
import {authStore} from "../../stores/authStore";
import {Box, CircularProgress, Container, Paper} from "@material-ui/core";
import FacebookLogin, {ReactFacebookLoginInfo} from "react-facebook-login";
import {uiStateStore} from "../../stores/uiStateStore";

interface LoginProps extends RouteComponentProps<{}> {
}

interface LoginState {
    processing: boolean
}

interface ReactFacebookResponse extends ReactFacebookLoginInfo {
    status?: string;
}

export class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = { processing: false };
    }

    componentDidMount(): void {
        this.state = { processing: false };
    }

    private processToken(response: ReactFacebookResponse) {
        if(response.status == "unknown") {
            this.setState({ processing: false });
        }else{
            authStore.processToken(response).then(() => {
                uiStateStore.navigate('/home');
            });
        }
    }

    render() {
        return(
            <Container>
                <Box p={3}>
                    <Paper>
                        <Box p={3}>
                            { !this.state.processing &&
                                <FacebookLogin
                                    appId="240892070287062"
                                    autoLoad={false}
                                    fields="name,email"
                                    scope="user_friends"
                                    onClick={() => { this.setState({ processing: true }); }}
                                    callback={(r) => { this.processToken(r); }}
                                />
                            }
                            { this.state.processing &&
                                <CircularProgress />
                            }
                        </Box>
                    </Paper>
                </Box>
            </Container>
        );
    }

}
