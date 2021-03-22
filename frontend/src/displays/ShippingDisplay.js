import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components";

function ShippingDisplay({ history }) {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [country, setCountry] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log({ address, city, postcode, country });
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
