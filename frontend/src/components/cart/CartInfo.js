import React from 'react';
import styled from "styled-components";
import { Card, ListGroup, Button } from "react-bootstrap";

function CartInfo({ items, checkout }) {

    return (
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Wrapper>
                        <h4>subtotal (<span>{items.reduce((acc, item) => acc + item.qty, 0)}</span>) items</h4>
                        <h4><span>£ {items.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span></h4>
                    </Wrapper>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Wrapper>
                        <Button
                            type="button"
                            className="btn-block btn-dark"
                            disabled={items.length === 0}
                            onClick={checkout}>
                            proceed to checkout
                        </Button>
                    </Wrapper>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

const Wrapper = styled.div`
    width: 100%;

    h4 {
        font-weight: 700;
    }

    span {
        font-weight: 400;
        color: #008cba;
    }
`

export default CartInfo;
