import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../stylesheets/DashboardProduct.css";
import { useDeleteProductMutation } from "../services/appApi";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

  // Handle the delete product button click
  function handleDeleteProduct(id) {
    if (window.confirm("Are you sure?"))
      deleteProduct({ productId: id, userId: user._id });
  }

  return (
    // The table component to display the list of products
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
        </tr>
      </thead>
      <tbody>
        
        {/* Map over the products array to display each product */}
        {products.map((product) => (
          <tr key={product._id}>
            <td>
              <img
                src={product.pictures[0]?.url}
                alt="product-img"
                className="dashboard-product-preview"
              />
            </td>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>

              {/* the delete product button */}
              <Button
                onClick={() => handleDeleteProduct(product._id, user._id)}
                style={{ marginRight: "5px" }}
                disabled={isLoading}
              >
                Delete
              </Button>
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DashboardProducts;
