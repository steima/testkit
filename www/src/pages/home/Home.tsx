import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
} from "@material-ui/core";
import {ImprintFooter} from "../../components/footer/ImprintFooter";
import customTheme from "../../theme";
import {TypedHero} from "../../components/typed/TypedHero";

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

}

class Hero extends React.Component<HeroProps, HeroState> {

    constructor(props: HeroProps) {
        super(props);
        this.state = { };
    }

    render() {
        const topPadding = 6;
        return (
            <div id="homeBlock" className="hero">
                <Container>

                </Container>
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
