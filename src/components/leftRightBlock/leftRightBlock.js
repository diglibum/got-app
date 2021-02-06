import React from 'react';
import { Row, Col } from 'reactstrap';

const LeftRightBlock = ({ left, right }) => {
    return (
        <>
            <Row>
                <Col md='6'>
                    {left}
                </Col>
                <Col md='6'>
                    {right}
                </Col>
            </Row>
        </>

    );
}

export default LeftRightBlock;