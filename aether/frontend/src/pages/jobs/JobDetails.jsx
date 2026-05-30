import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Button } from '../../components/common/Button';
import { MapPin, Briefcase, DollarSign, Building } from 'lucide-react';
import api from '../../services/api';
import { useAuthStore } from '../../store/authStore';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return navigate('/login');
    if (!resume) return alert('Please upload a resume');

    try {
      setIsApplying(true);
      const formData = new FormData();
      formData.append('resume', resume);

      await api.post(`/applications/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert('Application submitted successfully!');
      navigate('/employee/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to apply');
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!job) return <div className="min-h-screen flex items-center justify-center">Job not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
        <div className="glass-card p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/10 pb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-400">
                <span className="flex items-center gap-2"><Building className="w-5 h-5"/> {job.companyName}</span>
                <span className="flex items-center gap-2"><MapPin className="w-5 h-5"/> {job.location}</span>
                <span className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">{job.jobType}</span>
              </div>
            </div>
            {user?.role !== 'employer' && user?.role !== 'admin' && (
              <form onSubmit={handleApply} className="flex flex-col gap-3 min-w-[250px] glass p-4 rounded-xl">
                <label className="text-sm font-medium">Upload Resume (PDF)</label>
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                  required
                />
                <Button type="submit" variant="primary" isLoading={isApplying}>
                  Apply Now
                </Button>
              </form>
            )}
          </div>

          <div className="py-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Job Description</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map(skill => (
                  <span key={skill} className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface/50 p-6 rounded-xl border border-white/5">
              <div>
                <h4 className="text-sm text-gray-400 mb-1">Experience Level</h4>
                <p className="font-semibold flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary"/> {job.requiredExperience} Years Minimum</p>
              </div>
              {job.salaryRange && (
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Salary Range</h4>
                  <p className="font-semibold flex items-center gap-2"><DollarSign className="w-4 h-4 text-accent"/> ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
