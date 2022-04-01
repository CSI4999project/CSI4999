import React from 'react';
import'../App.css';
import {Button} from './Button';
import './TopSection.css';

function TopSection(){
    return(
        <div className='top-container'>
            <h1>LEARNING AWAITS</h1>
            <p>Join Now!!</p>
            <div class="top-btn">
                <Button classNAme='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                    Join a Classroom
                </Button>
                <Button classNAme='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
                    Make a Trade
                </Button>
            </div>
        </div>
    );
}

export default TopSection;