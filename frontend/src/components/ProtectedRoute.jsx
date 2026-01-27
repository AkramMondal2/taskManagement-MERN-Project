import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { login } from "../features/userSlice";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("id");

  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  useEffect(() => {
    if (token && id) {
      dispatch(login());
    }
    setCheckingAuth(false);
  }, [token, id, dispatch]);

  if (checkingAuth) {
    return null;
  }

  if (!isLoggedIn || !token || !id) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
