import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Home, BookOpen, BookMarked, Award, Info, User, 
  LogOut, Menu, GraduationCap, X, Zap, Star, Heart,
  Facebook, Twitter, Linkedin, Instagram
} from 'lucide-react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyCourses from './pages/MyCourses';
import Badges from './pages/Badges';
import Profile from './pages/Profile';

// Shared Footer Component - Consistent across all pages
function Footer() {
  return (
    <footer className="relative bg-slate-950 text-gray-300 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 animate-gradient-shift opacity-10"></div>
      
      {/* Decorative orbs - subtle */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-600 rounded-full blur-3xl animate-fade-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl animate-fade-pulse"></div>
      
      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">LearnBadge</h3>
                <p className="text-xs text-gray-500">Learn & Earn</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Empowering learners worldwide with quality education and achievement recognition. Start your journey today!
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all hover:scale-105 footer-card">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all hover:scale-105 footer-card">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all hover:scale-105 footer-card">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all hover:scale-105 footer-card">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-card bg-slate-800/30 p-5 rounded-xl border border-slate-700/30 hover:border-indigo-500/30">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-indigo-400 transition-colors">Courses</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link to="/badges" className="text-gray-400 hover:text-indigo-400 transition-colors">Badges</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="footer-card bg-slate-800/30 p-5 rounded-xl border border-slate-700/30 hover:border-purple-500/30">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-400" />
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="footer-card bg-slate-800/30 p-5 rounded-xl border border-slate-700/30 hover:border-pink-500/30">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>support@learnbadge.com</li>
              <li>Mon - Fri: 9AM - 6PM</li>
              <li>123 Learning Street<br />Education City, ED 12345</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-slate-800/50 mt-10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; 2026 LearnBadge. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Crafted with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-gray-500">for</span>
              <span className="gradient-text-footer font-semibold">learners everywhere</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TopNavigation({ onLogout }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", icon: Home, label: 'Home' },
    { to: "/courses", icon: BookOpen, label: 'Courses' },
    { to: "/about", icon: Info, label: 'About' },
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm text-white shadow-lg sticky top-0 z-50 border-b border-slate-800 animate-fade-in-down">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold flex items-center gap-2 hover:text-indigo-400 transition-colors">
            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hidden sm:inline">LearnBadge</span>
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent sm:hidden">LB</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 lg:gap-6 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className={`hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm lg:text-base ${location.pathname === link.to ? 'text-indigo-400' : ''}`}
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              );
            })}
            <Link to="/login" className="hover:text-indigo-400 transition-colors text-sm lg:text-base">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105 text-sm lg:text-base">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl hover:text-indigo-400 transition-colors p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-slate-800 ${location.pathname === link.to ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="flex gap-3 mt-2">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-3 rounded-lg bg-slate-800 text-gray-300 hover:bg-slate-700 transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function SidebarNavigation({ user, onLogout }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/courses', icon: BookOpen, label: 'Courses' },
    { path: '/my-courses', icon: BookMarked, label: 'My Courses' },
    { path: '/badges', icon: Award, label: 'My Badges' },
    { path: '/about', icon: Info, label: 'About' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const getUserTypeIcon = () => {
    return <GraduationCap className="w-6 h-6" />;
  };

  return (
    <>
      {/* Top Bar for logged-in users */}
      <div className="bg-slate-900 text-white shadow-lg border-b border-slate-800 sticky top-0 z-50 animate-fade-in-down">
        <div className="px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-2xl hover:text-indigo-400 transition-colors"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-2xl hover:text-indigo-400 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/dashboard" className="text-2xl font-bold flex items-center gap-2 hover:text-indigo-400 transition-colors">
              <GraduationCap className="w-8 h-8" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">LearnBadge</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-gray-300">Welcome, <strong>{user.name}</strong></span>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all hover:scale-105 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-slate-900 border-r border-slate-800 transition-all duration-300 z-40 overflow-y-auto
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-4">
          {/* User Profile Section */}
          <div className={`mb-6 pb-6 border-b border-slate-800 ${collapsed ? 'text-center' : ''}`}>
            <div className={`w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center ${collapsed ? 'mx-auto' : 'mb-3'}`}>
              {getUserTypeIcon()}
            </div>
            {!collapsed && (
              <>
                <h3 className="text-white font-semibold truncate">{user.name}</h3>
                <p className="text-gray-400 text-sm">{user.userType}</p>
              </>
            )}
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-slate-800 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
            
            {/* Logout in Sidebar */}
            <button
              onClick={() => {
                setMobileOpen(false);
                onLogout();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-red-600 text-gray-300 hover:text-white ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? 'Logout' : ''}
            >
              <LogOut className="w-5 h-5" />
              {!collapsed && <span className="font-medium">Logout</span>}
            </button>
          </nav>

          {/* Quick Stats */}
          {!collapsed && (
            <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h4 className="text-white font-semibold mb-3 text-sm">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Courses</span>
                  <span className="text-indigo-400 font-semibold">0</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Badges</span>
                  <span className="text-purple-400 font-semibold">0</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (name, email) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const userData = await res.json();
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {user ? (
          <>
            <SidebarNavigation user={user} onLogout={handleLogout} />
            <div className="md:ml-64 transition-all duration-300 pt-[73px]">
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/courses" element={<Courses user={user} />} />
                <Route path="/my-courses" element={<MyCourses user={user} />} />
                <Route path="/badges" element={<Badges user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
            <Footer />
          </>
        ) : (
          <>
            <TopNavigation />
            <Routes>
              <Route path="/" element={<Landing user={user} />} />
              <Route path="/courses" element={<Courses user={user} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
