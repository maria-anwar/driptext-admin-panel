import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice" // Adjust path to your action creators

const RedirectRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Get the location object
  const dispatch = useDispatch();

  useEffect(() => {
    // Extract the 'data' query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const dataString = queryParams.get("data");

    if (dataString) {
      try {
        // Decode and parse the 'data' parameter
        const decodedData = decodeURIComponent(dataString);
        const parsedData = JSON.parse(decodedData);

        // Store user data in Redux using dispatch
        dispatch(setUser(parsedData));

        // Store data in localStorage (token, role, and expiration)
        const expirationTime = Date.now() + 12 * 60 * 60 * 1000; // Set expiration to 12 hours
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: parsedData.data.token,
            role: parsedData.data.data.user.role.title,
            expiration: expirationTime,
          })
        );
        localStorage.setItem("userData", JSON.stringify(parsedData));
        navigate("/dashboard");
      } catch (error) {
        console.error("Error parsing 'data' from URL:", error);
       window.open("https://driptext-app.vercel.app", "_self");  
      }
    } else {
      console.error("No data parameter found in URL");
      window.open("https://driptext-app.vercel.app", "_self"); 
    }
  }, [navigate, location.search, dispatch]);

  return null; 
};

export default RedirectRoute;
