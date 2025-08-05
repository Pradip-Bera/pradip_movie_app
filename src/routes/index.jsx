import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Details from "../pages/Details";
import Search from "../pages/Search";
import Profile from "../components/Profile";
import Profiledetails from "../components/Profiledetails";
import Login from "../components/Login";

const router = createBrowserRouter([
      {
        path:"/",
        element:<App/>,
        children : [
          {
              path : "",
              element : <Home/>
          },
          {
              path : ":explore",
              element : <Explore/>
          },
           {
              path : ":explore/:id",
              element : <Details/>
          },
           {
              path : "search",
              element : <Search/>
          },
        { 
          path: "profile",
          element: <Profile /> 
        },
        { 
          path: "profiledetails", 
          element: <Profiledetails/> 
        },
         {
        path: "/login",
        element: <Login /> 
       },
        ]
      }
])

export default router;
