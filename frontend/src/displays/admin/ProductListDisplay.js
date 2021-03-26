import React, { useEffect, useState } from 'react';
//import styled from "styled-components";
//import { useDispatch, useSelector } from "react-redux";
//import { getUsers } from "../manager";
//import { Table, Button } from "react-bootstrap";
import { Loader, Message } from "../../components";
//import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
//import { LinkContainer } from 'react-router-bootstrap';

function ProductListDisplay() {
    const [loading, setLoading] = useState(true);
    const error = false;

    //const dispatch = useDispatch();

    //useSelector

    useEffect(() => {
        const show = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            clearTimeout(show);
        }
    }, []);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger">{error}</Message>
    }

    // const deleteProductHandler = (userId) => {
    //     console.log(userId);
    // }

    return (
        <h4>product list display component</h4>
    )
}

export default ProductListDisplay;
