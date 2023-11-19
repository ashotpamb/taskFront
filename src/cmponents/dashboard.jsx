import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();
    console.log(location.state.dashboard);
    const userData = location.state.dashboard; // Corrected the spelling here
    console.log(userData);
    const token = location.state?.token;

    return (
        <div className="container mt-5">
            <h2>Welcome to the Admin Dashboard</h2>
            {userData?.map((user, index) => (
                <div className="card mb-4" key={index}>
                    <div className="card-header">
                        User: {user.fullName}
                    </div>
                    <div className="card-body">
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.phoneNumber}</p>
                        <h5>Courses:</h5>
                        <ul className="list-group">
                            {user.courses.map((course) => (
                                <li className="list-group-item" key={course.id}>
                                    {course.courseName}
                                    <p className="text-muted">{course.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
