import * as React from "react";
import { observer } from "mobx-react";
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import {Button, Hidden, IconButton} from "@material-ui/core";
import {messages} from "./i18n";
import customTheme from "./theme";
import {uiStateStore} from "./stores/uiStateStore";
import {LiveHelp} from "@material-ui/icons";

interface NavBarProps {

}

interface NavBarState {
}

@observer
export class NavBar extends React.Component<NavBarProps, NavBarState> {

    constructor(props: NavBarProps) {
        super(props);
    }

    private navigate(id: string) {
        const element = document.getElementById(id);
        if(element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }else{
            // uiStateStore.currentError = `Cannot find anchor target with id ${id}`;
        }
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <div style={{flexGrow: 1}}>
                        <img style={{
                            display: 'block',
                            maxWidth: '70px',
                            maxHeight: '2.4em',
                            marginTop: '6px',
                            marginBottom: '6px',
                            width: 'auto',
                            height: 'auto',
                            float: 'left'
                        }} src="/img/iconfinder_stay_home_coronovirus_5964549.svg"
                         onClick={() => { uiStateStore.navigate('/'); }}
                        />
                        <Hidden xsUp>
                            <div style={{ marginLeft: customTheme.spacing(4) }}>
                                <Button color="inherit" onClick={() => { this.navigate('test'); }} size="large">{ messages.menuLogin }</Button>
                            </div>
                        </Hidden>
                    </div>
                    <div>
                        <Button color="inherit" onClick={() => { document.location.href = 'https://app.loupe.link/' }} size="large">{ messages.menuLogin }</Button>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
