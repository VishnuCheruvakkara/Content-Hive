import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "./NavigationService";

const NavigationRegistrar = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigator(navigate);
    }, [navigate]);

    return null; // does not render anything
};

export default NavigationRegistrar;
