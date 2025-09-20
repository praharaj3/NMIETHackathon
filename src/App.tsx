import { useState, useEffect, createContext, useContext } from 'react';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';
import { MeditationSection } from './components/MeditationSection';
import { CareerWizard } from './components/CareerWizard';
import { ResourceCenter } from './components/ResourceCenter';
import { MoodTracker } from './components/MoodTracker';
import { SettingsPanel } from './components/SettingsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { 
  Heart, 
  MessageSquare, 
  Brain, 
  Briefcase, 
  BarChart3, 
  BookOpen, 
  Smile, 
  Settings, 
  Moon, 
  Sun,
  Bell,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  token: string;
  alias: string;
  joinedAt: string;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
    crisisAlerts: boolean;
  };
}

interface AppContextType {
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      // Check for stored session
      const stored = localStorage.getItem('rtatr_session');
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          setUser(userData);
          setDarkMode(userData.preferences?.darkMode || false);
        } catch (e) {
          localStorage.removeItem('rtatr_session');
        }
      }

      // Check system dark mode preference
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (!stored) {
        setDarkMode(systemDarkMode);
      }

      setIsLoading(false);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (userData: Omit<User, 'joinedAt' | 'preferences'>) => {
    const newUser: User = {
      ...userData,
      joinedAt: new Date().toISOString(),
      preferences: {
        darkMode: darkMode,
        notifications: true,
        crisisAlerts: true,
      }
    };
    setUser(newUser);
    localStorage.setItem('rtatr_session', JSON.stringify(newUser));
    toast.success(`Welcome back, ${userData.alias}! 👋`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rtatr_session');
    setActiveTab('dashboard');
    toast.info('You have been disconnected. Take care! 💙');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('rtatr_session', JSON.stringify(updatedUser));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (user) {
      updateUser({
        preferences: { ...user.preferences, darkMode: newDarkMode }
      });
    }
    toast.success(`Switched to ${newDarkMode ? 'dark' : 'light'} mode`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Heart className="h-12 w-12 text-primary mx-auto animate-pulse" />
          <p className="text-muted-foreground">Loading Sahayata...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <AuthPage onLogin={handleLogin} />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  const contextValue: AppContextType = {
    user,
    updateUser,
    logout: handleLogout
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  <h1 className="text-xl font-medium">Sahayata</h1>
                </div>
                <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                  Mental Wellness Platform for India
                </Badge>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Quick Actions */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  onClick={() => setActiveTab('dashboard')}
                >
                  <Bell className="h-4 w-4" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {/* Crisis Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setActiveTab('resources');
                    toast.error('Crisis resources available. You are not alone. 🆘');
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Crisis Help</span>
                </Button>

                {/* User Info */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground hidden md:inline">
                    <span className="text-foreground font-medium">{user.alias}</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-xs"
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <Card className="min-h-[700px]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <div className="border-b px-6 py-4">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 max-w-full">
                  <TabsTrigger value="dashboard" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Support Chat</span>
                  </TabsTrigger>
                  <TabsTrigger value="meditation" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span className="hidden sm:inline">Meditation</span>
                  </TabsTrigger>
                  <TabsTrigger value="career" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Career</span>
                  </TabsTrigger>
                  <TabsTrigger value="mood" className="flex items-center gap-2">
                    <Smile className="h-4 w-4" />
                    <span className="hidden sm:inline">Mood</span>
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Resources</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6 h-[calc(100%-80px)]">
                <TabsContent value="dashboard" className="h-full m-0">
                  <Dashboard />
                </TabsContent>

                <TabsContent value="chat" className="h-full m-0">
                  <ChatInterface user={user} />
                </TabsContent>

                <TabsContent value="meditation" className="h-full m-0">
                  <MeditationSection />
                </TabsContent>

                <TabsContent value="career" className="h-full m-0">
                  <CareerWizard />
                </TabsContent>

                <TabsContent value="mood" className="h-full m-0">
                  <MoodTracker />
                </TabsContent>

                <TabsContent value="resources" className="h-full m-0">
                  <ResourceCenter />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/30 py-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="text-center md:text-left">
                <p className="font-medium text-foreground">
                  Sahayata - Mental Wellness Support Platform
                </p>
                <p>Anonymous support for students, professionals, and everyone in India</p>
              </div>
              <div className="text-center md:text-right space-y-1">
                <p>Privacy-first • End-to-end encrypted • Available 24/7</p>
                <p className="font-medium text-destructive">
                  Crisis? Call 9152987821 (AASRA) or 104 (National Health Helpline)
                </p>
              </div>
            </div>
          </div>
        </footer>

        <Toaster richColors position="top-right" />
      </div>
    </AppContext.Provider>
  );
}