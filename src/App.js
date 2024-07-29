import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/Register.css'
import Login from './components/Login';
import RegisterForm from './components/Register';

function App() {
  return (
      <>
    <Router>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<RegisterForm />} />
    </Routes>
    </Router>
    </>
  );
}

export default App;


// deploy app by these cmd 

// npm run build
// netlify deploy --dir=build



//for icon
//npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
