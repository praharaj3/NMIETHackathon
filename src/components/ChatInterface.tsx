import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Send, Flag, Users, Shield } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface User {
  token: string;
  alias: string;
}

interface Message {
  id: string;
  alias: string;
  text: string;
  timestamp: string;
  flagged?: boolean;
}

interface ChatInterfaceProps {
  user: User;
}

export function ChatInterface({ user }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // Simulate initial messages and online users
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        alias: 'CalmTiger',
        text: 'Been feeling overwhelmed with JEE prep and family pressure. Anyone else dealing with exam stress?',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
      },
      {
        id: '2',
        alias: 'WiseLotus',
        text: 'I understand completely. The pressure is real. Have you tried the meditation exercises? They really helped me during my boards.',
        timestamp: new Date(Date.now() - 900000).toISOString(),
      },
      {
        id: '3',
        alias: 'GentleElephant',
        text: 'Work stress in IT is getting to me. 12-hour days and toxic manager. Feeling burnout.',
        timestamp: new Date(Date.now() - 600000).toISOString(),
      },
      {
        id: '4',
        alias: 'KindPeacock',
        text: 'Remember everyone - we\'re all here for each other. No judgment, just support. Mental health matters! 💙',
        timestamp: new Date(Date.now() - 300000).toISOString(),
      },
    ];

    setMessages(initialMessages);
    setOnlineUsers(['CalmTiger', 'WiseLotus', 'GentleElephant', 'KindPeacock', 'PeacefulDeer', user.alias]);
  }, [user.alias]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      alias: user.alias,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate responses
    setTimeout(() => {
      const responses = [
        'Thank you for sharing. You\'re not alone in this journey.',
        'Sending support your way. Take it one step at a time.',
        'Have you considered checking out the career resources here?',
        'That takes courage to share. We\'re here for you always.',
        'Similar experience here. Feel free to chat more if you need.',
        'Mental health is important. Have you tried talking to a counselor?',
        'Study stress is real. Don\'t be hard on yourself.',
      ];
      
      const aliases = ['SupportiveSwn', 'KindFalcon', 'GentleTiger', 'WarmOwl', 'CaringDove', 'CompassionateLion'];
      const randomAlias = aliases[Math.floor(Math.random() * aliases.length)];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      if (Math.random() > 0.3) { // 70% chance of getting a response
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          alias: randomAlias,
          text: randomResponse,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, responseMessage]);
      }
    }, 2000 + Math.random() * 3000);
  };

  const handleReport = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, flagged: true } : msg
      )
    );
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-full flex gap-4">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Support Chat</h3>
            <p className="text-sm text-muted-foreground">
              Safe space for peer support - students, professionals, and everyone
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {onlineUsers.length} online
          </Badge>
        </div>

        <Alert className="mb-4">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            This is a peer support space. For crisis situations, please contact AASRA: +91 9152987821 or National Health Helpline: 104 immediately.
          </AlertDescription>
        </Alert>

        {/* Messages */}
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.alias === user.alias
                        ? 'bg-primary text-primary-foreground ml-8'
                        : 'bg-muted mr-8'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">
                            {message.alias}
                          </span>
                          <span className="text-xs opacity-70">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.flagged && (
                            <Badge variant="destructive" className="text-xs">
                              Flagged
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      {message.alias !== user.alias && !message.flagged && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleReport(message.id)}
                          className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                        >
                          <Flag className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Input */}
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Type your message... (Remember: be supportive and respectful)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Online Users Sidebar */}
      <Card className="w-64">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="h-4 w-4" />
            Online Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {onlineUsers.map((alias) => (
            <div
              key={alias}
              className={`flex items-center gap-2 p-2 rounded text-sm ${
                alias === user.alias ? 'bg-primary/10' : ''
              }`}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={alias === user.alias ? 'font-medium' : ''}>
                {alias} {alias === user.alias && '(you)'}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}