import styles from './Pricing.module.css';
import Navbar from '../Navbar/Navbar';
function Pricing() {
    return (
        <div className='flexi'>
            <Navbar />
            <div className={styles.pricing}>
                Pricing
            </div>
        </div>
    )
}

export default Pricing
