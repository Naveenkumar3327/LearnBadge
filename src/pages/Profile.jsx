import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, UserCheck, Briefcase, BookOpen, CheckCircle, 
  Award, Clock, TrendingUp, Twitter, Linkedin, Facebook, 
  MessageCircle, Copy, Link2, Calendar, Users, Star, Target
} from 'lucide-react';

function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [badges, setBadges] = useState([]);
  const [allBadges, setAllBadges] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completed: 0,
    inProgress: 0,
    totalBadges: 0,
    completionRate: 0,
    totalHours: 0
  });
  const [loading, setLoading] = useState(true);
  const [shareMessage, setShareMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchProfileData();
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const [profileRes, enrollmentsRes, badgesRes, allBadgesRes] = await Promise.all([
        fetch(`/api/users/${user.id}`),
        fetch(`/api/enrollments/${user.id}`),
        fetch(`/api/badges/${user.id}`),
        fetch('/api/badges')
      ]);

      const profileData = await profileRes.json();
      const enrollmentsData = await enrollmentsRes.json();
      const badgesData = await badgesRes.json();
      const allBadgesData = await allBadgesRes.json();

      setProfile(profileData);
      setEnrollments(enrollmentsData);
      setBadges(badgesData);
      setAllBadges(allBadgesData);

      const completed = enrollmentsData.filter(e => e.completed).length;
      const inProgress = enrollmentsData.filter(e => !e.completed).length;
      const completionRate = enrollmentsData.length > 0 
        ? Math.round((completed / enrollmentsData.length) * 100) 
        : 0;

      setStats({
        totalCourses: enrollmentsData.length,
        completed,
        inProgress,
        totalBadges: badgesData.length,
        completionRate,
        totalHours: completed * 40
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
    setLoading(false);
  };

  const shareToSocial = (platform) => {
    const message = `I've completed ${stats.completed} courses and earned ${stats.totalBadges} badges on LearnBadge! Join me in this learning journey! #LearnBadge #OnlineLearning #SkillDevelopment`;
    const url = window.location.href;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShareMessage(`Shared to ${platform}!`);
    setTimeout(() => setShareMessage(''), 3000);
  };

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareMessage('Profile link copied!');
    setTimeout(() => setShareMessage(''), 3000);
  };

  if (!user || loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-400">Unable to load profile data.</p>
      </div>
    );
  }

  const getUserTypeIcon = () => {
    switch (profile.userType) {
      case 'Student': return <GraduationCap className="w-12 h-12" />;
      case 'Staff': return <UserCheck className="w-12 h-12" />;
      case 'Employee': return <Briefcase className="w-12 h-12" />;
      default: return <GraduationCap className="w-12 h-12" />;
    }
  };

  const earnedBadgeIds = badges.map(b => b.id);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 page-transition max-w-6xl">
      {/* Profile Header */}
      <div className="bg-slate-800 rounded-lg p-4 sm:p-8 mb-6 border border-slate-700 animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white border-4 border-slate-700">
              {getUserTypeIcon()}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-slate-800"></div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{profile.name}</h1>
            <p className="text-gray-400 mb-3 text-sm sm:text-base">{profile.email}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {profile.userType}
              </span>
              {profile.collegeName && (
                <span className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {profile.collegeName}
                </span>
              )}
              {profile.academicYear && (
                <span className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {profile.academicYear}
                </span>
              )}
              {profile.qualification && (
                <span className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {profile.qualification}
                </span>
              )}
              {profile.specialization && (
                <span className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {profile.specialization}
                </span>
              )}
              {profile.industry && (
                <span className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {profile.industry}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-2">
              <Calendar className="w-4 h-4" />
              Member since {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={copyProfileLink}
              className="bg-slate-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-600 transition-all hover:scale-105 text-xs sm:text-sm flex items-center gap-2"
            >
              <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Copy Link</span>
              <span className="sm:hidden">Copy</span>
            </button>
            <button
              onClick={() => shareToSocial('twitter')}
              className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition-all hover:scale-105 text-xs sm:text-sm flex items-center gap-2"
            >
              <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Twitter</span>
            </button>
            <button
              onClick={() => shareToSocial('linkedin')}
              className="bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-800 transition-all hover:scale-105 text-xs sm:text-sm flex items-center gap-2"
            >
              <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </button>
          </div>
        </div>

        {shareMessage && (
          <div className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-center animate-fade-in">
            {shareMessage}
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center hover-lift animate-fade-in-up animate-delay-100">
          <div className="text-4xl font-bold text-indigo-400 mb-2">{stats.totalCourses}</div>
          <div className="text-gray-400 text-sm">Total Courses</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center hover-lift animate-fade-in-up animate-delay-200">
          <div className="text-4xl font-bold text-green-400 mb-2">{stats.completed}</div>
          <div className="text-gray-400 text-sm">Completed</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center hover-lift animate-fade-in-up animate-delay-300">
          <div className="text-4xl font-bold text-yellow-400 mb-2">{stats.inProgress}</div>
          <div className="text-gray-400 text-sm">In Progress</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center hover-lift animate-fade-in-up animate-delay-400">
          <div className="text-4xl font-bold text-purple-400 mb-2">{stats.totalBadges}</div>
          <div className="text-gray-400 text-sm">Badges Earned</div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Completion Rate */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 animate-fade-in-up animate-delay-500">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Completion Rate
          </h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-400">
                  {stats.completionRate}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-slate-700">
              <div
                style={{ width: `${stats.completionRate}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                <Clock className="w-5 h-5" />
                {stats.totalHours}+
              </div>
              <div className="text-gray-400 text-sm">Learning Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.completed}/{stats.totalCourses}</div>
              <div className="text-gray-400 text-sm">Courses Done</div>
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 animate-fade-in-up animate-delay-600">
          <h3 className="text-xl font-bold text-white mb-4">Learning Activity</h3>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => {
              const intensity = Math.random();
              const bgColor = intensity > 0.7 ? 'bg-green-500' : intensity > 0.4 ? 'bg-green-700' : intensity > 0.2 ? 'bg-green-800' : 'bg-slate-700';
              return (
                <div
                  key={i}
                  className={`w-full aspect-square rounded ${bgColor} hover:scale-110 transition-transform`}
                  title={`Activity ${i + 1}`}
                ></div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-slate-700 rounded"></div>
              <div className="w-3 h-3 bg-green-800 rounded"></div>
              <div className="w-3 h-3 bg-green-700 rounded"></div>
              <div className="w-3 h-3 bg-green-500 rounded"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6 animate-fade-in-up animate-delay-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="w-6 h-6" />
            Badges ({stats.totalBadges}/{allBadges.length})
          </h3>
          <button
            onClick={() => shareToSocial('twitter')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 text-sm flex items-center gap-2"
          >
            Share Badges <Award className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allBadges.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id);
            const earnedBadge = badges.find(b => b.id === badge.id);
            
            const BadgeIcon = badge.requirement === 1 ? Target : badge.requirement === 3 ? BookOpen : Award;
            
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-lg text-center transition-all hover:scale-105 ${
                  isEarned
                    ? 'bg-gradient-to-br from-yellow-600 to-orange-600 border-2 border-yellow-500'
                    : 'bg-slate-700 border-2 border-slate-600 opacity-50'
                }`}
              >
                <BadgeIcon className={`w-12 h-12 mx-auto mb-2 ${isEarned ? 'text-white' : 'text-gray-400'}`} />
                <div className={`font-bold mb-1 ${isEarned ? 'text-white' : 'text-gray-400'}`}>
                  {badge.name}
                </div>
                <div className={`text-xs ${isEarned ? 'text-yellow-100' : 'text-gray-500'}`}>
                  {badge.description}
                </div>
                {isEarned && earnedBadge && (
                  <div className="text-xs text-yellow-200 mt-2 flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(earnedBadge.earned_at).toLocaleDateString()}
                  </div>
                )}
                {!isEarned && (
                  <div className="text-xs text-gray-500 mt-2">
                    Complete {badge.requirement} course{badge.requirement > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 animate-fade-in-up animate-delay-800">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Recent Courses
        </h3>
        {enrollments.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p>No courses enrolled yet. Start learning today!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enrollments.slice(0, 5).map((enrollment) => (
              <div
                key={enrollment.id}
                className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all"
              >
                <div className="flex items-center gap-4">
                  <BookOpen className="w-8 h-8 text-indigo-400" />
                  <div>
                    <div className="text-white font-semibold">{enrollment.title}</div>
                    <div className="text-gray-400 text-sm">{enrollment.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  {enrollment.completed ? (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </span>
                  ) : (
                    <div>
                      <div className="text-indigo-400 font-semibold mb-1">{enrollment.progress}%</div>
                      <div className="w-24 bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Social Share Section */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg p-6 border border-indigo-800 mt-6 animate-fade-in-up animate-delay-900">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Share Your Achievements</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => shareToSocial('twitter')}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all hover:scale-105"
          >
            <Twitter className="w-5 h-5" />
            <span>Twitter</span>
          </button>
          <button
            onClick={() => shareToSocial('linkedin')}
            className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all hover:scale-105"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </button>
          <button
            onClick={() => shareToSocial('facebook')}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
          >
            <Facebook className="w-5 h-5" />
            <span>Facebook</span>
          </button>
          <button
            onClick={() => shareToSocial('whatsapp')}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
