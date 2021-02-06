import React, { Component } from 'react';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const ItemDetailBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    border-radius: 0.25rem !important;
    margin-top: 37px;
`;

const ItemDetailsHeader = styled.h4`
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
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
    }
    :last-child {
        border-bottom-right-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
    }
`;
const Term = styled.span`
    font-weight: bold;
`;

const Val = styled.span`
`;

const Field = ({ item, field, label }) => {

    return (
        <ListGroupItem>
            <Term>{label}</Term>
            <Val>{item[field]}</Val>
        </ListGroupItem>
    )
}

export {
    Field
}

export default class CharDetails extends Component {

    state = {
        item: null,
        hasError: false,
        loading: true
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemId !== this.props.itemId) {
            this.updateItem();
        }

    }

    componentDidCatch() {
        this.setState({
            hasError: true,
            loading: false
        })
    }


    updateItem = () => {

        const { getData, itemId } = this.props;

        if (!itemId) {
            return;
        }

        this.setState({
            //item: null,
            loading: true
        })

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false
                })
            })
            .catch((e) => this.setState({ hasError: true }));
        // this.app.foo = 0;
    }

    render() {

        if (!this.state.item) {
            return <span className='select-error'>Please select item in the list</span>
        }

        const { item, hasError, loading } = this.state;

        const ItemView = () => {
            return (
                <>
                    <ItemDetailsHeader>{item.name}</ItemDetailsHeader>
                    <ListGroup>
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, { item })
                            })
                        }
                    </ListGroup>
                </>
            )
        };
        const errorMessage = (hasError) ? <ErrorMessage /> : null;
        const spinner = (loading && !hasError) ? <Spinner /> : null;
        const content = !(loading || hasError) ? <ItemView /> : null;

        return (
            <ItemDetailBlock>
                {errorMessage}
                {spinner}
                {content}
            </ItemDetailBlock>
        );
    }
}