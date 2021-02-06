import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import styled from 'styled-components';

const Header = styled.h4`
    color: #fff;
`;
const ListGroup = styled.ul`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    cursor: pointer;
    background-color: #fff;
    border-radius: 0.25rem;
`;

const ListGroupItem = styled.li`
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
`;

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList: itemList
                })
            })
            .catch((e) => this.setState({ error: true }));
    }

    renderItems(arr) {
        return arr.map((item) => {

            const id = item.id;

            const label = this.props.renderItem(item);

            return (
                <ListGroupItem
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </ListGroupItem>
            );
        })

    }

    // onError() {
    //     this.setState({
    //         loading: false,
    //         error: true,
    //         chars: null
    //     });
    // }

    render() {
        const { itemList, error } = this.state;
        const { header, linkName } = this.props;

        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !itemList ? <Spinner /> : this.renderItems(itemList);
        //const content = (chars && !error) ? this.renderItems(chars) : null;



        return (
            <>
                <Header id={linkName}>{header}</Header>
                <ListGroup>

                    {errorMessage}
                    {content}
                </ListGroup>
            </>
        );
    }
}
