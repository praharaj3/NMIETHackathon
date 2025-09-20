import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Calendar } from './ui/calendar';
import { 
  Smile, 
  Frown, 
  Meh, 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  Calendar as CalendarIcon, 
  BarChart3,
  CheckCircle,
  Clock,
  Zap,
  Moon,
  Sunrise,
  Sunset
} from 'lucide-react';
import { toast } from 'sonner';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  energy: number;
  sleep: number;
  stress: number;
  note?: string;
  tags: string[];
}

interface MoodStats {
  average: number;
  trend: 'up' | 'down' | 'stable';
  streakDays: number;
  bestDay: string;
  worstDay: string;
}

export function MoodTracker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todayEntry, setTodayEntry] = useState<Partial<MoodEntry>>({
    mood: 5,
    energy: 5,
    sleep: 5,
    stress: 5,
    note: '',
    tags: []
  });
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [stats, setStats] = useState<MoodStats>({
    average: 7.2,
    trend: 'up',
    streakDays: 5,
    bestDay: 'Monday',
    worstDay: 'Thursday'
  });
  const [hasEntryToday, setHasEntryToday] = useState(false);

  const moodEmojis = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'text-red-500' },
    { value: 2, emoji: '😟', label: 'Sad', color: 'text-red-400' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'text-gray-500' },
    { value: 4, emoji: '🙂', label: 'Okay', color: 'text-yellow-500' },
    { value: 5, emoji: '😊', label: 'Good', color: 'text-green-400' },
    { value: 6, emoji: '😄', label: 'Happy', color: 'text-green-500' },
    { value: 7, emoji: '😁', label: 'Very Happy', color: 'text-green-600' },
    { value: 8, emoji: '🤩', label: 'Excited', color: 'text-blue-500' },
    { value: 9, emoji: '🥳', label: 'Ecstatic', color: 'text-purple-500' },
    { value: 10, emoji: '🌟', label: 'Fantastic', color: 'text-yellow-400' }
  ];

  const commonTags = [
    'Anxious', 'Peaceful', 'Overwhelmed', 'Grateful', 'Tired', 'Energetic',
    'Lonely', 'Social', 'Productive', 'Unmotivated', 'Hopeful', 'Worried'
  ];

  useEffect(() => {
    // Load existing entries (in real app, from backend)
    const sampleEntries: MoodEntry[] = [
      {
        id: '1',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        mood: 6,
        energy: 7,
        sleep: 5,
        stress: 4,
        note: 'Had a good chat with fellow veterans today. Feeling supported.',
        tags: ['Social', 'Grateful']
      },
      {
        id: '2',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        mood: 4,
        energy: 3,
        sleep: 3,
        stress: 7,
        note: 'Nightmares again. Difficult day.',
        tags: ['Tired', 'Anxious']
      }
    ];
    
    setEntries(sampleEntries);
    
    // Check if user has entry for today
    const today = new Date().toISOString().split('T')[0];
    const todayExists = sampleEntries.some(entry => entry.date === today);
    setHasEntryToday(todayExists);
  }, []);

  const saveMoodEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: today,
      mood: todayEntry.mood || 5,
      energy: todayEntry.energy || 5,
      sleep: todayEntry.sleep || 5,
      stress: todayEntry.stress || 5,
      note: todayEntry.note || '',
      tags: todayEntry.tags || []
    };

    setEntries(prev => {
      const filtered = prev.filter(entry => entry.date !== today);
      return [...filtered, newEntry].sort((a, b) => b.date.localeCompare(a.date));
    });

    setHasEntryToday(true);
    toast.success('Mood entry saved! Thanks for checking in. 💙');
  };

  const toggleTag = (tag: string) => {
    setTodayEntry(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  const getMoodEmoji = (mood: number) => {
    const moodData = moodEmojis.find(m => m.value === mood) || moodEmojis[4];
    return moodData.emoji;
  };

  const getMoodColor = (mood: number) => {
    const moodData = moodEmojis.find(m => m.value === mood) || moodEmojis[4];
    return moodData.color;
  };

  const getAverageForMetric = (metric: keyof Pick<MoodEntry, 'mood' | 'energy' | 'sleep' | 'stress'>) => {
    if (entries.length === 0) return 5;
    const sum = entries.reduce((acc, entry) => acc + entry[metric], 0);
    return sum / entries.length;
  };

  return (
    <div className="h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Mood Tracker</h2>
          <p className="text-muted-foreground">
            Track your daily wellness and identify patterns
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          {stats.streakDays} day streak
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Check-in */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smile className="h-5 w-5" />
                {hasEntryToday ? "Today's Entry" : "Daily Check-in"}
              </CardTitle>
              <CardDescription>
                {hasEntryToday 
                  ? "You've already checked in today. You can update your entry."
                  : "How are you feeling today? Take a moment to reflect."
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Scale */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Overall Mood (1-10)
                </label>
                <div className="grid grid-cols-10 gap-2">
                  {moodEmojis.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setTodayEntry(prev => ({ ...prev, mood: mood.value }))}
                      className={`p-2 rounded-lg border-2 transition-all text-2xl hover:scale-110 ${
                        todayEntry.mood === mood.value
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-muted-foreground'
                      }`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
                <div className="text-center mt-2">
                  <span className={`text-sm font-medium ${getMoodColor(todayEntry.mood || 5)}`}>
                    {moodEmojis.find(m => m.value === todayEntry.mood)?.label || 'Good'}
                  </span>
                </div>
              </div>

              {/* Other Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Energy Level
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={todayEntry.energy || 5}
                      onChange={(e) => setTodayEntry(prev => ({ ...prev, energy: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="text-center text-sm text-muted-foreground">
                      {todayEntry.energy || 5}/10
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Sleep Quality
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={todayEntry.sleep || 5}
                      onChange={(e) => setTodayEntry(prev => ({ ...prev, sleep: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="text-center text-sm text-muted-foreground">
                      {todayEntry.sleep || 5}/10
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Stress Level
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={todayEntry.stress || 5}
                      onChange={(e) => setTodayEntry(prev => ({ ...prev, stress: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="text-center text-sm text-muted-foreground">
                      {todayEntry.stress || 5}/10
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  How are you feeling? (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={todayEntry.tags?.includes(tag) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Notes (optional)
                </label>
                <Textarea
                  placeholder="Anything specific you'd like to remember about today?"
                  value={todayEntry.note || ''}
                  onChange={(e) => setTodayEntry(prev => ({ ...prev, note: e.target.value }))}
                  className="min-h-20"
                />
              </div>

              <Button onClick={saveMoodEntry} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                {hasEntryToday ? 'Update Entry' : 'Save Entry'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Calendar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Weekly Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {getAverageForMetric('mood')}
                  </div>
                  <p className="text-muted-foreground">Avg Mood</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.streakDays}
                  </div>
                  <p className="text-muted-foreground">Day Streak</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Energy</span>
                  <span>{getAverageForMetric('energy')}/10</span>
                </div>
                <Progress value={getAverageForMetric('energy') * 10} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sleep</span>
                  <span>{getAverageForMetric('sleep')}/10</span>
                </div>
                <Progress value={getAverageForMetric('sleep') * 10} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Stress</span>
                  <span>{getAverageForMetric('stress')}/10</span>
                </div>
                <Progress value={getAverageForMetric('stress') * 10} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Entry Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date: Date | undefined) => date && setSelectedDate(date)}
                className="rounded-md border w-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Entries
          </CardTitle>
          <CardDescription>
            Your mood tracking history
          </CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Smile className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No entries yet. Start tracking your mood today!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                      <span className={`text-sm ${getMoodColor(entry.mood)}`}>
                        Mood: {entry.mood}/10
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-muted-foreground">{entry.note}</p>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Energy: {entry.energy}/10</div>
                    <div>Sleep: {entry.sleep}/10</div>
                    <div>Stress: {entry.stress}/10</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}