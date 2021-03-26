import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { getUserById, updateUserById } from "../../manager";
import { FormContainer, Loader, Message } from "../../components";

function UserEditDisplay({ match }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const userId = match.params.id;

    const dispatch = useDispatch();

    const userById = useSelector(state => state.userById);
    const { loading, error, user, updated } = userById;

    useEffect(() => {
        dispatch(getUserById(userId));
    }, [dispatch, userId, updated]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger">{error}</Message>
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            name: name ? name : user.name,
            email: email ? email : user.email,
            isAdmin,
        }

        dispatch(updateUserById(userId, data));
    }

    return (
        <>
            <Link to={`/admin/users`} className="btn btn-dark my3" >Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={user.name || "Enter Full Name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={user.email || "Enter Email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="isAdmin">
                        <Form.Check
                            type="checkbox"
                            label="Is Admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default UserEditDisplay;
