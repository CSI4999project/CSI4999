import React from 'react';
import'../App.css';
import {Button} from './Button';
import './TopSection.css';
import HomeVideo from './videos/dots_lines_background.mp4';

function TopSection(){
    return(
        <div className='top-container'>
            <video src={HomeVideo} autoPlay loop muted />
            <h1>Welcome to IDKCrypto</h1>
            <p>Join Now!!</p>
            <div className='top-btns'>
                <Button className='btn' buttonStyle='btn--outline' buttonSize='btn--large'>
                    Become an Instructor
                </Button>
                <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'>
                    Sign up as a User 
                </Button>
            </div>
        </div>
    );
}

export default TopSection;