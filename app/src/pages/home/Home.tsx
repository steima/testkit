import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
    Box,
    Button, CircularProgress,
    Container, Divider,
    Grid, IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, Paper,
    Typography,
} from "@material-ui/core";
import {ImprintFooter} from "../../components/footer/ImprintFooter";
import {authStore} from "../../stores/authStore";
import {observer} from "mobx-react";
import {UsersProvider} from "../../provider/UsersProvider";
import {FacebookFriend, FacebookFriendListPage, TestkitUser} from "../../domain";
import {Edit} from "@material-ui/icons";
import {UpdateConditionDialog} from "./UpdateConditionDialog";
import {FacebookProvider} from "../../provider/FacebookProvider";
import {messages} from "../../i18n";

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
    currentUser?: TestkitUser,
    editCondition: boolean,
    friends?: FacebookFriend[],
    friendsSearchNeedle: string
}

@observer
class Hero extends React.Component<HeroProps, HeroState> {

    authRetries: number;

    constructor(props: HeroProps) {
        super(props);
        this.state = {
            currentUser: undefined,
            editCondition: false,
            friendsSearchNeedle: ''
        };
    }

    componentDidMount(): void {
        this.authRetries = 30;
        this.awaitAuthentication();
    }

    async awaitAuthentication() {
        if(authStore.authenticated) {
            this.loadCurrentUser();
        }else{
            if(this.authRetries > 0) {
                this.authRetries --;
                setTimeout(() => {
                    this.awaitAuthentication();
                }, 500);
            }else{
                authStore.logout();
            }
        }
    }

    private loadCurrentUser() {
        UsersProvider.getCurrentUser().then((u) => {
            this.setState({currentUser: u, friends: []});
        }).then((_u) => {
            FacebookProvider.listFriends().then((friendsPage) => this.mergeFriends(friendsPage));
        });
    }

    private mergeFriends(friendsPage: FacebookFriendListPage) {
        let currentFriends: FacebookFriend[] = this.state.friends || [];
        currentFriends.push(... friendsPage.data);
        this.setState({friends: currentFriends});
        if(friendsPage.paging && friendsPage.paging.cursors && friendsPage.paging.cursors.after) {
            FacebookProvider.next(friendsPage).then((friendsPage) => this.mergeFriends(friendsPage));
        }else{
            console.log('Done loading friends');
        }
    }

    private editCondition(edit: boolean) {
        this.setState({editCondition: edit});
    }

    private handleFriendsSearchNeedleChange(needle: string) {
        this.setState({friendsSearchNeedle: needle});
    }

    private filterFriends(): FacebookFriend[] {
        const needle = this.state.friendsSearchNeedle.toLowerCase();
        if(this.state.friends == undefined || this.state.friends.length == 0) {
            return [];
        }
        return this.state.friends.filter((f) => f.name.toLowerCase().indexOf(needle) != -1);
    }

    render() {
        return (
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Paper>
                            <Box p={3}>
                                { this.state.currentUser == undefined &&
                                    <CircularProgress />
                                }
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
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Paper>
                            <Box p={3}>
                                Dein Netzwerk
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        { this.state.friends &&
                            <Paper>
                                <Box p={1}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Box paddingLeft={2} paddingRight={2}>
                                                <InputBase
                                                    fullWidth
                                                    value={this.state.friendsSearchNeedle}
                                                    placeholder={ messages.search }
                                                    onChange={(e) => { this.handleFriendsSearchNeedleChange(e.target.value); }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <List>
                                                { this.filterFriends().map((f) =>
                                                    <ListItem key={f.id} style={{ cursor: 'pointer' }}
                                                              onClick={(e) => { UsersProvider.storeSocialContact(f.id); }}
                                                    >
                                                        <ListItemText primary={f.name} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end">
                                                                7
                                                                <Edit />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                ) }
                                            </List>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        }
                    </Grid>
                </Grid>
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
            </Container>
        );
    }
}

function OriginalHome(props: {}) {
    return(
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}><Box p={4} /></Grid>
                <ImprintFooter />
            </Grid>
        </Container>
    );
}
