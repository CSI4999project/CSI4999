import React, {useState, useEffect, useContext} from 'react';
import {Button} from './Button';
import {Link} from 'react-router-dom';
import { UserContext } from '../context/userContext';
import './Navbar.css';


function Navbar(){
    let {user, setUser} = useContext(UserContext)
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



    console.log(user.type)
    console.log('from navbar')
    return(
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/CSI4999' className='navbar-logo' onClick={closeMobileMenu}>
                        idkCrypto
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
                            <Link to='/Tracker' className='nav-links' onClick={closeMobileMenu}>
                                Tracker
                            </Link>
                        </li>
                        {
                            user?.type == 'User'
                            ?
                            <li className='nav-item'>
                                <Link to='/Portfolio' className='nav-links' onClick={closeMobileMenu}>
                                    Portfolio
                                </Link>
                            </li>
                            :
                            ''
                        }
                        
                        {
                            user?.type == 'Instructor' 
                            ?
                        <li className='nav-item'>
                            <Link to='/Students' className='nav-links' onClick={closeMobileMenu}>
                                Students
                            </Link>
                        </li>
                            :
                            ''
                        }
                        
                        { user ? 
                        <li className='nav-item'>
                            <Link to='/me' className='nav-links' onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </li> : ''}
                        
                        { user ? 
                        <li className='nav-item'>
                            <Link to='/chat' className='nav-links' onClick={closeMobileMenu}>
                                Chat
                            </Link>
                        </li> : ''}


                        
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
                    
                    {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;