import './App.css';
import { Navbar } from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateForm } from './Components/CreateForm';
import { Home } from './Components/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/createpost' element={<CreateForm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
