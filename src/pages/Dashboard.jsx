import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, CheckCircle, Award, Clock, TrendingUp,
  Search, BookMarked, Settings, GraduationCap, Briefcase, UserCheck
} from 'lucide-react';

function Dashboard({ user }) {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ courses: 0, completed: 0, badges: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [profileRes, enrollmentsRes, badgesRes] = await Promise.all([
        fetch(`/api/users/${user.id}`),
        fetch(`/api/enrollments/${user.id}`),
        fetch(`/api/badges/${user.id}`)
      ]);

      const profileData = await profileRes.json();
      const enrollments = await enrollmentsRes.json();
      const badges = await badgesRes.json();

      setProfile(profileData);
      setStats({
        courses: enrollments.length,
        completed: enrollments.filter(e => e.completed).length,
        badges: badges.length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setLoading(false);
  };

  if (!user || loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getUserTypeIcon = () => {
    switch (profile?.userType) {
      case 'Student': return <GraduationCap className="w-12 h-12" />;
      case 'Staff': return <UserCheck className="w-12 h-12" />;
      case 'Employee': return <Briefcase className="w-12 h-12" />;
      default: return <GraduationCap className="w-12 h-12" />;
    }
  };

  const getWelcomeMessage = () => {
    if (profile?.userType === 'Student') {
      return `Welcome to your learning dashboard! As a ${profile.qualification || 'student'}, you're on an exciting journey to build your skills and knowledge.`;
    } else if (profile?.userType === 'Staff') {
      return `Welcome back! As a ${profile.currentRole || 'staff member'} in ${profile.industry || 'education'}, continue your professional development journey.`;
    } else if (profile?.userType === 'Employee') {
      return `Welcome to your learning hub! As a ${profile.currentRole || 'professional'} in ${profile.industry || 'corporate'}, advance your career with new skills.`;
    }
    return 'Welcome to your learning dashboard! Start exploring courses and earning badges today.';
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 page-transition">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-indigo-700 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white animate-scale-in flex-shrink-0">
            {getUserTypeIcon()}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {getGreeting()}, {user.name}!
            </h1>
            <p className="text-indigo-200 text-sm sm:text-lg">
              {getWelcomeMessage()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover-lift animate-fade-in-up animate-delay-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-600 rounded-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{stats.courses}</div>
              <div className="text-gray-400 text-sm">Enrolled Courses</div>
            </div>
          </div>
          <Link to="/my-courses" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1">
            View All Courses <TrendingUp className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover-lift animate-fade-in-up animate-delay-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{stats.completed}</div>
              <div className="text-gray-400 text-sm">Completed</div>
            </div>
          </div>
          <div className="text-green-400 text-sm font-medium">
            {stats.courses > 0 ? `${Math.round((stats.completed / stats.courses) * 100)}% completion rate` : 'Start your first course!'}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover-lift animate-fade-in-up animate-delay-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{stats.badges}</div>
              <div className="text-gray-400 text-sm">Badges Earned</div>
            </div>
          </div>
          <Link to="/badges" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
            View All Badges <TrendingUp className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 animate-fade-in-up animate-delay-400">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Your Profile
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">User Type:</span>
              <span className="text-white font-semibold">{profile?.userType}</span>
            </div>
            {profile?.userType === 'Student' && profile?.qualification && (
              <div className="flex justify-between">
                <span className="text-gray-400">Qualification:</span>
                <span className="text-white font-semibold">{profile.qualification}</span>
              </div>
            )}
            {(profile?.userType === 'Staff' || profile?.userType === 'Employee') && (
              <>
                {profile?.industry && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Industry:</span>
                    <span className="text-white font-semibold">{profile.industry}</span>
                  </div>
                )}
                {profile?.currentRole && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Role:</span>
                    <span className="text-white font-semibold">{profile.currentRole}</span>
                  </div>
                )}
                {profile?.experience && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Experience:</span>
                    <span className="text-white font-semibold">{profile.experience}</span>
                  </div>
                )}
              </>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Member Since:</span>
              <span className="text-white font-semibold">
                {new Date(profile?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Link
            to="/profile"
            className="mt-4 block text-center bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition-all hover:scale-105"
          >
            View Full Profile
          </Link>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 animate-fade-in-up animate-delay-500">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Your Interests
          </h2>
          {profile?.interests && profile.interests.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mb-4">No interests specified yet</p>
          )}
          <Link
            to="/courses"
            className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105"
          >
            Browse Recommended Courses
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg p-4 sm:p-6 border border-indigo-800 animate-fade-in-up animate-delay-600">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Link
            to="/courses"
            className="bg-slate-800 p-4 rounded-lg text-center hover:bg-slate-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 border border-slate-700"
          >
            <Search className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
            <div className="text-white font-semibold">Browse Courses</div>
            <div className="text-gray-400 text-sm">Explore new courses</div>
          </Link>
          <Link
            to="/my-courses"
            className="bg-slate-800 p-4 rounded-lg text-center hover:bg-slate-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 border border-slate-700"
          >
            <BookMarked className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-white font-semibold">My Courses</div>
            <div className="text-gray-400 text-sm">Continue learning</div>
          </Link>
          <Link
            to="/badges"
            className="bg-slate-800 p-4 rounded-lg text-center hover:bg-slate-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 border border-slate-700"
          >
            <Award className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-white font-semibold">My Badges</div>
            <div className="text-gray-400 text-sm">View achievements</div>
          </Link>
          <Link
            to="/profile"
            className="bg-slate-800 p-4 rounded-lg text-center hover:bg-slate-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 border border-slate-700"
          >
            <Settings className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-white font-semibold">Settings</div>
            <div className="text-gray-400 text-sm">Manage profile</div>
          </Link>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-8 text-center animate-fade-in-up animate-delay-700">
        <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
          {stats.courses === 0 
            ? <><Clock className="w-5 h-5" /> Start your learning journey today! Browse our recommended courses.</>
            : stats.completed === 0
            ? <><TrendingUp className="w-5 h-5" /> Keep going! Complete your first course to earn your first badge.</>
            : <><Award className="w-5 h-5" /> Great progress! You've completed {stats.completed} course{stats.completed > 1 ? 's' : ''}. Keep learning!</>
          }
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
