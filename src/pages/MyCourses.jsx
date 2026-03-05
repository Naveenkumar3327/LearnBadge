import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle } from 'lucide-react';

function MyCourses({ user }) {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchEnrollments();
  }, [user]);

  const fetchEnrollments = async () => {
    const res = await fetch(`/api/enrollments/${user.id}`);
    const data = await res.json();
    setEnrollments(data);
  };

  const handleComplete = async (enrollmentId) => {
    await fetch(`/api/enrollments/${enrollmentId}/complete`, {
      method: 'PUT'
    });
    fetchEnrollments();
    alert('Congratulations! Course completed! Check your badges!');
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 page-transition">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 animate-fade-in-up">My Courses</h1>
      
      {enrollments.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <p className="text-xl text-gray-400 mb-6">You haven't enrolled in any courses yet</p>
          <button onClick={() => navigate('/courses')} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105">
            Explore Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrollments.map((enrollment, idx) => (
            <div key={enrollment.id} className="bg-slate-800 rounded-lg shadow-lg overflow-hidden hover-lift border border-slate-700 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
                <div className="text-5xl mb-2">{enrollment.image}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{enrollment.title}</h3>
                <p className="text-gray-400 mb-4">{enrollment.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1 text-gray-300">
                    <span>Progress</span>
                    <span>{enrollment.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${enrollment.progress}%` }}
                    ></div>
                  </div>
                </div>

                {enrollment.completed ? (
                  <div className="bg-green-600 text-white py-2 px-4 rounded text-center font-semibold flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Completed
                  </div>
                ) : (
                  <button 
                    onClick={() => handleComplete(enrollment.id)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
