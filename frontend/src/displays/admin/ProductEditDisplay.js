import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { getProductDetails, updateProduct, PRODUCT_RESET } from "../../manager";
import { FormContainer, Loader, Message } from "../../components";
import axios from "axios";

function ProductEditDisplay({ match }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: "", msg: "Updated!" });

    const productId = match.params.id;

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.product);
    const { loading: product_loading, error: product_error, details } = productDetails;

    const userById = useSelector(state => state.userById);
    const { loading, error, updated } = userById;

    useEffect(() => {
        dispatch(getProductDetails(productId));
        dispatch({ type: PRODUCT_RESET });
    }, [dispatch, productId, updated]);

    if (product_loading || (!product_loading && loading)) {
        return <Loader />
    }

    if (product_error || (!product_error && error)) {
        return <Message variant="danger">{error}</Message>
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } = await axios.post("/api/upload", formData, config);

            setImage(data);
            setUploading(false);
        } catch (err) {
            console.log(err.message);
            setUploading(false);
            setNotification({ show: true, type: "danger", msg: err.message });
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            name: name ? name : details.name,
            image: image ? image : details.image,
            price: price ? Number(price) : details.price,
            countInStock: countInStock ? Number(countInStock) : details.countInStock,
            brand: brand ? brand : details.brand,
            category: category ? category : details.category,
            description: description ? description : details.description,
        }

        dispatch(updateProduct(productId, data));
        setNotification({ show: true, type: "success", msg: "Updated!" })
    }

    return (
        <>
            <Link to={`/admin/products`} className="btn btn-dark my3" >Go Back</Link>

            <FormContainer>
                <h1>Edit Product</h1>

                <Form onSubmit={submitHandler} className="mb-2">
                    <Form.Group controlId="name">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={details.name || "Enter Product Name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={details.image || "Enter Web-URL (inc. https//)"}
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </Form.Group>

                    <Form.File
                        id="image-file"
                        label="Choose File"
                        custom
                        onChange={uploadFileHandler}
                    >
                        {uploading && <Loader />}
                    </Form.File>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={details.brand || "Enter Brand"}
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={details.category || "Enter Category"}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            row="3"
                            placeholder={details.description || "Enter Description"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price (£)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={details.price}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="countinstock">
                        <Form.Label>Count-In-Stock</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={details.countInStock}
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>

                </Form>
                {notification.show && (
                    <Message variant={notification.type}>{notification.msg}</Message>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditDisplay;
