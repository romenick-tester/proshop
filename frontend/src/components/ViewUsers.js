import React, { useEffect } from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllMembers } from "../manager";

function ViewUsers() {
    const dispatch = useDispatch();
    const {
        members_loading: loading,
        members_error: error,
        members,
    } = useSelector(state => state.members);

    useEffect(() => {
        dispatch(getAllMembers());
    }, [dispatch]);

    if (loading) {
        return <Wrapper><h4>loading...</h4></Wrapper>
    }

    if (error) {
        return <Wrapper><h4>error...</h4></Wrapper>
    }

    return (
        <Wrapper>
            <h6>current members:</h6>
            <ul>
                {members.map((member) => {
                    return <li key={member._id}>{member.name} {member.isAdmin ? "(admin)" : ""}</li>
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
