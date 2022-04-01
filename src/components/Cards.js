import React from 'react';
import CardItem from '../components/CardItem';
import './Cards.css'

function Cards() {
    return(
        <div className='cards'>
            <h1>WARNING! Remember this is a simulation, so results may be different when trading with real money. ALWAYS make sure to do you research before investing!!</h1>
            <p>         </p>
            <h1>Check Out Our Amenities!</h1>
            <div className='cards__container'>
                <div className='Cards__wrapper'>
                    <ul className='cards__items'>
                       <CardItem src='Images/Tracker.jpg'
                        text='See whats top of the market with our cryto tracker.'
                        label='tracker'
                        path='/TrackerPage'/>
                        <CardItem src='Images/Portfolio.jpg'
                        text='Keep track of all your trading on your portfolio.'
                        label='profile'
                        path='/Portfolio'/>
                    </ul>
                    <ul className='cards__items'>
                        <CardItem src='Images/Classroom.jpg'
                        text='Join a creators classroom now!'
                        label='classroom'
                        path='/'/>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;