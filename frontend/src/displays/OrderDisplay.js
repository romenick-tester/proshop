import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getOrder, payOrder } from "../manager";
import { OrderedDetails, OrderedPrices, Message, Loader } from "../components";
import axios from "axios";

function OrderDisplay({ match }) {
    const [sdkReady, setSdkReady] = useState(false);

    const orderId = match.params.id;

    const dispatch = useDispatch();
    const { loading, error, details, paid } = useSelector(state => state.order);

    useEffect(() => {
        if (orderId || paid) {
            dispatch(getOrder(orderId));
        }
    }, [dispatch, orderId, paid]);

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");

            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            };
            document.body.appendChild(script);
        }

        if (!details.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [details]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger">{error}</Message>
    }

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    }

    return (
        <>
            <Row>
                <Col md={6}>
                    <h2>order no: {orderId} </h2>
                </Col>
            </Row>
            {details && (
                <Row>
                    <OrderedDetails details={details} />
                    <OrderedPrices
                        sdkReady={sdkReady}
                        details={details}
                        successPaymentHandler={successPaymentHandler} />
                </Row>
            )}
        </>
    )
}

export default OrderDisplay;
