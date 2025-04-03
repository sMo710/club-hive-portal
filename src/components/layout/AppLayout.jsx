
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  HelpCircle, 
  Home, 
  LogOut, 
  Menu, 
  MessageCircle, 
  Settings, 
  Shield, 
  Users 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

type SidebarItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  role?: 'admin' | 'student' | 'all';
};

const navItems: SidebarItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: Home, role: 'all' },
  { title: 'Events', path: '/events', icon: Calendar, role: 'all' },
  { title: 'Clubs', path: '/clubs', icon: Users, role: 'all' },
  { title: 'Announcements', path: '/announcements', icon: MessageCircle, role: 'all' },
  { title: 'Leaderboard', path: '/leaderboard', icon: BarChart3, role: 'all' },
  { title: 'Achievements', path: '/achievements', icon: Flag, role: 'all' },
  { title: 'Approvals', path: '/approvals', icon: Shield, role: 'admin' },
  { title: 'Settings', path: '/settings', icon: Settings, role: 'all' },
  { title: 'Help', path: '/help', icon: HelpCircle, role: 'all' },
];

const AppLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col h-full bg-sidebar transition-all duration-300 border-r border-border",
          collapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between p-4 h-16">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">CH</span>
              </div>
              <span className="font-bold text-lg">ClubHive</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn("rounded-full", collapsed && "mx-auto")}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <Separator />

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems
              .filter(
                item =>
                  item.role === 'all' ||
                  item.role === user.role
              )
              .map(item => (
                <li key={item.path}>
                  <Button
                    variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                    className={cn(
                      "w-full justify-start",
                      collapsed ? "px-2" : "px-4"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className={cn("h-5 w-5", collapsed && "mx-auto")} />
                    {!collapsed && (
                      <span className="ml-3">{item.title}</span>
                    )}
                  </Button>
                </li>
              ))}
          </ul>
        </nav>

        {/* User profile section */}
        <div className="p-4 border-t border-border">
          <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
            {!collapsed ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-muted-foreground text-xs capitalize">{user.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
              >
                <LogOut size={18} />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="h-16 border-b border-border flex items-center px-6 bg-background/80 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </Button>
          <div className="flex items-center ml-auto gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="rounded-full"
            >
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
