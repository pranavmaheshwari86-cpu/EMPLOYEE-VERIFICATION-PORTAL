import { useEffect } from 'react';
import AppRoutes from './routes';
import { useAuthStore } from './store/authStore';
import { socketService } from './services/socket.service';
import { Toaster } from 'react-hot-toast';

function App() {
  const { checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated && user) {
      socketService.connect(user._id);
      
      return () => {
        socketService.disconnect();
      };
    }
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30 selection:text-white">
      {/* Background Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>
      
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155'
          }
        }} 
      />
      <AppRoutes />
    </div>
  );
}

export default App;
