import "./Batch.css";

const data = {
  "Men's": {
    name: "men",
    content: "MEN'S",
  },
  "Women's": {
    name: "women",
    content: "WOMEN'S",
  },
  "Beauty Products": {
    name: "beauty",
    content: "BEAUTY PRODUCTS",
  },
  Electronics: {
    name: "electronic",
    content: "ELECTRONICS",
  },
};

const Batch = ({ batchName = "", className = "" }) => {
  const type = batchName;
  return (
    <div className={`category ${data[type]?.name} ${className}`}>
      {data[type]?.content}
    </div>
  );
};

export default Batch;
