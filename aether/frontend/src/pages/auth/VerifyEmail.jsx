import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/common/Button';
import { CheckCircle2, XCircle, Mail, Loader2, ArrowRight } from 'lucide-react';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { verifyEmail, user } = useAuthStore();
  
  const [status, setStatus] = useState('pending'); // pending, success, error, or 'awaiting_email'
  const [message, setMessage] = useState('');
  const [devToken, setDevToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isVerified) {
      navigate(`/${user.role}/dashboard`);
      return;
    }

    if (token) {
      const verify = async () => {
        try {
          await verifyEmail(token);
          setStatus('success');
          setMessage('Your email has been verified successfully!');
        } catch (error) {
          setStatus('error');
          setMessage(error?.response?.data?.message || 'Invalid or expired verification link.');
        }
      };
      verify();
    } else {
      setStatus('awaiting_email');
      
      // Auto-fetch token in development mode
      if (import.meta.env.MODE === 'development') {
        api.get('/auth/dev-token')
          .then(res => setDevToken(res.data.token))
          .catch(() => {});
      }
    }
  }, [token, verifyEmail, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-card p-8 relative overflow-hidden text-center"
      >
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-accent/20 blur-[60px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          
          {status === 'pending' && (
            <>
              <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
              <h2 className="text-2xl font-bold mb-2">Verifying Email</h2>
              <p className="text-gray-400">Please wait while we verify your token...</p>
            </>
          )}

          {status === 'awaiting_email' && (
            <>
              <div className="bg-primary/20 p-4 rounded-full mb-6">
                <Mail className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="text-gray-400 mb-6">
                We've sent a verification link to your email address. Please click the link to activate your account.
              </p>
              {user ? (
                <Button variant="secondary" className="w-full" onClick={() => window.location.reload()}>
                  I've verified my email
                </Button>
              ) : (
                <Link to="/login" className="w-full">
                  <Button variant="secondary" className="w-full">Return to Login</Button>
                </Link>
              )}
              
              {devToken && (
                <div className="mt-6 p-4 border border-dashed border-primary/50 rounded-lg text-sm text-left">
                  <p className="text-primary font-bold mb-2 text-center">Development Mode Fast-Pass</p>
                  <p className="text-gray-400 mb-3 text-center">Since SMTP isn't configured, use this link:</p>
                  <a href={`/verify-email?token=${devToken}`} className="text-blue-400 underline break-all">
                    http://localhost:5173/verify-email?token={devToken}
                  </a>
                </div>
              )}
            </>
          )}

          {status === 'success' && (
            <>
              <div className="bg-green-500/20 p-4 rounded-full mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
              <p className="text-gray-400 mb-8">{message}</p>
              
              <Button 
                variant="primary" 
                className="w-full h-12" 
                onClick={() => navigate(user ? `/${user.role}/dashboard` : '/login')}
              >
                {user ? 'Go to Dashboard' : 'Sign In'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="bg-red-500/20 p-4 rounded-full mb-6">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
              <p className="text-red-400 mb-8">{message}</p>
              
              <Link to="/login" className="w-full">
                <Button variant="secondary" className="w-full h-12">
                  Return to Login
                </Button>
              </Link>
            </>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
