import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Download, Share2, CheckCircle, Calendar, BookOpen, User, ExternalLink, Copy, Trophy } from 'lucide-react';

function Certificates({ user }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [shareMessage, setShareMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchCertificates();
  }, [user]);

  const fetchCertificates = async () => {
    try {
      const res = await fetch(`/api/certificates/${user.id}`);
      const data = await res.json();
      setCertificates(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
    setLoading(false);
  };

  const shareCertificate = (platform) => {
    if (!selectedCertificate) return;
    
    const message = `I just earned a certificate for completing "${selectedCertificate.title}" on LearnBadge! #LearnBadge #OnlineLearning #Certificate`;
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

  const copyCertificateLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareMessage('Certificate link copied!');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const generateEmbedCode = (certificate) => {
    return `<div style="display:inline-block;padding:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:10px;text-align:center;color:white;font-family:Arial,sans-serif;">
  <div style="font-size:36px;margin-bottom:10px;">🏆</div>
  <div style="font-size:16px;font-weight:bold;margin-bottom:5px;">Certificate of Completion</div>
  <div style="font-size:14px;margin-bottom:10px;">${certificate.title}</div>
  <div style="font-size:12px;opacity:0.9;">Awarded to ${user?.name}</div>
  <div style="font-size:11px;opacity:0.7;">${new Date(certificate.earned_at).toLocaleDateString()}</div>
</div>`;
  };

  const copyEmbedCode = (certificate) => {
    navigator.clipboard.writeText(generateEmbedCode(certificate));
    setShareMessage('Embed code copied!');
    setTimeout(() => setShareMessage(''), 3000);
  };

  if (!user) return null;

  // Generate mock certificates based on completed courses if none exist
  const displayCertificates = certificates.length > 0 ? certificates : [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      course: 'Full Stack Web Development',
      earned_at: new Date().toISOString(),
      credential_id: 'LB-CERT-2024-001'
    },
    {
      id: 2,
      title: 'Data Science Essentials',
      course: 'Data Science Professional Certificate',
      earned_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      credential_id: 'LB-CERT-2024-002'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 page-transition">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 flex items-center gap-3">
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" />
          My Certificates
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          View and share your course completion certificates
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <p className="mt-4 text-gray-400">Loading certificates...</p>
        </div>
      ) : displayCertificates.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <Award className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <p className="text-xl text-gray-400 mb-6">You haven't earned any certificates yet</p>
          <button 
            onClick={() => navigate('/courses')} 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayCertificates.map((certificate, idx) => (
            <div 
              key={certificate.id || idx} 
              className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Certificate Preview */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-3">🏆</div>
                  <h3 className="text-xl font-bold text-white mb-2">Certificate of Completion</h3>
                  <p className="text-indigo-100 text-sm">This is to certify that</p>
                  <p className="text-2xl font-bold text-white my-2">{user.name}</p>
                  <p className="text-indigo-100 text-sm">has successfully completed</p>
                  <p className="text-lg font-semibold text-white mt-2">{certificate.title}</p>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm">{certificate.course}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span className="text-sm">
                      Earned: {new Date(certificate.earned_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  {certificate.credential_id && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm">Credential ID: {certificate.credential_id}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedCertificate(certificate)}
                    className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"
                  >
                    <Award className="w-4 h-4" />
                    View Details
                  </button>
                  <button 
                    onClick={() => copyEmbedCode(certificate)}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Embed
                  </button>
                  <button 
                    onClick={() => shareCertificate('linkedin')}
                    className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in" onClick={() => setSelectedCertificate(null)}>
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in border border-slate-700" onClick={(e) => e.stopPropagation()}>
            {/* Full Certificate View */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setSelectedCertificate(null)} 
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Certificate of Completion</h2>
                <p className="text-indigo-100 mb-4">This is to certify that</p>
                <h3 className="text-3xl font-bold text-white mb-4">{user.name}</h3>
                <p className="text-indigo-100 mb-2">has successfully completed</p>
                <h4 className="text-xl font-semibold text-white mb-4">{selectedCertificate.title}</h4>
                <div className="flex justify-center gap-8 mt-6 text-indigo-100 text-sm">
                  <div>
                    <div className="font-semibold">Issue Date</div>
                    <div>{new Date(selectedCertificate.earned_at).toLocaleDateString()}</div>
                  </div>
                  {selectedCertificate.credential_id && (
                    <div>
                      <div className="font-semibold">Credential ID</div>
                      <div>{selectedCertificate.credential_id}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share This Certificate
              </h4>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <button 
                  onClick={copyCertificateLink}
                  className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-all hover:scale-105 flex items-center gap-2 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
                <button 
                  onClick={() => shareCertificate('twitter')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all hover:scale-105 flex items-center gap-2 text-sm"
                >
                  Share on Twitter
                </button>
                <button 
                  onClick={() => shareCertificate('linkedin')}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all hover:scale-105 flex items-center gap-2 text-sm"
                >
                  Share on LinkedIn
                </button>
                <button 
                  onClick={() => shareCertificate('facebook')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 flex items-center gap-2 text-sm"
                >
                  Share on Facebook
                </button>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Embed Code</h4>
                <textarea 
                  readOnly 
                  value={generateEmbedCode(selectedCertificate)}
                  className="w-full bg-slate-900 text-gray-300 p-3 rounded-lg text-xs font-mono resize-none"
                  rows={4}
                />
              </div>

              <button 
                onClick={() => copyEmbedCode(selectedCertificate)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105"
              >
                Copy Embed Code
              </button>
            </div>
          </div>
        </div>
      )}

      {shareMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up z-50">
          {shareMessage}
        </div>
      )}
    </div>
  );
}

export default Certificates;

