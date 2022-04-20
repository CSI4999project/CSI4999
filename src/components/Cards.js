import  {React, useContext} from 'react';
import CardItem from './CardItem';
import './Cards.css'
import Tracker from './Images/Tracker.jpg';
import Portfolio from './Images/Portfolio.jpg';
import Classroom from './Images/Classroom.jpg';
import Trade from './Images/Trading.jpg';
import PastTrade from './Images/PastTrade.jpg';
import Students from './Images/Students.jpg';
import { UserContext } from '../context/userContext';
function Cards() {
    let {user, setUser} = useContext(UserContext)
    return(
        <div className='cards'>
            <h1> </h1>
            <div className='cards'>
            </div>
            <div className='cards'>
            </div>
            <div className='cards__container'>
                <div className='Cards__wrapper'>
                    <ul className='cards__items'>
                       <CardItem src={Tracker}
                        text='See whats top of the market with our cryto tracker.'
                        label='Tracker'
                        path='/Tracker'/>
                        {user?.type == "User" ? 
                        <CardItem src={Trade}
                        text='Make a Simluated Trade.'
                        label='Trade'
                        path='/'/> : ""
                        }
                    </ul>
                    <ul className='cards__items'>
                        {user?.type == "User" ?                         
                        <CardItem src={Portfolio}
                        text='Keep track of all your trading on your portfolio.'
                        label='Profile'
                        path='/Portfolio'/>: ""}
                        {user?.type == "User" ?                         
                        <CardItem src={Classroom}
                        text='Join a creators classroom now!'
                        label='Classroom'
                        path='/'/>: ""}
                    </ul>

                    <ul className='cards__items'>
                        {user?.type == "Instructor" ? 
                        <CardItem src={Classroom}
                        text='Set up a classroom for your students!'
                        label='Classroom'
                        path='/'/>
                        : ""}
                        {user?.type == "Instructor" ?
                        <CardItem src={Students}
                        text='Look at all the trades your students are making.'
                        label='Interaction'
                        path='/'/>
                        :""}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;