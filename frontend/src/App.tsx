import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './Pages/Dashboard';
import Exercises from './Pages/Exercises';
import Home from './Pages/HomePage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import Progress from './Pages/Progress';
import Settings from './Pages/Settings';
import WorkoutDetails from './Pages/WorkoutDetails';
import Workouts from './Pages/Workouts';
import { AuthProvider } from './Routes/AuthContext';
import AuthProtectedRoute from './Routes/AuthProtectedRoute';
import AdminProtectedRoute from './Routes/AdminProtectedRoute';
import Signup from './Pages/Signup';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Auth Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <AuthProtectedRoute>
                    <Dashboard />
                  </AuthProtectedRoute>
                }
              />
              <Route
                path="/workouts"
                element={
                  <AuthProtectedRoute>
                    <Workouts />
                  </AuthProtectedRoute>
                }
              />
              <Route
                path="/workout/:id"
                element={
                  <AuthProtectedRoute>
                    <WorkoutDetails />
                  </AuthProtectedRoute>
                }
              />
              <Route
                path="/exercises"
                element={
                  <AuthProtectedRoute>
                    <Exercises />
                  </AuthProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthProtectedRoute>
                    <Profile />
                  </AuthProtectedRoute>
                }
              />
              <Route
                path="/progress"
                element={
                  <AuthProtectedRoute>
                    <Progress />
                  </AuthProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/settings"
                element={
                  <AdminProtectedRoute>
                    <Settings />
                  </AdminProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
