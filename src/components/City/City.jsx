
import { NavLink } from 'react-router-dom';
import styles from './City.module.css';
import { UseCities } from '../../context/CitiesContext';
function City({city}) {
    const date = new Date(city.date);
    const {currentCity,DeleteCity} = UseCities();
    function handleDelete(e,id){
        e.preventDefault();
        DeleteCity(id)
    }
    return (
        <div className={styles.city_container} style={currentCity.id === city.id ? {border:'2px solid rgb(87, 43, 126)'} : {}}>
            <NavLink to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
                <div className={styles.city}>
                    <div className='grid'>
                        <div style={{marginRight:'10px'}}>{city.emoji}</div>
                        <div>{city.cityName}</div>
                    </div>
                    <div className='grid' style={{paddingRight:'10px'}}>
                        <div className={styles.date} style={{marginRight:'10px'}}>({date.toDateString()})</div>
                        <div className={styles.deletebtn}>
                            <div onClick={(e)=>handleDelete(e,city.id)} className={styles.deletespan}>x</div>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default City;