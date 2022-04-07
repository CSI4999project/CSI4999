import react from 'react';
import '../App.css';
import TopSection from '../components/TopSection';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

function Home(){
    return(
        <>
        <TopSection/>
        <Cards />
        <Footer/>
        </>
    );
}

export default Home;