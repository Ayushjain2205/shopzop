import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Catlog from "./Catlog";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";

const handleOnClick = () => {
  if (navigator.share) {
    navigator
      .share({
        title: `ShopName`,
        text: `Check out Shop on ShopZop`,
        url: document.location.href,
      })
      .then(() => {
        console.log("Successfully shared");
      })
      .catch((error) => {
        console.error("Something went wrong sharing the blog", error);
      });
  }
};

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <div className='card'>
      <img
        className='card-image'
        src={`https://media.graphcms.com/${props.shop.logo.handle}`}
        alt=''
      />
      <h2 className='card-title'>{props.shop.name}</h2>
      <span className='card-category'>{props.shop.category}</span>
      <div className='card-item'>
        <span className='card-location'>
          <i class='fas fa-map-marker-alt'></i>Bangalore
        </span>
        <span className='card-rating'>
          <i class='fas fa-star-half-alt'></i> {props.shop.rating}
        </span>
      </div>
      <div className='card-item'>
        <span className='card-shipping'>
          <i class='fas fa-shipping-fast'></i>Shipping available
        </span>
        <span></span>
      </div>
    </div>
  </div>
));

function Shop({ shops }) {
  const { slug } = useParams();

  const shop = shops.find((shop) => shop.slug === slug);
  const componentRef = useRef();

  return (
    <div>
      <Navbar />
      <div className='shop-page-div'>
        <div className='shop-title'>
          <h1>{shop.name}</h1>
        </div>

        <div className='top-card'>
          <ComponentToPrint ref={componentRef} shop={shop} />
          <div className='description-card'>
            <div className='description-holder'>
              <div className='shop-image'>
                <img
                  className='shopImg'
                  src={`https://media.graphcms.com/${shop.shopPicture.handle}`}
                  alt=''
                />
              </div>
              <div className='shop-description'>
                <h4>Decription:</h4>
                <div>{ReactHtmlParser(shop.description.html)}</div>
                <h4>
                  <i class='fas fa-link'></i>
                  <a
                    href={shop.websiteLink}
                    target='_blank'
                    className='link'
                    rel='noreferrer'
                  >
                    Check website
                  </a>
                </h4>
                <h4>
                  <i class='fab fa-google'></i>
                  <a
                    href={shop.googleLink}
                    target='_blank'
                    className='link'
                    rel='noreferrer'
                  >
                    Check google reviews
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className='btn-holder'>
          <button
            className='image-btn'
            onClick={() => exportComponentAsPNG(componentRef)}
          >
            Export As PNG
          </button>
          <button className='image-btn' onClick={() => handleOnClick}>
            Share Shop card
          </button>
        </div>
        <Catlog products={shop.products} />
      </div>
    </div>
  );
}

export default Shop;
