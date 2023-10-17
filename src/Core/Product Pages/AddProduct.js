import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";

import "./AddProduct.css";

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    material: "",
    quantity: "",
    prodType: "",
    size: "",
    batch:""
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    // setCategories([]);
    // axios({
    //   method: "get",
    //   url: "https://ecommerceappcj.herokuapp.com/api/categories/",
    // }).then(function (response) {
    //   setCategories(response.data.categories);
    // });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [imagePreview, setImagePreview] = useState("");
  const [dimensionImagePreview, setDimensionImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const [dimensionImage, setDimensionImage] = useState(null);
  const imageButtonRef = useRef();
  const dimensionImageButtonRef = useRef();
  const types = ["image/png", "image/jpeg", "image/jpg"];

  function handleImageChange(event) {
    let selectedFile = event.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setImage(null);
    }
  }

  function handleDimensionImageChange(event) {
    let selectedFile = event.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setDimensionImage(selectedFile);
      setDimensionImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setDimensionImage(null);
    }
  }

  const addProduct = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("ProdType", newProduct.prodType);
      formData.append("image", dimensionImage);
      formData.append("material", newProduct.material);
      formData.append("quantity", newProduct.quantity);
      formData.append("size", newProduct.size);
      formData.append("batch", newProduct.batch);
      axios({
        method: "post",
        // url: "https://ecommerceappcj.herokuapp.com/api/products/create/product/",
        data: formData,
      }).then((response) => {
        setImagePreview("");
        setDimensionImagePreview("");
        setNewProduct({
          name: "",
          material: "",
          quantity: "",
          prodType: "",
          size: "",
          batch:""
        });
      });
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="add-product-content" lg={10}>
          <h4>Add Product</h4>
          <p>
            Please fill the product details in the form below to add a new
            product.
          </p>
          <Card className="add-product-form-card">
            <Row>
              <Col>
                <div className="add-product-input-div">
                  <p>Product Name</p>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Product Material</p>
                  <input
                    type="text"
                    name="material"
                    value={newProduct.material}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="add-product-input-div">
                  <p>Product Type</p>
                  <select
                    className="add-product-dropdown"
                    name="prodType"
                    id="prodType"
                    value={newProduct.prodType}
                    onChange={handleChange}
                  >
                    <option disabled className="add-product-dropdown-option">
                      Please select a product category
                    </option>
                    <option className="add-product-dropdown-option">
                      Hex Bolt
                    </option>
                    <option className="add-product-dropdown-option">
                      U Bolt
                    </option>
                    <option className="add-product-dropdown-option">
                      S Bolt
                    </option>
                    <option className="add-product-dropdown-option">
                      Washers
                    </option>
                    {categories.map((prodType) => {
                      return (
                        <option
                          className="add-product-dropdown-option"
                          value={prodType.name}
                        >
                          {prodType.name}
                        </option>
                      );
                    })}{" "}
                  </select>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Product Quantity</p>
                  <input
                    type="number"
                    name="quantity"
                    min={0}
                    value={newProduct.quantity}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="add-product-input-div">
                  <p>Product Size</p>
                  <input
                    type="text"
                    name="size"
                    value={newProduct.size}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Product Batch</p>
                  <input
                    type="text"
                    name="batch"
                    value={newProduct.batch}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="add-product-image-div">
                  <div
                    onClick={() => {
                      dimensionImageButtonRef.current.click();
                    }}
                    className="product-image-div"
                  >
                    <Form.Control
                      ref={dimensionImageButtonRef}
                      style={{ display: "none" }}
                      type="file"
                      name="dimensionImage"
                      accept="image/*"
                      onChange={handleDimensionImageChange}
                    />
                    {dimensionImagePreview ? (
                      <img src={dimensionImagePreview} alt="preview" />
                    ) : (
                      <p>Add Dimension image</p>
                    )}
                  </div>
                </div>
              </Col>
              <Col>
                <div className="add-product-image-div">
                  <div
                    onClick={() => {
                      imageButtonRef.current.click();
                    }}
                    className="product-image-div"
                  >
                    <Form.Control
                      ref={imageButtonRef}
                      style={{ display: "none" }}
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview ? (
                      <img src={imagePreview} alt="preview" />
                    ) : (
                      <p>Add product image</p>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <button onClick={addProduct} className="add-product-btn">
              Add Product
            </button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AddProduct;
