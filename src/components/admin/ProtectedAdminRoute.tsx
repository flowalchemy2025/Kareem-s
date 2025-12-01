import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return <Navigate to="/secret-admin-login" />;
    return children;
};

export default ProtectedAdminRoute;
