import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to='/login' />;
    if(allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

    return children;
}

export default ProtectedRoute;