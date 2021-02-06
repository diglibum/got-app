import React, { Component } from 'react';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';
import Spinner from '../spinner';



const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    border-radius: 0.25rem !important;
`;
const RandomBlockheader = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const ListGroup = styled.ul`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
`;

const ListGroupItem = styled.li`
border-right-width: 0;
    border-left-width: 0;
    border-radius: 0;
    justify-content: space-between !important;
    display: flex !important;
    position: relative;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    :first-child {
        border-top-right-radius: 0.25rem;
        border-top-left-radius: 0.25rem;
    }
`;
const Term = styled.span`
    font-weight: bold;
`;

const Val = styled.span`
`;

export default class RandomChar extends Component {

    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updateChar();
        //this.timerId = setInterval(this.updateChar, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 140, 15);
        //const id = 823;
        this.gotService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {

        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = (loading) ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <RandomBlock>
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}
const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <RandomBlockheader>Random Character: {name}</RandomBlockheader>
            <ListGroup>
                <ListGroupItem>
                    <Term>Gender </Term>
                    <Val>{gender}</Val>
                </ListGroupItem>
                <ListGroupItem>
                    <Term>Born </Term>
                    <Val>{born}</Val>
                </ListGroupItem>
                <ListGroupItem>
                    <Term>Died </Term>
                    <Val>{died}</Val>
                </ListGroupItem>
                <ListGroupItem>
                    <Term>Culture </Term>
                    <Val>{culture}</Val>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}
