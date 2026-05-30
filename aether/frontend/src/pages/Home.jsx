import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Button } from '../components/common/Button';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass border-primary/30 text-primary text-sm font-medium mb-4">
            Next-Gen AI Hiring Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            The Future of <br/>
            <span className="text-gradient">Employee Verification</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            AETHER seamlessly connects top talent with visionary companies using advanced AI matching, automated verification, and deep ATS analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/register">
              <Button variant="primary" className="h-14 px-8 text-lg w-full sm:w-auto">
                Start Hiring Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="h-14 px-8 text-lg w-full sm:w-auto">
                Find Your Next Role
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24 mb-16">
          <FeatureCard 
            icon={<BrainCircuit className="w-8 h-8 text-primary" />}
            title="AI Matching"
            description="Gemini-powered ATS scoring and skill gap analysis to find the perfect fit."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-secondary" />}
            title="Instant Verification"
            description="Automated background checks and cryptographic verification for absolute trust."
          />
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-accent" />}
            title="Realtime Collaboration"
            description="Live socket-based interactions, instant notifications, and seamless tracking."
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-8 text-left"
  >
    <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

export default Home;