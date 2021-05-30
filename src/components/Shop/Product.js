import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Product({ name, price, image }) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post("http://223.184.64.41:5000/chat/sendmessage/7406409774", {
        message: "Hello World",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className='product-tile'>
        <div className='product-overlay'>
          <button href='#' className='like-icon' onClick={() => handleClick()}>
            <i class='fas fa-heart'></i>
          </button>
          <button
            href='#'
            className='support-icon'
            onClick={() => setShow(true)}
          >
            <i class='fas fa-headset'></i>
          </button>
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
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName='modal-90w'
        aria-labelledby='example-custom-modal-styling-title'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            ✨Thank you for showing Interest! ✨
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Our Representative will reach out to you on{" "}
            <i class='fab fa-whatsapp'></i> whatsapp as soon as poosible!
          </p>
          <p>We look forward to serving you!</p>
          <p>
            Stay home stay safe! <i class='fas fa-praying-hands'></i>
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Product;
