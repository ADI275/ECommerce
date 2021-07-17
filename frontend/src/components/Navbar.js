import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
    const {cart}=props;
    const {user}=props;
    const {setuser}=props;
    const {setcart}=props;
    const signoutHandler=()=>{
        setuser(null);
        setcart({cartItems: [],shippingAddress: {}});
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
    };
    return (
        <div className="pos-f-t">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-4">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/cart">
                            Cart{ (cart.cartItems.length>0)&&<span className="badge itemcount">{cart.cartItems.length}</span> }
                        </Link>
                        </li>
                        <li className="nav-item" style={{marginRight: '1em'}}>
                        {
                            user?(
                            <div className="dropdown">
                                <Link className="nav-link active" to='#'>{user.name} {' '}<i className="fa fa-caret-down"></i></Link>
                                <div className="dropdown-content">
                                    <div style={{padding: '0.5em'}}><Link className="signout" to="#signout" onClick={signoutHandler}>Sign-Out?</Link></div>
                                    <div style={{padding: '0.5em'}}><Link className="signout" to="/orderhistory">Order History</Link></div>
                                    <div style={{padding: '0.5em'}}><Link className="signout" to="/profile">User Profile</Link></div>
                                </div>
                            </div>
                            )
                            :(<Link className="nav-link active" to="/signin">Sign In</Link>)
                        }
                        </li>
                    </ul>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand m-2" to="/">Amazon</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse prop" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/cart">
                            Cart{ (cart.cartItems.length>0)&&<span className="badge itemcount">{cart.cartItems.length}</span> }
                        </Link>
                        </li>
                        <li className="nav-item" style={{marginRight: '1em'}}>
                        {
                            user?(
                            <div className="dropdown">
                                <Link className="nav-link active" to='#'>{user.name} {' '}<i className="fa fa-caret-down"></i></Link>
                                <div className="dropdown-content">
                                    <div style={{padding: '0.5em'}}><Link className="signout" to="#signout" onClick={signoutHandler}>Sign-Out?</Link></div>
                                    <div style={{padding: '0.5em'}}><Link className="signout" to="/orderhistory">Order History</Link></div>
                                    <div style={{padding: '0.5em'}}><Link className="signout" to="/profile">User Profile</Link></div>
                                </div>
                            </div>
                            )
                            :(<Link className="nav-link active" to="/signin">Sign In</Link>)
                        }
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
 
export default Navbar;