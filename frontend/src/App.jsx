import "./App.css";
import AllTask from "./pages/AllTask";
import CompletedTask from "./pages/CompletedTask";
import Home from "./pages/Home";
import ImportantTask from "./pages/ImportantTask";
import IncompletedTask from "./pages/IncompletedTask";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import EmailVerify from "./pages/EmailVerify";
import ProtectedRoute from "./components/ProtectedRoute";
import ResendVerification from "./pages/ResendVerification";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route index element={<AllTask />} />
            <Route path="importantTask" element={<ImportantTask />} />
            <Route path="inCompletedTask" element={<IncompletedTask />} />
            <Route path="completedTask" element={<CompletedTask />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resendVerification" element={<ResendVerification />} />
        <Route path="/emailVerify/:token" element={<EmailVerify />} />
        <Route path="/forgatePassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
