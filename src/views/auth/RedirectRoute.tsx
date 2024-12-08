import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice"; // Adjust path to your action creators

const RedirectRoute = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const dispatch = useDispatch();

  useEffect(() => {
    // Extract the 'data' query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const dataString = queryParams.get("data");
    if (dataString) {
      try {
        const parsedData = JSON.parse(dataString);
        dispatch(setUser(parsedData.data));
        console.log(parsedData.data.data.user.role.title);
        console.log(parsedData.data.token);
        const expirationTime = Date.now() + 12 * 60 * 60 * 1000; // Set expiration to 12 hours
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: parsedData.data.token,
            role: parsedData.data.data.user.role.title,
            expiration: expirationTime,
          })
        );

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
