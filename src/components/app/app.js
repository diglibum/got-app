import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import { BooksPage, CharactersPage, HousesPage } from '../pages';
import ErrorMessage from '../errorMessage';

const ButtonClass = {
    padding: "12px",
    backgroundColor: "#1e2edb",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    marginBottom: "40px",
    outline: "none",
    boxShadow: "0px 0px 30px rgba(256, 256, 256, .1)",
    cursor: "pointer"
}

export default class App extends Component {

    state = {
        char: {},
        selected: false,
        randomChar: true,
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }

    toggleRandomChar = () => {
        this.setState({
            randomChar: !this.state.randomChar
        })
    }
    render() {

        if (this.state.hasError) {
            return <ErrorMessage />
        }

        const char = this.state.randomChar ? <RandomChar /> : null;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {char}
                            <Button color="primary" size="lg" style={ButtonClass} onClick={this.toggleRandomChar}>Toggle random char</Button>
                        </Col>
                    </Row>
                    <CharactersPage linkName="chars" />
                    <br />
                    <BooksPage linkName="books" />
                    <br />
                    <HousesPage linkName="houses" />
                </Container>
            </>
        );
    }
};