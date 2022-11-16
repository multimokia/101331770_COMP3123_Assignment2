import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { NotFoundPage } from './pages/404';
import { EmployeeListPage } from './pages/employees';
import { Login } from './pages/login';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const dark = createTheme({
    palette: {
        mode: "dark"
    }
});
export default function App() {
    return (
        <ThemeProvider theme={dark}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Login/>} />
                        <Route path="employees" element={<EmployeeListPage/>} />
                        <Route path="*" element={<NotFoundPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
