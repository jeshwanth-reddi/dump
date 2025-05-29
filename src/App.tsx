import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-white font-bold text-xl">Kunal Jain</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
              <a href="#experience" className="text-white/80 hover:text-white transition-colors">Experience</a>
              <a href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
              <a href="#education" className="text-white/80 hover:text-white transition-colors">Education</a>
              <a href="#articles" className="text-white/80 hover:text-white transition-colors">Favorite Reads</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
              <a 
                href="#projects"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>
              <a 
                href="#contact"
                className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
              <p className="text-white/80 text-lg mb-6">
                I'm a Software Engineer at Adobe, based in the beautiful Pacific Northwest. I'm passionate about designing scalable systems and architectural patterns that handle big data at massive scale. I love diving deep into how big tech companies solve complex engineering challenges with cutting-edge architecture. Left a few of my favorite articles at the bottom of the page ❤️
              </p>
              <p className="text-white/80 text-lg mb-8">
                When I'm not geeking out in my work life, you'll find me experimenting with things—whether it's my custom apps (to be announced soon!), niche tools like Neovim & Linux (I use Arch, btw), or even building furniture! I'm always exploring new technologies, hiking through Washington's stunning trails, or strategizing in Rainbow Six Siege (yes, I'm one of those who prefer R6 to CS or Valorant :D).
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
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Experience</h2>
          <div className="space-y-8">
            {/* Adobe Current */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Software Engineer 2</h3>
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
            </div>

            {/* Adobe Previous */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Software Engineer 2</h3>
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
            </div>

            {/* Myntra */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Software Development Engineer</h3>
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
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cloud-Native Service Mesh */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group">
              <div className="h-48 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white/60 text-lg font-semibold">Service Mesh</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cloud-Native Service Mesh Accelerator</h3>
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
            </div>

            {/* High-traffic QR code resolver */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group">
              <div className="h-48 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white/60 text-lg font-semibold">QR Resolver</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">High-Traffic QR Code Resolver</h3>
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
            </div>

            {/* Social Media Clone */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group">
              <div className="h-48 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white/60 text-lg font-semibold">Social Platform</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Social Media Clone with Heterogeneous Storage</h3>
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
            </div>

            {/* Twitter Social Graph Analysis */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group">
              <div className="h-48 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white/60 text-lg font-semibold">Graph Analytics</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Twitter Social Graph Analysis with Apache Spark</h3>
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
            </div>

            {/* ML-based RFID Calibration System */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group">
              <div className="h-48 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white/60 text-lg font-semibold">ML System</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">ML-based RFID Calibration Microservice</h3>
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
                <span className="text-white/60 text-lg font-semibold">Distributed DB</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Samsung Smart TV Distributed Database System</h3>
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
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Education</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Carnegie Mellon University */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all">
                <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full p-4 flex items-center justify-center">
                  <img 
                    src="/cmu.png" 
                    alt="Carnegie Mellon University" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Carnegie Mellon University</h3>
                <p className="text-blue-300 text-lg mb-2">Master of Software Engineering</p>
                <p className="text-white/60 text-sm mb-4">2022 - 2023</p>
                <p className="text-white/80 text-sm">
                  Specialized in distributed systems, cloud computing, and software architecture. 
                  Capstone project on cloud-native service mesh accelerator.
                </p>
              </div>
            </div>

            {/* BITS Pilani */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all">
                <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full p-4 flex items-center justify-center">
                  <img 
                    src="/bits.png" 
                    alt="BITS Pilani" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">BITS Pilani</h3>
                <p className="text-blue-300 text-lg mb-2">Bachelor of Engineering</p>
                <p className="text-white/60 text-sm mb-4">2016 - 2020</p>
                <p className="text-white/80 text-sm">
                  Computer Science & Engineering. Strong foundation in algorithms, 
                  data structures, and software engineering principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorite Articles Section */}
      <section id="articles" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-6">Favorite Architecture Reads ❤️</h2>
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
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
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
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60">
            © 2025 Kunal Jain. Built with React, TypeScript & Vite. Hosted on Cloudflare Pages.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
