import React, { useState, useEffect } from 'react';
import { getCourses } from "../api/api"
import { saveUserCourses } from "../api/api"
import { removeUserCourse } from "../api/api"

const UserComponent = (props) => {
    const { location } = props;
    const { userData: initialUserData, token } = location.state;
    const [userData, setUserData] = useState(initialUserData);
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);


    useEffect(() => {
        async function fetchCourses() {
            try {
                const courseData = await getCourses();
                setCourses(courseData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    const handleRemoveCourse = async (courseIdToRemove) => {
        try {
            const response = await removeUserCourse(courseIdToRemove, token);
            console.log(response);
            setUserData({ ...userData, courses: response.data.model });


        } catch (error) {
            console.error('Error removing course:', error);
        }
    };

    const handleSaveCourses = async () => {
        try {
            await saveUserCourses(token, selectedCourses.map(id => encodeURIComponent(id)).join('%2C'));

        } catch (error) {
            alert(error)
            console.error('Error saving courses:', error);
        }
    };
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
                                            selectedCourses.findIndex((o) => o.id === course.id) !== -1
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
