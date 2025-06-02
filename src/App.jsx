import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const VehicleDetailsPage = lazy(() => import('./pages/VehicleDetailsPage'));
const ReservationPage = lazy(() => import('./pages/ReservationPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const [user, setUser] = useState(null);
  
  // Function to handle user login
  const handleLogin = (userData) => {
    setUser(userData);
    // In a real app, we would store the token in localStorage/sessionStorage
  };
  
  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
    // In a real app, we would remove the token from localStorage/sessionStorage
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
              <Route path="/reservation/:id" element={<ReservationPage />} />
              <Route path="/checkout/:reservationId" element={<CheckoutPage />} />
              <Route 
                path="/dashboard/*" 
                element={user ? <UserDashboardPage user={user} /> : <LoginPage onLogin={handleLogin} redirect="/dashboard" />} 
              />
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;