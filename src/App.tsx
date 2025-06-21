import React, { useState, useEffect, useRef, useMemo } from 'react';
import ProjectModal from './components/ProjectModal';
import MouseReactiveBackground from './components/MouseReactiveBackground';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  icon: React.JSX.Element;
  link?: string | null;
  gradient: string;
}

interface FavoriteArticle {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

const MOBILE_BREAKPOINT = 768;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const projects = useMemo<Project[]>(() => [
    {
      id: 'service-mesh',
      title: 'Cloud-Native Service Mesh Accelerator',
      shortDescription: 'Designed and implemented cloud-native service mesh accelerator achieving 40% latency reduction and 60% throughput improvement.',
      detailedDescription: "This project focused on optimizing inter-service communication in a microservices architecture. By implementing a service mesh using Istio and custom Golang components, we significantly reduced network latency and increased overall system throughput. Key challenges included managing complex routing rules, ensuring secure communication (mTLS), and collecting detailed telemetry data for performance monitoring. The solution involved custom Envoy filters and a centralized control plane for dynamic configuration updates.\n\nThis was a capstone project during my Master's at Carnegie Mellon University, showcasing the practical application of distributed systems principles to solve real-world performance bottlenecks.",
      technologies: ['Kubernetes', 'Istio', 'Golang', 'Envoy', 'Prometheus'],
      link: 'https://mse.s3d.cmu.edu/applicants/mse-ap/studio.html',
      icon: (
        <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      ),
      gradient: 'from-blue-500/30 to-purple-500/30'
    },
    {
      id: 'qr-resolver',
      title: 'High-Traffic QR Code Resolver',
      shortDescription: 'Engineered scalable web-tier application on AWS achieving 75k+ requests/sec with optimized EC2 instances and load balancing.',
      detailedDescription: "This system was designed to handle a massive influx of QR code scan requests, resolving them to target URLs or data payloads. The architecture involved a distributed fleet of EC2 instances behind an Application Load Balancer, auto-scaling groups to handle traffic spikes, and ElastiCache for Redis to cache frequently accessed QR codes, minimizing database lookups. Extensive performance testing and optimization were conducted to achieve the target request rate while maintaining low latency.\n\nPart of the \"Cloud Computing\" course at CMU, this project demonstrated the ability to build and scale highly available web services on AWS.",
      technologies: ['AWS EC2', 'ALB', 'Auto Scaling', 'ElastiCache', 'Java', 'Spring Boot'],
      link: 'https://www.cs.cmu.edu/~msakr/15619-s18/recitations/S18_Recitation10.pdf',
      icon: (
        <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm10-3h-2V4h-2v3h-3v2h3v2h2v-2h2V7zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
        </svg>
      ),
      gradient: 'from-green-500/30 to-blue-500/30'
    },
    {
      id: 'social-media',
      title: 'Social Media Clone with Heterogeneous Storage',
      shortDescription: 'Architected social media platform leveraging MySQL, Neo4J, and MongoDB for optimized data retrieval and 25% improved query response time.',
      detailedDescription: "This project explored the use of different database technologies to support various features of a social media application. User profiles and posts were stored in MongoDB (NoSQL document store) for flexibility. The social graph (follows, friendships) was managed in Neo4j (graph database) for efficient traversal and relationship queries. MySQL (relational database) handled transactional data like user authentication and settings. This polyglot persistence approach allowed for optimized performance for different data types and access patterns.\n\nThis was a core project in the \"Database Systems\" course, emphasizing data modeling and a multi-database strategy.",
      technologies: ['MongoDB', 'Neo4j', 'MySQL', 'Java', 'Spring Boot', 'React'],
      link: 'https://www.cs.cmu.edu/~msakr/15619-s18/recitations/S18_Recitation10.pdf',
      icon: (
        <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      gradient: 'from-purple-500/30 to-pink-500/30'
    },
    {
      id: 'twitter-analysis',
      title: 'Twitter Social Graph Analysis with Apache Spark',
      shortDescription: 'Implemented PageRank algorithm using Apache Spark to analyze Twitter social graph, identifying top 5% most influential users with 30% performance improvement.',
      detailedDescription: "Using Apache Spark and the PageRank algorithm, this project analyzed a large dataset of Twitter user interactions to identify influential users. The data processing pipeline was built to efficiently handle the scale of the social graph, and various optimizations were applied to the Spark jobs to improve performance. The results provided insights into network structures and influence patterns within the Twitter ecosystem.\n\nThis project from the \"Big Data Analytics\" course focused on distributed data processing and graph algorithms.",
      technologies: ['Apache Spark', 'Scala', 'HDFS', 'PageRank', 'Zeppelin'],
      link: 'https://www.cs.cmu.edu/~msakr/15619-s18/recitations/S18_Recitation10.pdf',
      icon: (
        <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      gradient: 'from-orange-500/30 to-red-500/30'
    },
    {
      id: 'rfid-calibration',
      title: 'ML-based RFID Calibration Microservice',
      shortDescription: 'Built machine learning microservice that reduced RFID scan error rate from 8% to <0.5%, saving $1.2M/year in logistics costs at Myntra.',
      detailedDescription: "During my internship at Myntra, I developed a microservice that used machine learning to calibrate RFID scanners in real-time. This significantly reduced scan errors in warehouses, leading to improved inventory accuracy and substantial cost savings. The model was trained on historical scan data and environmental factors, and deployed as a lightweight service integrated into the existing warehouse management system.\n\nThis work involved data preprocessing, model selection (ensembled tree-based models), deployment using Docker and Kubernetes, and continuous monitoring of model performance.",
      technologies: ['Python', 'Scikit-learn', 'Flask', 'Docker', 'Kubernetes', 'Kafka'],
      link: null,
      icon: (
        <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      ),
      gradient: 'from-teal-500/30 to-cyan-500/30'
    },
    {
      id: 'samsung-database',
      title: 'Samsung Smart TV Distributed Database System',
      shortDescription: 'Designed and implemented distributed database using MySQL Cluster achieving 75% faster query resolution for Samsung Smart TV log collection and analysis.',
      detailedDescription: "As part of my undergraduate thesis, I worked on designing a distributed database system for Samsung Smart TVs to collect and analyze user interaction logs. We utilized MySQL Cluster for its high availability and scalability features. The project involved schema design for efficient log storage, data partitioning strategies, and performance tuning of distributed queries. The system was able to handle a large volume of incoming log data and provide significantly faster analytics capabilities compared to the previous centralized solution.\n\nThis project gave me hands-on experience with distributed database design, data replication, and consistency models.",
      technologies: ['MySQL Cluster', 'NDB API', 'C++', 'Python', 'Data Partitioning'],
      link: null,
      icon: (
        <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
        </svg>
      ),
      gradient: 'from-indigo-500/30 to-blue-500/30'
    }
  ], []);

  const favoriteArticles = useMemo<FavoriteArticle[]>(() => [
    {
      title: "How Uber Scaled Cassandra for Tens of Millions of Queries Per Second",
      description: "Deep dive into Uber's Cassandra architecture handling massive scale with innovative solutions for node replacement and data consistency.",
      url: "https://blog.bytebytego.com/p/how-uber-scaled-cassandra-for-tens",
      tags: ["Cassandra", "Distributed Systems", "Scale"]
    },
    {
      title: "How Uber Served 40 Million Reads with Integrated Redis Cache",
      description: "Uber's CacheFront solution integrating Redis with Docstore and MySQL for high-performance caching at scale.",
      url: "https://blog.bytebytego.com/p/ep131-how-uber-served-40-million",
      tags: ["Redis", "Caching", "Performance"]
    },
    {
      title: "Storing 200 Billion Entities: Notion's Database Architecture",
      description: "How Notion architected their database to handle massive scale while maintaining performance and reliability.",
      url: "https://blog.bytebytego.com/p/storing-200-billion-entities-notions",
      tags: ["Database", "Architecture", "Scale"]
    },
    {
      title: "How Netflix Orchestrates Millions of Workflows",
      description: "Netflix's approach to managing complex workflows and orchestration at massive scale.",
      url: "https://blog.bytebytego.com/p/how-netflix-orchestrates-millions",
      tags: ["Orchestration", "Workflows", "Netflix"]
    },
    {
      title: "How Slack Supports Billions of Daily Messages",
      description: "The architecture behind Slack's real-time messaging platform handling billions of messages daily.",
      url: "https://blog.bytebytego.com/p/how-slack-supports-billions-of-daily",
      tags: ["Real-time", "Messaging", "Scale"]
    },
    {
      title: "Distributed Caching: The Secret to High Performance",
      description: "Comprehensive guide to distributed caching patterns and strategies for high-performance systems.",
      url: "https://blog.bytebytego.com/p/distributed-caching-the-secret-to",
      tags: ["Caching", "Performance", "Distributed"]
    }
  ], []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu on scroll
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu on scroll
  };

  const isSectionVisible = (sectionId: string) => visibleSections.has(sectionId);

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'my-articles', label: 'My Articles' },
    { id: 'projects', label: 'Projects' },
    { id: 'recommendation', label: 'Recommendation' },
    { id: 'education', label: 'Education' },
    { id: 'articles', label: 'Favorite Reads' },
    { id: 'contact', label: 'Contact' },
  ];

