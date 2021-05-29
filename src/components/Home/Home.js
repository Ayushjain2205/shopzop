import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

function Home({ shops }) {
  return (
    <div>
      <Navbar />
      <ul>
        {shops.map(({ name, description, slug }) => (
          <Link to={`/shops/${slug}`}>
            <h1>{name}</h1>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Home;
