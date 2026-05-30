import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Search, MapPin, Briefcase, DollarSign } from 'lucide-react';
import api from '../../services/api';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [search]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/jobs${search ? `?search=${search}` : ''}`);
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Next <span className="text-gradient">Dream Job</span></h1>
          <p className="text-gray-400">Discover opportunities at top visionary companies.</p>
          
          <div className="mt-8 max-w-2xl mx-auto flex gap-4">
            <Input 
              placeholder="Search by title, skills, or company..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Button variant="primary" className="px-8">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <Link to={`/jobs/${job._id}`} key={job._id} className="glass-card p-6 hover:-translate-y-1 transition-transform group cursor-pointer block">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{job.companyName}</p>
                  </div>
                  <span className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {job.jobType}
                  </span>
                </div>
                
                <div className="space-y-2 mt-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Briefcase className="w-4 h-4" /> {job.requiredExperience} years exp.
                  </div>
                  {job.salaryRange && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <DollarSign className="w-4 h-4" /> 
                      ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
                    </div>
                  )}
                </div>
              </Link>
            ))}
            
            {jobs.length === 0 && (
              <div className="col-span-full text-center p-12 text-gray-400">
                No jobs found matching your criteria.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobListing;
