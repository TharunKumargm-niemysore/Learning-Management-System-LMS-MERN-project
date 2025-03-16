import React from 'react'
import {Route, Routes,useMatch} from 'react-router-dom'
import Home from './components/pages/student/Home'
import CoursesList from './components/pages/student/CoursesList'
import CourseDetails from './components/pages/student/CourseDetails'
import MyEnrollments from './components/pages/student/MyEnrollments'
import Player from './components/pages/student/Player'
import Loading from './components/student/Loading'
import Educator from './components/pages/educator/Educator'
import Dashboard from './components/pages/educator/Dashboard'
import AddCourse from './components/pages/educator/AddCourse'
import MyCourses from './components/pages/educator/MyCourses'
import StudentsEnrolled from './components/pages/educator/StudentsEnrolled'
import Navbar from './components/student/navbar'
import "quill/dist/quill.snow.css";



const App = () => {

  // Navbar should be hidden to Educator(one who organize or teach)
  const isEducatorRoute=useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      { !isEducatorRoute && <Navbar />}
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList/>}/>
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails/>}/>
        <Route path='/my-enrollments' element={<MyEnrollments/>}/>
        <Route path='/player/:courseId' element={<Player/>}/>
        <Route path='/loading/:path' element={<Loading/>}/>
        <Route path='/educator' element={<Educator/>}>
            <Route path='/educator' element={<Dashboard/>}/>
            <Route path='add-course' element={<AddCourse/>}/>
            <Route path='my-courses' element={<MyCourses/>}/>
            <Route path='student-enrolled' element={<StudentsEnrolled/>}/>
            

        </Route>
      </Routes>
    </div>
  )
}

export default App
