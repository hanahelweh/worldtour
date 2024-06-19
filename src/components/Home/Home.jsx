import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className={styles.home}>
            <div className='flexi'>
                <div className={styles.image}></div>
                <div className={styles.home_title}>worldtour</div>
                <div>
                    <div className={styles.home_description}>Discover and mark your favorite places with ease using our interactive map. Simply choose a location and place a marker to pinpoint specific spots, making it effortless to track and share your preferred destinations.</div>
                </div>
                <Link to="/dashboard">
                    <div className={styles.main_btn}>Go To Dahsboard</div>
                </Link>
            </div>
        </div>
    )
}

export default Home;
