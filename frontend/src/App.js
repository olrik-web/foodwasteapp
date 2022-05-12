import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Nav from "./components/Nav";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import DetailsPage from "./pages/DetailsPage";
import MyPosts from "./pages/MyPosts";
import FavoritePage from "./pages/FavoritePage";


export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // default value comes from localStorage

    // variable holding all private routes including the nav bar
    const privateRoutes = (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                 <Route path="/posts/:postId" element={<DetailsPage />} />
                <Route path="/posts/:postId" element={<UpdatePage />} />
                <Route path="/profile" element={<ProfilePage setAuth={setIsAuth} />} />
                <Route path="/favorite" element={<FavoritePage/>} />
                <Route path="/myPosts" element={<MyPosts/>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );

  // variable holding all public routes without nav bar
  const publicRoutes = (
    <Routes>
      <Route path="/sign-in" element={<SignInPage setAuth={setIsAuth} />} />
      <Route path="/sign-up" element={<SignUpPage setAuth={setIsAuth} />} />
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );

  // if user is authenticated, show privateRoutes, else show publicRoutes
  // also, display or display not the <Loader/> based on showLoader state
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}
