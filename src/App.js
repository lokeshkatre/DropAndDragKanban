import Navbar from "./components/Navbar/Navbar";
import Priority from "./components/Priority/Priority";
import Status from "./components/Status/Status";
import User from "./components/User/User";
import { DataProvider } from "./DataContext/DataContext";
import {BrowserRouter,Route,Routes} from 'react-router-dom';


function App() {
  
  return (
    <DataProvider>
     <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Status/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/priority' element={<Priority/>}/>
        </Routes>
     </BrowserRouter>
    </DataProvider>
  );
}

export default App;
