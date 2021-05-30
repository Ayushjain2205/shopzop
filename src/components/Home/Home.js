import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Shoptile from "../layout/ShopTile";

function Home({ shops }) {
  return (
    <div>
      <Navbar />
      <div className='home-shops'>
        {shops.map(({ name, logo, slug, rating, location, category }) => (
          <Shoptile
            name={name}
            logo={logo.handle}
            slug={slug}
            rating={rating}
            location={location}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
