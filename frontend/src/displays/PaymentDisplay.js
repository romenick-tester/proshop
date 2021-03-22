import React, { useState } from 'react';
import { Form, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentMethod } from "../manager";
import { FormContainer, CheckoutSteps } from "../components";

function PaymentDisplay({ history }) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress: shipping } = cart;

    if (!shipping) {
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState("paypal");

    const dispatch = useDispatch();

    function submitHandler(e) {
        e.preventDefault();
        dispatch(getPaymentMethod(paymentMethod));
        history.push("/placeorder");
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>payment method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal Or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            value="paypal"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            checked
                        />

                        <Form.Check
                            type="radio"
                            label="Debit Card"
                            id="debit"
                            name="paymentMethod"
                            value="debit"
                            disabled
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentDisplay;

