import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
    [key: string]: any;
}

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};

const PrivateRoute = () => {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);

    if (!token || isTokenExpired(token)) {
        logout();
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
