import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
export default function Logout({ setSession }) {
    const navigate = useNavigate();
    useEffect(() => {
        setSession(null);
        localStorage.removeItem('session');
        navigate("/");
    }, [setSession, navigate]);
    
}
