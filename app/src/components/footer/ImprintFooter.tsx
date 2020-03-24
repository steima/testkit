import {Grid, Typography} from "@material-ui/core";
import {messages} from "../../i18n";
import * as React from "react";

export function ImprintFooter(props: {}) {
    return (<Grid item xs={12}>
        <Grid container>
            <Grid item sm={2}></Grid>
            <Grid item sm={8}>
                <Typography variant="body2">{ messages.brandOfMatthiasSteinbauer }</Typography>
                <Typography variant="body2">
                    <a href="https://steinbauer.org/about/">{ messages.imprint }</a>
                </Typography>
                <Typography variant="body2">
                </Typography>
            </Grid>
            <Grid item sm={2}></Grid>
        </Grid>
    </Grid>);
}
