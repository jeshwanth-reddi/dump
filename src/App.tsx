import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Refs for sections to observe
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Track mouse position for reactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Trigger fade-in animation on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Intersection Observer for scroll-based animations
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

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll to section with navbar offset
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Check if section is visible
  const isSectionVisible = (sectionId: string) => {
    return visibleSections.has(sectionId);
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} relative`}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)'
      }}
    >
      {/* Mouse-following cursor effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 1500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2) 0%, transparent 70%)`
        }}
      />

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 transform transition-all duration-700 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button 
                onClick={scrollToTop}
                className="text-white font-bold text-xl hover:text-blue-300 transition-colors cursor-pointer"
              >
                Kunal Jain
              </button>
              <div className="hidden md:flex space-x-8">
                <button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-white transition-colors">About</button>
                <button onClick={() => scrollToSection('experience')} className="text-white/80 hover:text-white transition-colors">Experience</button>
                <button onClick={() => scrollToSection('my-articles')} className="text-white/80 hover:text-white transition-colors">My Articles</button>
                <button onClick={() => scrollToSection('projects')} className="text-white/80 hover:text-white transition-colors">Projects</button>
                <button onClick={() => scrollToSection('education')} className="text-white/80 hover:text-white transition-colors">Education</button>
                <button onClick={() => scrollToSection('articles')} className="text-white/80 hover:text-white transition-colors">Favorite Reads</button>
                <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-white transition-colors">Contact</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Seattle Background */}
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
                Software Engineer II at Adobe, passionate about designing scalable systems and architectural patterns for big data
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

        {/* About Section */}
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
                      <span className="text-white/80">Software Engineer II at Adobe</span>
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

        {/* Experience Section */}
        <section 
          id="experience" 
          ref={(el) => { sectionRefs.current['experience'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('experience') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Experience</h2>
            <div className="space-y-8">
              {/* Adobe Current */}
              <a 
                href="https://www.adobe.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors">Software Engineer 2</h3>
                    <p className="text-blue-300 text-lg">Adobe • Commerce Data Platform</p>
                  </div>
                  <span className="text-white/60 text-sm md:text-base">Dec 2024 – Present</span>
                </div>
                <p className="text-white/80 mb-4">
                  Integrating structured commerce data into Adobe Experience Platform (AEP) using PySpark and Azure Databricks DLT jobs, enabling real-time segmentation and personalized customer experiences.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['PySpark', 'Azure Databricks', 'ETL', 'Airflow'].map((tech) => (
                    <span key={tech} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </a>

              {/* Adobe Previous */}
              <a 
                href="https://www.adobe.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors">Software Engineer 2</h3>
                    <p className="text-blue-300 text-lg">Adobe • Identity Platform</p>
                  </div>
                  <span className="text-white/60 text-sm md:text-base">Feb 2024 – Dec 2024</span>
                </div>
                <p className="text-white/80 mb-4">
                  Designed and delivered a Daily Active Users (DAU) analytics stack ingesting &gt;1 PB/day of unstructured identity events using AWS Glue, PySpark on EMR, and medallion architecture on S3 Parquet.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['AWS Glue', 'PySpark', 'EMR', 'Kotlin', 'gRPC', 'Cassandra'].map((tech) => (
                    <span key={tech} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </a>

              {/* Myntra */}
              <a 
                href="https://www.myntra.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors">Software Development Engineer</h3>
                    <p className="text-blue-300 text-lg">Myntra Designs Pvt. Ltd.</p>
                  </div>
                  <span className="text-white/60 text-sm md:text-base">Jul 2020 – Jun 2022</span>
                </div>
                <p className="text-white/80 mb-4">
                  Created ML-based RFID calibration micro-service that reduced scan error rate from 8% to &lt;0.5%, saving $1.2M/year. Deployed Java and Go micro-services on Kubernetes across 500+ nodes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Java', 'Go', 'Kubernetes', 'ML', 'Microservices'].map((tech) => (
                    <span key={tech} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* My Articles Section */}
        <section 
          id="my-articles" 
          ref={(el) => { sectionRefs.current['my-articles'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('my-articles') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-6">My Articles & Insights</h2>
            <p className="text-white/80 text-center mb-12 max-w-3xl mx-auto">
              Sharing my experiences and insights from the tech industry, from startup journeys to career reflections.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* LinkedIn Article */}
              <a 
                href="https://www.linkedin.com/feed/update/urn:li:activity:7123022408566898689/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group block"
              >
                <div className="h-48 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  Career Reflections & Tech Insights
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Sharing thoughts on software engineering, career growth, and lessons learned from working at scale in the tech industry.
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">LinkedIn Post</span>
                  <div className="text-blue-300 text-sm group-hover:translate-x-1 transform transition-transform">
                    Read on LinkedIn →
                  </div>
                </div>
              </a>

              {/* Unstop Blog Article */}
              <a 
                href="https://unstop.com/blog/employee-experience-with-myntra-a-place-worth-living-your-dreams-by-kunal-jain-from-bits-pilani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group block"
              >
                <div className="h-48 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  Employee Experience with Myntra: A Place Worth Living Your Dreams
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  My journey at Myntra - from joining as a fresh graduate to building impactful ML systems that saved millions. A deep dive into startup culture and growth.
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">Blog Article</span>
                  <div className="text-blue-300 text-sm group-hover:translate-x-1 transform transition-transform">
                    Read on Unstop →
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          ref={(el) => { sectionRefs.current['projects'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('projects') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cloud-Native Service Mesh */}
              <a 
                href="https://mse.s3d.cmu.edu/applicants/mse-ap/studio.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group block"
              >
                <div className="h-48 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">Cloud-Native Service Mesh Accelerator</h3>
                <p className="text-white/70 mb-4">
                  Architected Envoy service mesh for microservices on EKS with Go control plane delivering mTLS, traffic-splitting, and circuit-breaking via xDS.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Go</span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">Kubernetes</span>
                    <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Envoy</span>
                  </div>
                </div>
              </a>

              {/* High-traffic QR code resolver */}
              <a 
                href="https://www.cs.cmu.edu/~msakr/15619-s18/recitations/S18_Recitation10.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group block"
              >
                <div className="h-48 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-xl mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="1" y="1" width="6" height="6" rx="1"/>
                    <rect x="17" y="1" width="6" height="6" rx="1"/>
                    <rect x="1" y="17" width="6" height="6" rx="1"/>
                    <rect x="3" y="3" width="2" height="2"/>
                    <rect x="19" y="3" width="2" height="2"/>
                    <rect x="3" y="19" width="2" height="2"/>
                    <rect x="9" y="1" width="2" height="2"/>
                    <rect x="13" y="1" width="2" height="2"/>
                    <rect x="9" y="5" width="2" height="2"/>
                    <rect x="13" y="5" width="2" height="2"/>
                    <rect x="9" y="9" width="6" height="6" rx="1"/>
                    <rect x="11" y="11" width="2" height="2"/>
                    <rect x="17" y="9" width="2" height="2"/>
                    <rect x="21" y="9" width="2" height="2"/>
                    <rect x="17" y="13" width="2" height="2"/>
                    <rect x="21" y="13" width="2" height="2"/>
                    <rect x="9" y="17" width="2" height="2"/>
                    <rect x="13" y="17" width="2" height="2"/>
                    <rect x="9" y="21" width="2" height="2"/>
                    <rect x="13" y="21" width="2" height="2"/>
                    <rect x="17" y="17" width="2" height="2"/>
                    <rect x="21" y="17" width="2" height="2"/>
                    <rect x="17" y="21" width="2" height="2"/>
                    <rect x="21" y="21" width="2" height="2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">High-Traffic QR Code Resolver</h3>
                <p className="text-white/70 mb-4">
                  Engineered scalable web-tier application on AWS achieving 75k+ requests/sec with optimized EC2 instances and load balancing.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">AWS</span>
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Kubernetes</span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">Terraform</span>
                  </div>
                </div>
              </a>

              {/* Social Media Clone */}
              <a 
                href="https://www.cs.cmu.edu/~msakr/15619-s18/recitations/S18_Recitation10.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group block"
              >
                <div className="h-48 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">Social Media Clone with Heterogeneous Storage</h3>
                <p className="text-white/70 mb-4">
                  Architected social media platform leveraging MySQL, Neo4J, and MongoDB for optimized data retrieval and 25% improved query response time.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">MySQL</span>
                    <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Neo4J</span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">MongoDB</span>
                  </div>
                </div>
              </a>

              {/* Twitter Social Graph Analysis */}
              <a 
                href="https://www.cs.cmu.edu/~msakr/15619-s18/recitations/S18_Recitation10.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group block"
              >
                <div className="h-48 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-xl mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">Twitter Social Graph Analysis with Apache Spark</h3>
                <p className="text-white/70 mb-4">
                  Implemented PageRank algorithm using Apache Spark to analyze Twitter social graph, identifying top 5% most influential users with 30% performance improvement.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">Spark</span>
                    <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">PageRank</span>
                    <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">Zeppelin</span>
                  </div>
                </div>
              </a>

              {/* ML-based RFID Calibration System */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group">
                <div className="h-48 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-xl mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">ML-based RFID Calibration Microservice</h3>
                <p className="text-white/70 mb-4">
                  Built machine learning microservice that reduced RFID scan error rate from 8% to &lt;0.5%, saving $1.2M/year in logistics costs at Myntra.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded text-xs">Python</span>
                    <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs">ML</span>
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Microservices</span>
                  </div>
                </div>
              </div>

              {/* Samsung Distributed Database */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group">
                <div className="h-48 bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-xl mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">Samsung Smart TV Distributed Database System</h3>
                <p className="text-white/70 mb-4">
                  Designed and implemented distributed database using MySQL Cluster achieving 75% faster query resolution for Samsung Smart TV log collection and analysis.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded text-xs">MySQL</span>
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Distributed</span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">Python</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section 
          id="education" 
          ref={(el) => { sectionRefs.current['education'] = el; }}
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isSectionVisible('education') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Education</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Carnegie Mellon University */}
              <div className="text-center">
                <a 
                  href="https://mse.s3d.cmu.edu/applicants/mse-ap/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full p-4 flex items-center justify-center">
                    <img 
                      src="/cmu.png" 
                      alt="Carnegie Mellon University" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">Carnegie Mellon University</h3>
                  <p className="text-blue-300 text-lg mb-2">Master of Software Engineering</p>
                  <p className="text-white/60 text-sm mb-4">2022 - 2023</p>
                  <p className="text-white/80 text-sm">
                    Specialized in distributed systems, cloud computing, and software architecture. 
                    Capstone project on cloud-native service mesh accelerator.
                  </p>
                </a>
              </div>

              {/* BITS Pilani */}
              <div className="text-center">
                <a 
                  href="https://www.bits-pilani.ac.in/pilani/computer-science-information-systems/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all group block"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full p-4 flex items-center justify-center">
                    <img 
                      src="/bits.png" 
                      alt="BITS Pilani" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">BITS Pilani</h3>
                  <p className="text-blue-300 text-lg mb-2">Bachelor of Engineering</p>
                  <p className="text-white/60 text-sm mb-4">2016 - 2020</p>
                  <p className="text-white/80 text-sm">
                    Computer Science & Engineering. Strong foundation in algorithms, 
                    data structures, and software engineering principles.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Favorite Articles Section */}
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
              {[
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
              ].map((article, index) => (
                <a 
                  key={index}
                  href={article.url}
          target="_blank"
          rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group block"
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
                    Read on ByteByteGo →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:jainpkunal@gmail.com" 
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

        {/* Footer */}
        <footer 
          className="py-8 px-4 sm:px-6 lg:px-8 relative"
        >
          {/* Gradient separator line */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #3b82f6 20%, #3b82f6 80%, transparent 100%)'
            }}
          />
          
          <div className="max-w-7xl mx-auto text-center">
            <p style={{ 
              color: '#ffffff', 
              fontSize: '18px', 
              fontWeight: 'bold',
              margin: '0 0 8px 0'
            }}>
              © 2025 Kunal Jain
            </p>
            <p style={{ 
              color: '#e5e7eb', 
              fontSize: '16px',
              margin: '0 0 8px 0'
            }}>
              Built with React, TypeScript & Vite • Hosted on Cloudflare Pages
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
