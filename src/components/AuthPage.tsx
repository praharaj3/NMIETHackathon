import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Heart, Shield, Users, Lock } from 'lucide-react';
import { Badge } from './ui/badge';

interface User {
  token: string;
  alias: string;
}

interface AuthPageProps {
  onLogin: (user: User) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [alias, setAlias] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const generateAlias = () => {
    const adjectives = ['Brave', 'Strong', 'Calm', 'Wise', 'Kind', 'Bold', 'Gentle', 'Steady', 'Peaceful', 'Hopeful'];
    const animals = ['Tiger', 'Elephant', 'Peacock', 'Eagle', 'Lotus', 'Falcon', 'Lion', 'Deer', 'Swan', 'Owl'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    return `${randomAdj}${randomAnimal}`;
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const finalAlias = alias.trim() || generateAlias();
    const token = `tok_${Math.random().toString(36).substr(2, 16)}`;
    
    onLogin({ token, alias: finalAlias });
    setIsConnecting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Welcome Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-medium">Sahayata</h1>
              <p className="text-muted-foreground">Mental Wellness Platform for India</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl">Safe Space for Mental Wellness in India</h2>
            <p className="text-muted-foreground leading-relaxed">
              Connect anonymously with peers who understand your challenges. Share, support, 
              and find resources in a judgment-free environment designed for the Indian community - 
              students, professionals, and everyone seeking mental health support.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Completely anonymous - no personal data required</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-sm">End-to-end encrypted conversations</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm">Peer support from fellow Indians</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Crisis Support</Badge>
            <Badge variant="outline">Career Guidance</Badge>
            <Badge variant="outline">Meditation Resources</Badge>
            <Badge variant="outline">Student Support</Badge>
            <Badge variant="outline">Work Stress</Badge>
            <Badge variant="outline">Peer Chat</Badge>
          </div>
        </div>

        {/* Login Section */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Join Anonymously</CardTitle>
            <CardDescription>
              Choose an alias to connect with the community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="alias" className="text-sm">
                Your Alias (optional)
              </label>
              <Input
                id="alias"
                placeholder="e.g., CalmTiger, WiseLotus..."
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleConnect()}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank for a randomly generated alias
              </p>
            </div>

            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? 'Connecting...' : 'Connect Anonymously'}
            </Button>

            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>By connecting, you agree to our community guidelines</p>
              <p className="text-destructive">
                Crisis? Call 9152987821 (AASRA) or 104 (National Health Helpline)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}