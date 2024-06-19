import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Cities from './components/Cities/Cities';
import Countries from './components/Countries/Countries';
import CityInfo from './components/CityInfo/CityInfo';
import Form from './components/Form/Form';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='dashboard' element={<Dashboard/>}>
          <Route index element={<Navigate replace to='cities'/>}/>
          <Route path='cities' element={<Cities/>}/>
          <Route path='cities/:id' element={<CityInfo />}/>
          <Route path='countries' element={<Countries/>}/>
          <Route path='form' element={<Form />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
