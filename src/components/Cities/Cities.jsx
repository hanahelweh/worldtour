import { UseCities } from "../../context/CitiesContext";
import City from "../City/City";

function Cities() {
    const {cities} = UseCities();
    return (
        <>
        {cities.map((city)=>(<City key={city.id} city={city}/>))}
        </>
    )
}

export default Cities
