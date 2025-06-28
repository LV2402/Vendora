import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './layout/header';
import Footer from './layout/footer';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Profile from './pages/profile';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;