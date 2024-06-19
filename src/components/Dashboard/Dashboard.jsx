import styles from './Dashboard.module.css';
import { CitiesProvider } from '../../context/CitiesContext';
import SideDash from '../SideDash/SideDash';
import Map from '../Map/Map';
function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <CitiesProvider>
                <SideDash />
                <Map />
            </CitiesProvider>
        </div>
    );
}
export default Dashboard;
