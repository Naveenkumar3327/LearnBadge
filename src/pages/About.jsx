import { Target, Lightbulb, CheckCircle } from 'lucide-react';

function About() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 page-transition">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 text-center animate-fade-in-up">About LearnBadge</h1>
          <p className="text-lg sm:text-xl text-gray-400 text-center mb-8 sm:mb-12 animate-fade-in-up animate-delay-100">
            Empowering learners worldwide through quality education and achievement recognition
          </p>

          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg p-6 sm:p-8 mb-8 sm:mb-12 border border-indigo-800 animate-fade-in-up animate-delay-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              At LearnBadge, we believe that education should be accessible, engaging, and rewarding. 
              Our mission is to provide high-quality online courses that help students develop valuable 
              skills while recognizing their achievements through our innovative badge system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-slate-800 border-2 border-indigo-600 rounded-lg p-4 sm:p-6 hover-lift animate-fade-in-up animate-delay-300">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4 text-indigo-400" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">Our Vision</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                To become the leading platform for skill development and achievement recognition, 
                making quality education accessible to everyone, everywhere.
              </p>
            </div>
            <div className="bg-slate-800 border-2 border-purple-600 rounded-lg p-4 sm:p-6 hover-lift animate-fade-in-up animate-delay-400">
              <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4 text-purple-400" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">Our Values</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Excellence in education, student success, innovation in learning, 
                and recognition of achievement drive everything we do.
              </p>
            </div>
          </div>

          <div className="mb-8 sm:mb-12 animate-fade-in-up animate-delay-500">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">Why Choose Us?</h2>
            <div className="space-y-4">
              {[
                { title: 'Expert-Curated Content', desc: 'All courses are designed by industry professionals' },
                { title: 'Self-Paced Learning', desc: 'Learn at your own speed, on your own schedule' },
                { title: 'Achievement Recognition', desc: 'Earn badges and showcase your accomplishments' },
                { title: 'Free Access', desc: 'Quality education should be accessible to all' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700 hover-lift">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg text-white">{item.title}</h4>
                    <p className="text-gray-400 text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-lg p-6 sm:p-8 text-center border border-indigo-700 animate-fade-in-up animate-delay-600">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-base sm:text-lg mb-6">
              Become part of a growing community of learners achieving their goals
            </p>
            <div className="flex justify-center gap-6 sm:gap-8 text-center flex-wrap">
              <div>
                <div className="text-2xl sm:text-4xl font-bold">10K+</div>
                <div className="text-xs sm:text-sm text-indigo-200">Students</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-bold">50+</div>
                <div className="text-xs sm:text-sm text-indigo-200">Courses</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-bold">15K+</div>
                <div className="text-xs sm:text-sm text-indigo-200">Badges Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

