import react from 'react';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage.js';

function Home(){
    return(
        <>
        <HomePage/>
        <Cards />
        <Footer/>
        </>
    );
}

export default Home;