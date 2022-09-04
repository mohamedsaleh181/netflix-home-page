import "./App.css";
import HomeScreen from "./pages/homeScreen/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/loginScreen/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./pages/profileScreen/ProfileScreen";
import SignIn from "./pages/signInScreen/SignIn";
import SignUp from "./pages/signUp/SignUp";
import MovieDetails from "./pages/movieDetails/MovieDetails";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // to know wich accout is loggin when refresh or start the app
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // logged out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <BrowserRouter>
        {!user ? (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            {/* <Route path="details" element={<MovieDetails />}>
              <Route path=":id" element={<MovieDetails />} />
            </Route> */}
          </Routes>
        )}
        {/* <HomeScreen/> */}
      </BrowserRouter>
    </>
    //   <BrowserRouter >
    // {!user ? <Login/>
    //   :(<Routes>
    //     <Route path="/" element={<HomeScreen />} />
    //   </Routes>)
    // }

    // </BrowserRouter>
  );
}

export default App;
