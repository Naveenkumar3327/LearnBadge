import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, User, Clock, Calendar, X, GraduationCap, BookOpen, Code, School, Rocket } from 'lucide-react';

function Courses({ user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [category, setCategory] = useState('recommended');
  const [enrolledIds, setEnrolledIds] = useState([]);
  const navigate = useNavigate();

  // Platform icon mapping
  const getPlatformIcon = (platform) => {
    const iconMap = {
      'Coursera': GraduationCap,
      'COURSERA': GraduationCap,
      'Udemy': BookOpen,
      'UDEMY': BookOpen,
      'GeeksforGeeks': Code,
      'GFG': Code,
      'edX': School,
      'EDX': School,
      'Udacity': Rocket,
      'UDACITY': Rocket,
    };
    return iconMap[platform] || BookOpen;
  };

  useEffect(() => {
    if (category === 'recommended' && user) {
      fetchRecommendedCourses();
    } else {
      fetchExternalCourses();
    }
    if (user) {
      fetchEnrollments();
    }
  }, [user, category]);

  const fetchRecommendedCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/courses/recommended/${user.id}`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching recommended courses:', error);
    }
    setLoading(false);
  };

  const fetchExternalCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/courses/external?category=${category}`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    setLoading(false);
  };

  const fetchEnrollments = async () => {
    const res = await fetch(`/api/enrollments/${user.id}`);
    const data = await res.json();
    setEnrolledIds(data.map(e => e.course_id));
  };

  const handleEnroll = async (course) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (course.url && course.url !== '#') {
      window.open(course.url, '_blank');
    }
    
    alert(`Redirecting to ${course.platform} to enroll in: ${course.title}`);
  };

  const categories = [
    ...(user ? [{ value: 'recommended', label: 'Recommended For You', icon: Star }] : []),
    { value: 'all', label: 'All Courses' },
    { value: 'web development', label: 'Web Development' },
    { value: 'data science', label: 'Data Science' },
    { value: 'machine learning', label: 'Machine Learning' },
    { value: 'mobile development', label: 'Mobile Development' },
    { value: 'cloud computing', label: 'Cloud Computing' },
    { value: 'cybersecurity', label: 'Cybersecurity' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 page-transition">
      <div className="mb-6 sm:mb-8 animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
          {category === 'recommended' ? 'Courses Recommended For You' : 'Explore Courses from Top Platforms'}
        </h1>
        <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
          {category === 'recommended' 
            ? 'Based on your profile, interests, and career goals' 
            : 'Discover courses from Coursera, Udemy, GeeksforGeeks, edX, and more'}
        </p>
        
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 animate-fade-in animate-delay-${idx}00 flex items-center gap-2 ${
                  category === cat.value
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <p className="mt-4 text-gray-400">Loading courses from external platforms...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const PlatformIcon = getPlatformIcon(course.platform || course.image);
            return (
              <div key={index} className="bg-slate-800 rounded-lg shadow-lg overflow-hidden hover-lift border border-slate-700 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
                  <PlatformIcon className="w-16 h-16 mx-auto mb-2 text-white" />
                  <div className="text-white text-sm font-semibold bg-white/20 inline-block px-3 py-1 rounded-full">{course.platform}</div>
                </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2 text-white">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{course.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    <span className="line-clamp-1">{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-semibold">{course.rating}</span>
                    </span>
                    <span className="text-gray-400">{course.students?.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="bg-indigo-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400 font-bold">{course.price}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 bg-slate-700 text-gray-200 py-2 rounded hover:bg-slate-600 transition-all hover:scale-105"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleEnroll(course)}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in" onClick={() => setSelectedCourse(null)}>
          <div className="bg-slate-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in border border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 sm:p-8">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  {(() => {
                    const PlatformIcon = getPlatformIcon(selectedCourse.platform || selectedCourse.image);
                    return <PlatformIcon className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-3 text-white" />;
                  })()}
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{selectedCourse.title}</h2>
                  <p className="text-indigo-100 mb-2 text-sm sm:text-base">by {selectedCourse.instructor}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">{selectedCourse.platform}</span>
                    <span className="flex items-center text-xs sm:text-sm">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-current" />
                      {selectedCourse.rating} ({selectedCourse.students?.toLocaleString()} students)
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedCourse(null)} className="text-white hover:text-gray-200 transition-transform hover:scale-110 -mt-2 sm:mt-0">
                  <X className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-8">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-white">About This Course</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{selectedCourse.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {[
                  { label: 'Duration', value: selectedCourse.duration },
                  { label: 'Level', value: selectedCourse.level },
                  { label: 'Weekly', value: selectedCourse.weekly_hours },
                  { label: 'Price', value: selectedCourse.price, color: 'text-green-400' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-700 p-2 sm:p-4 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-400 mb-1">{item.label}</div>
                    <div className={`font-semibold text-sm sm:text-base ${item.color || 'text-white'}`}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 text-white">Why Choose This Course?</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{selectedCourse.why_choose}</p>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 text-white">Skills You'll Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.skills?.split(',').map((skill, idx) => (
                    <span key={idx} className="bg-indigo-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 text-white">Course Structure</h3>
                <div className="bg-slate-700 p-3 sm:p-4 rounded-lg space-y-2">
                  <p className="text-gray-300 flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    <strong>{selectedCourse.weeks} weeks</strong> of content
                  </p>
                  <p className="text-gray-300 flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <strong>{selectedCourse.weekly_hours}</strong> per week
                  </p>
                  <p className="text-gray-300 text-sm">Includes assignments, quizzes, and projects</p>
                </div>
              </div>

              <button 
                onClick={() => handleEnroll(selectedCourse)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all text-base sm:text-lg hover:scale-105"
              >
                Enroll on {selectedCourse.platform}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
