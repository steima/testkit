import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
    Box,
    Button,
    Container,
    Grid, IconButton, Paper,
    Typography,
} from "@material-ui/core";
import {ImprintFooter} from "../../components/footer/ImprintFooter";
import {authStore} from "../../stores/authStore";
import {observer} from "mobx-react";
import {UsersProvider} from "../../provider/UsersProvider";
import {TestkitUser} from "../../domain";
import {Edit} from "@material-ui/icons";
import {UpdateConditionDialog} from "./UpdateConditionDialog";

interface HomeProps extends RouteComponentProps<{}> {
}

interface HomeState {

}

export class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
    }

    render() {
        return(
            <div>
                <Hero />
                <OriginalHome />
            </div>
        );
    }

}

interface HeroProps {

}

interface HeroState {
    loggedIn: boolean,
    currentUser?: TestkitUser,
    editCondition: boolean
}

@observer
class Hero extends React.Component<HeroProps, HeroState> {

    constructor(props: HeroProps) {
        super(props);
        this.state = {
            loggedIn: false,
            currentUser: undefined,
            editCondition: false
        };
    }

    componentDidMount(): void {
        if(authStore.authenticated) {
            this.loadCurrentUser();
        }
    }

    private loadCurrentUser() {
        UsersProvider.getCurrentUser().then((u) => {
            this.setState({currentUser: u});
        })
    }

    private editCondition(edit: boolean) {
        this.setState({editCondition: edit});
    }

    render() {
        return (
            <div id="homeBlock" className="hero">
                <Container>
                    <Box p={3}>
                        <Paper>
                            <Box p={3}>
                                { this.state.currentUser &&
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">
                                                { this.state.currentUser.name }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">
                                                { this.state.currentUser.currentCondition }
                                            </Typography>
                                            <IconButton onClick={(e) => { this.editCondition(true); }}>
                                                <Edit />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                }
                            </Box>
                        </Paper>
                    </Box>
                </Container>
                <UpdateConditionDialog open={this.state.editCondition} onClose={(user?: TestkitUser) => {
                    if(user) {
                        this.setState({
                            currentUser: user,
                            editCondition: false
                        });
                    }else{
                        this.editCondition(false);
                    }
                }} />
            </div>
        );
    }
}

function OriginalHome(props: {}) {
    return(
        <div>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}><Box p={4} /></Grid>
                    <ImprintFooter />
                </Grid>
            </Container>
        </div>
    );
}
