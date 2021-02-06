import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import LeftRightBlock from '../leftRightBlock';

export default class HousesPage extends Component {

    gotService = new GotService();

    state = {
        selectedHouse: 1,
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    onHouseSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorMessage />
        }

        const itemListView = (
            <ItemList
                header="Houses"
                linkName={this.props.linkName}
                onItemSelected={this.onHouseSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({ name, region }) => `${name} (${region})`}
            />
        );

        const itemDetailView = (
            <ItemDetails
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse} >
                <Field field='region' label='Region' />
                <Field field='coatOfArms' label='CoatOfArms' />
                <Field field='words' label='Words' />
                <Field field='currentLord' label='Current Lord' />
            </ItemDetails >
        )

        return (
            <LeftRightBlock left={itemListView} right={itemDetailView} />
        )
    }
}