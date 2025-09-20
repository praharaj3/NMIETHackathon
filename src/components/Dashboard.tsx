import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  MessageSquare, 
  Brain, 
  Briefcase, 
  Heart, 
  TrendingUp, 
  Clock, 
  Users, 
  Target,
  Calendar,
  Award,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useApp } from '../App';

interface DashboardStats {
  chatMessages: number;
  meditationMinutes: number;
  careerSteps: number;
  moodEntries: number;
  streakDays: number;
  communityRank: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  urgent?: boolean;
}

export function Dashboard() {
  const { user } = useApp();
  const [stats, setStats] = useState<DashboardStats>({
    chatMessages: 0,
    meditationMinutes: 0,
    careerSteps: 0,
    moodEntries: 0,
    streakDays: 0,
    communityRank: 'Bronze'
  });

  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [wellnessScore, setWellnessScore] = useState(72);

  useEffect(() => {
    // Simulate loading user stats
    const loadStats = async () => {
      // In a real app, this would fetch from backend
      setStats({
        chatMessages: Math.floor(Math.random() * 50) + 10,
        meditationMinutes: Math.floor(Math.random() * 200) + 50,
        careerSteps: Math.floor(Math.random() * 8) + 2,
        moodEntries: Math.floor(Math.random() * 15) + 5,
        streakDays: Math.floor(Math.random() * 10) + 1,
        communityRank: ['Bronze', 'Silver', 'Gold'][Math.floor(Math.random() * 3)]
      });

      // Generate personalized quick actions
      const actions: QuickAction[] = [
        {
          id: '1',
          title: 'Daily Check-in',
          description: 'How are you feeling today?',
          icon: <Heart className="h-4 w-4" />,
          action: 'mood'
        },
        {
          id: '2',
          title: 'Join Support Chat',
          description: '12 people online now',
          icon: <MessageSquare className="h-4 w-4" />,
          action: 'chat'
        },
        {
          id: '3',
          title: '5-min Pranayama',
          description: 'Quick stress relief',
          icon: <Brain className="h-4 w-4" />,
          action: 'meditation'
        },
        {
          id: '4',
          title: 'Career Guidance',
          description: 'Explore opportunities in India',
          icon: <Briefcase className="h-4 w-4" />,
          action: 'career'
        }
      ];

      // Add urgent actions based on conditions
      if (Math.random() > 0.7) {
        actions.unshift({
          id: 'urgent',
          title: 'Wellness Check',
          description: 'You seem stressed lately. Talk to someone?',
          icon: <Zap className="h-4 w-4" />,
          action: 'resources',
          urgent: true
        });
      }

      setQuickActions(actions);
    };

    loadStats();
  }, []);

  const getDaysJoined = () => {
    if (!user?.joinedAt) return 0;
    const joined = new Date(user.joinedAt);
    const now = new Date();
    return Math.floor((now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getWellnessColor = () => {
    if (wellnessScore >= 80) return 'text-green-600';
    if (wellnessScore >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRankIcon = () => {
    switch (stats.communityRank) {
      case 'Gold': return '🥇';
      case 'Silver': return '🥈';
      case 'Bronze': return '🥉';
      default: return '🏅';
    }
  };

  return (
    <div className="h-full space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Namaste, {user?.alias}</h2>
          <p className="text-muted-foreground">
            Day {getDaysJoined() + 1} of your wellness journey • {stats.streakDays} day streak 🔥
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          {getRankIcon()} {stats.communityRank} Member
        </Badge>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card 
              key={action.id} 
              className={`cursor-pointer transition-all hover:shadow-md hover:scale-105 ${
                action.urgent ? 'border-destructive bg-destructive/5' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-md ${
                    action.urgent ? 'bg-destructive/10' : 'bg-primary/10'
                  }`}>
                    {action.icon}
                  </div>
                  {action.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-1">{action.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {action.description}
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  <ArrowRight className="h-3 w-3 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.chatMessages}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(stats.chatMessages * 0.2)} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meditation Time</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.meditationMinutes}m</div>
            <p className="text-xs text-muted-foreground">
              {Math.floor(stats.meditationMinutes / 7)} min/day average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Progress</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.careerSteps}/10</div>
            <p className="text-xs text-muted-foreground">
              Steps completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Entries</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.moodEntries}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Wellness Score and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Wellness Score
            </CardTitle>
            <CardDescription>
              Based on your activity and check-ins
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getWellnessColor()}`}>
                {wellnessScore}
              </div>
              <p className="text-sm text-muted-foreground">out of 100</p>
            </div>
            <Progress value={wellnessScore} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Needs attention</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your engagement this week
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Chat participation</span>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Meditation streak</span>
                <Badge variant="outline">{stats.streakDays} days</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Career milestones</span>
                <Badge variant="outline">On track</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mood tracking</span>
                <Badge variant="outline">Regular</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Highlights
          </CardTitle>
          <CardDescription>
            What's happening in your support network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <p className="text-sm text-muted-foreground">Active members across India</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">2,834</div>
              <p className="text-sm text-muted-foreground">Support messages today</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">92%</div>
              <p className="text-sm text-muted-foreground">Positive wellness impact</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}