import React, { useEffect } from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../manager";

function ViewUsers() {
    const dispatch = useDispatch();
    const {
        all_users_loading: loading,
        all_users_error: error,
        all_users: users
    } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    if (loading) {
        return <Wrapper><h4>loading...</h4></Wrapper>
    }

    if (error) {
        return <Wrapper><h4>error...</h4></Wrapper>
    }

    console.log(users);

    return (
        <Wrapper>
            <h4>current users:</h4>
            <ul>
                {users.map((user) => {
                    return <li key={user._id}>{user.name} {user.isAdmin ? "(admin)" : ""}</li>
                })}
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    min-width: 10vw;
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 100;

    border: 1px solid gold;
    background-color: white;
    font-size: 0.8rem;
    opacity: 0.9;
`

export default ViewUsers;
