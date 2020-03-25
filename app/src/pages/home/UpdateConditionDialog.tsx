import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    TextField
} from "@material-ui/core";
import {messages} from "../../i18n";
import {DatePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {DateTime} from "luxon";
import {Condition, TestkitUser} from "../../domain";
import {UsersProvider} from "../../provider/UsersProvider";

interface UpdateConditionDialogProps {
    open: boolean;
    onClose: (user?: TestkitUser) => void;
}

interface UpdateConditionDialogState {
    condition: Condition;
    swabTakenAt?: DateTime;
    testResultsAt?: DateTime;
    labName: string;
}

export class UpdateConditionDialog extends React.Component<UpdateConditionDialogProps, UpdateConditionDialogState> {

    constructor(props: UpdateConditionDialogProps) {
        super(props);
        this.state = {
            condition: Condition.Unknown,
            swabTakenAt: undefined,
            testResultsAt: undefined,
            labName: ''
        };
    }

    private handleConditionChanged(value?: any) {
        if(value) {
            this.setState({ condition: value });
        }
    }

    private handleSwabTakenAtChanged(swabTakenAt?: MaterialUiPickersDate) {
        if(swabTakenAt != null) {
            this.setState({
                swabTakenAt: swabTakenAt
            });
        }
    }

    private handleTestResultsAtChanged(testResultsAt?: MaterialUiPickersDate) {
        if(testResultsAt != null) {
            this.setState({
                testResultsAt: testResultsAt
            });
        }
    }

    private handleLabNameChanged(labName: string) {
        this.setState({
            labName: labName
        });
    }

    private async handleRequestClicked(): Promise<void> {
        await UsersProvider.updateCondition(this.state).then((user) => {
            this.props.onClose(user);
        });
    }

    render() {
        const showDetails = this.state.condition != Condition.Unknown;
        const canSubmit = this.state.condition == Condition.Unknown || this.state.swabTakenAt != undefined;
        return(<Dialog open={this.props.open} onClose={() => {
            this.props.onClose();
        }}>
            <DialogTitle>{ messages.dialogUpdateConditionTitle }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ messages.dialogUpdateConditionHint }</DialogContentText>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField placeholder={ messages.dialogUpdateConditionCondition }
                                   variant="outlined" select fullWidth
                                   value={this.state.condition}
                                   onChange={(event) => this.handleConditionChanged(event.target.value)}>
                            <MenuItem key={Condition.Unknown} value={Condition.Unknown}>{ Condition.Unknown }</MenuItem>
                            <MenuItem key={Condition.Negative} value={Condition.Negative}>{ Condition.Negative }</MenuItem>
                            <MenuItem key={Condition.Positive} value={Condition.Positive}>{ Condition.Positive }</MenuItem>
                        </TextField>
                    </Grid>
                    { showDetails &&
                        <Grid item xs={12}>
                            <DatePicker
                                inputVariant="outlined" fullWidth label={ messages.dialogUpdateConditionSwabTakenAt }
                                value={this.state.swabTakenAt}
                                onChange={(d) => { this.handleSwabTakenAtChanged(d); }} />
                        </Grid>
                    }
                    { showDetails &&
                        <Grid item xs={12}>
                            <DatePicker
                                inputVariant="outlined" fullWidth label={ messages.dialogUpdateConditionTestResultsAt }
                                value={this.state.testResultsAt}
                                onChange={(d) => { this.handleTestResultsAtChanged(d); }} />
                        </Grid>
                    }
                    {showDetails &&
                        <Grid item xs={12}>
                            <TextField placeholder={messages.dialogUpdateConditionLabName}
                                       variant="outlined" fullWidth
                                       value={this.state.labName}
                                       onChange={(event) => this.handleLabNameChanged(event.target.value)}/>
                        </Grid>
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => {
                    this.props.onClose();
                }}>
                    {messages.cancel}
                </Button>
                <Button color="primary" variant="contained" disabled={!canSubmit} onClick={() => {
                    this.handleRequestClicked().then(() => {
                        this.props.onClose();
                    });
                }}>
                    {messages.save}
                </Button>
            </DialogActions>
        </Dialog>);
    }

}
