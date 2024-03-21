import './App.css';
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import MyCohortPage from './pages/MyCohortPage/MyCohortPage'
import CohortsPage from './pages/CohortsPage/CohortsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage'
import EditProfilePage from './pages/EditProfilePage/EditProfilePage'
import ProjectPage from './pages/ProjectPage/ProjectPage'
import EditProjectPage from './pages/ProjectPage/EditProjectPage';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useUsers } from './context/UserContext'
import { useProjects } from './context/ProjectContext'
import { Button, Container } from 'react-bootstrap'
import Cookies from 'js-cookie'


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID


function App() {
  const [userData, setUserData] = useState({})
  const [loggedIn, SetLoggedIn] = useState(false)
  const { addUser } = useUsers()
  const { getProjects, projects } = useProjects()
  const navigate = useNavigate()

useEffect(() => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString) 
  const codeParam = urlParams.get('code')
  
  const fetchUserData = async () => {
    if (codeParam && !localStorage.getItem('accessToken')) {
      getAccessToken(codeParam)
    }
    if (localStorage.getItem('accessToken')) {
      await getUserData()
      SetLoggedIn(true)
    }
  }
  fetchUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []) // empty array to make the use effect only run once

  const getAccessToken = async (codeParam) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getAccessToken?code=${codeParam}`, {
        method:'GET'
      })
      const data = await response.json()
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token) // setItem does not force a rerender on react. We want it to so we can show a state with the user being logged in
        SetLoggedIn(true)
        getUserData()
        }
      } catch (error) {
        console.error("Error fetching access token:", error)
      }
    }


const getUserData = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getUserData`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken')
      }
    })
    const data = await response.json()
    if (data.login) {
      setUserData(data)
      console.log('User data logged')
    } else {
      console.error('Github user incorrect')
    }
  } catch (error) {
    console.error('error fetching user data:', error)
  }
}


const handleLogout = () => {
  localStorage.removeItem('accessToken')
  Cookies.remove('userData')
  SetLoggedIn(false)
  setUserData({})
  navigate('/')
}

useEffect(() => {
  if (userData.login) {
    loginUser()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userData.login])

useEffect(() => {
  getProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

async function loginUser() {
  const newUser = {
    username: userData.login,
    gitUrl: userData.html_url,
    userAvatar: userData.avatar_url
  }
  if (userData.login) {
    await addUser(newUser)
  } else {
    console.error("No username available in userData")
  }
}

  function gitHubLogin(){ 
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
  }

  return (
    <div className="App">
      <main>
        <NavBar 
          loggedIn={loggedIn} 
          handleLogout={handleLogout} 
          userData={userData}
          gitHubLogin={gitHubLogin}
        />
        <Container id='viewContainer'>
        <div className='login'>
          <div className='login-content'>
            <div className="ccc-image"></div> 
            {!loggedIn ? (
              <Button onClick={gitHubLogin} className='github-button'>
              </Button>
            ) : null }
          </div>
        </div>
        <hr/>
          <Routes>
            <Route path='/' element={ <HomePage userData={userData}/> } />
            <Route path='/about' element={ <AboutPage userData={userData}/> } />
            <Route path='/mycohort' element={ <MyCohortPage /> } />
            <Route path='/cohorts' element={ <CohortsPage /> } />
            <Route path='/cohorts/:cohortId' element={ <CohortsPage /> } />
            <Route path='/profilepage/:username' element={ <ProfilePage userData={userData} loggedIn={loggedIn}/> } />
            <Route path='/editprofilepage' element={ <EditProfilePage userData={userData}/> } />
            <Route path='/login' />
            <Route path='/projects/:_id' element={ <ProjectPage projects={projects} userData={userData}/>} />
            <Route path='/editprojectpage/:projectId' element={<EditProjectPage />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;