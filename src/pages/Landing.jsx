import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GraduationCap, FileEdit, Search, BookOpen, Trophy, Laptop, BarChart3, Award, Zap, Target, Star, Facebook, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';

function Landing({ user }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Reveal elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 page-transition">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <span className="whitespace-nowrap">Welcome to</span> 
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">LearnBadge</span>
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-indigo-400 hidden sm:block" />
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto animate-fade-in-up animate-delay-200 px-2">
            Master new skills, complete courses, and earn achievement badges. Your learning journey starts here!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up animate-delay-300 px-4">
            {user ? (
              <>
                <Link to="/courses" className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 hover-lift">
                  Browse Courses
                </Link>
                <Link to="/my-courses" className="bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-indigo-800 transition-all hover:scale-105 hover-lift">
                  My Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 hover-lift">
                  Get Started Free
                </Link>
                <Link to="/courses" className="bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-indigo-800 transition-all hover:scale-105 hover-lift">
                  Explore Courses
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white scroll-reveal">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FileEdit, title: '1. Sign Up', desc: 'Create your free account in seconds', delay: '100' },
              { icon: Search, title: '2. Choose Course', desc: 'Browse and enroll in courses that interest you', delay: '200' },
              { icon: BookOpen, title: '3. Learn & Complete', desc: 'Study at your own pace and finish courses', delay: '300' },
              { icon: Trophy, title: '4. Earn Badges', desc: 'Get recognized with achievement badges', delay: '400' }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className={`text-center scroll-reveal animate-delay-${item.delay}`}>
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white scroll-reveal">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Laptop, title: 'Quality Content', desc: 'Expert-curated courses covering web development, programming, and more', gradient: 'from-blue-600 to-indigo-600' },
              { icon: BarChart3, title: 'Track Progress', desc: 'Monitor your learning journey with detailed progress tracking', gradient: 'from-purple-600 to-pink-600' },
              { icon: Award, title: 'Achievement System', desc: 'Earn badges and showcase your accomplishments', gradient: 'from-yellow-600 to-orange-600' },
              { icon: Zap, title: 'Self-Paced Learning', desc: 'Learn at your own speed, anytime, anywhere', gradient: 'from-green-600 to-teal-600' },
              { icon: Target, title: 'Skill Levels', desc: 'Courses for beginners to advanced learners', gradient: 'from-red-600 to-pink-600' },
              { icon: Star, title: 'Free Access', desc: 'All courses available at no cost', gradient: 'from-indigo-600 to-purple-600' }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className={`bg-slate-800 p-8 rounded-lg shadow-lg hover-lift scroll-reveal border border-slate-700`}>
                  <IconComponent className="w-12 h-12 mb-4 text-indigo-400" />
                  <h3 className="text-2xl font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white scroll-reveal">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { initial: 'S', name: 'Sarah Johnson', review: 'Amazing platform! The badge system keeps me motivated. I\'ve completed 3 courses already and earned my Knowledge Seeker badge!', color: 'indigo' },
              { initial: 'M', name: 'Michael Chen', review: 'The courses are well-structured and easy to follow. I went from beginner to building my own projects in just a few weeks!', color: 'purple' },
              { initial: 'E', name: 'Emily Rodriguez', review: 'Love the progress tracking feature! It helps me stay organized and see how far I\'ve come. Highly recommend!', color: 'green' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800 p-6 rounded-lg shadow-lg hover-lift scroll-reveal border border-slate-700">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-700 rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                    {item.initial}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">{item.name}</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 italic">"{item.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 text-center scroll-reveal">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-xl mx-auto">Join thousands of students already learning and earning badges</p>
          {!user && (
            <Link to="/signup" className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 inline-block hover-lift">
              Sign Up Now - It's Free!
            </Link>
          )}
        </div>
      </section>


    </div>
  );
}

export default Landing;
