import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, User, Clock, Calendar, X, GraduationCap, BookOpen, Code, School, Rocket } from 'lucide-react';

const MOCK_COURSES = [
  // Web Development
  {
    title: "Full Stack Web Development",
    description: "Learn HTML, CSS, JavaScript, React and Node.js to build complete web applications.",
    instructor: "Angela Yu",
    rating: 4.8,
    students: 1200000,
    duration: "40 hours",
    level: "Beginner",
    price: "₹499",
    platform: "Udemy",
    weeks: 8,
    weekly_hours: "5 hours",
    why_choose: "Comprehensive full stack development course with real world projects.",
    skills: "HTML, CSS, JavaScript, React, Node.js",
    url: "https://www.udemy.com"
  },
  {
    title: "React JS Complete Guide",
    description: "Build modern web apps using React and modern JavaScript.",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.8,
    students: 700000,
    duration: "32 hours",
    level: "Intermediate",
    price: "₹699",
    platform: "Udemy",
    weeks: 7,
    weekly_hours: "5 hours",
    why_choose: "Industry standard React training.",
    skills: "React, Hooks, Redux, SPA",
    url: "https://www.udemy.com"
  },
  {
    title: "HTML5 & CSS3 Mastery",
    description: "Master modern HTML5 and CSS3 for building responsive websites.",
    instructor: "Jon Duckett",
    rating: 4.7,
    students: 450000,
    duration: "25 hours",
    level: "Beginner",
    price: "₹399",
    platform: "Udemy",
    weeks: 5,
    weekly_hours: "5 hours",
    why_choose: "Build beautiful, responsive websites from scratch.",
    skills: "HTML5, CSS3, Flexbox, Grid, Responsive Design",
    url: "https://www.udemy.com"
  },
  {
    title: "JavaScript Fundamentals",
    description: "Complete JavaScript programming from basics to advanced concepts.",
    instructor: "Jonas Schmedtmann",
    rating: 4.8,
    students: 950000,
    duration: "35 hours",
    level: "Beginner",
    price: "₹599",
    platform: "Udemy",
    weeks: 8,
    weekly_hours: "4 hours",
    why_choose: "Master JavaScript with modern ES6+ features.",
    skills: "JavaScript, ES6+, DOM, Async/Await",
    url: "https://www.udemy.com"
  },
  // Data Structures & Algorithms
  {
    title: "Data Structures and Algorithms",
    description: "Master DSA concepts used in coding interviews and competitive programming.",
    instructor: "Abdul Bari",
    rating: 4.7,
    students: 850000,
    duration: "35 hours",
    level: "Intermediate",
    price: "₹599",
    platform: "GeeksforGeeks",
    weeks: 10,
    weekly_hours: "4 hours",
    why_choose: "Perfect course for cracking FAANG and product company interviews.",
    skills: "Arrays, Linked List, Trees, Graphs, Dynamic Programming",
    url: "https://www.geeksforgeeks.org"
  },
  {
    title: "Algorithm Specialization",
    description: "Learn algorithms from Stanford professors with practical implementations.",
    instructor: "Tim Roughgarden",
    rating: 4.8,
    students: 600000,
    duration: "40 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Coursera",
    weeks: 8,
    weekly_hours: "5 hours",
    why_choose: "Stanford's renowned algorithm course.",
    skills: "Graph Algorithms, Divide and Conquer, Dynamic Programming",
    url: "https://www.coursera.org"
  },
  {
    title: "Competitive Programming Essentials",
    description: "Master competitive programming with C++ and problem-solving techniques.",
    instructor: "Prateek Narang",
    rating: 4.6,
    students: 300000,
    duration: "45 hours",
    level: "Advanced",
    price: "₹499",
    platform: "GeeksforGeeks",
    weeks: 12,
    weekly_hours: "4 hours",
    why_choose: "Ace coding competitions and interviews.",
    skills: "C++, STL, Recursion, Backtracking",
    url: "https://www.geeksforgeeks.org"
  },
  // Machine Learning & AI
  {
    title: "Machine Learning Specialization",
    description: "Understand machine learning algorithms and implement them using Python.",
    instructor: "Andrew Ng",
    rating: 4.9,
    students: 2000000,
    duration: "60 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Coursera",
    weeks: 12,
    weekly_hours: "6 hours",
    why_choose: "One of the most popular ML courses globally.",
    skills: "Machine Learning, Python, TensorFlow, AI",
    url: "https://www.coursera.org"
  },
  {
    title: "Artificial Intelligence Basics",
    description: "Introduction to AI concepts and applications.",
    instructor: "Andrew Ng",
    rating: 4.8,
    students: 1000000,
    duration: "20 hours",
    level: "Beginner",
    price: "Free",
    platform: "Coursera",
    weeks: 5,
    weekly_hours: "3 hours",
    why_choose: "Best beginner course for AI.",
    skills: "AI, Machine Learning, Neural Networks",
    url: "https://www.coursera.org"
  },
  {
    title: "Deep Learning Specialization",
    description: "Master deep learning with neural networks and TensorFlow.",
    instructor: "Andrew Ng",
    rating: 4.9,
    students: 1500000,
    duration: "50 hours",
    level: "Advanced",
    price: "Free",
    platform: "Coursera",
    weeks: 10,
    weekly_hours: "5 hours",
    why_choose: "Comprehensive deep learning course.",
    skills: "Neural Networks, CNN, RNN, TensorFlow",
    url: "https://www.coursera.org"
  },
  {
    title: "Natural Language Processing",
    description: "Learn NLP techniques for text processing and language models.",
    instructor: "DeepLearning.AI",
    rating: 4.7,
    students: 400000,
    duration: "30 hours",
    level: "Advanced",
    price: "Free",
    platform: "Coursera",
    weeks: 6,
    weekly_hours: "5 hours",
    why_choose: "Build AI-powered language applications.",
    skills: "NLP, Transformers, BERT, GPT",
    url: "https://www.coursera.org"
  },
  {
    title: "Computer Vision with Python",
    description: "Learn image processing and computer vision techniques.",
    instructor: "OpenCV",
    rating: 4.6,
    students: 350000,
    duration: "28 hours",
    level: "Intermediate",
    price: "₹499",
    platform: "Udemy",
    weeks: 7,
    weekly_hours: "4 hours",
    why_choose: "Hands-on computer vision projects.",
    skills: "OpenCV, Image Processing, Object Detection",
    url: "https://www.udemy.com"
  },
  // Programming Languages
  {
    title: "Python Programming Masterclass",
    description: "Complete Python programming course from basics to advanced concepts.",
    instructor: "Tim Buchalka",
    rating: 4.6,
    students: 900000,
    duration: "45 hours",
    level: "Beginner",
    price: "₹399",
    platform: "Udemy",
    weeks: 9,
    weekly_hours: "5 hours",
    why_choose: "Beginner friendly programming course.",
    skills: "Python, OOP, File Handling, APIs",
    url: "https://www.udemy.com"
  },
  {
    title: "Java Programming",
    description: "Learn Java from scratch and build backend applications.",
    instructor: "University of Helsinki",
    rating: 4.7,
    students: 600000,
    duration: "40 hours",
    level: "Beginner",
    price: "Free",
    platform: "Coursera",
    weeks: 8,
    weekly_hours: "5 hours",
    why_choose: "Great for backend and enterprise development.",
    skills: "Java, OOP, Spring Boot",
    url: "https://www.coursera.org"
  },
  {
    title: "C++ Programming Course",
    description: "Master C++ from basics to advanced STL and competitive programming.",
    instructor: "Bjarne Stroustrup",
    rating: 4.7,
    students: 500000,
    duration: "38 hours",
    level: "Beginner",
    price: "Free",
    platform: "Coursera",
    weeks: 8,
    weekly_hours: "5 hours",
    why_choose: "Learn C++ from the creator's course.",
    skills: "C++, OOP, STL, Templates",
    url: "https://www.coursera.org"
  },
  {
    title: "Rust Programming Fundamentals",
    description: "Learn Rust for system programming and memory safety.",
    instructor: "Mozilla",
    rating: 4.6,
    students: 200000,
    duration: "30 hours",
    level: "Intermediate",
    price: "Free",
    platform: "edX",
    weeks: 6,
    weekly_hours: "5 hours",
    why_choose: "Modern systems programming language.",
    skills: "Rust, Memory Safety, Concurrency",
    url: "https://www.edx.org"
  },
  // Cloud Computing
  {
    title: "Cloud Computing with AWS",
    description: "Learn AWS cloud services and deploy scalable applications.",
    instructor: "AWS Academy",
    rating: 4.7,
    students: 400000,
    duration: "30 hours",
    level: "Intermediate",
    price: "Free",
    platform: "edX",
    weeks: 6,
    weekly_hours: "4 hours",
    why_choose: "Hands-on cloud deployment experience.",
    skills: "AWS, EC2, S3, Cloud Architecture",
    url: "https://www.edx.org"
  },
  {
    title: "Google Cloud Platform",
    description: "Master GCP services for cloud computing and data engineering.",
    instructor: "Google Cloud",
    rating: 4.7,
    students: 350000,
    duration: "35 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Coursera",
    weeks: 7,
    weekly_hours: "5 hours",
    why_choose: "Industry-recognized cloud certification.",
    skills: "GCP, BigQuery, Dataflow, Kubernetes",
    url: "https://www.coursera.org"
  },
  // Cybersecurity
  {
    title: "Cyber Security Fundamentals",
    description: "Learn ethical hacking and cybersecurity basics.",
    instructor: "Nathan House",
    rating: 4.6,
    students: 300000,
    duration: "25 hours",
    level: "Beginner",
    price: "₹499",
    platform: "Udemy",
    weeks: 6,
    weekly_hours: "4 hours",
    why_choose: "Learn how hackers attack and how to defend systems.",
    skills: "Ethical Hacking, Networking, Security",
    url: "https://www.udemy.com"
  },
  {
    title: "Network Security Essentials",
    description: "Learn network security protocols and defense mechanisms.",
    instructor: "Cisco",
    rating: 4.6,
    students: 250000,
    duration: "20 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Coursera",
    weeks: 5,
    weekly_hours: "4 hours",
    why_choose: "Protect networks from cyber threats.",
    skills: "Firewalls, VPN, IDS, Network Monitoring",
    url: "https://www.coursera.org"
  },
  {
    title: "Penetration Testing",
    description: "Learn ethical hacking and penetration testing techniques.",
    instructor: "Offensive Security",
    rating: 4.7,
    students: 180000,
    duration: "40 hours",
    level: "Advanced",
    price: "₹999",
    platform: "Udemy",
    weeks: 10,
    weekly_hours: "4 hours",
    why_choose: "Become a certified penetration tester.",
    skills: "Metasploit, Burp Suite, Vulnerability Assessment",
    url: "https://www.udemy.com"
  },
  // Database
  {
    title: "Database Management Systems",
    description: "Learn SQL, normalization and database design.",
    instructor: "Stanford University",
    rating: 4.6,
    students: 420000,
    duration: "28 hours",
    level: "Beginner",
    price: "Free",
    platform: "Coursera",
    weeks: 7,
    weekly_hours: "4 hours",
    why_choose: "Essential for backend developers.",
    skills: "SQL, MySQL, Database Design",
    url: "https://www.coursera.org"
  },
  {
    title: "MongoDB Fundamentals",
    description: "Master NoSQL database with MongoDB for modern applications.",
    instructor: "MongoDB University",
    rating: 4.7,
    students: 300000,
    duration: "25 hours",
    level: "Intermediate",
    price: "Free",
    platform: "MongoDB",
    weeks: 6,
    weekly_hours: "4 hours",
    why_choose: "Learn modern document database.",
    skills: "MongoDB, JSON, Aggregation, Replication",
    url: "https://university.mongodb.com"
  },
  {
    title: "PostgreSQL Database",
    description: "Learn advanced PostgreSQL for enterprise applications.",
    instructor: "PostgreSQL",
    rating: 4.6,
    students: 200000,
    duration: "22 hours",
    level: "Intermediate",
    price: "Free",
    platform: "edX",
    weeks: 5,
    weekly_hours: "4 hours",
    why_choose: "Powerful open-source relational database.",
    skills: "PostgreSQL, Advanced SQL, Performance Tuning",
    url: "https://www.edx.org"
  },
  // Mobile Development
  {
    title: "Mobile App Development with Flutter",
    description: "Build cross platform mobile apps using Flutter.",
    instructor: "Google Developers",
    rating: 4.7,
    students: 350000,
    duration: "30 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Udacity",
    weeks: 8,
    weekly_hours: "4 hours",
    why_choose: "Develop Android & iOS apps with one codebase.",
    skills: "Flutter, Dart, Mobile UI",
    url: "https://www.udacity.com"
  },
  {
    title: "Android Development with Kotlin",
    description: "Build native Android apps with Kotlin and Jetpack Compose.",
    instructor: "Google",
    rating: 4.7,
    students: 400000,
    duration: "35 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Udacity",
    weeks: 8,
    weekly_hours: "4 hours",
    why_choose: "Official Android development course.",
    skills: "Kotlin, Android Studio, Jetpack Compose",
    url: "https://www.udacity.com"
  },
  {
    title: "iOS Development with Swift",
    description: "Build iOS apps using Swift and SwiftUI.",
    instructor: "Apple",
    rating: 4.8,
    students: 300000,
    duration: "32 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Udacity",
    weeks: 7,
    weekly_hours: "5 hours",
    why_choose: "Create apps for Apple platforms.",
    skills: "Swift, SwiftUI, Xcode",
    url: "https://www.udacity.com"
  },
  // DevOps
  {
    title: "DevOps Engineering",
    description: "Learn CI/CD, Docker, Kubernetes and automation tools.",
    instructor: "IBM",
    rating: 4.7,
    students: 300000,
    duration: "35 hours",
    level: "Advanced",
    price: "₹799",
    platform: "edX",
    weeks: 8,
    weekly_hours: "5 hours",
    why_choose: "Industry DevOps practices and tools.",
    skills: "Docker, Kubernetes, Jenkins",
    url: "https://www.edx.org"
  },
  {
    title: "Docker & Kubernetes",
    description: "Master containerization with Docker and orchestration with Kubernetes.",
    instructor: "Cloud Native",
    rating: 4.7,
    students: 280000,
    duration: "28 hours",
    level: "Intermediate",
    price: "₹599",
    platform: "Udemy",
    weeks: 6,
    weekly_hours: "5 hours",
    why_choose: "Essential for modern deployment.",
    skills: "Docker, Kubernetes, Containers",
    url: "https://www.udemy.com"
  },
  {
    title: "Git & GitHub Essentials",
    description: "Learn version control with Git and GitHub for collaboration.",
    instructor: "GitHub",
    rating: 4.8,
    students: 500000,
    duration: "15 hours",
    level: "Beginner",
    price: "Free",
    platform: "Udemy",
    weeks: 4,
    weekly_hours: "4 hours",
    why_choose: "Essential skill for every developer.",
    skills: "Git, GitHub, Branching, Merge Conflicts",
    url: "https://www.udemy.com"
  },
  {
    title: "Linux Administration",
    description: "Master Linux OS and server administration.",
    instructor: "Linux Foundation",
    rating: 4.6,
    students: 350000,
    duration: "30 hours",
    level: "Intermediate",
    price: "Free",
    platform: "edX",
    weeks: 7,
    weekly_hours: "4 hours",
    why_choose: "Essential for server management.",
    skills: "Linux, Bash, System Administration",
    url: "https://www.edx.org"
  },
  // Data Science
  {
    title: "Data Science Professional Certificate",
    description: "Complete data science track from IBM.",
    instructor: "IBM",
    rating: 4.7,
    students: 800000,
    duration: "60 hours",
    level: "Beginner",
    price: "Free",
    platform: "Coursera",
    weeks: 12,
    weekly_hours: "5 hours",
    why_choose: "Industry-recognized data science certification.",
    skills: "Python, Data Analysis, Visualization, ML",
    url: "https://www.coursera.org"
  },
  {
    title: "Data Analysis with R",
    description: "Learn statistical analysis with R programming.",
    instructor: "Duke University",
    rating: 4.6,
    students: 400000,
    duration: "30 hours",
    level: "Beginner",
    price: "Free",
    platform: "Coursera",
    weeks: 6,
    weekly_hours: "5 hours",
    why_choose: "Statistics and data analysis with R.",
    skills: "R, Statistics, Data Visualization",
    url: "https://www.coursera.org"
  },
  {
    title: "Big Data Analytics",
    description: "Learn to process and analyze large datasets.",
    instructor: "University of California",
    rating: 4.6,
    students: 250000,
    duration: "35 hours",
    level: "Advanced",
    price: "₹699",
    platform: "Coursera",
    weeks: 8,
    weekly_hours: "4 hours",
    why_choose: "Handle big data with Apache tools.",
    skills: "Hadoop, Spark, Hive, Big Data",
    url: "https://www.coursera.org"
  },
  // Software Engineering
  {
    title: "Software Engineering Specialization",
    description: "Learn software engineering principles and practices.",
    instructor: "University of Illinois",
    rating: 4.7,
    students: 300000,
    duration: "40 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Coursera",
    weeks: 8,
    weekly_hours: "5 hours",
    why_choose: "Comprehensive software engineering course.",
    skills: "Software Design, Testing, Agile, UML",
    url: "https://www.coursera.org"
  },
  {
    title: "Agile Project Management",
    description: "Master Agile and Scrum methodologies.",
    instructor: "Atlassian",
    rating: 4.7,
    students: 450000,
    duration: "20 hours",
    level: "Beginner",
    price: "Free",
    platform: "Coursera",
    weeks: 5,
    weekly_hours: "4 hours",
    why_choose: "Industry-standard project management.",
    skills: "Agile, Scrum, Jira, Kanban",
    url: "https://www.coursera.org"
  },
  {
    title: "System Design Interview",
    description: "Learn to design scalable systems for interviews.",
    instructor: "Alex Xu",
    rating: 4.8,
    students: 200000,
    duration: "25 hours",
    level: "Advanced",
    price: "₹599",
    platform: "Udemy",
    weeks: 6,
    weekly_hours: "4 hours",
    why_choose: "Ace system design interviews.",
    skills: "Scalability, Load Balancing, Caching",
    url: "https://www.udemy.com"
  },
  // Computer Networks
  {
    title: "Computer Networking",
    description: "Complete networking course from fundamentals to advanced.",
    instructor: "Cisco",
    rating: 4.6,
    students: 400000,
    duration: "35 hours",
    level: "Beginner",
    price: "Free",
    platform: "Coursera",
    weeks: 8,
    weekly_hours: "4 hours",
    why_choose: "Foundation of network architecture.",
    skills: "TCP/IP, DNS, HTTP, Routing",
    url: "https://www.coursera.org"
  },
  {
    title: "CCNA Certification",
    description: "Prepare for Cisco CCNA networking certification.",
    instructor: "Cisco",
    rating: 4.7,
    students: 350000,
    duration: "50 hours",
    level: "Intermediate",
    price: "₹899",
    platform: "Udemy",
    weeks: 10,
    weekly_hours: "5 hours",
    why_choose: "Industry-recognized networking certification.",
    skills: "Network Devices, VLAN, Routing Protocols",
    url: "https://www.udemy.com"
  },
  // Blockchain
  {
    title: "Blockchain Technology",
    description: "Learn blockchain fundamentals and development.",
    instructor: "Binance",
    rating: 4.5,
    students: 200000,
    duration: "25 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Coursera",
    weeks: 5,
    weekly_hours: "5 hours",
    why_choose: "Understand decentralized systems.",
    skills: "Blockchain, Ethereum, Smart Contracts",
    url: "https://www.coursera.org"
  },
  {
    title: "Solidity & Smart Contracts",
    description: "Build decentralized applications on Ethereum.",
    instructor: "CryptoZombies",
    rating: 4.6,
    students: 150000,
    duration: "20 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Udemy",
    weeks: 5,
    weekly_hours: "4 hours",
    why_choose: "Develop blockchain applications.",
    skills: "Solidity, Web3, Smart Contracts",
    url: "https://www.udemy.com"
  },
  // Operating Systems
  {
    title: "Operating Systems Fundamentals",
    description: "Learn OS concepts including processes, memory, and threading.",
    instructor: "Georgia Tech",
    rating: 4.7,
    students: 300000,
    duration: "30 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Coursera",
    weeks: 6,
    weekly_hours: "5 hours",
    why_choose: "Understand how computers work at the lowest level.",
    skills: "Processes, Threads, Memory Management, Scheduling",
    url: "https://www.coursera.org"
  },
  // Computer Architecture
  {
    title: "Computer Architecture",
    description: "Learn digital logic and computer organization.",
    instructor: "Princeton University",
    rating: 4.6,
    students: 250000,
    duration: "35 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Coursera",
    weeks: 7,
    weekly_hours: "5 hours",
    why_choose: "Foundation of computer hardware.",
    skills: "Digital Logic, CPU Design, Memory Hierarchy",
    url: "https://www.coursera.org"
  },
  // IoT
  {
    title: "Internet of Things (IoT)",
    description: "Learn IoT concepts and build connected devices.",
    instructor: "Cisco",
    rating: 4.5,
    students: 180000,
    duration: "25 hours",
    level: "Intermediate",
    price: "Free",
    platform: "Coursera",
    weeks: 6,
    weekly_hours: "4 hours",
    why_choose: "Build smart connected devices.",
    skills: "IoT Sensors, Raspberry Pi, Arduino",
    url: "https://www.coursera.org"
  },
  // UI/UX Design
  {
    title: "UI/UX Design Fundamentals",
    description: "Learn user interface and user experience design principles.",
    instructor: "Google",
    rating: 4.7,
    students: 350000,
    duration: "22 hours",
    level: "Beginner",
    price: "Free",
    platform: "Coursera",
    weeks: 5,
    weekly_hours: "4 hours",
    why_choose: "Create user-friendly applications.",
    skills: "Figma, Wireframing, Prototyping, User Research",
    url: "https://www.coursera.org"
  }
];

