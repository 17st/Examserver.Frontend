import React, { useState, useEffect} from "react";
import Course from "./course";
import { Button } from "reactstrap";

const Allcourses = () => {

    useEffect(() => {
        document.title = "All Courses";
    }, []);

    const[courses, setCourses] = useState([
        {title:"test-quiz-1", description:"This is just for beginner's, who want to learn JavaScript."},
        {title:"New Java Course", description:"This is just for beginner's, who want to learn Java."},
        {title:"New ReactJs Course", description:"This is just for beginner's, who want to learn ReactJs."}
    ])

    return(
        <div>
            <h1>All Courses</h1>
            <p>List of courses are as follows</p>

            {
                courses.length>0 ? courses.map((item)=>
                    <Course Course={item}/>
                ) : "No Courses"
            }
        </div>
    );
}

export default Allcourses;