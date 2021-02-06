import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import LeftRightBlock from '../leftRightBlock';

export default class BooksPage extends Component {

    gotService = new GotService();

    state = {
        selectedBook: 1,
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    onBookSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorMessage />
        }

        const itemListView = (
            <ItemList
                header="Books"
                linkName={this.props.linkName}
                onItemSelected={this.onBookSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({ name, isbn }) => `${name} (${isbn})`}
            />
        );

        const itemDetailView = (
            <ItemDetails
                itemId={this.state.selectedBook}
                getData={this.gotService.getBook} >
                <Field field='isbn' label='ISBN' />
                <Field field='numberOfPages' label='Pages' />
                <Field field='publiser' label='Publiser' />
                <Field field='country' label='Country' />
            </ItemDetails >
        )

        return (
            <LeftRightBlock left={itemListView} right={itemDetailView} />
        )
    }
}