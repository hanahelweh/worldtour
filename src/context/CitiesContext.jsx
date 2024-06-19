import { createContext, useContext, useEffect, useReducer } from "react";
const CitiesContext = createContext();
const initialState={
    cities:[],
    isLoading:false,
    currentCity:{}
};
function reducer(state,action){
    switch(action.type){
        case 'loading':
            return {...state,isLoading:true}
        case 'finally':
            return {...state,isLoading:false}
        case 'getCities_success':
            return {...state,isLoading:false,cities:action.payload};
        case 'currentCity_success':
            return {...state,isLoading:false,currentCity:action.payload}
        case 'city_created':
            return {...state,isLoading:false,cities:[...state.cities,action.payload]};
        case 'city_deleted':
            return {...state,isLoading:false,cities:state.cities.filter(city=>city.id!==action.payload)}
        default:
            throw new Error("Undefined action")
    }
}
function CitiesProvider({children}){
    const [{cities,isLoading,currentCity},dispatch]=useReducer(reducer,initialState);
    async function GetCities(){
        try{
            dispatch({type:'loading'});
            const res=await fetch("http://localhost:8000/cities");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            dispatch({type:'getCities_success',payload:data})
        }catch(error){
            console.log(error);
        }finally{
            dispatch({type:'finally'});
        }
    }
    async function GetCityInfo(id){
        if(Number(id)===currentCity.id) return;
        try{
            dispatch({type:'loading'});
            const res=await fetch(`http://localhost:8000/cities/${id}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            dispatch({type:'currentCity_success',payload:data})
        }catch(error){
            console.log(error);
        }finally{
            dispatch({type:'finally'});
        }
    }
    async function AddCity(city){
        try{
            dispatch({type:'loading'});
            const res=await fetch('http://localhost:8000/cities',{
                method:"POST",
                body:JSON.stringify(city),
                headers:{"Content-Type":"application/json"}
            });
            const data = await res.json();
            dispatch({type:'city_created',payload:data})
        }catch(error){
            console.log(error);
        }finally{
            dispatch({type:'finally'});
        }
    }
    async function DeleteCity(id){
        try{
            dispatch({type:'loading'});
            const res=await fetch(`http://localhost:8000/cities/${id}`,{
                method:"DELETE",
            });
            dispatch({type:'city_deleted',payload:id})
        }catch(error){
            console.log(error);
        }finally{
            dispatch({type:'finally'});
        }
    }
    useEffect(function(){
        GetCities();
    },[])
    return (<CitiesContext.Provider value={{
        isLoading,
        cities,
        GetCityInfo,
        currentCity,
        AddCity,
        DeleteCity
    }}>{children}</CitiesContext.Provider>);
}

function UseCities(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error('CitiesContext was used outside of the Cities Provider');
    return context;
}

export {CitiesProvider,UseCities}