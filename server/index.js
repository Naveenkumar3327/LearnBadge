import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Simple JSON database
const DB_FILE = "database.json";

let db = {
  users: [],
  enrollments: [],
  badges: [
    { id: 1, name: "First Steps", description: "Complete your first course", icon: "🎯", requirement: 1 },
    { id: 2, name: "Knowledge Seeker", description: "Complete 3 courses", icon: "📚", requirement: 3 },
    { id: 3, name: "Master Learner", description: "Complete 5 courses", icon: "🏆", requirement: 5 }
  ],
  userBadges: [],
  certificates: []
};

// Load DB
if (fs.existsSync(DB_FILE)) {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    db = JSON.parse(data);
  } catch {
    console.log("Creating new database...");
  }
}

// Save DB
function saveDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// Gemini Course Fetch
async function fetchCoursesFromGemini(topic = "programming") {

  if (!process.env.GEMINI_API_KEY) {
    console.log("Gemini API key missing, using mock data");
    return getMockCourses(topic);
  }

  const modelNames = [
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-2.0-flash"
  ];

  for (const modelName of modelNames) {
    try {

      console.log(`Trying model: ${modelName}`);

      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
Generate a JSON array of 10 real online courses from platforms like Coursera, Udemy, GeeksforGeeks, edX, and Udacity about "${topic}".

For each course provide:
title, description, platform, instructor, duration, level, price, rating,
students, weeks, weekly_hours, assignments, why_choose, skills, url.

Return ONLY JSON array.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      let jsonText = text.trim();

      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.replace(/```json/g, "").replace(/```/g, "");
      }

      const courses = JSON.parse(jsonText);

      console.log(`Successfully fetched ${courses.length} courses`);

      return courses;

    } catch (error) {
      console.log(`Model ${modelName} failed`, error.message);
    }
  }

  console.log("All models failed, using mock data");

  return getMockCourses(topic);
}

// Mock Courses
function getMockCourses(topic) {

  return [
    {
      title: "The Complete Web Developer Bootcamp",
      description: "Learn full stack web development with real projects.",
      platform: "Udemy",
      instructor: "Dr. Angela Yu",
      duration: "65 hours",
      level: "Beginner",
      price: "$84.99",
      rating: 4.7,
      students: 850000,
      weeks: 12,
      weekly_hours: "5-6 hours",
      assignments: "15+ projects",
      why_choose: "Complete full stack training",
      skills: "HTML,CSS,JS,Node,React",
      url: "https://www.udemy.com/"
    },
    {
      title: "Machine Learning Specialization",
      description: "Learn ML fundamentals from Andrew Ng",
      platform: "Coursera",
      instructor: "Andrew Ng",
      duration: "3 months",
      level: "Intermediate",
      price: "$49/month",
      rating: 4.9,
      students: 500000,
      weeks: 12,
      weekly_hours: "10 hours",
      assignments: "ML models project",
      why_choose: "Top ML course",
      skills: "Python,ML,AI",
      url: "https://coursera.org/"
    }
  ];
}

// API ROUTES

app.get("/api/courses/external", async (req, res) => {

  const topic = req.query.topic || "programming";

  try {

    const courses = await fetchCoursesFromGemini(topic);

    const platformEmojis = {
      Coursera: "COURSERA",
      Udemy: "UDEMY",
      GeeksforGeeks: "GFG",
      edX: "EDX",
      Udacity: "UDACITY"
    };

    const enrichedCourses = courses.map(c => ({
      ...c,
      image: platformEmojis[c.platform] || "COURSE",
      is_external: 1
    }));

    res.json(enrichedCourses);

  } catch (err) {

    res.status(500).json({ error: "Failed to fetch courses" });

  }

});

// Get recommended courses for user
app.get('/api/courses/recommended/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = db.users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    let searchQuery = '';
    
    if (user.userType === 'Student') {
      searchQuery = `beginner and intermediate courses for ${user.qualification || 'students'} interested in ${user.interests?.join(', ') || 'technology'}`;
    } else if (user.userType === 'Staff') {
      searchQuery = `professional development courses for ${user.currentRole || 'staff'} in ${user.industry || 'education'} with ${user.experience || 'some'} experience`;
    } else if (user.userType === 'Employee') {
      searchQuery = `career advancement courses for ${user.currentRole || 'professionals'} in ${user.industry || 'corporate'} sector`;
    }
    
    const courses = await fetchCoursesFromGemini(searchQuery);
    
    const platformEmojis = {
      'Coursera': 'COURSERA',
      'Udemy': 'UDEMY',
      'GeeksforGeeks': 'GFG',
      'edX': 'EDX',
      'Udacity': 'UDACITY',
      'default': 'COURSE'
    };
    
    const enrichedCourses = courses.map(course => ({
      ...course,
      image: platformEmojis[course.platform] || platformEmojis.default,
      is_external: 1,
      recommended: true
    }));
    
    res.json(enrichedCourses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch recommended courses' });
  }
});

