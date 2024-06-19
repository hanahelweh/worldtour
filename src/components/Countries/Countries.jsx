import { UseCities } from "../../context/CitiesContext";
import Country from "../Country/Country";
import styles from './Countries.module.css';

function Countries() {
    const {cities} = UseCities();
    const countries = cities.reduce((acc,city)=>{
        if(!acc.map((el)=>el.country).includes(city.country))
            return [...acc, {country:city.country,emoji:city.emoji,id:city.id}]
        else return acc;
    },[])
    return (
        <div className='grid'>
            {countries.map((country)=><Country key={country.id} country={country}/>)}
        </div>
    )
}

export default Countries
