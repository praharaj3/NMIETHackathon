import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Play, Pause, RotateCcw, Clock, Star } from 'lucide-react';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
}

export function MeditationSection() {
  const [currentMeditation, setCurrentMeditation] = useState<Meditation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const meditations: Meditation[] = [
    {
      id: 'm1',
      title: '2-Minute Pranayama Reset',
      description: 'Traditional breathing exercise to center yourself during stressful moments.',
      duration: '2:00',
      category: 'Stress Relief',
      difficulty: 'Beginner',
      rating: 4.8,
    },
    {
      id: 'm2',
      title: '5-Minute Mindful Grounding',
      description: 'Connect with the present moment using ancient Indian mindfulness techniques.',
      duration: '5:00',
      category: 'Anxiety',
      difficulty: 'Beginner',
      rating: 4.9,
    },
    {
      id: 'm3',
      title: '10-Minute Yoga Nidra',
      description: 'Body scan meditation from yogic tradition for deep relaxation and better sleep.',
      duration: '10:00',
      category: 'Sleep',
      difficulty: 'Intermediate',
      rating: 4.7,
    },
    {
      id: 'm4',
      title: '15-Minute Exam Stress Relief',
      description: 'Specialized meditation for students dealing with academic pressure and anxiety.',
      duration: '15:00',
      category: 'Student Support',
      difficulty: 'Intermediate',
      rating: 4.6,
    },
    {
      id: 'm5',
      title: '20-Minute Vipassana Practice',
      description: 'Extended mindfulness practice for developing deeper awareness and inner peace.',
      duration: '20:00',
      category: 'Mindfulness',
      difficulty: 'Advanced',
      rating: 4.8,
    },
    {
      id: 'm6',
      title: 'Work-Life Balance Meditation',
      description: 'Guided meditation for professionals dealing with workplace stress and burnout.',
      duration: '12:00',
      category: 'Work Stress',
      difficulty: 'Intermediate',
      rating: 4.9,
    },
    {
      id: 'm7',
      title: 'Family Pressure Relief',
      description: 'Meditation for dealing with family expectations and societal pressures.',
      duration: '8:00',
      category: 'Family & Social',
      difficulty: 'Beginner',
      rating: 4.7,
    },
    {
      id: 'm8',
      title: 'Career Transition Support',
      description: 'Guided meditation for those navigating career changes and job searches.',
      duration: '15:00',
      category: 'Career',
      difficulty: 'Intermediate',
      rating: 4.8,
    },
  ];

  const categories = [...new Set(meditations.map(m => m.category))];

  const startMeditation = (meditation: Meditation) => {
    setCurrentMeditation(meditation);
    setIsPlaying(true);
    setProgress(0);
    const totalSeconds = parseDuration(meditation.duration);
    setTimeLeft(totalSeconds);

    // Simulate meditation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / totalSeconds);
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        setTimeLeft(totalSeconds - Math.floor((newProgress / 100) * totalSeconds));
        return newProgress;
      });
    }, 1000);
  };

  const pauseMeditation = () => {
    setIsPlaying(!isPlaying);
  };

  const resetMeditation = () => {
    setIsPlaying(false);
    setProgress(0);
    if (currentMeditation) {
      setTimeLeft(parseDuration(currentMeditation.duration));
    }
  };

  const parseDuration = (duration: string): number => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + (seconds || 0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Meditation & Mindfulness</h3>
        <p className="text-sm text-muted-foreground">
          Ancient Indian wisdom meets modern mental health - practices for students, professionals, and everyone
        </p>
      </div>

      {/* Current Meditation Player */}
      {currentMeditation && (
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{currentMeditation.title}</CardTitle>
                <CardDescription>{currentMeditation.description}</CardDescription>
              </div>
              <Badge className={getDifficultyColor(currentMeditation.difficulty)}>
                {currentMeditation.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={pauseMeditation}
                variant="outline"
                size="sm"
                className="w-16"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                onClick={resetMeditation}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatTime(timeLeft)} remaining
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0:00</span>
                <span>{currentMeditation.duration}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <Badge key={category} variant="outline" className="cursor-pointer hover:bg-muted">
            {category}
          </Badge>
        ))}
      </div>

      {/* Meditation List */}
      <div className="grid gap-4 md:grid-cols-2">
        {meditations.map((meditation) => (
          <Card key={meditation.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">{meditation.title}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {meditation.description}
                  </CardDescription>
                </div>
                <Badge className={getDifficultyColor(meditation.difficulty)}>
                  {meditation.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {meditation.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {meditation.rating}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {meditation.category}
                  </Badge>
                </div>
                <Button
                  onClick={() => startMeditation(meditation)}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Play className="h-3 w-3" />
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Helpful Tips */}
      <Card className="mt-6 bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">Meditation Tips for Indian Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Start with shorter sessions (2-5 minutes) and gradually increase</p>
          <p>• Practice at the same time daily - early morning is ideal in Indian tradition</p>
          <p>• Use meditation before exams, job interviews, or stressful family situations</p>
          <p>• Remember: meditation is an ancient Indian practice that improves with consistency</p>
          <p>• Create a quiet space at home, even if it's just a corner with minimal distractions</p>
          <p>• Combine with light pranayama (breathing exercises) for better results</p>
        </CardContent>
      </Card>
    </div>
  );
}