// Create user
app.post("/api/users", (req, res) => {

  const { name, email } = req.body;

  let user = db.users.find(u => u.email === email);

  if (!user) {

    user = {
      id: db.users.length + 1,
      name,
      email,
      createdAt: new Date().toISOString()
    };

    db.users.push(user);
    saveDB();

  }

  res.json(user);

});

// Get user by ID
app.get('/api/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = db.users.find(u => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get user enrollments
app.get('/api/enrollments/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const enrollments = db.enrollments.filter(e => e.user_id === userId);
  res.json(enrollments);
});

// Enroll course
app.post("/api/enroll", (req, res) => {

  const { userId, courseId } = req.body;

  const enrollment = {
    id: db.enrollments.length + 1,
    user_id: userId,
    course_id: courseId,
    progress: 0,
    completed: 0,
    enrolled_at: new Date().toISOString()
  };

  db.enrollments.push(enrollment);

  saveDB();

  res.json(enrollment);

});

// Complete course
app.put("/api/enrollments/:id/complete", (req, res) => {

  const id = parseInt(req.params.id);

  const enrollment = db.enrollments.find(e => e.id === id);

  if (enrollment) {

    enrollment.completed = 1;
    enrollment.progress = 100;

    const userId = enrollment.user_id;

    const completedCount = db.enrollments.filter(
      e => e.user_id === userId && e.completed === 1
    ).length;

    db.badges.forEach(badge => {

      if (completedCount >= badge.requirement) {

        const exists = db.userBadges.find(
          b => b.user_id === userId && b.badge_id === badge.id
        );

        if (!exists) {

          db.userBadges.push({
            id: db.userBadges.length + 1,
            user_id: userId,
            badge_id: badge.id,
            earned_at: new Date().toISOString()
          });

        }

      }

    });

    saveDB();

  }

  res.json({ success: true });

});

// User badges
app.get("/api/badges/:userId", (req, res) => {

  const userId = parseInt(req.params.userId);

  const userBadgeIds = db.userBadges.filter(b => b.user_id === userId);

  const badges = userBadgeIds.map(b => {

    const badge = db.badges.find(bb => bb.id === b.badge_id);

    return {
      ...badge,
      earned_at: b.earned_at
    };

  });

  res.json(badges);

});

// All badges
app.get("/api/badges", (req, res) => {
  res.json(db.badges);
});

// Get user certificates
app.get("/api/certificates/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userCertificates = db.certificates.filter(c => c.user_id === userId);
  res.json(userCertificates);
});

// Get single certificate for verification
app.get("/api/certificate/:certificateId", (req, res) => {
  const certificate = db.certificates.find(c => c.certificateId === req.params.certificateId);
  if (certificate) {
    const user = db.users.find(u => u.id === certificate.user_id);
    res.json({ ...certificate, user });
  } else {
    res.status(404).json({ error: 'Certificate not found' });
  }
});

// Generate badge embed code
app.get("/api/badge/embed/:userId/:badgeId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const badgeId = parseInt(req.params.badgeId);
  
  const userBadge = db.userBadges.find(ub => ub.user_id === userId && ub.badge_id === badgeId);
  const badge = db.badges.find(b => b.id === badgeId);
  const user = db.users.find(u => u.id === userId);
  
  if (userBadge && badge && user) {
    const embedCode = `<div style="display:inline-block;padding:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:10px;text-align:center;color:white;font-family:Arial,sans-serif;">
  <div style="font-size:48px;margin-bottom:10px;">${badge.icon}</div>
  <div style="font-size:18px;font-weight:bold;margin-bottom:5px;">${badge.name}</div>
  <div style="font-size:14px;opacity:0.9;margin-bottom:10px;">${badge.description}</div>
  <div style="font-size:12px;opacity:0.8;">Earned by ${user.name}</div>
  <div style="font-size:11px;opacity:0.7;">${new Date(userBadge.earned_at).toLocaleDateString()}</div>
</div>`;
    
    res.json({ embedCode, badge, user, earnedAt: userBadge.earned_at });
  } else {
    res.status(404).json({ error: 'Badge not found or not earned' });
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});