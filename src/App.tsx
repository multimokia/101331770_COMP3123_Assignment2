import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { NotFoundPage } from './pages/404';
import { EmployeeListPage } from './pages/employees';
import { Login } from './pages/login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Signup } from './pages/signup';
import { UserContext, UserSession } from './components/UserContext';

const dark = createTheme({
    palette: {
        mode: "dark"
    }
});
export default function App() {
    return (
        <UserContext.Provider value={new UserSession()}>
            <ThemeProvider theme={dark}>
                <HashRouter basename="/">
                    <Routes>
                        <Route path="/">
                            <Route index element={<Login/>} />
                            <Route path="signup" element={<Signup/>} />
                            <Route path="employees" element={<EmployeeListPage/>} />
                            <Route path="*" element={<NotFoundPage/>} />
                        </Route>
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </UserContext.Provider>
    );
}
