import styles from './App.module.css'
import { Navbar } from './components/Navbar/Navbar'
import { Home } from './components/Home/Home'
import { UserProfile } from './components/Home/UserProfile'
import { Login } from './components/Login/Login'
import { Signup } from './components/Signup/Signup'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './components/Navbar/PrivateRoute'

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/' element={<UserProfile />} />
        {/* <Route path='/signup' element={<Signup />}/> */}
        {/* <Route path='/dashboard' element={<PrivateRoute element={<UserProfile />} />} /> */}
      </Routes>
    </div>
  )
}

export default App