import React from 'react';
import { Button } from './Button';
import '../App.css';
import './HeroSection.css';


function HeroSection(){
    return(
        <div className='hero-container'>
            <h1>LEARNING AWAITS</h1>
            <p>What are you waiting for?</p>
            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--outline'
                buttonStyle='btn--large'> LETS GAME!
                </Button>
                <Button className='btns' buttonStyle='btn--primary'
                buttonStyle='btn--large'>
                    WATCH TRAILER <i className='far fa-play-circle'/> 
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;