function Courses({ user }) {
  const [courses, setCourses] = useState(MOCK_COURSES);
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
    // Use mock data instead of fetching from API
    filterCoursesByCategory();
    if (user) {
      fetchEnrollments();
    }
  }, [user, category]);

  // Filter courses by category using mock data
  const filterCoursesByCategory = () => {
    if (category === 'all' || category === 'recommended') {
      setCourses(MOCK_COURSES);
    } else {
      // Map category to relevant skills/platforms
      const categoryMap = {
        'web development': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Full Stack', 'Web'],
        'data science': ['Data', 'Analysis', 'Statistics', 'Big Data', 'R'],
        'machine learning': ['Machine Learning', 'Deep Learning', 'AI', 'Neural', 'TensorFlow', 'NLP'],
        'mobile development': ['Flutter', 'Android', 'iOS', 'Mobile', 'Swift', 'Kotlin', 'Dart'],
        'cloud computing': ['AWS', 'Cloud', 'GCP', 'Azure', 'Kubernetes'],
        'cybersecurity': ['Security', 'Hacking', 'Penetration', 'Network Security']
      };
      
      const keywords = categoryMap[category] || [];
      const filtered = MOCK_COURSES.filter(course => 
        keywords.some(keyword => 
          course.skills.toLowerCase().includes(keyword.toLowerCase()) ||
          course.title.toLowerCase().includes(keyword.toLowerCase()) ||
          course.platform.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      setCourses(filtered.length > 0 ? filtered : MOCK_COURSES);
    }
  };

  const fetchRecommendedCourses = async () => {
    // Using mock data - show all courses as recommended
    setCourses(MOCK_COURSES);
  };

  const fetchExternalCourses = async () => {
    // Using mock data - filter by category
    filterCoursesByCategory();
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
