import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import {Button} from './Button';

function Navbar(){
    const [click, setClick] = useState(false);
    const[button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerwidth <= 960) {
            setButton(false);
        }else{
            setButton(true);
        }
    };

    useEffect(() =>{
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return(
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo'onClick={
                        closeMobileMenu}>
                        Lets get this Money!<i clasName='fab fa-type3'/>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/crypto' className='nav-links' onClick={closeMobileMenu}>
                                Crypto
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/game' className='nav-links' onClick={closeMobileMenu}>
                                Game
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links' onClick={closeMobileMenu}>
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;