import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading';

const TutorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <Loading/>
    }

    if (!user || role !== 'tutor') {
        return <Navigate state={{ from: location.pathname }} to="/dashboard/forbidden"></Navigate>
    }

    return children;
};

export default TutorRoute;