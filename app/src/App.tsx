import * as React from "react";
import { Provider, observer } from "mobx-react";
import { Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Home } from "./pages/home/Home";
import { ThemeProvider } from "@material-ui/styles";
import {Box, CssBaseline} from "@material-ui/core";
import customTheme from "./theme";
import { uiStateStore } from "./stores/uiStateStore";

import LuxonUtils from "@date-io/luxon";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {ErrorSnackbarComponent} from "./ErrorSnackbarComponent";
import {CheckLoggedInState} from "./pages/auth/CheckLoggedInState";
import {Login} from "./pages/auth/Login";

function NoMatch() {
    return <h2>Not Found</h2>;
}

@observer
export class App extends React.Component<{}, {}> {

    render() {
        return (
            <ThemeProvider theme={customTheme}>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <CssBaseline />
                    <Provider>
                        <Router history={uiStateStore.history}>
                            <NavBar />
                            <Switch>
                                <Route path="/" exact component={CheckLoggedInState} />
                                <Route path="/login" exact component={Login} />
                                <Route path="/home" exact component={Home} />
                                <Route component={NoMatch} />
                            </Switch>
                            <Box marginBottom={3} />
                        </Router>
                        { uiStateStore.currentError &&
                            <ErrorSnackbarComponent message={uiStateStore.currentError} />
                        }
                    </Provider>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        );
    }
}
