import { NavLink, useLocation } from 'react-router-dom';
import { Home, MessageCircle, BookOpen, Activity, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/assistant', icon: MessageCircle, label: 'Assistant' },
  { path: '/guide', icon: BookOpen, label: 'Guide' },
  { path: '/checker', icon: Activity, label: 'Checker' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full py-2 px-1 transition-all duration-200 touch-target",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                isActive && "bg-primary/10"
              )}>
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "transition-transform duration-200",
                    isActive && "scale-110"
                  )}
                />
              </div>
              <span className={cn(
                "text-[10px] font-medium mt-0.5 transition-all duration-200",
                isActive ? "opacity-100" : "opacity-70"
              )}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
