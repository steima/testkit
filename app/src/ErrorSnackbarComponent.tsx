import * as React from "react";
import {Grid, Snackbar} from "@material-ui/core";

export function ErrorSnackbarComponent(props: { message?: string, messages?: string[] }) {
    if(props.message) {
        return (<SingleErrorSnackbarComponent message={props.message} />);
    }else if(props.messages && props.messages.length > 0) {
        return (
            <div>
                { props.messages.map((message) => {
                    return (<SingleErrorSnackbarComponent message={message} key={message} />);
                })}
            </div>
        );
    }
    return null;
}

interface SingleErrorSnackbarComponentProps {
    message: string;
}

interface SingleErrorSnackbarComponentState {
    show: boolean;
}

class SingleErrorSnackbarComponent extends React.Component<SingleErrorSnackbarComponentProps, SingleErrorSnackbarComponentState> {

    constructor(props: SingleErrorSnackbarComponentProps) {
        super(props);
        this.state = {
            show: true
        };
    }

    private handleCloseSnackbar() {
        this.setState({ show: false });
    }

    render() {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={this.state.show}
                onClose={(event, reason) => { this.handleCloseSnackbar(); }}
                message={<span id="message-id">{ this.props.message }</span>}>
            </Snackbar>
        );
    }
}