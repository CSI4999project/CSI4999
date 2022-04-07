import React, {useState, useEffect} from 'react';
import {Button} from './Button';
import {Link} from 'react-router-dom';
import './Navbar.css';


function Navbar(){
    const[click, setClick] = useState(false);
    const[button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
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
                    <Link to='/CSI4999' className='navbar-logo' onClick={closeMobileMenu}>
                        CryptoLearn
                        <i className='fab fa-typo3' />
                    </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/CSI4999' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Portfolio' className='nav-links' onClick={closeMobileMenu}>
                                Portfolio
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/TrackerPage' className='nav-links' onClick={closeMobileMenu}>
                                Tracker
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Students' className='nav-links' onClick={closeMobileMenu}>
                                Students
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/me' className='nav-links' onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;