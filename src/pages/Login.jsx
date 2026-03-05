import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = email.split('@')[0];
    await onLogin(name, email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 page-transition">
      <div className="max-w-md w-full bg-slate-800 rounded-lg shadow-2xl p-6 sm:p-8 border border-slate-700 animate-scale-in">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Welcome Back!</h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Login to continue your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 transition-all text-sm sm:text-base"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 transition-all text-sm sm:text-base"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <label className="flex items-center text-gray-300">
              <input type="checkbox" className="mr-2" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
