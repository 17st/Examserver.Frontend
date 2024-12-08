import React, { useState } from 'react';
import './App.css';
import { Button, Col, Container, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Home from './components/Home';
import Allcourses from './components/LiveContest';
import AddCourse from './components/Addcourse';
import Header from './components/Header';
import LiveContest from './components/LiveContest'
import createTest from './components/createTest';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import NavigationBar from "./components/Navbar"; // Import the new Navbar
import ResultsPage from "./components/ResultsPage";
import PracticeTest from './components/PracticeTest';

function App() {


  const [disableLiveContest, setDisableLiveContest] = useState(false);

  const btnhandle = () => {
    toast.error("Done!", {
      position: "top-center",
    });
  };

  return (
    <div>
      <Router>
      <ToastContainer/>
      <Header/>
      <NavigationBar /> {/* Add the navigation bar */}
      <Container>

        <Row>
          {/* <Col md={4}>
            <Menus/>
          </Col>
          <Col md={8}> */}
          <Routes>
            <Route path='/' Component={Home} exact/> 
            <Route path='/add-course' Component={AddCourse} exact/>
            <Route path='/view-course' Component={Allcourses} exact/>
            <Route path='/live-contest' Component={LiveContest} exact/>
            <Route path='/create-test' Component={createTest} exact/>
            <Route path="/quiz/:quizId" element={<QuizPage />} />
            <Route path="/practice-test" element={<PracticeTest />} />
            <Route path="/results" element={<ResultsPage />} /> {/* New Route */}
          </Routes>
          {/* </Col> */}
        </Row>
      </Container>
      </Router>
    </div>
  );
}

export default App;
