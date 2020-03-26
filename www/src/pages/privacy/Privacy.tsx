import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
    Box,
    Button,
    Container,
    Grid, Paper,
    Typography,
} from "@material-ui/core";
import {ImprintFooter} from "../../components/footer/ImprintFooter";
import customTheme from "../../theme";
import {TypedHero} from "../../components/typed/TypedHero";
import {messages} from "../../i18n";

interface PrivacyProps extends RouteComponentProps<{}> {
}

interface PrivacyState {

}

export class Privacy extends React.Component<PrivacyProps, PrivacyState> {

    constructor(props: PrivacyProps) {
        super(props);
    }

    render() {
        return(
            <div id="homeBlock" className="hero">
                <Container>
                    <Grid item xs={12}><Box p={4} /></Grid>
                    <Paper>
                        <Box p={3}>
                            <Typography variant="h3">{ messages.titlePrivacy }</Typography>
                            <p>Diese Anwendung speichert Daten über deinen Gesundheitszustand. Diese Daten werden
                            aber nicht an Dritte weitergegeben. Insbesondere werden diese Daten auch keinen anderen
                            Nutzern dieser Anwendung angezeigt oder an Facebook übertragen.</p>
                            <p>In dieser Anwendung wird lediglich deine für uns anonyme Facebook Nutzer-ID, dein
                            Vorname lt. Facebook und dein Nachname lt. Facebook gespeichert. Außerdem speichern
                            wir deinen zuletzt gemeldeten Gesundheitszustand (CORVID-19 Status) und die Historie
                            deines Status um Mißbrauch von Usern ggf. nachzuvollziehen und fehlerhafte Daten zu
                            löschen.</p>
                            <p>Diese App greift nicht direkt auf deine Freundesliste zu. Deine Freundesliste ist
                            nur für dich während der Nutzung der Anwendung sichtbar. Wenn du einen Kontaktpunkt
                            mit einem Freund in der App einträgst, dann speichern wir diese Verbindung und den
                            bekannt gegebenen Kontaktzeitpunkt.</p>
                            <p>Diese Anwendung kann aufgrund der bekanngegebenen Kontaktpunkte ermitteln ob du mit
                            einem Freund Kontakt hattest, der positiv auf CORVID-19 getestet wurde. Ist dies der
                            Fall wird dies in der Anwendung angezeigt. Nutzern ist es nicht möglich zu ermitteln
                            wer dieser positiv getestete User ist.</p>
                        </Box>
                    </Paper>
                </Container>
            </div>
        );
    }

}
