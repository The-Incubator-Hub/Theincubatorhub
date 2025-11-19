
import React from 'react';
import { Heart, ExternalLink, ArrowRight, MapPin, Clock, Users } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 p-6 sm:p-8 hover:border-green-500 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-xl flex items-center justify-center">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-[20px] font-semibold text-gray-900 break-words">
              {job.title}
            </h3>
            {job.urgent && (
              <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full whitespace-nowrap">
                Urgent
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Meta Information - pushed in with left padding */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 pl-14">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 flex-shrink-0" />
          <span>{job.department}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>{job.type}</span>
        </div>
      </div>

      {/* Description - aligned with heart icon */}
      <p className="text-gray-700 leading-relaxed mb-6">
        {job.description}
      </p>

      {/* Action Buttons - aligned with heart icon */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
        {job.applyLink ? (
          <a 
            href={job.applyLink}
            target={job.applyLink.startsWith('http') ? '_blank' : undefined}
            rel={job.applyLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center gap-2 bg-black group-hover:bg-green-500 group-hover:scale-110 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 active:scale-95 flex-shrink-0"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          </a>
        ) : (
          <button className="inline-flex items-center justify-center gap-2 bg-black group-hover:bg-green-500 group-hover:scale-110 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 active:scale-95 flex-shrink-0">
            <span>Apply Now</span>
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          </button>
        )}
        {job.viewDetailsLink ? (
          <a 
            href={job.viewDetailsLink}
            target={job.viewDetailsLink.startsWith('http') ? '_blank' : undefined}
            rel={job.viewDetailsLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 transition-all duration-200 flex-shrink-0 hover:text-green-500"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        ) : (
          <button className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 transition-all duration-200 flex-shrink-0">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const JobListings = ({ jobs: propsJobs = [] }) => {
  const defaultJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineer',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      urgent: true,
      description: 'Take charge of the development of our innovative learning platform, guiding and mentoring junior developers throughout the process. In addition to fostering their growth, focus on creating scalable and efficient solutions that enhance user experience and meet the evolving needs of our learners.'
    },
    {
      id: 2,
      title: 'Program Manager - Bootcamps',
      department: 'Education',
      location: 'Ogun, Nigeria',
      type: 'Part-time',
      urgent: false,
      description: 'Take charge of the bootcamp operations by managing the development of the curriculum and implementing student success initiatives across various programs. This role involves ensuring that all aspects of the bootcamp run smoothly, fostering an engaging learning environment, & improving the educational experience.'
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      urgent: true,
      description: 'Lead and execute comprehensive digital marketing campaigns, effectively manage the brand\'s social media presence across various platforms, and develop engaging and persuasive content that resonates with our target audience.'
    },
    {
      id: 4,
      title: 'Partnership Development Manager',
      department: 'Business Development',
      location: 'Ogun, Nigeria',
      type: 'Hybrid',
      urgent: true,
      description: 'Develop and cultivate strategic partnerships with various companies and organizations to significantly enhance our impact and broaden our reach within the community and industry. By collaborating with like-minded entities, we can leverage shared resources and expertise to create more meaningful outcomes.'
    }
  ];

  const jobs = propsJobs.length > 0 
    ? propsJobs.map((job, index) => ({ ...job, id: index + 1 }))
    : defaultJobs;

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
