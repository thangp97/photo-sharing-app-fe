import { Navigate } from "react-router-dom";


function ProtectedRoute ({children}) {
    const user = localStorage.getItem('id');
    if(!user) {
        return <Navigate to="/" replace/>
    }
    return children;
}

export default ProtectedRoute;