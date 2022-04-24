import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/Disclaimer'>Disclaimer</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/Report'>Report</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Teachers</Link>
            <Link to='/'>Influencers</Link>
          </div>
        </div>
      </div>
          <div className='footer-logo'>
            <p className='social-logo'>
              idkCrypto
              <i className='fab fa-typo3' />
            </p>
          </div>
          <small className='website-rights'>idkCrypto © 2022</small>
        </div>
  );
}

export default Footer;