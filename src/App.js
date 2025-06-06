import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content.js";
import ScanDetails from "./components/ScanDetails";
import CreateScan from "./components/CreateScan";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Forgot from "./components/Forgot";
import GetAllPage from "./components/getAllPage";
import PageDetails from "./components/PageDetails";
import Guidelines from "./components/guidelines.js";
import "./style/AppLayout.css"; // CSS for layout
import ProtectedRoute from "./ProtectedRoute";
import ChangePassword from "./components/ChangePassword"; // Import this at the top


const Layout = ({ children }) => {
    const location = useLocation();
    // const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
    const isAuthPage = ["/login", "/signup", "/forgot"].includes(location.pathname); // <-- Include Forgot page

    return (
        <div className="app-layout">
            {!isAuthPage && <Header />}
            <div className="main-content">
                {!isAuthPage && <Sidebar />}
                <div className="content-area">{children}</div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router >
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/change-password" element={<ChangePassword />} />
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}></Route>
                {/* Main App Layout */}
                <Route
                    path="/*"
                    element={
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Content />} />
                                <Route path="/scan-details" element={<ScanDetails />} />
                                <Route path="/create-scan" element={<CreateScan />} />
                                <Route path="/getAllPage" element={<GetAllPage />} />
                                <Route path="/PageDetails/:id" element={<PageDetails />} />
                                <Route path="/guidelines/" element={<Guidelines />} />
                            </Routes>
                        </Layout>
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
