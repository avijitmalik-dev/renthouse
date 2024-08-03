import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, AuthRequire } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageloader, singlePageloader } from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader : listPageloader 
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader : singlePageloader
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },
    {
      path:"/",
      element:<AuthRequire/>,
      children:[
      { path:"/profile", element:<ProfilePage/> },
      { path:"/profile/update", element:<ProfileUpdatePage/> },
      { path:"/profile/createnewpost", element:<NewPostPage/> }
    ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
