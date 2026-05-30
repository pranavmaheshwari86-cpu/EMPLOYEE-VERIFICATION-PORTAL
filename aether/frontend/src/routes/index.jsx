import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// Pages
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import VerifyEmail from '../pages/auth/VerifyEmail';
import EmployeeDashboard from '../pages/employee/Dashboard';
import EmployerDashboard from '../pages/employer/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import JobListing from '../pages/jobs/JobListing';
import JobDetails from '../pages/jobs/JobDetails';
import Billing from '../pages/billing/Billing';
import EmployeeApplications from '../pages/employee/Applications';
import EmployeeProfile from '../pages/employee/Profile';
import EmployerProfile from '../pages/employer/Profile';
import ManageJobs from '../pages/employer/ManageJobs';
import Candidates from '../pages/employer/Candidates';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Public Routes */}
        <Route path="/jobs" element={<JobListing />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Protected Routes */}
        <Route 
          path="/employee/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee/applications" 
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeApplications />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee/profile" 
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer/jobs" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <ManageJobs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer/candidates" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <Candidates />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer/profile" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer/billing" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <Billing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
