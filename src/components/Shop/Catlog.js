import React from "react";
import Product from "./Product";

function Catlog({ products }) {
  return (
    <div>
      <h2 className='catlog-heading'>Catlog</h2>
      <div className='product-holder'>
        {products.map((props) => (
          <Product
            name={props.name}
            price={props.price}
            image={props.image.handle}
          />
        ))}
      </div>
    </div>
  );
}

export default Catlog;
