import "./AddProducts.css";

const AddProduct = ({ products, setProducts }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setProducts((p) => ({ ...p, image: imageUrl }));
    } else {
      setProducts((p) => ({ ...p, [name]: value }));
    }
  };

  return (
    <div className="add-product">
      <div className="product-detail">
        <span>Product Name</span>
        <input
          type="text"
          placeholder="Enter Product Name"
          onChange={handleChange}
          name="name"
          value={products.name}
        />
      </div>
      <div className="product-detail">
        <span>Product Image</span>
        <input type="file" onChange={handleChange} name="image" />
      </div>
      <div className="product-detail">
        <span>Product Price</span>
        <input
          type="text"
          placeholder="Enter Product Price"
          onChange={handleChange}
          name="price"
          value={products.price}
        />
      </div>
      <div className="product-detail">
        <span>Product Category</span>
        <select
          onChange={handleChange}
          name="category"
          value={products.category}
        >
          <option style={{ display: "none" }}>--category--</option>
          <option value="Men's">Men's</option>
          <option value="Women's">Women's</option>
          <option value="Electronics">Electronics</option>
          <option value="Beauty Products">Beauty Products</option>
        </select>
      </div>
      <div className="product-detail">
        <span>Product Rating</span>
        <input
          type="text"
          placeholder="Enter Product Rating"
          onChange={handleChange}
          name="rating"
          value={products.rating}
        />
      </div>

      <div className="product-detail">
        <span>Product Description</span>
        <textarea
          type="text"
          placeholder="Enter Product Details"
          onChange={handleChange}
          name="description"
          value={products.description}
        />
      </div>
    </div>
  );
};

export default AddProduct;
