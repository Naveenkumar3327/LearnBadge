import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Lock } from 'lucide-react';

function Badges({ user }) {
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [allBadges, setAllBadges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchBadges();
  }, [user]);

  const fetchBadges = async () => {
    const [earned, all] = await Promise.all([
      fetch(`/api/badges/${user.id}`).then(r => r.json()),
      fetch('/api/badges').then(r => r.json())
    ]);
    setEarnedBadges(earned);
    setAllBadges(all);
  };

  if (!user) return null;

  const earnedIds = earnedBadges.map(b => b.id);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 page-transition">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 animate-fade-in-up flex items-center gap-3">
        My Badges <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" />
      </h1>
      
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white animate-fade-in-up animate-delay-100">Earned Badges ({earnedBadges.length})</h2>
        {earnedBadges.length === 0 ? (
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-6 text-center animate-fade-in">
            <p className="text-lg text-gray-300">Complete courses to earn your first badge!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {earnedBadges.map((badge, idx) => (
              <div key={badge.id} className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg shadow-lg p-6 text-white text-center hover-lift animate-scale-in border border-yellow-500" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-6xl mb-3">{badge.icon}</div>
                <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                <p className="mb-2">{badge.description}</p>
                <p className="text-sm opacity-90">Earned: {new Date(badge.earned_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6 text-white animate-fade-in-up">All Available Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allBadges.map((badge, idx) => {
            const isEarned = earnedIds.includes(badge.id);
            return (
              <div 
                key={badge.id} 
                className={`rounded-lg shadow-lg p-6 text-center hover-lift animate-fade-in-up border ${
                  isEarned 
                    ? 'bg-gradient-to-br from-green-600 to-blue-600 text-white border-green-500' 
                    : 'bg-slate-800 text-gray-500 border-slate-700'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`text-6xl mb-3 ${isEarned ? 'opacity-100' : 'opacity-50'}`}>{badge.icon}</div>
                <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                <p className="mb-2">{badge.description}</p>
                <p className="text-sm">Requirement: Complete {badge.requirement} course{badge.requirement > 1 ? 's' : ''}</p>
                {!isEarned && (
                  <p className="mt-2 text-sm font-semibold flex items-center justify-center gap-1">
                    <Lock className="w-4 h-4" />
                    Locked
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Badges;
