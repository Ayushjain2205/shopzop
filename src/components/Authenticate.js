import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { loginUser } from "../services/magic";
const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!email) {
      setLoading(false);
      setError("Email is Invalid");
      return;
    }
    try {
      await loginUser(email);
      setLoading(false);
      history.replace("/home");
    } catch (error) {
      setError("Unable to log in");
      console.error(error);
    }
  };
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div className='login-page'>
      <div className='login-box mt-5 mx-auto'>
        <h1 className='brand text-center'>
          <i class='fas fa-people-carry'></i> ShopZop
        </h1>
        <h4 className='tagline'>Empower Businesses with one click!</h4>
        <Form onSubmit={handleSubmit} className='p-2 my-4 mx-auto'>
          <FormGroup className='mt-3' controlId='formBasicEmail'>
            <FormLabel id='login-label' fontSize='sm'>
              Enter Email Address
            </FormLabel>
            <FormControl
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={handleChange}
              placeholder='Email Address'
            />
            <p className='text-danger text-small'>{error}</p>
          </FormGroup>
          <Button
            id='submit-login'
            type='submit'
            size='md'
            className='d-block w-100'
          >
            {loading ? "Loading..." : "Send"}
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Authenticate;
