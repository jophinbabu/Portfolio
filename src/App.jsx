import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Download, 
  ExternalLink,
  Calendar,
  Award,
  Code,
  Brain,
  Shield,
  Trophy,
  Users,
  GraduationCap,
  Briefcase,
  Menu,
  X,
  ChevronDown,
  Star,
  Target,
  Zap
} from 'lucide-react'
import './App.css'
import profileImage from './assets/port.jpg'
import projectImage from './assets/project-budget.png'
import resumePdf from './assets/myResume.pdf'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState({})

  const skills = [
    { name: 'Python', category: 'Programming' },
    { name: 'JavaScript', category: 'Programming' },
    { name: 'React', category: 'Frontend' },
    { name: 'SQL', category: 'Database' },
    { name: 'Machine Learning', category: 'AI/ML' },
    { name: 'HTML/CSS', category: 'Frontend' },
    { name: 'Cybersecurity', category: 'Security' }
  ]

  const experiences = [
    {
      title: 'Python Full Stack Development Intern',
      company: 'Inmakes Learning Hub',
      period: 'May 2025 - Present',
      description: 'Currently undergoing training in Python backend development, frontend frameworks, and full stack integration. Involved in hands-on projects and agile team collaboration.',
      icon: <Code className="w-5 h-5" />,
      status: 'Current'
    },
    {
      title: 'Cyber Security Intern',
      company: 'Red Team Hacker Academy',
      period: 'August 2024',
      description: 'Completed a three-week internship studying basic cybersecurity tools and their real-life applications, with a focus on penetration testing to identify and address security vulnerabilities.',
      icon: <Shield className="w-5 h-5" />,
      status: 'Completed'
    }
  ]

  const projects = [
    {
      title: 'Budget Management and Forecasting System',
      description: 'Developed a comprehensive financial management system using machine learning algorithms to analyze past income and expenditure data. Implemented Random Forest and XGBoost models achieving 72% forecasting accuracy.',
      technologies: ['Python', 'Machine Learning', 'Random Forest', 'XGBoost', 'Data Analysis'],
      image: projectImage,
      highlights: ['72% Forecasting Accuracy', 'ML-Powered Predictions', 'Financial Analytics Dashboard'],
      featured: true
    },
    {
      title: 'Automated Exam Seating Arrangement',
      description: 'Designed and implemented an intelligent system to automatically assign student seating during examinations, reducing malpractice opportunities and improving administrative efficiency.',
      technologies: ['Python', 'Algorithm Design', 'Automation', 'Database Management'],
      highlights: ['Automated Process', 'Reduced Malpractice', 'Administrative Efficiency'],
      featured: false
    }
  ]

  const achievements = [
    { title: 'District-Level Cricket Winner', icon: <Award className="w-5 h-5" />, color: 'text-green-600' },
    { title: 'NCC Volunteer (3 Years)', icon: <Users className="w-5 h-5" />, color: 'text-blue-600' },
    { title: '98% in 12th Grade', icon: <GraduationCap className="w-5 h-5" />, color: 'text-purple-600' }
  ]

  const stats = [
    { label: 'Projects Completed', value: '2', icon: <Target className="w-6 h-6" /> },
    { label: 'Technologies Mastered', value: '6+', icon: <Code className="w-6 h-6" /> },
    { label: 'Years of Learning', value: '4+', icon: <GraduationCap className="w-6 h-6" /> },
    { label: 'Certifications', value: '2', icon: <Award className="w-6 h-6" /> }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const downloadResume = () => {
    const a = document.createElement('a')
    a.href = resumePdf
    a.download = 'Jophin_Babu_Resume.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold gradient-text">Jophin Babu</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-gray-700 hover:text-blue-600 transition-colors capitalize relative ${
                    activeSection === section ? 'text-blue-600' : ''
                  }`}
                >
                  {section}
                  {activeSection === section && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden bg-white border-t border-gray-200 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-4 py-2 space-y-2">
            {['about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors capitalize"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            <div className="mb-8 animate-fade-in-up">
              <img 
                src={profileImage} 
                alt="Jophin Babu" 
                className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-2xl animate-float"
              />
            </div>
            <h1 className="hero-title text-4xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Jophin Babu
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl gradient-text mb-6 animate-fade-in-up">
              Computer Science Engineer
            </p>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto animate-fade-in-up">
              Passionate about <span className="font-semibold text-blue-600">Machine Learning</span> and <span className="font-semibold text-purple-600">Software Development</span>. 
              Building innovative solutions with cutting-edge technology and data-driven insights.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto animate-fade-in-up">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-4 card-hover">
                  <div className="flex justify-center mb-2 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button size="lg" className="btn-primary" onClick={downloadResume}>
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')} className="animate-pulse-hover">
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${isVisible.about ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A dedicated Computer Science Engineer with a passion for innovation and continuous learning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`${isVisible.about ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Education & Background</h3>
              <div className="space-y-4">
                <Card className="p-4 card-hover">
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">B.Tech in Computer Science and Engineering</h4>
                      <p className="text-gray-600">Christ College of Engineering, Irinjalakuda (2021-2025)</p>
                      <div className="flex items-center mt-1">
                        <span className="text-gray-600">CGPA: </span>
                        <Badge variant="secondary" className="ml-2">7.2</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 card-hover">
                  <div className="flex items-start space-x-3">
                    <Star className="w-6 h-6 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">12th State Board</h4>
                      <p className="text-gray-600">St.Mary's Irinjalakuda (2019-2021)</p>
                      <div className="flex items-center mt-1">
                        <span className="text-gray-600">Biology with Mathematics - </span>
                        <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">98%</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className={`${isVisible.about ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Highlights</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="text-center p-4 card-hover">
                    <div className={`flex justify-center mb-2 ${achievement.color}`}>
                      {achievement.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">English</Badge>
                    <Badge variant="secondary">Malayalam</Badge>
                    <Badge variant="secondary">Tamil</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Music</Badge>
                    <Badge variant="outline">Cricket</Badge>
                    <Badge variant="outline">Technology</Badge>
                    <Badge variant="outline">Innovation</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${isVisible.skills ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <p className="text-lg text-gray-600">
              Proficient in modern technologies and frameworks
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`${isVisible.skills ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-600" />
                Programming & Development
              </h3>
              <div className="space-y-6">
                {skills.slice(0, 4).map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`${isVisible.skills ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-green-600" />
                Specialized Skills
              </h3>
              <div className="space-y-6">
                {skills.slice(4).map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${isVisible.experience ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
            <p className="text-lg text-gray-600">
              Professional journey and internship experiences
            </p>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className={`p-6 card-hover ${isVisible.experience ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                    {exp.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant={exp.status === 'Current' ? 'default' : 'secondary'}>
                          {exp.status}
                        </Badge>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                      </div>
                    </div>
                    <p className="text-blue-600 font-medium mb-3">{exp.company}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${isVisible.projects ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600">
              Innovative solutions showcasing technical expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className={`overflow-hidden card-hover ${isVisible.projects ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                {project.image && (
                  <div className="h-48 overflow-hidden relative group">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    {project.title}
                    {project.featured && <Zap className="w-5 h-5 ml-2 text-yellow-500" />}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-green-100 text-green-800">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs hover:bg-blue-50 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${isVisible.contact ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">
              Let's connect and discuss opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 gap-12">
            <div className={`${isVisible.contact ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <Card className="p-4 card-hover">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">jophin735@gmail.com</span>
                  </div>
                </Card>
                <Card className="p-4 card-hover">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">7356066391</span>
                  </div>
                </Card>
                <Card className="p-4 card-hover">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">Irinjalakuda, Thrissur</span>
                  </div>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Connect With Me</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="lg" asChild className="card-hover">
                    <a href="https://github.com/jophinbabu" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="card-hover">
                    <a href="https://www.linkedin.com/in/jophin-babu-0ab046318" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Jophin Babu</h3>
            <p className="text-gray-300">Computer Science Engineer | ML Enthusiast | Software Developer</p>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="mailto:jophin735@gmail.com" className="text-gray-300 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/jophinbabu" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/jophin-babu-0ab046318" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Jophin Babu. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

