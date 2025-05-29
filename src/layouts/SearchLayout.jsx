import { Outlet } from 'react-router-dom';
import Search from '../components/Search';
import Header from '../components/Header';
import Footer from '../components/Footer';


function SearchLayout() {
    return (
        <>
            <Header />
            <Search />
            <Outlet />
            <Footer />
        </>
    );
}

export default SearchLayout