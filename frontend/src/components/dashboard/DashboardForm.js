import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../manager";
import { Message } from "../reuseable";

function DashboardForm({ user }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [notify, setNotify] = useState({ msg: "", type: "" })

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== password2) {
            notification("Password do not match!", "warning");
        } else {
            dispatch(updateDetails({ name, email, password }));
            notification("Updated!", "success");
        }
    }

    const notification = (msg, type = "info") => {
        setNotify({ msg, type })
    }

    return (
        <Wrapper>
            <h1>Update Details</h1>

            <Form onSubmit={submitHandler}>
                <div className="form-group">
                    <label> Full Name </label>
                    <input
                        type="text"
                        value={name}
                        placeholder={user.name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> Email </label>
                    <input
                        type="text"
                        value={email}
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> Password </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> Confirm Password </label>
                    <input
                        type="password"
                        value={password2}
                        placeholder="Confirm Password"
                        onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Update</button>
                    {notify && (
                        <Message variant={notify.type} >{notify.msg}</Message>
                    )}
                </div>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 1rem;
    border-right: 1px solid #999;
    padding: 0 1rem;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;

    .form-group {
        width: 100%;
        display: flex;
        flex-direction: column;

        > * {
            flex: 1;
            padding: 5px;
        }
    }
`

export default DashboardForm;