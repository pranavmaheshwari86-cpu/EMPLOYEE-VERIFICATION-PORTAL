import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, Briefcase, FileText, UserCircle, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Sidebar = () => {
  const { user, logout } = useAuthStore();

  const getLinks = () => {
    const base = [
      { name: 'Dashboard', path: `/${user?.role}/dashboard`, icon: LayoutDashboard },
    ];
    
    if (user?.role === 'employee') {
      return [
        ...base,
        { name: 'My Applications', path: '/employee/applications', icon: FileText },
        { name: 'Find Jobs', path: '/jobs', icon: Briefcase },
        { name: 'Profile', path: '/employee/profile', icon: UserCircle },
      ];
    }
    
    if (user?.role === 'employer') {
      return [
        ...base,
        { name: 'Manage Jobs', path: '/employer/jobs', icon: Briefcase },
        { name: 'Candidates', path: '/employer/candidates', icon: UserCircle },
        { name: 'Company Profile', path: '/employer/profile', icon: FileText },
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...base,
        { name: 'Users', path: '/admin/users', icon: UserCircle },
        { name: 'Verifications', path: '/admin/verifications', icon: FileText },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
      ];
    }

    return base;
  };

  const links = getLinks();

  return (
    <aside className="w-64 glass border-r border-white/5 h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-xl">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-wider text-gradient">AETHER</span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
          Menu
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary/15 text-primary font-medium' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center">
             {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
             ) : (
                <UserCircle className="w-6 h-6 text-gray-400" />
             )}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-gray-400 hover:bg-red-500/10 hover:text-red-500 w-full"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
