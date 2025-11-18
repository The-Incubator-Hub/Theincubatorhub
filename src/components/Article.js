'use client'; 
import React from 'react';  
import { User, Calendar, Clock } from 'lucide-react';  

const BlogArticleHeader = () => {   
  return ( 
    <div className="min-h-screen bg-gray-50 pt-20">  
      {/* Main Container */} 
      <div className="max-w-[1280px] mx-auto py-12 px-6">  
        {/* Tags Section */}
        <div className="flex gap-3 mb-8"> 
          <span className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-full"> 
            FEATURED  
          </span> 
          <span className="px-6 py-2.5 bg-gray-300 text-gray-800 text-sm font-semibold rounded-full">  
            Education
          </span> 
        </div>   

        {/* Article Title */} 
        <h1     
            className="mb-8 max-w-full" 
            style ={{  
            fontFamily: 'Raleway, sans-serif',     
            fontWeight: 700,     
            fontSize: '48px',   
            lineHeight: '140%',      
            letterSpacing: '0px', 
            color: '#0C0D0D'  
          }}
        > 
        The Future of Tech Education in Africa: Bridging the Digital Divide
        </h1>   
        {/* Article Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-600">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-medium text-gray-800">Sarah Okafor</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>December 15, 2024</span> 
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-2"> 
            <Clock className="w-5 h-5 text-gray-500" /> 
            <span>5 mins read</span> 
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full overflow-hidden shadow-2xl rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="Team meeting discussing tech education"
            className="w-full h-[575px] object-cover"
          />
        </div> 

      {/* Article Content Section */}
      <div 
        style={{
          width: '100%',
          maxWidth: '1280px',
          minHeight: '1032px',
          opacity: 1,
          transform: 'rotate(0deg)',
          marginTop: '48px',
          fontFamily: 'Onest, sans-serif',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: '16px',
          lineHeight: '150%',
          color: '#000000',
          letterSpacing: '0px'
        }}
      >
          <div className="max-w-none">
            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              Africa is experiencing a technological renaissance, and at the heart of this transformation lies education. As we stand on the cusp of a new era, the landscape of technology education across the continent is evolving rapidly, presenting unprecedented opportunities for learners, educators, and innovators alike.
            </p>

            <h2 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              The Current State of Tech Education in Africa
            </h2>
            
            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              Over the last decade, the tech education landscape in Africa has experienced impressive growth. From coding bootcamps in Lagos to AI research hubs in Cairo, the continent is alive with initiatives aimed at closing the tech skills gap.
            </p>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              Here are some key statistics that illustrate this expansion:
            </p>

            <ul className="list-none pl-0" style={{ margin: 0, padding: 0 }}>
              <li style={{ 
                fontFamily: 'Onest, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0px',
                color: '#000000',
                margin: 0,
                marginBottom: 0
              }}>- More than 400 tech hubs across 42 African nations</li>
              <li style={{ 
                fontFamily: 'Onest, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0px',
                color: '#000000',
                margin: 0,
                marginBottom: 0
              }}>- $2.4 billion in tech funding secured in 2022</li>
              <li style={{ 
                fontFamily: 'Onest, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0px',
                color: '#000000',
                margin: 0,
                marginBottom: 0
              }}>- A 65% rise in STEM graduates in the last five years</li>
              <li style={{ 
                fontFamily: 'Onest, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0px',
                color: '#000000',
                margin: 0,
                marginBottom: 0
              }}>- Over 200 coding schools and boot camps currently operating</li>
            </ul>

            <h2 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              Emerging Trends Shaping the Future
            </h2>

            <h3 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              1. Mobile-First Learning Platforms
            </h3>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              With mobile phone usage surpassing 80% in many African regions, mobile-first learning platforms are becoming the go-to method for tech education. These platforms provide:
            </p>

            <ul className="list-none pl-0" style={{ margin: 0, padding: 0 }}>
              <li style={{ 
                fontFamily: 'Onest, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0px',
                color: '#000000',
                margin: 0,
                marginBottom: 0
              }}>- Offline-accessible content for areas with poor connectivity</li>
              <li style={{ 
                fontFamily: 'Onest, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0px',
                color: '#000000',
                margin: 0,
                marginBottom: 0
              }}>- Micro-learning modules tailored for mobile use</li>
              <li style={{ 
                fontFamily: 'Onest, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0px',
                color: '#000000',
                margin: 0,
                marginBottom: 0
              }}>- Gamified learning experiences that enhance engagement</li>
            </ul>

            <h3 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              2. Industry-Academia Collaborations
            </h3>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              Top global tech firms are partnering with African educational institutions, delivering world-class curricula and resources directly to students. These partnerships ensure that learners acquire skills that are relevant in today's job market.
            </p>

            <h3 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              3. Emphasis on Practical Skills
            </h3>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              There's a noticeable shift from theoretical learning to hands-on, project-based education. Students are developing real-world applications, contributing to open-source projects, and addressing local challenges through technology.
            </p>

            <h2 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              Future Opportunities
            </h2>

            <h3 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              Artificial intelligence and machine learning
            </h3>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              As AI gains global significance, Africa has the potential to lead in AI education and its applications. Countries like Kenya and South Africa are already setting up AI research centers and degree programs.
            </p>

            <h3 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              Blockchain and Cryptocurrency
            </h3>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              With Africa at the forefront of cryptocurrency adoption in various regions, blockchain education offers substantial opportunities for developing financial inclusion solutions and innovative applications.
            </p>

            <h3 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              Green Technology
            </h3>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              The challenges posed by climate change create opportunities for tech education focused on sustainable solutions, renewable energy systems, and environmental monitoring technologies.
            </p>

            <h2 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              Challenges and Solutions
            </h2>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              Despite the positive trends, several challenges persist:
            </p>

            <h3 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              Infrastructure Issues
            </h3>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              Limited internet access and unreliable power supply continue to obstruct access to tech education. However, innovative solutions like offline-first learning platforms and solar-powered learning centers are emerging.
            </p>

            <h3 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              Gender Gap
            </h3>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              Women remain underrepresented in tech education. Initiatives like Ladies in Tech Africa are working to bridge this gap through targeted programs and mentorship opportunities.
            </p>

            <h3 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: 0,
              marginBottom: 0
            }}>
              Skills-Job Market Alignment
            </h3>

            <p style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginBottom: 0
            }}>
              Ensuring that educational programs align with market demands requires continuous collaboration between educators and industry professionals.
            </p>

            <h2 style={{ 
              fontFamily: 'Onest, sans-serif',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
              marginTop: '24px',
              marginBottom: '16px'
            }}>
              Tags
            </h2>

            <div className="flex flex-wrap gap-3" style={{ marginBottom: '24px' }}>
              <button className="px-5 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-full transition-colors duration-200 hover:bg-gray-700 hover:text-white">
                Education
              </button>
              <button className="px-5 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-full transition-colors duration-200 hover:bg-gray-700 hover:text-white">
                Success Stories
              </button>
              <button className="px-5 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-full transition-colors duration-200 hover:bg-gray-700 hover:text-white">
                Technology
              </button>
              <button className="px-5 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-full transition-colors duration-200 hover:bg-gray-700 hover:text-white">
                Gender Inclusivity
              </button>
              <button className="px-5 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-full transition-colors duration-200 hover:bg-gray-700 hover:text-white">
                Tech-ED
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticleHeader;