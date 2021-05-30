import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { logoutUser } from "../../services/magic";
import Button from "react-bootstrap/Button";

function Navbar() {
  const { email } = useContext(UserContext);
  const history = useHistory();
  const handleLogOut = async () => {
    try {
      await logoutUser();
      history.replace("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className='navbar'>
      <div class='nav-items'>
        <Link to='/home'>
          <h1>
            <i class='fas fa-people-carry'></i> ShopZop
          </h1>
        </Link>
        <div className='left-item mr-auto'>
          <Button id='logout' onClick={handleLogOut}>
            <h2 className='left-heading'>
              Logout {"  "}
              <i class='fas fa-sign-out-alt'></i>
            </h2>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
