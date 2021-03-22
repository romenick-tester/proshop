import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { shippingAddress } from "../manager";
import { FormContainer } from "../components";

function ShippingDisplay({ history }) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress: shipping } = cart;

    const [address, setAddress] = useState(shipping.address);
    const [city, setCity] = useState(shipping.city);
    const [postcode, setPostcode] = useState(shipping.postcode);
    const [country, setCountry] = useState(shipping.country);

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(shippingAddress({ address, city, postcode, country }));
        history.push("/payment");
    }

    return (
        <FormContainer>
            <h1>shipping</h1>
            <Form onSubmit={handleSubmit}>
                <div className="form group">
                    <label className="form label">Address</label>
                    <input
                        type="text"
                        className="form input"
                        name="address"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required />
                </div>
                <div className="form group">
                    <label className="form label">City</label>
                    <input
                        type="text"
                        className="form input"
                        name="city"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required />
                </div>
                <div className="form group">
                    <label className="form label">Postcode</label>
                    <input
                        type="text"
                        className="form input"
                        name="postcode"
                        placeholder="Enter Postcode"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        required />
                </div>
                <div className="form group">
                    <label className="form label">Country</label>
                    <input
                        type="text"
                        className="form input"
                        name="country"
                        placeholder="Enter Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required />
                </div>
                <div className="form group">
                    <label className="form label"></label>
                    <button type="submit" className="form button">Submit</button>
                </div>
            </Form>
        </FormContainer>
    )
}

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;

    .form.group {
        display: flex;
        flex-direction: column;
        margin: 0.5rem 0;

        .form.input {
            padding: 0.3rem 1rem;
            border: 1px solid #999;

            &:hover {
                border: 1px solid orange;
            }
        }

        .form.button {
            border: none;
            outline: none;
            background: #111;
            color: white;
            padding: 0.3rem 1rem;

            &:hover {
                cursor: pointer;
                background: #333;
            }
        }
    }
`

export default ShippingDisplay;
