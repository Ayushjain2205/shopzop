import React from "react";

function Product({ name, price, image }) {
  return (
    <div>
      <div className='product-tile'>
        <div className='product-overlay'>
          <a href='#' className='like-icon'>
            <i class='fas fa-heart'></i>
          </a>
          <a href='#' className='support-icon'>
            <i class='fas fa-headset'></i>
          </a>
        </div>
        <img
          className='product-image'
          src={`https://media.graphcms.com/${image}`}
          alt=''
        />
        <div className='product-details'>
          <h2 className='product-name'>{name}</h2>
          <h3 className='product-price'>₹{price}</h3>
        </div>
      </div>
    </div>
  );
}

export default Product;
