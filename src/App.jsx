import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sparkles, Sun, Moon, LogOut, Search, MapPin, Star, ShieldCheck, Zap } from 'lucide-react';
import { supabase } from './lib/supabase';
import { INITIAL_DESIGNERS, getRealImage } from './data/mockData';

// Components
// Components
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import AuthModal from './components/ui/AuthModal';
import AIEstimator from './components/features/home/AIEstimator';
import SubscriptionModal from './components/ui/SubscriptionModal';
import ComparisonModal from './components/features/designers/ComparisonModal';
import ReviewModal from './components/features/designers/ReviewModal';
import BookingModal from './components/ui/BookingModal';
import ChatBot from './components/features/chat/ChatBot';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';
import Modal from './components/ui/Modal';
import DesignerCard from './components/features/designers/DesignerCard';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Pricing from './pages/Pricing';
import EstimatorPage from './pages/EstimatorPage';
import Settings from './pages/Settings';
import Help from './pages/Help';

function App() {
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState('Free');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAuthLogin = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
    showToast(`Welcome back, ${userData.realName}`);
  };

  return (
    <Router>
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans antialiased flex flex-col transition-colors duration-300">

          <Navbar
            setIsSidebarOpen={setIsSidebarOpen}
            userPlan={userPlan}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            user={user}
            onLogout={() => setUser(null)}
            onLoginClick={() => setIsAuthOpen(true)}
          />

          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleAuthLogin} />

          <div className="flex-grow pt-24">
            <Routes>
              <Route path="/" element={<Home user={user} showToast={showToast} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/estimator" element={<EstimatorPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </div>

          <Footer />
          <ChatBot />

          <AnimatePresence>
            {toast && <Toast key="toast" message={toast.message} type={toast.type} />}
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;
