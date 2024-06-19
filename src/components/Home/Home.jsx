import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Home() {
    return (
        <div className={styles.home}>
            <div className='flexi'>
                <Navbar />
                home
                <Link to="/dashboard">
                    <div>Go To Dahsboard</div>
                </Link>
            </div>
        </div>
    )
}

export default Home;