  // Enhanced Send Email URL
  const emailSubject = encodeURIComponent("Connecting from Your Portfolio");
  const emailBody = encodeURIComponent("Hi Kunal,\n\nI saw your portfolio and wanted to reach out...\n\nRegards,\n[Your Name]");
  const mailtoLink = `mailto:jainpkunal@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div 
      className={`min-h-screen transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} relative overflow-x-hidden`}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)'
      }}
    >
      <MouseReactiveBackground />

      <div className="relative z-10">
        <nav className={`fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 transform transition-all duration-700 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button 
                onClick={scrollToTop}
                className="text-white font-bold text-xl hover:text-blue-300 transition-colors cursor-pointer"
              >
                Kunal Jain
              </button>
              <div className="hidden md:flex space-x-6">
                {navLinks.map(link => (
                    <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-white/80 hover:text-white transition-colors text-sm">
                        {link.label}
                    </button>
                ))}
              </div>
              <div className="md:hidden">
                <button 
                  onClick={toggleMobileMenu} 
                  className="text-white/80 hover:text-white focus:outline-none"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-slate-800/95 backdrop-blur-md shadow-lg py-2">
              {navLinks.map(link => (
                <button 
                  key={link.id} 
                  onClick={() => scrollToSection(link.id)} 
                  className="block w-full text-left px-6 py-3 text-white/90 hover:bg-slate-700/50 transition-colors text-base"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        <section className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div 
            className="absolute inset-0 opacity-30 bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: 'url(/seattle.png)',
              backgroundSize: '80%',
              backgroundPosition: 'center 60%',
              maskImage: 'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)'
            }}
          ></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20">
                  <img 
                    src="/kunal_jain.jpeg" 
                    alt="Kunal Jain" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Kunal Jain</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                Software Engineer III at Adobe, passionate about designing scalable systems and architectural patterns for big data
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  View My Work
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="about" 
          ref={(el) => { sectionRefs.current['about'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('about') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
                <p className="text-white/80 text-lg mb-6">
                  I'm a Software Engineer at Adobe, based in the beautiful Pacific Northwest. I'm passionate about designing scalable systems and architectural patterns that handle big data at massive scale. I love diving deep into how big tech companies solve complex engineering challenges with cutting-edge architecture. Left a few of my favorite articles at the bottom of the page ❤️
                </p>
                <p className="text-white/80 text-lg mb-8">
                  When I'm not geeking out in my work life, you'll find me experimenting with things—whether it's my custom apps (to be announced soon!), niche tools like Neovim & Linux (I use Arch, btw), or even building furniture! I'm always exploring new technologies, cooking tasty food with my wife ❤️, hiking through Washington's stunning trails, or strategizing in Rainbow Six Siege (yes, I'm one of those who prefer R6 to CS or Valorant :D).
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Java', 'Kotlin', 'Python', 'Golang', 'JavaScript', 'TypeScript', 'AWS', 'Azure', 'Kubernetes', 'Docker', 'Spark', 'Terraform'].map((skill) => (
                    <span key={skill} className="bg-white/10 text-white px-4 py-2 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white/80">Software Engineer III at Adobe</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-white/80">Based in Seattle, WA</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-white/80">Carnegie Mellon MSE Graduate</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-white/80">Big Data & Distributed Systems</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => { sectionRefs.current['experience'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('experience') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Experience</h2>
            <div className="space-y-8">
              {[
                {
                  href: "https://www.adobe.com/",
                  title: "Software Engineer 3",
                  company: "Adobe • Commerce Data Platform",
                  dates: "Dec 2024 – Present",
                  description: "Integrating structured commerce data into Adobe Experience Platform (AEP) using PySpark and Azure Databricks DLT jobs, enabling real-time segmentation and personalized customer experiences.",
                  tech: ['PySpark', 'Azure Databricks', 'ETL', 'Airflow'],
                  techColor: "blue"
                },
                {
                  href: "https://www.adobe.com/",
                  title: "Software Engineer 2",
                  company: "Adobe • Identity Platform",
                  dates: "Feb 2024 – Dec 2024",
                  description: "Designed and delivered a Daily Active Users (DAU) analytics stack ingesting >1 PB/day of unstructured identity events using AWS Glue, PySpark on EMR, and medallion architecture on S3 Parquet.",
                  tech: ['AWS Glue', 'PySpark', 'EMR', 'Kotlin', 'gRPC', 'Cassandra'],
                  techColor: "purple"
                },
                {
                  href: "https://lindenevenings.com/",
                  title: "Software Engineer",
                  company: "Linden Evenings",
                  dates: "Aug 2023 – Dec 2023",
                  description: "Led a cross-functional team to develop and deploy a full-stack platform (React.js, TypeScript, Spring Boot, AWS) from architecture to production using Agile methodologies.",
                  tech: ['React.js', 'TypeScript', 'Java', 'Spring Boot', 'AWS S3', 'Agile Scrum', 'Swagger UI'],
                  techColor: "yellow"
                },
                {
                  href: "https://www.myntra.com/",
                  title: "Software Development Engineer",
                  company: "Myntra Designs Pvt. Ltd.",
                  dates: "Jul 2020 – Jun 2022",
                  description: "Created ML-based RFID calibration micro-service that reduced scan error rate from 8% to <0.5%, saving $1.2M/year. Deployed Java and Go micro-services on Kubernetes across 500+ nodes.",
                  tech: ['Python', 'Java', 'Go', 'Kubernetes', 'ML', 'Microservices'],
                  techColor: "green"
                }
              ].map((exp, idx) => (
                <button
                  key={idx} 
                  onClick={() => exp.href && openExternalLink(exp.href)}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block w-full text-left"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors">{exp.title}</h3>
                      <p className={`text-${exp.techColor}-300 text-lg`}>{exp.company}</p>
                    </div>
                    <span className="text-white/60 text-sm md:text-base mt-2 md:mt-0">{exp.dates}</span>
                  </div>
                  <p className="text-white/80 mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className={`${
                          exp.company.includes("Linden Evenings") 
                            ? 'bg-yellow-500/20 text-yellow-300' 
                            : `bg-${exp.techColor}-500/20 text-${exp.techColor}-300`
                        } px-3 py-1 rounded-full text-sm`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section 
          id="my-articles" 
          ref={(el) => { sectionRefs.current['my-articles'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('my-articles') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-6">My Articles & Insights</h2>
            <p className="text-white/80 text-center mb-12 max-w-3xl mx-auto">
              Sharing my experiences and insights from the tech industry, from startup journeys to career reflections and technical deep-dives.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  href: "https://medium.com/@qlapon/3fa9c0517dee",
                  icon: <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>,
                  gradient: "from-green-500/30 to-teal-500/30",
                  title: "The Accidental Data Engineer: A Backend Developer's Guide to Big Data",
                  description: "A practical guide for backend developers transitioning to Big Data, breaking down the 'Five V's' through real-world examples and focusing on tools that fit existing workflows.",
                  tag: "Medium Article",
                  tagColor: "green",
                  readText: "Read on Medium"
                },
                {
                  href: "https://www.linkedin.com/feed/update/urn:li:activity:7123022408566898689/",
                  icon: <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                  gradient: "from-blue-500/30 to-cyan-500/30",
                  title: "Career Reflections & Tech Insights",
                  description: "Sharing thoughts on software engineering, career growth, and lessons learned from working at scale in the tech industry.",
                  tag: "LinkedIn Post",
                  tagColor: "blue",
                  readText: "Read on LinkedIn"
                },
                {
                  href: "https://unstop.com/blog/employee-experience-with-myntra-a-place-worth-living-your-dreams-by-kunal-jain-from-bits-pilani",
                  icon: <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
                  gradient: "from-purple-500/30 to-pink-500/30",
                  title: "Employee Experience with Myntra: A Place Worth Living Your Dreams",
                  description: "My journey at Myntra - from joining as a fresh graduate to building impactful ML systems that saved millions. A deep dive into startup culture and growth.",
                  tag: "Blog Article",
                  tagColor: "purple",
                  readText: "Read on Unstop"
                }
              ].map((article, idx) => (
                <button
                  key={idx}
                  onClick={() => article.href && openExternalLink(article.href)}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group block w-full text-left"
                >
                  <div className={`h-48 bg-gradient-to-r ${article.gradient} rounded-xl mb-4 flex items-center justify-center`}>
                    {article.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`bg-${article.tagColor}-500/20 text-${article.tagColor}-300 px-3 py-1 rounded-full text-xs`}>{article.tag}</span>
                    <div className="text-blue-300 text-sm group-hover:translate-x-1 transform transition-transform">
                      {article.readText} →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section 
          id="projects" 
          ref={(el) => { sectionRefs.current['projects'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('projects') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${isSectionVisible('projects') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl font-bold text-center text-white mb-4">Featured Projects</h2>
            <p className="text-xl text-center text-white/70 mb-16">A few highlights of my work and academic explorations.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => openProjectModal(project)}
                  className={`group relative rounded-xl p-8 bg-gradient-to-br ${project.gradient} shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-slate-900/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 text-center">{project.title}</h3>
                    <p className="text-white/70 mb-4 text-sm text-center h-20 overflow-hidden">{project.shortDescription}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {project.technologies.map(tech => (
                        <span key={tech} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium group-hover:bg-blue-500/30 group-hover:text-blue-200 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          id="recommendation" 
          ref={(el) => { sectionRefs.current['recommendation'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('recommendation') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Recommendations</h2>
            <button
              onClick={() => openExternalLink("https://www.linkedin.com/in/kunalpjain/")}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block w-full text-left"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    Christian Elgart
                  </h3>
                  <p className="text-blue-300 text-sm">
                    Sr. Director, Engineering, Identity Services at Adobe
                  </p>
                </div>
              </div>
              
              <blockquote className="text-white/80 text-lg leading-relaxed mb-6 italic">
                "I had the pleasure of working with Kunal during his time on Adobe's Identity Services team, where he consistently delivered high-impact, technically complex work.
                <br /><br />
                He built scalable PySpark pipelines for our active user dashboards, cutting latency by 30% and powering real-time insights across millions of records. He also designed accurate, pre-aggregated MAU/WAU/DAU datasets and automated refresh pipelines using Airflow, reducing manual effort by 80% while ensuring GDPR/PII compliance.
                <br /><br />
                Kunal also led development of high-throughput batch APIs in Kotlin and Cassandra, processing over 100K users/sec and improving performance by 40%. His work optimizing 77TB EMR jobs for user deletion tracking was critical to our privacy infrastructure.
                <br /><br />
                While I wasn't his manager for his work in Adobe Commerce, I saw his impact firsthand from the Identity side. He helped integrate structured commerce data into Adobe Experience Platform, driving personalization and advanced analytics across the ecosystem.
                <br /><br />
                Kunal is a rare engineer who combines technical depth with strong ownership and a focus on outcomes - he's an exceptional talent."
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">PySpark</span>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">Kotlin</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Cassandra</span>
                  <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">Airflow</span>
                </div>
                <div className="text-blue-300 text-sm group-hover:translate-x-1 transform transition-transform">
                  View on LinkedIn →
                </div>
              </div>
            </button>
          </div>
        </section>

        <section 
          id="education" 
          ref={(el) => { sectionRefs.current['education'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('education') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Education</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {[
                {
                  href: "https://mse.s3d.cmu.edu/applicants/mse-ap/index.html",
                  logo: "/cmu.png",
                  alt: "Carnegie Mellon University",
                  name: "Carnegie Mellon University",
                  degree: "Master of Software Engineering",
                  year: "2022 - 2023",
                  description: "Specialized in distributed systems, cloud computing, and software architecture. Capstone project on cloud-native service mesh accelerator."
                },
                {
                  href: "https://www.bits-pilani.ac.in/pilani/computer-science-information-systems/",
                  logo: "/bits.png",
                  alt: "BITS Pilani",
                  name: "BITS Pilani",
                  degree: "Bachelor of Engineering",
                  year: "2016 - 2020",
                  description: "Computer Science & Engineering. Strong foundation in algorithms, data structures, and software engineering principles."
                }
              ].map((edu, idx) => (
                <button
                  key={idx}
                  onClick={() => edu.href && openExternalLink(edu.href)}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block w-full"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full p-4 flex items-center justify-center">
                    <img 
                      src={edu.logo} 
                      alt={edu.alt} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{edu.name}</h3>
                  <p className="text-blue-300 text-lg mb-2">{edu.degree}</p>
                  <p className="text-white/60 text-sm mb-4">{edu.year}</p>
                  <p className="text-white/80 text-sm">
                    {edu.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section 
          id="articles" 
          ref={(el) => { sectionRefs.current['articles'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('articles') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-6">Favorite Architecture Reads</h2>
            <p className="text-white/80 text-center mb-12 max-w-3xl mx-auto">
              Here are some of my favorite deep-dives into how big tech companies solve complex engineering challenges at massive scale. These articles showcase the cutting-edge architecture patterns I'm passionate about!
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteArticles.map((article, index) => (
                <button
                  key={index}
                  onClick={() => openExternalLink(article.url)}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group block w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-blue-300 text-sm group-hover:translate-x-1 transform transition-transform">
                    Read Article →
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section 
          id="contact" 
          ref={(el) => { sectionRefs.current['contact'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('contact') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Let's Connect!</h2>
            <p className="text-white/80 text-lg mb-8">
              Always excited to discuss scalable systems, big data architecture, or just chat about tech! Feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={mailtoLink}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Send Email
              </a>
              <a 
                href="https://linkedin.com/in/kunalpjain"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/kunalpjain"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        <footer className={`py-16 bg-slate-900/50 text-center transform transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/60">&copy; {new Date().getFullYear()} Kunal Jain. All rights reserved.</p>
          <p className="text-white/50 text-sm mt-2">
            Built with React, TypeScript, Vite, and Tailwind CSS. Hosted on Cloudflare Pages.
          </p>
        </footer>
      </div>

      {isProjectModalOpen && <ProjectModal project={selectedProject} onClose={closeProjectModal} />}
    </div>
  );
}

export default App;
