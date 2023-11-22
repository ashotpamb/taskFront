import React, { useState, useEffect } from 'react';
import { fetchUserData, getCourses, userData } from "../api/api"
import { saveUserCourses } from "../api/api"
import { removeUserCourse } from "../api/api"
import { useHistory, Redirect } from 'react-router-dom';
import { handleUnAuthorized } from '../api/utils';



const UserComponent = (props) => {
    const { location } = props;
    const { token } = location.state;
    const [userData, setUserData] = useState({
        courses: [],
    });
    const [ auth, setAuth] = useState(Boolean(token));
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    console.log(userData, 'userDatauserData');


    useEffect(() => {
        async function getUserdata1 () {
            try {
                 const userData1 = await fetchUserData();
                 setUserData(userData1.data)
            } catch (e) {
                console.log(e);
            }
        }

        getUserdata1()
        async function fetchCourses() {
            try {
                const courseData = await getCourses();
                setCourses(courseData);
            } catch (error) {
                alert(error.response.data)
            }
        }
        fetchCourses();
    }, []);

    const handleRemoveCourse = async (courseIdToRemove) => {
        try {
            const response = await removeUserCourse(courseIdToRemove);
            console.log(response,'response');
            setUserData({ ...userData, courses: response.courses });
        } catch (error) {
            handleUnAuthorized(error)
        }
    };

    const handleSaveCourses = async () => {
        try {
          const response = await saveUserCourses( selectedCourses.map(id => encodeURIComponent(id)).join('%2C'));
          setUserData({ ...userData, courses: response.courses });

        } catch (error) {
            handleUnAuthorized(error)
        }
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setAuth(Boolean(localStorage.getItem('token')));
        }
        window.addEventListener('storage', handleStorageChange);

         return ( ) => window.removeEventListener('storage', handleStorageChange)

    }, [])


    if( !localStorage.getItem('token')  && !auth) {
       return <Redirect to='login' />
    }

    return (
        <div className="container mt-5">
            <h2>User Information</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Personal Details</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>First Name:</strong> {userData.firstName}
                                </li>
                                <li className="list-group-item">
                                    <strong>Last Name:</strong> {userData.lastName}
                                </li>
                                <li className="list-group-item">
                                    <strong>Email:</strong> {userData.email}
                                </li>
                                <li className="list-group-item">
                                    <strong>Date of Birth:</strong> {userData.formattedDateOfBirth}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Contact Information</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Phone Number:</strong> {userData.phoneNumber}
                                </li>
                                <li className="list-group-item">
                                    <strong>Address:</strong> {userData.address}
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Selected Courses</h5>
                                <ul className="list-group list-group-flush">
                                    {userData && userData.courses && userData.courses.length > 0 ? (
                                        userData.courses.map((course, index) => (
                                            <li className="list-group-item d-flex justify-content-between" key={index}>
                                                <div>
                                                    {course.courseName}
                                                    {course.description && (
                                                        <span className="ms-2 text-muted">Description: {course.description}</span>
                                                    )}
                                                </div>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleRemoveCourse(course.id)}
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item">No courses selected</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">Select Course</h5>
                        <select
                            className="form-select"
                            aria-label="Select Course"
                            multiple
                            value={selectedCourses}
                            onChange={(e) => {
                                const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
                                setSelectedCourses(selectedIds);
                            }}
                        >
                            {courses &&
                                courses.map((course) => (
                                    <option
                                        key={course.id}
                                        value={course.id}
                                        selected={selectedCourses}
                                        disabled={
                                            userData.courses.findIndex((o) => o.id === course.id) !== -1
                                        }
                                    >
                                        {course.courseName}
                                    </option>
                                ))}
                        </select>

                        <button className="btn btn-primary mt-3" onClick={handleSaveCourses}>
                            Save Courses
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComponent;
