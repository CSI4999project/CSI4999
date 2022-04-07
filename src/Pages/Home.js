import react from 'react';
import '../App.css';
import TopSection from '../components/TopSection';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import HomePage from "../components/HomePage.js"

function Home(){
    return(
        <>
        <HomePage></HomePage>
        <Cards />
        <Footer/>
        </>
    );
}

export default Home;