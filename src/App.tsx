import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedResource from './common/protectedResource';
import LoginPage from './pages/loginPage';
import DashboardPage from './pages/dashboardPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedResource>
              <DashboardPage />
            </ProtectedResource>
          }
        />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
