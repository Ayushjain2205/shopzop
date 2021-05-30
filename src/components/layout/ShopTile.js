import React from "react";
import { Link } from "react-router-dom";

function ShopTile({ name, logo, slug, rating, location, category }) {
  return (
    <div className='shop-card'>
      <Link to={`/shops/${slug}`}>
        <img
          className='shop-logo'
          src={`http://media.graphcms.com/${logo}`}
          alt=''
          srcset=''
        />
      </Link>
      <h3 className='shop-name'>{name}</h3>
      <div className='home-card card-item'>
        <span className='card-location'>
          <i class='fas fa-map-marker-alt'></i>
          {location}
        </span>
        <span className='card-rating'>
          <i class='fas fa-star-half-alt'></i> {rating}
        </span>
      </div>
      <div className='home-card card-category'>{category}</div>
    </div>
  );
}

export default ShopTile;
