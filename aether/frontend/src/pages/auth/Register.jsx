import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Activity } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee'
  });
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(formData);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      // Error is handled by store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl glass-card p-8 relative overflow-hidden"
      >
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-accent/20 blur-[60px] rounded-full" />
        
        <div className="relative z-10">
          <div className="flex flex-col items-center mb-8">
            <Link to="/" className="bg-primary/20 p-3 rounded-2xl mb-4">
              <Activity className="w-8 h-8 text-primary" />
            </Link>
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-gray-400 mt-2 text-sm">Join AETHER platform today</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input 
                label="Full Name" 
                name="name"
                type="text" 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <div className="flex flex-col w-full gap-1.5">
                <label className="text-sm font-medium text-gray-300 ml-1">Account Type</label>
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="glass-input appearance-none bg-surface/50"
                  required
                >
                  <option value="employee" className="bg-slate-900 text-white">Candidate / Employee</option>
                  <option value="employer" className="bg-slate-900 text-white">Company / Employer</option>
                </select>
              </div>
            </div>

            <Input 
              label="Email Address" 
              name="email"
              type="email" 
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input 
              label="Password" 
              name="password"
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />

            <Button type="submit" variant="primary" className="w-full h-12 mt-4" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
