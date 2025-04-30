import "./SideBar.css";
import { useSelector } from "react-redux";

const SideBar = ({ filter, setFilter }) => {
  const productData = useSelector((prev) => prev.products.allProducts);

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    setFilter((prev) => {
      const updatedCategories = checked
        ? [...prev.category, id]
        : prev.category.filter((item) => item !== id);

      return { ...prev, category: updatedCategories };
    });
  };

  const handlePriceChange = (e) => {
    setFilter((prev) => ({ ...prev, price: e.target.value }));
  };

  return (
    <div className="side-bar-main-container">
      <div className="filter-container">
        <span className="filter-header">Category</span>
        <div className="filter">
          <input
            type="checkbox"
            name="category"
            id="Men's"
            onChange={handleCategoryChange}
          />
          <label htmlFor="Men's">Men's</label>
        </div>
        <div className="filter">
          <input
            type="checkbox"
            name="category"
            id="Women's"
            onChange={handleCategoryChange}
          />
          <label htmlFor="Women's">Women's</label>
        </div>
        <div className="filter">
          <input
            type="checkbox"
            name="category"
            id="Beauty Products"
            onChange={handleCategoryChange}
          />
          <label htmlFor="Beauty Products">Beauty Products</label>
        </div>
        <div className="filter">
          <input
            type="checkbox"
            name="category"
            id="Electronics"
            onChange={handleCategoryChange}
          />
          <label htmlFor="Electronics">Electronic's</label>
        </div>
      </div>
      <div className="filter-container">
        <span className="filter-header">Price</span>
        <div className="filter">
          <input
            type="radio"
            name="price"
            id="low"
            value="1"
            onChange={handlePriceChange}
          />
          <label htmlFor="low">Less than 1000</label>
        </div>
        <div className="filter">
          <input
            type="radio"
            name="price"
            id="medium"
            value="2"
            onChange={handlePriceChange}
          />
          <label htmlFor="medium">1000-5000</label>
        </div>
        <div className="filter">
          <input
            type="radio"
            name="price"
            id="high"
            value="3"
            onChange={handlePriceChange}
          />
          <label htmlFor="high">Above 10000</label>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
