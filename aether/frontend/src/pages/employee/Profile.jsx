import React, { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useAuthStore } from '../../store/authStore';
import { User, Mail, Briefcase, MapPin, Phone, Shield, FileText, Check, X, Link, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateProfile(formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">My Profile</h1>
          <p className="text-slate-400 mt-2">Manage your personal information and resume.</p>
        </div>

        <div className="bg-[#131722] border border-white/5 rounded-2xl overflow-hidden relative">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
            <div className="absolute inset-0 bg-[#131722]/50 backdrop-blur-sm" />
          </div>
          
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-8">
              <div className="flex items-end space-x-5">
                <div className="w-24 h-24 bg-[#1a1f2e] border-4 border-[#131722] rounded-2xl flex items-center justify-center relative overflow-hidden z-10 shadow-xl shadow-black/50">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt={user?.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-slate-400" />
                  )}
                </div>
                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                  <p className="text-primary font-medium">{user?.role === 'employee' ? 'Candidate' : 'Employer'}</p>
                </div>
              </div>
              
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors border border-white/10 pb-2">
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center space-x-3 pb-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg font-medium transition-colors">
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center">
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Personal Details</h3>
                  <div className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
                          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +1 234 567 890" className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Location</label>
                          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. New York, NY" className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">GitHub Profile</label>
                          <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="e.g. https://github.com/username" className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">LinkedIn Profile</label>
                          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="e.g. https://linkedin.com/in/username" className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center text-slate-300">
                          <Mail className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
                          <span className="truncate">{user?.email}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <Phone className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
                          <span className="truncate">{user?.phone || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <MapPin className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
                          <span className="truncate">{user?.location || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <Link className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
                          {user?.github ? (
                            <a href={user.github.startsWith('http') ? user.github : `https://${user.github}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                              {user.github.replace(/^https?:\/\//, '')}
                            </a>
                          ) : (
                            <span className="text-slate-500">Not provided</span>
                          )}
                        </div>
                        <div className="flex items-center text-slate-300">
                          <Globe className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
                          {user?.linkedin ? (
                            <a href={user.linkedin.startsWith('http') ? user.linkedin : `https://${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                              {user.linkedin.replace(/^https?:\/\//, '')}
                            </a>
                          ) : (
                            <span className="text-slate-500">Not provided</span>
                          )}
                        </div>
                        <div className="flex items-center text-slate-300 pt-2 border-t border-white/5">
                          <Shield className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
                          <span className="capitalize">{user?.role} Account</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Resume & Documents</h3>
                  <div className="bg-[#1a1f2e] border border-white/5 rounded-xl p-5 flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Current Resume</h4>
                        <p className="text-sm text-slate-400 mt-1">
                          {user?.resume ? 'Resume uploaded successfully' : 'No resume uploaded yet'}
                        </p>
                      </div>
                    </div>
                    {user?.resume ? (
                      <a href={user.resume} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary-light font-medium">
                        View
                      </a>
                    ) : (
                      <button className="text-sm text-primary hover:text-primary-light font-medium">
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
