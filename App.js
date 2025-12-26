import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, ComposedChart } from 'recharts';
import { Users, BookOpen, TrendingUp, Award, AlertCircle, Calendar, FileText, Brain, Target, Activity, Clock, CheckCircle, XCircle, AlertTriangle, Download, Upload, Search, Filter, BarChart2, Settings, Bell, User, LogOut, Menu, X, Plus, Edit, Trash2, Eye, RefreshCw, Save, ChevronRight, ChevronDown, GraduationCap, Star, Trophy, Zap, Shield, TrendingDown, MessageSquare, Home, ArrowUp, ArrowDown, Mail, Phone, MapPin, Lock } from 'lucide-react';

const UniversityGradingSystem = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [animateCards, setAnimateCards] = useState(false);
  const [aiAnalysisRunning, setAiAnalysisRunning] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReportStudent, setSelectedReportStudent] = useState(null);

  const [newStudent, setNewStudent] = useState({
    name: '', rollNo: '', email: '', phone: '', guardian: '', guardianContact: ''
  });

  const [newExam, setNewExam] = useState({
    name: '', subject: '', date: '', time: '', duration: '', totalMarks: '', questions: ''
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: '8 students at high risk', time: '2 hours ago', read: false },
    { id: 2, type: 'success', message: 'Exam grading completed', time: '5 hours ago', read: false },
    { id: 3, type: 'info', message: 'New assignment uploaded', time: '1 day ago', read: true },
    { id: 4, type: 'warning', message: 'Attendance below 80% for 15 students', time: '2 days ago', read: true },
    { id: 5, type: 'success', message: 'AI analysis report ready', time: '3 days ago', read: true }
  ]);

  const [users] = useState([
    { email: 'admin@university.edu', password: 'admin123', role: 'admin', name: 'Admin User' },
    { email: 'teacher@university.edu', password: 'teacher123', role: 'teacher', name: 'Teacher User' },
    { email: 'student@university.edu', password: 'student123', role: 'student', name: 'Student User' }
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', rollNo: 'CS2025001', email: 'alice.j@university.edu', grade: 'A+', marks: 95, percentile: 98, attendance: 96, gpa: 3.95, riskLevel: 'low', trend: 'up', predictedGrade: 'A+', confidence: 97, strengths: ['Problem Solving', 'Algorithms'], weaknesses: [], aiRecommendation: 'Excellent performer. Consider advanced coursework.', badges: ['Top Performer', 'Perfect Attendance'], phone: '+1-555-0101', guardian: 'John Johnson', guardianContact: '+1-555-0102', assignments: 18, assignmentsCompleted: 18, midterm: 96, quizAvg: 94 },
    { id: 2, name: 'Bob Smith', rollNo: 'CS2025002', email: 'bob.s@university.edu', grade: 'A', marks: 88, percentile: 89, attendance: 92, gpa: 3.75, riskLevel: 'low', trend: 'stable', predictedGrade: 'A', confidence: 92, strengths: ['Database', 'Web Dev'], weaknesses: ['Mathematics'], aiRecommendation: 'Consistent performer.', badges: ['Team Player'], phone: '+1-555-0201', guardian: 'Mary Smith', guardianContact: '+1-555-0202', assignments: 18, assignmentsCompleted: 17, midterm: 89, quizAvg: 86 },
    { id: 3, name: 'Charlie Davis', rollNo: 'CS2025003', email: 'charlie.d@university.edu', grade: 'B+', marks: 82, percentile: 78, attendance: 88, gpa: 3.45, riskLevel: 'low', trend: 'up', predictedGrade: 'A-', confidence: 85, strengths: ['UI/UX Design'], weaknesses: ['Time Management'], aiRecommendation: 'Showing improvement.', badges: ['Most Improved'], phone: '+1-555-0301', guardian: 'David Davis', guardianContact: '+1-555-0302', assignments: 18, assignmentsCompleted: 16, midterm: 84, quizAvg: 80 },
    { id: 4, name: 'Diana Prince', rollNo: 'CS2025004', email: 'diana.p@university.edu', grade: 'A+', marks: 97, percentile: 99, attendance: 98, gpa: 3.98, riskLevel: 'low', trend: 'up', predictedGrade: 'A+', confidence: 99, strengths: ['Leadership', 'ML', 'Research'], weaknesses: [], aiRecommendation: 'Outstanding performance.', badges: ['Valedictorian', 'Research Excellence'], phone: '+1-555-0401', guardian: 'Steve Prince', guardianContact: '+1-555-0402', assignments: 18, assignmentsCompleted: 18, midterm: 97, quizAvg: 98 },
    { id: 5, name: 'Ethan Hunt', rollNo: 'CS2025005', email: 'ethan.h@university.edu', grade: 'B', marks: 78, percentile: 72, attendance: 85, gpa: 3.15, riskLevel: 'medium', trend: 'stable', predictedGrade: 'B+', confidence: 78, strengths: ['Practical Work'], weaknesses: ['Theory'], aiRecommendation: 'Needs theoretical focus.', badges: ['Hands-on Expert'], phone: '+1-555-0501', guardian: 'Jane Hunt', guardianContact: '+1-555-0502', assignments: 18, assignmentsCompleted: 15, midterm: 79, quizAvg: 76 },
    { id: 6, name: 'Fiona Green', rollNo: 'CS2025006', email: 'fiona.g@university.edu', grade: 'C+', marks: 68, percentile: 58, attendance: 78, gpa: 2.65, riskLevel: 'high', trend: 'down', predictedGrade: 'C', confidence: 72, strengths: ['Dedication'], weaknesses: ['Fundamentals', 'Problem Solving'], aiRecommendation: 'At-risk. Intervention needed.', badges: [], phone: '+1-555-0601', guardian: 'Robert Green', guardianContact: '+1-555-0602', assignments: 18, assignmentsCompleted: 13, midterm: 70, quizAvg: 65 },
    { id: 7, name: 'George Wilson', rollNo: 'CS2025007', email: 'george.w@university.edu', grade: 'A-', marks: 85, percentile: 83, attendance: 90, gpa: 3.58, riskLevel: 'low', trend: 'up', predictedGrade: 'A', confidence: 88, strengths: ['System Design', 'Cloud'], weaknesses: ['Frontend'], aiRecommendation: 'Strong technical skills.', badges: ['Cloud Certified'], phone: '+1-555-0701', guardian: 'Lisa Wilson', guardianContact: '+1-555-0702', assignments: 18, assignmentsCompleted: 17, midterm: 86, quizAvg: 84 },
    { id: 8, name: 'Hannah Lee', rollNo: 'CS2025008', email: 'hannah.l@university.edu', grade: 'A', marks: 91, percentile: 92, attendance: 94, gpa: 3.82, riskLevel: 'low', trend: 'stable', predictedGrade: 'A+', confidence: 90, strengths: ['AI/ML', 'Data Science'], weaknesses: [], aiRecommendation: 'Excellent in AI/ML.', badges: ['Data Wizard', 'AI Enthusiast'], phone: '+1-555-0801', guardian: 'Michael Lee', guardianContact: '+1-555-0802', assignments: 18, assignmentsCompleted: 18, midterm: 92, quizAvg: 90 },
    { id: 9, name: 'Ian Foster', rollNo: 'CS2025009', email: 'ian.f@university.edu', grade: 'B+', marks: 83, percentile: 80, attendance: 87, gpa: 3.48, riskLevel: 'low', trend: 'stable', predictedGrade: 'B+', confidence: 86, strengths: ['Mobile Dev'], weaknesses: ['Database'], aiRecommendation: 'Good balance.', badges: ['Mobile Dev Pro'], phone: '+1-555-0901', guardian: 'Sarah Foster', guardianContact: '+1-555-0902', assignments: 18, assignmentsCompleted: 16, midterm: 84, quizAvg: 82 },
    { id: 10, name: 'Julia Martinez', rollNo: 'CS2025010', email: 'julia.m@university.edu', grade: 'A-', marks: 86, percentile: 85, attendance: 91, gpa: 3.62, riskLevel: 'low', trend: 'up', predictedGrade: 'A', confidence: 89, strengths: ['Cybersecurity'], weaknesses: ['Software Eng'], aiRecommendation: 'Strong security focus.', badges: ['Security Champion'], phone: '+1-555-1001', guardian: 'Carlos Martinez', guardianContact: '+1-555-1002', assignments: 18, assignmentsCompleted: 17, midterm: 87, quizAvg: 85 },
    { id: 11, name: 'Kevin Brown', rollNo: 'CS2025011', email: 'kevin.b@university.edu', grade: 'C', marks: 72, percentile: 65, attendance: 82, gpa: 2.85, riskLevel: 'medium', trend: 'stable', predictedGrade: 'C+', confidence: 75, strengths: ['Hardware'], weaknesses: ['Algorithms'], aiRecommendation: 'Moderate risk.', badges: [], phone: '+1-555-1101', guardian: 'Patricia Brown', guardianContact: '+1-555-1102', assignments: 18, assignmentsCompleted: 14, midterm: 73, quizAvg: 70 },
    { id: 12, name: 'Laura Chen', rollNo: 'CS2025012', email: 'laura.c@university.edu', grade: 'A', marks: 89, percentile: 88, attendance: 93, gpa: 3.72, riskLevel: 'low', trend: 'up', predictedGrade: 'A', confidence: 91, strengths: ['Full Stack', 'DevOps'], weaknesses: [], aiRecommendation: 'Well-rounded skills.', badges: ['Full Stack Master'], phone: '+1-555-1201', guardian: 'Wei Chen', guardianContact: '+1-555-1202', assignments: 18, assignmentsCompleted: 18, midterm: 90, quizAvg: 88 },
    { id: 13, name: 'Mike Johnson', rollNo: 'CS2025013', email: 'mike.j@university.edu', grade: 'B', marks: 80, percentile: 75, attendance: 86, gpa: 3.25, riskLevel: 'low', trend: 'stable', predictedGrade: 'B+', confidence: 82, strengths: ['Testing', 'QA'], weaknesses: ['Design Patterns'], aiRecommendation: 'Solid performer.', badges: ['Quality Assurance'], phone: '+1-555-1301', guardian: 'Nancy Johnson', guardianContact: '+1-555-1302', assignments: 18, assignmentsCompleted: 16, midterm: 81, quizAvg: 79 },
    { id: 14, name: 'Nina Patel', rollNo: 'CS2025014', email: 'nina.p@university.edu', grade: 'A+', marks: 94, percentile: 97, attendance: 97, gpa: 3.92, riskLevel: 'low', trend: 'up', predictedGrade: 'A+', confidence: 98, strengths: ['Algorithms', 'Competitive Coding'], weaknesses: [], aiRecommendation: 'Exceptional talent.', badges: ['Coding Champion', 'Hackathon Winner'], phone: '+1-555-1401', guardian: 'Raj Patel', guardianContact: '+1-555-1402', assignments: 18, assignmentsCompleted: 18, midterm: 95, quizAvg: 93 },
    { id: 15, name: 'Oliver Scott', rollNo: 'CS2025015', email: 'oliver.s@university.edu', grade: 'B-', marks: 75, percentile: 68, attendance: 80, gpa: 3.05, riskLevel: 'medium', trend: 'down', predictedGrade: 'C+', confidence: 70, strengths: ['Creativity'], weaknesses: ['Focus', 'Consistency'], aiRecommendation: 'Needs more consistency.', badges: [], phone: '+1-555-1501', guardian: 'Emma Scott', guardianContact: '+1-555-1502', assignments: 18, assignmentsCompleted: 14, midterm: 76, quizAvg: 74 },
    { id: 16, name: 'Paula White', rollNo: 'CS2025016', email: 'paula.w@university.edu', grade: 'A', marks: 90, percentile: 90, attendance: 95, gpa: 3.78, riskLevel: 'low', trend: 'stable', predictedGrade: 'A', confidence: 93, strengths: ['Project Management', 'Leadership'], weaknesses: [], aiRecommendation: 'Natural leader.', badges: ['Team Leader', 'Project Excellence'], phone: '+1-555-1601', guardian: 'Tom White', guardianContact: '+1-555-1602', assignments: 18, assignmentsCompleted: 18, midterm: 91, quizAvg: 89 },
    { id: 17, name: 'Quinn Adams', rollNo: 'CS2025017', email: 'quinn.a@university.edu', grade: 'D+', marks: 65, percentile: 52, attendance: 74, gpa: 2.45, riskLevel: 'high', trend: 'down', predictedGrade: 'D', confidence: 68, strengths: ['Effort'], weaknesses: ['Fundamentals', 'Attendance', 'Study Habits'], aiRecommendation: 'Critical intervention required.', badges: [], phone: '+1-555-1701', guardian: 'Susan Adams', guardianContact: '+1-555-1702', assignments: 18, assignmentsCompleted: 11, midterm: 67, quizAvg: 63 },
    { id: 18, name: 'Rachel Green', rollNo: 'CS2025018', email: 'rachel.g@university.edu', grade: 'A-', marks: 87, percentile: 86, attendance: 92, gpa: 3.65, riskLevel: 'low', trend: 'up', predictedGrade: 'A', confidence: 87, strengths: ['Communication', 'Documentation'], weaknesses: ['Advanced Topics'], aiRecommendation: 'Great communicator.', badges: ['Best Documentation'], phone: '+1-555-1801', guardian: 'Monica Green', guardianContact: '+1-555-1802', assignments: 18, assignmentsCompleted: 17, midterm: 88, quizAvg: 86 },
    { id: 19, name: 'Sam Taylor', rollNo: 'CS2025019', email: 'sam.t@university.edu', grade: 'B+', marks: 84, percentile: 81, attendance: 89, gpa: 3.52, riskLevel: 'low', trend: 'stable', predictedGrade: 'A-', confidence: 84, strengths: ['Backend Dev', 'APIs'], weaknesses: ['Frontend'], aiRecommendation: 'Strong backend developer.', badges: ['API Master'], phone: '+1-555-1901', guardian: 'Linda Taylor', guardianContact: '+1-555-1902', assignments: 18, assignmentsCompleted: 17, midterm: 85, quizAvg: 83 },
    { id: 20, name: 'Tina Rodriguez', rollNo: 'CS2025020', email: 'tina.r@university.edu', grade: 'C+', marks: 70, percentile: 62, attendance: 79, gpa: 2.75, riskLevel: 'medium', trend: 'stable', predictedGrade: 'B-', confidence: 73, strengths: ['Persistence'], weaknesses: ['Math', 'Logic'], aiRecommendation: 'Additional tutoring recommended.', badges: [], phone: '+1-555-2001', guardian: 'Jose Rodriguez', guardianContact: '+1-555-2002', assignments: 18, assignmentsCompleted: 13, midterm: 71, quizAvg: 69 }
  ]);

  const [exams, setExams] = useState([
    { id: 1, name: 'Data Structures Mid-Term', subject: 'Data Structures', date: '2025-10-15', time: '10:00 AM', duration: '2 hours', totalMarks: 100, avgScore: 82.5, highestScore: 98, lowestScore: 45, difficulty: 'medium', status: 'completed', questions: 50, passPercentage: 88, participated: 850 },
    { id: 2, name: 'Algorithms Final', subject: 'Algorithms', date: '2025-12-20', time: '2:00 PM', duration: '3 hours', totalMarks: 100, avgScore: 0, highestScore: 0, lowestScore: 0, difficulty: 'hard', status: 'scheduled', questions: 60, passPercentage: 0, participated: 0 },
    { id: 3, name: 'Database Quiz 1', subject: 'Database', date: '2025-09-28', time: '11:00 AM', duration: '45 mins', totalMarks: 50, avgScore: 38.5, highestScore: 50, lowestScore: 18, difficulty: 'easy', status: 'completed', questions: 25, passPercentage: 92, participated: 850 }
  ]);

  const performanceData = [
    { month: 'Apr', avgScore: 74, attendance: 86, passRate: 83 },
    { month: 'May', avgScore: 76, attendance: 87, passRate: 85 },
    { month: 'Jun', avgScore: 79, attendance: 89, passRate: 87 },
    { month: 'Jul', avgScore: 78, attendance: 88, passRate: 86 },
    { month: 'Aug', avgScore: 81, attendance: 90, passRate: 89 },
    { month: 'Sep', avgScore: 83, attendance: 91, passRate: 90 },
    { month: 'Oct', avgScore: 85, attendance: 92, passRate: 92 }
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 128, percentage: 15.1 },
    { grade: 'A', count: 195, percentage: 22.9 },
    { grade: 'B+', count: 212, percentage: 24.9 },
    { grade: 'B', count: 170, percentage: 20.0 },
    { grade: 'C+', count: 89, percentage: 10.5 },
    { grade: 'C', count: 42, percentage: 4.9 },
    { grade: 'D', count: 14, percentage: 1.7 }
  ];

  const subjectPerformance = [
    { subject: 'DS', score: 85 },
    { subject: 'Algo', score: 78 },
    { subject: 'DB', score: 88 },
    { subject: 'Web', score: 82 },
    { subject: 'ML', score: 76 },
    { subject: 'OS', score: 84 }
  ];

  const riskAnalysis = [
    { category: 'Low Risk', value: 722, color: '#10b981' },
    { category: 'Medium Risk', value: 98, color: '#f59e0b' },
    { category: 'High Risk', value: 30, color: '#ef4444' }
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  useEffect(() => {
    setAnimateCards(true);
    const timer = setTimeout(() => setAnimateCards(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      alert(`Welcome ${user.name}! Logged in as ${user.role}`);
    } else {
      alert('Invalid credentials! Try:\nadmin@university.edu / admin123\nteacher@university.edu / teacher123\nstudent@university.edu / student123');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Signup successful for ${signupData.name}! Please login with your credentials.`);
    setShowLogin(true);
    setSignupData({ name: '', email: '', password: '', role: 'student' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginData({ email: '', password: '' });
    setActiveTab('dashboard');
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newId = students.length + 1;
    const studentToAdd = {
      ...newStudent,
      id: newId,
      grade: 'N/A',
      marks: 0,
      percentile: 0,
      attendance: 0,
      gpa: 0.0,
      riskLevel: 'low',
      trend: 'stable',
      predictedGrade: 'N/A',
      confidence: 0,
      strengths: [],
      weaknesses: [],
      aiRecommendation: 'New student - data being collected',
      badges: [],
      assignments: 0,
      assignmentsCompleted: 0,
      midterm: 0,
      quizAvg: 0
    };
    setStudents([...students, studentToAdd]);
    setShowAddStudentModal(false);
    setNewStudent({ name: '', rollNo: '', email: '', phone: '', guardian: '', guardianContact: '' });
    alert(`Student ${newStudent.name} added successfully!`);
  };

  const handleAddExam = (e) => {
    e.preventDefault();
    const newId = exams.length + 1;
    const examToAdd = {
      ...newExam,
      id: newId,
      avgScore: 0,
      highestScore: 0,
      lowestScore: 0,
      difficulty: 'medium',
      status: 'scheduled',
      passPercentage: 0,
      participated: 0
    };
    setExams([...exams, examToAdd]);
    setShowAddExamModal(false);
    setNewExam({ name: '', subject: '', date: '', time: '', duration: '', totalMarks: '', questions: '' });
    alert(`Exam ${newExam.name} scheduled successfully!`);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
      setSelectedStudent(null);
      alert('Student deleted successfully!');
    }
  };

  const handleExportPDF = () => {
    alert('PDF Export functionality:\n\nIn a real application, this would:\n• Generate a comprehensive PDF report\n• Include all student data and charts\n• Download automatically\n\nFor now, this is a demo simulation.');
  };

  const handleGenerateReport = (student) => {
    setSelectedReportStudent(student);
    setShowReportModal(true);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const runAIAnalysis = () => {
    setAiAnalysisRunning(true);
    setTimeout(() => {
      setAiAnalysisRunning(false);
      alert('AI Analysis Complete!\n\nKey Insights:\n• 30 students at-risk identified\n• Recommended grade curve: +3.2%\n• Predicted pass rate: 87.5%\n• 5 questions flagged as too difficult\n• 12 students showing improvement\n• 3 students need immediate counseling');
    }, 2000);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || student.riskLevel === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'marks') return b.marks - a.marks;
    if (sortBy === 'attendance') return b.attendance - a.attendance;
    return 0;
  });

  const StatCard = ({ icon: Icon, title, value, change, color, trend, subtitle }) => (
    <div className={`stat-card ${animateCards ? 'fade-in' : ''}`} style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-icon-wrapper" style={{ background: `${color}20` }}>
        <Icon size={28} style={{ color }} strokeWidth={2.5} />
      </div>
      <div className="stat-details">
        <div className="stat-label">{title}</div>
        <div className="stat-value">{value}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
        {change && (
          <div className={`stat-trend ${trend === 'up' ? 'trend-up' : trend === 'down' ? 'trend-down' : 'trend-neutral'}`}>
            {trend === 'up' && <ArrowUp size={14} />}
            {trend === 'down' && <ArrowDown size={14} />}
            {trend === 'stable' && <TrendingUp size={14} />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <GraduationCap size={48} className="login-logo" />
            <h1>EduAI System</h1>
            <p>AI-Powered University Grading Platform</p>
          </div>

          {showLogin ? (
            <form onSubmit={handleLogin} className="login-form">
              <h2>Login</h2>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={loginData.email} 
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={loginData.password} 
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="btn-login">Login</button>
              <p className="switch-auth">
                Don't have an account? 
                <span onClick={() => setShowLogin(false)}> Sign up</span>
              </p>
              <div className="demo-credentials">
                <strong>Demo Credentials:</strong>
                <p>Admin: admin@university.edu / admin123</p>
                <p>Teacher: teacher@university.edu / teacher123</p>
                <p>Student: student@university.edu / student123</p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="login-form">
              <h2>Sign Up</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select 
                  value={signupData.role}
                  onChange={(e) => setSignupData({...signupData, role: e.target.value})}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn-login">Sign Up</button>
              <p className="switch-auth">
                Already have an account? 
                <span onClick={() => setShowLogin(true)}> Login</span>
              </p>
            </form>
          )}
        </div>

        <style>{`
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
          }
          .login-box {
            background: white;
            border-radius: 24px;
            padding: 48px;
            max-width: 480px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideUp 0.5s ease-out;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .login-header {
            text-align: center;
            margin-bottom: 32px;
          }
          .login-logo {
            color: #6366f1;
            margin-bottom: 16px;
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          .login-header h1 {
            font-size: 32px;
            font-weight: 800;
            color: #1f2937;
            margin-bottom: 8px;
          }
          .login-header p {
            font-size: 14px;
            color: #6b7280;
          }
          .login-form h2 {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 24px;
            text-align: center;
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-group label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
          }
          .form-group input,
          .form-group select {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 14px;
            transition: all 0.3s;
          }
          .form-group input:focus,
          .form-group select:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }
          .btn-login {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 8px;
          }
          .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
          }
          .switch-auth {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #6b7280;
          }
          .switch-auth span {
            color: #6366f1;
            font-weight: 600;
            cursor: pointer;
            text-decoration: underline;
          }
          .demo-credentials {
            margin-top: 24px;
            padding: 16px;
            background: #f9fafb;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
          }
          .demo-credentials strong {
            display: block;
            color: #1f2937;
            margin-bottom: 8px;
            font-size: 13px;
          }
          .demo-credentials p {
            font-size: 12px;
            color: #6b7280;
            margin: 4px 0;
            font-family: monospace;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container">
      <aside className={`sidebar ${!sidebarOpen ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <GraduationCap size={32} className="logo-icon" />
          {sidebarOpen && <span className="logo-text">EduAI System</span>}
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <Home size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button className={`nav-item ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
            <Users size={20} />
            {sidebarOpen && <span>Students</span>}
          </button>
          <button className={`nav-item ${activeTab === 'exams' ? 'active' : ''}`} onClick={() => setActiveTab('exams')}>
            <BookOpen size={20} />
            {sidebarOpen && <span>Exams</span>}
          </button>
          <button className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <Brain size={20} />
            {sidebarOpen && <span>AI Analytics</span>}
          </button>
          <button className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <FileText size={20} />
            {sidebarOpen && <span>Reports</span>}
          </button>
        </nav>
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
      </aside>

      <div className="main-wrapper">
        <header className="top-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
          <div className="header-right">
            <button className="header-icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
              )}
            </button>
            <button className="header-icon-btn" onClick={() => setShowSettingsModal(true)}>
              <Settings size={20} />
            </button>
            <div className="user-profile">
              <div className="user-avatar">{currentUser?.name?.charAt(0) || 'U'}</div>
              <div className="user-info">
                <div className="user-name">{currentUser?.name || 'User'}</div>
                <div className="user-role">{currentUser?.role || 'Role'}</div>
              </div>
              <button className="logout-btn" onClick={handleLogout} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {showNotifications && (
          <div className="notifications-panel">
            <div className="notifications-header">
              <h3>Notifications</h3>
              <button onClick={() => setShowNotifications(false)}><X size={20} /></button>
            </div>
            <div className="notifications-list">
              {notifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                  onClick={() => markNotificationAsRead(notif.id)}
                >
                  <div className={`notif-icon notif-${notif.type}`}>
                    {notif.type === 'warning' && <AlertTriangle size={18} />}
                    {notif.type === 'success' && <CheckCircle size={18} />}
                    {notif.type === 'info' && <Bell size={18} />}
                  </div>
                  <div className="notif-content">
                    <p>{notif.message}</p>
                    <span>{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="main-content">
          {activeTab === 'dashboard' && (
            <>
              <div className="content-header">
                <div>
                  <h1 className="page-title">Dashboard Overview</h1>
                  <p className="page-subtitle">Real-time analytics & AI insights</p>
                </div>
                <button className="btn-primary" onClick={handleExportPDF}>
                  <Download size={18} />
                  <span>Export Report</span>
                </button>
              </div>

              <div className="stats-container">
                <StatCard icon={Users} title="Total Students" value={students.length.toString()} change="+12 this month" color="#6366f1" trend="up" subtitle="Active enrollment" />
                <StatCard icon={BookOpen} title="Active Exams" value={exams.length.toString()} change="4 upcoming" color="#8b5cf6" trend="stable" subtitle="This semester" />
                <StatCard icon={Award} title="Avg Performance" value="82.5%" change="+3.2% from last" color="#10b981" trend="up" subtitle="GPA: 3.42" />
                <StatCard icon={AlertCircle} title="At-Risk Students" value={students.filter(s => s.riskLevel === 'high').length.toString()} change="-5 from last week" color="#ef4444" trend="down" subtitle="Need intervention" />
              </div>

              <div className="charts-grid">
                <div className="chart-container large">
                  <div className="chart-header">
                    <h3>Performance Trends</h3>
                    <select className="chart-select">
                      <option>Last 6 Months</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="avgScore" stroke="#6366f1" fill="url(#colorScore)" />
                      <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <div className="chart-header">
                    <h3>Grade Distribution</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={gradeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="grade" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                        {gradeDistribution.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <div className="chart-header">
                    <h3>Subject Performance</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={subjectPerformance}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                      <PolarRadiusAxis stroke="#6b7280" />
                      <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <div className="chart-header">
                    <h3>Risk Analysis</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={riskAnalysis} cx="50%" cy="50%" outerRadius={90} dataKey="value" label>
                        {riskAnalysis.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="ai-card">
                  <div className="ai-header">
                    <Brain size={32} />
                    <div>
                      <h3>AI Insights</h3>
                      <p>Predictive analytics</p>
                    </div>
                  </div>
                  <div className="ai-metrics">
                    <div className="ai-metric">
                      <span>Pass Rate</span>
                      <strong>87.5%</strong>
                    </div>
                    <div className="ai-metric">
                      <span>At-Risk</span>
                      <strong>30</strong>
                    </div>
                    <div className="ai-metric">
                      <span>Curve</span>
                      <strong>+3.2%</strong>
                    </div>
                  </div>
                  <button className="btn-ai" onClick={runAIAnalysis} disabled={aiAnalysisRunning}>
                    {aiAnalysisRunning ? 'Analyzing...' : 'Run Analysis'}
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'students' && (
            <>
              <div className="content-header">
                <div>
                  <h1 className="page-title">Student Management ({students.length} students)</h1>
                  <p className="page-subtitle">Track student performance</p>
                </div>
                <button className="btn-primary" onClick={() => setShowAddStudentModal(true)}>
                  <Plus size={18} />
                  <span>Add Student</span>
                </button>
              </div>

              <div className="filter-bar">
                <div className="search-box">
                  <Search size={20} />
                  <input type="text" placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className="filter-select">
                  <option value="all">All Students</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                  <option value="name">Sort by Name</option>
                  <option value="marks">Sort by Marks</option>
                  <option value="attendance">Sort by Attendance</option>
                </select>
              </div>

              <div className="students-grid">
                {sortedStudents.map(student => (
                  <div key={student.id} className="student-card">
                    <div className="student-header">
                      <div className="student-avatar">{student.name.charAt(0)}</div>
                      <div className="student-info">
                        <h3>{student.name}</h3>
                        <p>{student.rollNo}</p>
                      </div>
                      <span className={`risk-badge risk-${student.riskLevel}`}>{student.riskLevel}</span>
                    </div>
                    <div className="student-stats">
                      <div className="stat-item">
                        <Award size={16} />
                        <div>
                          <span>Grade</span>
                          <strong>{student.grade}</strong>
                        </div>
                      </div>
                      <div className="stat-item">
                        <Target size={16} />
                        <div>
                          <span>Marks</span>
                          <strong>{student.marks}%</strong>
                        </div>
                      </div>
                      <div className="stat-item">
                        <Clock size={16} />
                        <div>
                          <span>Attendance</span>
                          <strong>{student.attendance}%</strong>
                        </div>
                      </div>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${student.marks}%`, backgroundColor: student.marks >= 85 ? '#10b981' : student.marks >= 70 ? '#f59e0b' : '#ef4444' }}></div>
                      </div>
                    </div>
                    <div className="badges">
                      {student.badges.map((badge, i) => (
                        <span key={i} className="badge">{badge}</span>
                      ))}
                    </div>
                    <div className="student-actions">
                      <button className="btn-action" onClick={() => setSelectedStudent(student)}>
                        <Eye size={16} /> View
                      </button>
                      <button className="btn-action" onClick={() => handleGenerateReport(student)}>
                        <Download size={16} /> Report
                      </button>
                      {currentUser?.role === 'admin' && (
                        <button className="btn-action danger" onClick={() => handleDeleteStudent(student.id)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'exams' && (
            <>
              <div className="content-header">
                <div>
                  <h1 className="page-title">Exam Management</h1>
                  <p className="page-subtitle">Schedule and analyze exams</p>
                </div>
                <button className="btn-primary" onClick={() => setShowAddExamModal(true)}>
                  <Plus size={18} />
                  <span>Create Exam</span>
                </button>
              </div>

              <div className="exams-grid">
                {exams.map(exam => (
                  <div key={exam.id} className="exam-card">
                    <div className="exam-header">
                      <h3>{exam.name}</h3>
                      <span className={`status-badge status-${exam.status}`}>{exam.status}</span>
                    </div>
                    <p className="exam-subject">{exam.subject}</p>
                    <div className="exam-details">
                      <div className="exam-detail">
                        <Calendar size={16} />
                        <span>{exam.date}</span>
                      </div>
                      <div className="exam-detail">
                        <Clock size={16} />
                        <span>{exam.duration}</span>
                      </div>
                      <div className="exam-detail">
                        <FileText size={16} />
                        <span>{exam.questions} Questions</span>
                      </div>
                    </div>
                    {exam.status === 'completed' && (
                      <div className="exam-stats">
                        <div className="exam-stat">
                          <span>Avg Score</span>
                          <strong>{exam.avgScore}%</strong>
                        </div>
                        <div className="exam-stat">
                          <span>Pass Rate</span>
                          <strong>{exam.passPercentage}%</strong>
                        </div>
                      </div>
                    )}
                    <button className="btn-exam-action" onClick={() => setSelectedExam(exam)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'analytics' && (
            <>
              <div className="content-header">
                <div>
                  <h1 className="page-title">AI Analytics</h1>
                  <p className="page-subtitle">Advanced insights</p>
                </div>
                <button className="btn-primary" onClick={runAIAnalysis}>
                  <Brain size={18} />
                  <span>Run Analysis</span>
                </button>
              </div>

              <div className="analytics-grid">
                <div className="analytics-card">
                  <Zap size={24} className="analytics-icon" />
                  <h3>Predictive Model</h3>
                  <div className="analytics-stats">
                    <div><span>Pass Rate:</span><strong>87.5%</strong></div>
                    <div><span>Confidence:</span><strong>94.2%</strong></div>
                  </div>
                </div>
                <div className="analytics-card">
                  <AlertTriangle size={24} className="analytics-icon warn" />
                  <h3>At-Risk Detection</h3>
                  <div className="risk-stats">
                    <div className="risk-stat high">
                      <strong>{students.filter(s => s.riskLevel === 'high').length}</strong>
                      <span>High Risk</span>
                    </div>
                    <div className="risk-stat medium">
                      <strong>{students.filter(s => s.riskLevel === 'medium').length}</strong>
                      <span>Medium</span>
                    </div>
                  </div>
                </div>
                <div className="analytics-card">
                  <TrendingUp size={24} className="analytics-icon success" />
                  <h3>Recommendations</h3>
                  <div className="analytics-stats">
                    <div><span>Curve:</span><strong>+3.2%</strong></div>
                    <div><span>Difficulty:</span><strong>Medium-Hard</strong></div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'reports' && (
            <>
              <div className="content-header">
                <div>
                  <h1 className="page-title">Reports</h1>
                  <p className="page-subtitle">Generate comprehensive reports</p>
                </div>
                <button className="btn-primary" onClick={handleExportPDF}>
                  <Download size={18} />
                  <span>Export All</span>
                </button>
              </div>

              <div className="reports-grid">
                <div className="report-card">
                  <FileText size={32} />
                  <h3>Performance Report</h3>
                  <p>Individual student analysis</p>
                  <button className="btn-report" onClick={() => alert('Generating performance reports for all students...')}>Generate</button>
                </div>
                <div className="report-card">
                  <BarChart2 size={32} />
                  <h3>Grade Distribution</h3>
                  <p>Statistical breakdown</p>
                  <button className="btn-report" onClick={() => alert('Generating grade distribution report...')}>Generate</button>
                </div>
                <div className="report-card">
                  <Brain size={32} />
                  <h3>AI Insights</h3>
                  <p>ML predictions</p>
                  <button className="btn-report" onClick={() => alert('Generating AI insights report...')}>Generate</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showAddStudentModal && (
        <div className="modal-overlay" onClick={() => setShowAddStudentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Student</h2>
              <button className="btn-close" onClick={() => setShowAddStudentModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddStudent} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name*</label>
                  <input 
                    type="text" 
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Roll Number*</label>
                  <input 
                    type="text" 
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email*</label>
                  <input 
                    type="email" 
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone*</label>
                  <input 
                    type="tel" 
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Guardian Name*</label>
                  <input 
                    type="text" 
                    value={newStudent.guardian}
                    onChange={(e) => setNewStudent({...newStudent, guardian: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Guardian Contact*</label>
                  <input 
                    type="tel" 
                    value={newStudent.guardianContact}
                    onChange={(e) => setNewStudent({...newStudent, guardianContact: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddStudentModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddExamModal && (
        <div className="modal-overlay" onClick={() => setShowAddExamModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Exam</h2>
              <button className="btn-close" onClick={() => setShowAddExamModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddExam} className="modal-form">
              <div className="form-group">
                <label>Exam Name*</label>
                <input 
                  type="text" 
                  value={newExam.name}
                  onChange={(e) => setNewExam({...newExam, name: e.target.value})}
                  placeholder="e.g., Mid-Term Exam"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Subject*</label>
                  <input 
                    type="text" 
                    value={newExam.subject}
                    onChange={(e) => setNewExam({...newExam, subject: e.target.value})}
                    placeholder="e.g., Data Structures"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Total Marks*</label>
                  <input 
                    type="number" 
                    value={newExam.totalMarks}
                    onChange={(e) => setNewExam({...newExam, totalMarks: e.target.value})}
                    placeholder="100"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date*</label>
                  <input 
                    type="date" 
                    value={newExam.date}
                    onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time*</label>
                  <input 
                    type="time" 
                    value={newExam.time}
                    onChange={(e) => setNewExam({...newExam, time: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration*</label>
                  <input 
                    type="text" 
                    value={newExam.duration}
                    onChange={(e) => setNewExam({...newExam, duration: e.target.value})}
                    placeholder="e.g., 2 hours"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Questions*</label>
                  <input 
                    type="number" 
                    value={newExam.questions}
                    onChange={(e) => setNewExam({...newExam, questions: e.target.value})}
                    placeholder="50"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddExamModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Schedule Exam</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="student-avatar-large">{selectedStudent.name.charAt(0)}</div>
                <div>
                  <h2>{selectedStudent.name}</h2>
                  <p>{selectedStudent.rollNo}</p>
                </div>
              </div>
              <button className="btn-close" onClick={() => setSelectedStudent(null)}><X size={24} /></button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-section">
                  <h3>Academic Performance</h3>
                  <div className="detail-stats">
                    <div><span>Grade:</span><strong>{selectedStudent.grade}</strong></div>
                    <div><span>Marks:</span><strong>{selectedStudent.marks}%</strong></div>
                    <div><span>GPA:</span><strong>{selectedStudent.gpa}</strong></div>
                    <div><span>Percentile:</span><strong>{selectedStudent.percentile}th</strong></div>
                    <div><span>Attendance:</span><strong>{selectedStudent.attendance}%</strong></div>
                  </div>
                </div>
                <div className="detail-section">
                  <h3>AI Analysis</h3>
                  <div className={`risk-card risk-${selectedStudent.riskLevel}`}>
                    <div><span>Risk Level:</span><strong>{selectedStudent.riskLevel.toUpperCase()}</strong></div>
                    <div><span>Predicted:</span><strong>{selectedStudent.predictedGrade}</strong></div>
                    <div><span>Confidence:</span><strong>{selectedStudent.confidence}%</strong></div>
                  </div>
                  <div className="recommendation-box">
                    <h4>Recommendation</h4>
                    <p>{selectedStudent.aiRecommendation}</p>
                  </div>
                </div>
                <div className="detail-section">
                  <h3>Strengths & Weaknesses</h3>
                  <div className="strengths">
                    <h4>Strengths</h4>
                    <div className="tags">
                      {selectedStudent.strengths.map((s, i) => (
                        <span key={i} className="tag tag-success">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="weaknesses">
                    <h4>Areas to Improve</h4>
                    <div className="tags">
                      {selectedStudent.weaknesses.length > 0 ? selectedStudent.weaknesses.map((w, i) => (
                        <span key={i} className="tag tag-warning">{w}</span>
                      )) : <span className="tag tag-info">None</span>}
                    </div>
                  </div>
                </div>
                <div className="detail-section">
                  <h3>Contact</h3>
                  <div className="contact-info">
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>{selectedStudent.email}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>{selectedStudent.phone}</span>
                    </div>
                    <div className="contact-item">
                      <User size={16} />
                      <span>Guardian: {selectedStudent.guardian}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>{selectedStudent.guardianContact}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => alert('Message sent!')}>Send Message</button>
              <button className="btn-secondary" onClick={() => handleGenerateReport(selectedStudent)}>Generate Report</button>
              <button className="btn-primary">Edit Student</button>
            </div>
          </div>
        </div>
      )}

      {showReportModal && selectedReportStudent && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="modal-content report-modal" onClick={(e) => e.stopPropagation()}>
            <div className="report-header">
              <div className="report-logo">
                <GraduationCap size={48} />
                <div>
                  <h1>EduAI University</h1>
                  <p>Student Performance Report</p>
                </div>
              </div>
              <button className="btn-close" onClick={() => setShowReportModal(false)}><X size={24} /></button>
            </div>
            
            <div className="report-content">
              <div className="report-student-info">
                <h2>{selectedReportStudent.name}</h2>
                <p>Roll No: {selectedReportStudent.rollNo}</p>
                <p>Email: {selectedReportStudent.email}</p>
                <p>Generated: {new Date().toLocaleDateString()}</p>
              </div>

              <div className="report-section">
                <h3>Academic Summary</h3>
                <table className="report-table">
                  <tbody>
                    <tr><td>Overall Grade</td><td><strong>{selectedReportStudent.grade}</strong></td></tr>
                    <tr><td>Total Marks</td><td><strong>{selectedReportStudent.marks}%</strong></td></tr>
                    <tr><td>GPA</td><td><strong>{selectedReportStudent.gpa}</strong></td></tr>
                    <tr><td>Percentile Rank</td><td><strong>{selectedReportStudent.percentile}th</strong></td></tr>
                    <tr><td>Attendance</td><td><strong>{selectedReportStudent.attendance}%</strong></td></tr>
                  </tbody>
                </table>
              </div>

              <div className="report-section">
                <h3>Performance Breakdown</h3>
                <table className="report-table">
                  <tbody>
                    <tr><td>Assignments</td><td><strong>{selectedReportStudent.assignmentsCompleted}/{selectedReportStudent.assignments}</strong></td></tr>
                    <tr><td>Midterm Score</td><td><strong>{selectedReportStudent.midterm}%</strong></td></tr>
                    <tr><td>Quiz Average</td><td><strong>{selectedReportStudent.quizAvg}%</strong></td></tr>
                  </tbody>
                </table>
              </div>

              <div className="report-section">
                <h3>AI Analysis</h3>
                <div className={`report-risk-badge risk-${selectedReportStudent.riskLevel}`}>
                  Risk Level: {selectedReportStudent.riskLevel.toUpperCase()}
                </div>
                <p><strong>Predicted Grade:</strong> {selectedReportStudent.predictedGrade}</p>
                <p><strong>Prediction Confidence:</strong> {selectedReportStudent.confidence}%</p>
                <p><strong>Recommendation:</strong> {selectedReportStudent.aiRecommendation}</p>
              </div>

              <div className="report-section">
                <h3>Strengths</h3>
                <ul>
                  {selectedReportStudent.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {selectedReportStudent.weaknesses.length > 0 && (
                <div className="report-section">
                  <h3>Areas for Improvement</h3>
                  <ul>
                    {selectedReportStudent.weaknesses.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="report-section">
                <h3>Achievements</h3>
                {selectedReportStudent.badges.length > 0 ? (
                  <ul>
                    {selectedReportStudent.badges.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No badges earned yet</p>
                )}
              </div>
            </div>

            <div className="report-footer">
              <button className="btn-secondary" onClick={handlePrintReport}>
                <Download size={18} />
                Print/Download
              </button>
              <button className="btn-primary" onClick={() => alert('Email sent successfully!')}>
                <Mail size={18} />
                Email Report
              </button>
            </div>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="modal-overlay" onClick={() => setShowSettingsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Settings</h2>
              <button className="btn-close" onClick={() => setShowSettingsModal(false)}><X size={24} /></button>
            </div>
            <div className="settings-content">
              <div className="settings-section">
                <h3>Profile Settings</h3>
                <p>Name: {currentUser?.name}</p>
                <p>Email: {currentUser?.email}</p>
                <p>Role: {currentUser?.role}</p>
              </div>
              <div className="settings-section">
                <h3>System Preferences</h3>
                <label className="settings-toggle">
                  <input type="checkbox" />
                  <span>Email Notifications</span>
                </label>
                <label className="settings-toggle">
                  <input type="checkbox" />
                  <span>Push Notifications</span>
                </label>
                <label className="settings-toggle">
                  <input type="checkbox" defaultChecked />
                  <span>AI Analysis</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowSettingsModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { setShowSettingsModal(false); alert('Settings saved!'); }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        
        .app-container { display: flex; height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        
        .sidebar { width: 280px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); color: white; display: flex; flex-direction: column; transition: all 0.3s; box-shadow: 4px 0 20px rgba(0,0,0,0.2); }
        .sidebar.collapsed { width: 80px; }
        .sidebar-header { padding: 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .logo-icon { color: #6366f1; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .logo-text { font-size: 20px; font-weight: 700; background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        .sidebar-nav { flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 8px; overflow-y: auto; }
        .nav-item { display: flex; align-items: center; gap: 16px; padding: 14px 16px; background: transparent; border: none; color: rgba(255,255,255,0.7); border-radius: 12px; cursor: pointer; transition: all 0.3s; font-size: 15px; font-weight: 500; }
        .nav-item:hover { background: rgba(255,255,255,0.1); color: white; transform: translateX(4px); }
        .nav-item.active { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; box-shadow: 0 4px 16px rgba(99,102,241,0.4); }
        .sidebar.collapsed .nav-item { justify-content: center; }
        .sidebar.collapsed .nav-item span { display: none; }
        
        .sidebar-toggle { margin: 16px; padding: 12px; background: rgba(255,255,255,0.1); border: none; color: white; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
        .sidebar-toggle:hover { background: rgba(255,255,255,0.2); }
        
        .main-wrapper { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        
        .top-header { height: 70px; background: white; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); position: relative; z-index: 100; }
        .menu-toggle { background: none; border: none; cursor: pointer; padding: 8px; border-radius: 8px; }
        .menu-toggle:hover { background: #f3f4f6; }
        .header-right { display: flex; align-items: center; gap: 16px; }
        .header-icon-btn { background: none; border: none; cursor: pointer; padding: 10px; border-radius: 50%; transition: all 0.3s; position: relative; }
        .header-icon-btn:hover { background: #f3f4f6; }
        .notification-badge { position: absolute; top: 6px; right: 6px; background: #ef4444; color: white; font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: 600; }
        .user-profile { display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 8px; border-radius: 12px; transition: all 0.3s; }
        .user-profile:hover { background: #f3f4f6; }
        .user-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; }
        .user-info { display: flex; flex-direction: column; }
        .user-name { font-weight: 600; font-size: 14px; color: #1f2937; }
        .user-role { font-size: 12px; color: #6b7280; text-transform: capitalize; }
        .logout-btn { background: none; border: none; cursor: pointer; padding: 8px; color: #6b7280; border-radius: 8px; transition: all 0.3s; }
        .logout-btn:hover { background: #fee2e2; color: #ef4444; }
        
        .notifications-panel { position: absolute; top: 70px; right: 24px; width: 380px; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 1000; }
        .notifications-header { padding: 20px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
        .notifications-header h3 { font-size: 18px; font-weight: 700; }
        .notifications-header button { background: none; border: none; cursor: pointer; padding: 4px; }
        .notifications-list { max-height: 400px; overflow-y: auto; }
        .notification-item { padding: 16px 20px; border-bottom: 1px solid #f3f4f6; cursor: pointer; display: flex; gap: 12px; transition: all 0.3s; }
        .notification-item:hover { background: #f9fafb; }
        .notification-item.unread { background: #eff6ff; }
        .notif-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .notif-icon.notif-warning { background: #fef3c7; color: #f59e0b; }
        .notif-icon.notif-success { background: #dcfce7; color: #10b981; }
        .notif-icon.notif-info { background: #dbeafe; color: #3b82f6; }
        .notif-content { flex: 1; }
        .notif-content p { font-size: 14px; color: #1f2937; margin-bottom: 4px; }
        .notif-content span { font-size: 12px; color: #6b7280; }
        
        .main-content { flex: 1; overflow-y: auto; padding: 32px; background: #f9fafb; }
        
        .content-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
        .page-title { font-size: 32px; font-weight: 800; color: #1f2937; margin-bottom: 8px; }
        .page-subtitle { font-size: 16px; color: #6b7280; }
        
        .btn-primary, .btn-secondary { display: flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 12px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.3s; border: none; }
        .btn-primary { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; box-shadow: 0 4px 16px rgba(99,102,241,0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.4); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-secondary { background: white; color: #1f2937; border: 2px solid #e5e7eb; }
        .btn-secondary:hover { border-color: #6366f1; color: #6366f1; }
        
        .stats-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 32px; }
        .stat-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; gap: 20px; transition: all 0.3s; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .stat-card.fade-in { animation: fadeIn 0.6s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .stat-icon-wrapper { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .stat-details { flex: 1; }
        .stat-label { font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 8px; }
        .stat-value { font-size: 28px; font-weight: 800; color: #1f2937; margin-bottom: 8px; }
        .stat-subtitle { font-size: 12px; color: #9ca3af; margin-bottom: 8px; }
        .stat-trend { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; }
        .stat-trend.trend-up { color: #10b981; }
        .stat-trend.trend-down { color: #ef4444; }
        .stat-trend.trend-neutral { color: #6b7280; }
        
        .charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; }
        .chart-container { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .chart-container.large { grid-column: span 2; }
        .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .chart-header h3 { font-size: 18px; font-weight: 700; color: #1f2937; }
        .chart-select { padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 13px; cursor: pointer; }
        
        .ai-card { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border-radius: 16px; padding: 24px; box-shadow: 0 8px 24px rgba(99,102,241,0.3); }
        .ai-header { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
        .ai-header h3 { font-size: 20px; font-weight: 700; }
        .ai-header p { font-size: 13px; opacity: 0.9; }
        .ai-metrics { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
        .ai-metric { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.2); }
        .ai-metric:last-child { border-bottom: none; }
        .ai-metric span { font-size: 14px; opacity: 0.9; }
        .ai-metric strong { font-size: 18px; font-weight: 700; }
        .btn-ai { width: 100%; padding: 12px; background: white; color: #6366f1; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .btn-ai:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .btn-ai:disabled { opacity: 0.6; }
        
        .filter-bar { display: flex; gap: 16px; margin-bottom: 24px; align-items: center; flex-wrap: wrap; }
        .search-box { flex: 1; min-width: 300px; position: relative; }
        .search-box input { width: 100%; padding: 12px 12px 12px 44px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 14px; transition: all 0.3s; }
        .search-box input:focus { outline: none; border-color: #6366f1; }
        .search-box svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .filter-select { padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 14px; cursor: pointer; background: white; }
        
        .students-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .student-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s; }
        .student-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .student-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .student-avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 18px; }
        .student-info { flex: 1; }
        .student-info h3 { font-size: 16px; font-weight: 700; color: #1f2937; margin-bottom: 4px; }
        .student-info p { font-size: 13px; color: #6b7280; }
        .risk-badge { padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
        .risk-badge.risk-low { background: #dcfce7; color: #166534; }
        .risk-badge.risk-medium { background: #fef3c7; color: #92400e; }
        .risk-badge.risk-high { background: #fee2e2; color: #991b1b; }
        
        .student-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px; }
        .stat-item { display: flex; gap: 8px; align-items: center; }
        .stat-item > div { display: flex; flex-direction: column; }
        .stat-item span { font-size: 11px; color: #9ca3af; text-transform: uppercase; }
        .stat-item strong { font-size: 16px; font-weight: 700; color: #1f2937; }
        
        .progress-bar-container { margin-bottom: 16px; }
        .progress-bar { height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; transition: width 0.5s ease; border-radius: 4px; }
        
        .badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .badge { padding: 4px 12px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border-radius: 12px; font-size: 11px; font-weight: 600; }
        
        .student-actions { display: flex; gap: 8px; padding-top: 16px; border-top: 1px solid #f3f4f6; }
        .btn-action { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 13px; font-weight: 600; color: #1f2937; cursor: pointer; transition: all 0.3s; }
        .btn-action:hover { background: #6366f1; color: white; border-color: #6366f1; }
        .btn-action.danger:hover {.btn-action.danger:hover { background: #ef4444; color: white; border-color: #ef4444; }

.exams-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
.exam-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s; }
.exam-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.exam-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.exam-header h3 { font-size: 18px; font-weight: 700; color: #1f2937; }
.status-badge { padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
.status-badge.status-completed { background: #dcfce7; color: #166534; }
.status-badge.status-scheduled { background: #dbeafe; color: #1e40af; }
.status-badge.status-grading { background: #fef3c7; color: #92400e; }
.exam-subject { font-size: 14px; color: #6b7280; margin-bottom: 16px; }
.exam-details { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.exam-detail { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #4b5563; }
.exam-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 16px; background: #f9fafb; border-radius: 12px; margin-bottom: 16px; }
.exam-stat { display: flex; flex-direction: column; }
.exam-stat span { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
.exam-stat strong { font-size: 20px; font-weight: 700; color: #1f2937; }
.btn-exam-action { width: 100%; padding: 12px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
.btn-exam-action:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(99,102,241,0.4); }

.analytics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.analytics-card { background: white; border-radius: 16px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center; transition: all 0.3s; }
.analytics-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.analytics-icon { margin-bottom: 16px; color: #6366f1; }
.analytics-icon.warn { color: #f59e0b; }
.analytics-icon.success { color: #10b981; }
.analytics-card h3 { font-size: 20px; font-weight: 700; color: #1f2937; margin-bottom: 20px; }
.analytics-stats { display: flex; flex-direction: column; gap: 12px; }
.analytics-stats > div { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f9fafb; border-radius: 8px; }
.analytics-stats span { font-size: 14px; color: #6b7280; }
.analytics-stats strong { font-size: 18px; font-weight: 700; color: #1f2937; }
.risk-stats { display: flex; gap: 16px; justify-content: center; }
.risk-stat { display: flex; flex-direction: column; align-items: center; padding: 16px; border-radius: 12px; min-width: 100px; }
.risk-stat.high { background: #fee2e2; }
.risk-stat.medium { background: #fef3c7; }
.risk-stat strong { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
.risk-stat.high strong { color: #991b1b; }
.risk-stat.medium strong { color: #92400e; }
.risk-stat span { font-size: 12px; color: #6b7280; }

.reports-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.report-card { background: white; border-radius: 16px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center; transition: all 0.3s; }
.report-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.report-card svg { color: #6366f1; margin-bottom: 16px; }
.report-card h3 { font-size: 20px; font-weight: 700; color: #1f2937; margin-bottom: 8px; }
.report-card p { font-size: 14px; color: #6b7280; margin-bottom: 20px; }
.btn-report { width: 100%; padding: 12px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
.btn-report:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(99,102,241,0.4); }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; animation: fadeIn 0.3s; }
.modal-content { background: white; border-radius: 20px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); animation: slideUp 0.3s; }
.modal-content.large-modal { max-width: 900px; }
.modal-content.report-modal { max-width: 800px; }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.modal-header { padding: 24px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
.modal-header h2 { font-size: 24px; font-weight: 700; color: #1f2937; }
.btn-close { background: none; border: none; cursor: pointer; padding: 8px; border-radius: 8px; transition: all 0.3s; }
.btn-close:hover { background: #f3f4f6; }
.modal-title-section { display: flex; align-items: center; gap: 16px; }
.student-avatar-large { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px; }
.modal-title-section h2 { margin-bottom: 4px; }
.modal-title-section p { font-size: 14px; color: #6b7280; }
.modal-body { padding: 24px; }
.detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
.detail-section { background: #f9fafb; padding: 20px; border-radius: 12px; }
.detail-section h3 { font-size: 16px; font-weight: 700; color: #1f2937; margin-bottom: 16px; }
.detail-stats { display: flex; flex-direction: column; gap: 12px; }
.detail-stats > div { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; }
.detail-stats span { font-size: 14px; color: #6b7280; }
.detail-stats strong { font-size: 16px; font-weight: 700; color: #1f2937; }
.risk-card { padding: 16px; border-radius: 12px; margin-bottom: 16px; }
.risk-card.risk-low { background: #dcfce7; border: 2px solid #86efac; }
.risk-card.risk-medium { background: #fef3c7; border: 2px solid #fde047; }
.risk-card.risk-high { background: #fee2e2; border: 2px solid #fca5a5; }
.risk-card > div { display: flex; justify-content: space-between; margin-bottom: 8px; }
.risk-card span { font-size: 13px; font-weight: 600; color: #374151; }
.risk-card strong { font-size: 15px; font-weight: 700; }
.recommendation-box { background: white; padding: 16px; border-radius: 12px; border: 2px solid #e5e7eb; }
.recommendation-box h4 { font-size: 14px; font-weight: 700; color: #1f2937; margin-bottom: 8px; }
.recommendation-box p { font-size: 13px; color: #6b7280; line-height: 1.6; }
.strengths, .weaknesses { margin-bottom: 16px; }
.strengths h4, .weaknesses h4 { font-size: 14px; font-weight: 700; color: #1f2937; margin-bottom: 8px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag { padding: 6px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.tag.tag-success { background: #dcfce7; color: #166534; }
.tag.tag-warning { background: #fef3c7; color: #92400e; }
.tag.tag-info { background: #dbeafe; color: #1e40af; }
.contact-info { display: flex; flex-direction: column; gap: 12px; }
.contact-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #4b5563; }
.modal-footer { padding: 24px; border-top: 1px solid #e5e7eb; display: flex; gap: 12px; justify-content: flex-end; }
.modal-form { padding: 24px; }
.form-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 14px; font-weight: 600; color: #374151; }
.form-group input, .form-group select, .form-group textarea { padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 14px; transition: all 0.3s; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }

.report-header { padding: 32px; border-bottom: 2px solid #e5e7eb; display: flex; justify-content: space-between; align-items: flex-start; }
.report-logo { display: flex; gap: 16px; align-items: center; }
.report-logo svg { color: #6366f1; }
.report-logo h1 { font-size: 24px; font-weight: 800; color: #1f2937; margin-bottom: 4px; }
.report-logo p { font-size: 14px; color: #6b7280; }
.report-content { padding: 32px; }
.report-student-info { margin-bottom: 32px; }
.report-student-info h2 { font-size: 28px; font-weight: 800; color: #1f2937; margin-bottom: 8px; }
.report-student-info p { font-size: 14px; color: #6b7280; margin-bottom: 4px; }
.report-section { margin-bottom: 32px; }
.report-section h3 { font-size: 20px; font-weight: 700; color: #1f2937; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
.report-table { width: 100%; border-collapse: collapse; }
.report-table td { padding: 12px; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
.report-table td:first-child { color: #6b7280; font-weight: 500; }
.report-table td:last-child { text-align: right; }
.report-risk-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 700; margin-bottom: 16px; }
.report-risk-badge.risk-low { background: #dcfce7; color: #166534; }
.report-risk-badge.risk-medium { background: #fef3c7; color: #92400e; }
.report-risk-badge.risk-high { background: #fee2e2; color: #991b1b; }
.report-section p { font-size: 14px; color: #4b5563; line-height: 1.8; margin-bottom: 12px; }
.report-section ul { padding-left: 20px; }
.report-section li { font-size: 14px; color: #4b5563; margin-bottom: 8px; line-height: 1.6; }
.report-footer { padding: 24px 32px; border-top: 2px solid #e5e7eb; display: flex; gap: 12px; justify-content: flex-end; }

.settings-content { padding: 24px; }
.settings-section { margin-bottom: 24px; }
.settings-section h3 { font-size: 18px; font-weight: 700; color: #1f2937; margin-bottom: 12px; }
.settings-section p { font-size: 14px; color: #6b7280; margin-bottom: 8px; }
.settings-toggle { display: flex; align-items: center; gap: 12px; padding: 12px 0; cursor: pointer; }
.settings-toggle input { width: 44px; height: 24px; }
.settings-toggle span { font-size: 14px; color: #4b5563; }

@media print { .sidebar, .top-header, .btn-close, .modal-footer { display: none !important; } .modal-content { box-shadow: none; max-width: 100%; } }
@media (max-width: 768px) { .sidebar { width: 80px; } .sidebar.collapsed { width: 0; } .stats-container { grid-template-columns: 1fr; } .charts-grid { grid-template-columns: 1fr; } .chart-container.large { grid-column: span 1; } .students-grid { grid-template-columns: 1fr; } .exams-grid { grid-template-columns: 1fr; } .analytics-grid { grid-template-columns: 1fr; } .reports-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } .detail-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default UniversityGradingSystem;