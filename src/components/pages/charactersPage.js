import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import LeftRightBlock from '../leftRightBlock';

export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: 130,
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                header="Characters"
                linkName={this.props.linkName}
                onItemSelected={this.onCharSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`}
            />
        );

        const itemDetail = (
            <ItemDetails
                itemId={this.state.selectedChar}
                getData={this.gotService.getCharacter}>
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        )

        return (
            <LeftRightBlock left={itemList} right={itemDetail} />
        )
    }
}