import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Phone, 
  Shield, 
  Search, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Heart, 
  Users, 
  FileText, 
  Briefcase,
  Home,
  DollarSign,
  Stethoscope,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'hotline' | 'website' | 'local' | 'document';
  contact?: string;
  website?: string;
  location?: string;
  hours?: string;
  urgent?: boolean;
}

export function ResourceCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('crisis');

  const crisisResources: Resource[] = [
    {
      id: 'c1',
      title: 'AASRA Suicide Prevention',
      description: '24/7 emotional support for those in distress. Confidential and free.',
      category: 'crisis',
      type: 'hotline',
      contact: '+91 9152987821',
      website: 'http://www.aasra.info/',
      urgent: true
    },
    {
      id: 'c2',
      title: 'National Health Helpline',
      description: 'Government helpline for health emergencies and mental health support.',
      category: 'crisis',
      type: 'hotline',
      contact: '104',
      urgent: true
    },
    {
      id: 'c3',
      title: 'Vandrevala Foundation',
      description: '24/7 free mental health helpline providing crisis intervention and emotional support.',
      category: 'crisis',
      type: 'hotline',
      contact: '+91 9999 666 555',
      website: 'https://www.vandrevalafoundation.com/',
      urgent: true
    },
    {
      id: 'c4',
      title: 'Fortis Stress Helpline',
      description: 'Mental health support and counselling for stress and depression.',
      category: 'crisis',
      type: 'hotline',
      contact: '+91 8376804102',
      urgent: true
    },
    {
      id: 'c5',
      title: 'Sneha Foundation',
      description: 'Chennai-based suicide prevention centre with 24/7 emotional support.',
      category: 'crisis',
      type: 'hotline',
      contact: '+91 44 2464 0050',
      website: 'http://snehaindia.org/',
      location: 'Chennai'
    }
  ];

  const mentalHealthResources: Resource[] = [
    {
      id: 'm1',
      title: 'Mind Matters - Apollo Hospitals',
      description: 'Comprehensive mental health services across India with expert psychiatrists.',
      category: 'mental-health',
      type: 'website',
      website: 'https://www.apollohospitals.com/',
      contact: '+91 1860 500 1066'
    },
    {
      id: 'm2',
      title: 'Mann Talks',
      description: 'Mental health awareness and counselling services across India.',
      category: 'mental-health',
      type: 'website',
      website: 'https://manntalks.org/',
      contact: '+91 8686139139'
    },
    {
      id: 'm3',
      title: 'iCALL Psychosocial Helpline',
      description: 'TISS-based counselling helpline for mental health support.',
      category: 'mental-health',
      type: 'hotline',
      contact: '+91 9152987821',
      hours: 'Monday-Saturday, 8:00 AM - 10:00 PM'
    },
    {
      id: 'm4',
      title: 'Parivarthan Counselling',
      description: 'Professional counselling services for individuals and families.',
      category: 'mental-health',
      type: 'website',
      website: 'https://parivarthan.org/',
      contact: '+91 76760 60602'
    },
    {
      id: 'm5',
      title: 'NIMHANS',
      description: 'National Institute of Mental Health and Neuro Sciences, Bangalore.',
      category: 'mental-health',
      type: 'website',
      website: 'https://nimhans.ac.in/',
      contact: '+91 80 2699 5000',
      location: 'Bangalore'
    }
  ];

  const careerResources: Resource[] = [
    {
      id: 'cr1',
      title: 'NSDC - Skill Development',
      description: 'National Skill Development Corporation for vocational training and employment.',
      category: 'career',
      type: 'website',
      website: 'https://nsdcindia.org/',
      contact: '+91 11 4053 5555'
    },
    {
      id: 'cr2',
      title: 'PMKVY - Pradhan Mantri Kaushal Vikas Yojana',
      description: 'Government scheme for skill development and employment assistance.',
      category: 'career',
      type: 'website',
      website: 'https://pmkvyofficial.org/'
    },
    {
      id: 'cr3',
      title: 'Rozgar Mela - Employment Exchange',
      description: 'Government employment exchanges and job placement services.',
      category: 'career',
      type: 'local',
      website: 'https://employmentexchange.gov.in/'
    },
    {
      id: 'cr4',
      title: 'Naukri.com Career Services',
      description: 'Career guidance, resume building, and job search assistance.',
      category: 'career',
      type: 'website',
      website: 'https://www.naukri.com/career-guidance'
    },
    {
      id: 'cr5',
      title: 'LinkedIn Learning India',
      description: 'Professional development courses and career advancement resources.',
      category: 'career',
      type: 'website',
      website: 'https://www.linkedin.com/learning/'
    },
    {
      id: 'cr6',
      title: 'Startup India Initiative',
      description: 'Government support for entrepreneurs and startup ecosystem.',
      category: 'career',
      type: 'website',
      website: 'https://www.startupindia.gov.in/'
    }
  ];

  const studentResources: Resource[] = [
    {
      id: 'st1',
      title: 'Student Helpline - UGC',
      description: 'University Grants Commission helpline for student grievances and support.',
      category: 'student',
      type: 'hotline',
      contact: '+91 8800 201 3666',
      website: 'https://www.ugc.ac.in/'
    },
    {
      id: 'st2',
      title: 'CBSE Student Helpline',
      description: 'Central Board of Secondary Education support for students and parents.',
      category: 'student',
      type: 'hotline',
      contact: '+91 11 2356 7673',
      website: 'https://cbse.gov.in/'
    },
    {
      id: 'st3',
      title: 'YourDOST - Student Counselling',
      description: 'Online counselling and emotional support platform for students.',
      category: 'student',
      type: 'website',
      website: 'https://yourdost.com/',
      contact: '+91 8080 500 555'
    },
    {
      id: 'st4',
      title: 'MIT World Peace University Counselling',
      description: 'Student counselling services and mental health support.',
      category: 'student',
      type: 'website',
      website: 'https://mitwpu.edu.in/'
    },
    {
      id: 'st5',
      title: 'National Scholarship Portal',
      description: 'Government scholarships and financial assistance for students.',
      category: 'student',
      type: 'website',
      website: 'https://scholarships.gov.in/'
    },
    {
      id: 'st6',
      title: 'Exam Stress Helpline',
      description: 'Specialized support for students dealing with exam anxiety and academic pressure.',
      category: 'student',
      type: 'hotline',
      contact: '+91 92 2020 2020'
    }
  ];

  const allResources = [
    ...crisisResources,
    ...mentalHealthResources,
    ...careerResources,
    ...studentResources
  ];

  const getResourcesByCategory = () => {
    switch (selectedCategory) {
      case 'crisis': return crisisResources;
      case 'mental-health': return mentalHealthResources;
      case 'career': return careerResources;
      case 'student': return studentResources;
      default: return allResources;
    }
  };

  const filteredResources = getResourcesByCategory().filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'hotline': return <Phone className="h-4 w-4" />;
      case 'website': return <ExternalLink className="h-4 w-4" />;
      case 'local': return <MapPin className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crisis': return <AlertTriangle className="h-4 w-4" />;
      case 'mental-health': return <Stethoscope className="h-4 w-4" />;
      case 'career': return <Briefcase className="h-4 w-4" />;
      case 'student': return <GraduationCap className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Resource Center</h2>
          <p className="text-muted-foreground">
            Support services and resources for mental health and wellness in India
          </p>
        </div>
      </div>

      {/* Crisis Alert */}
      <Alert className="border-destructive bg-destructive/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <span className="font-medium">In Crisis?</span> Call +91 9152987821 (AASRA) or 
          104 (National Health Helpline). Help is available 24/7.
        </AlertDescription>
      </Alert>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crisis" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Crisis Support
          </TabsTrigger>
          <TabsTrigger value="mental-health" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Mental Health
          </TabsTrigger>
          <TabsTrigger value="career" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Career
          </TabsTrigger>
          <TabsTrigger value="student" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Student Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className={resource.urgent ? 'border-destructive' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${
                        resource.urgent ? 'bg-destructive/10' : 'bg-primary/10'
                      }`}>
                        {getResourceIcon(resource.type)}
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {resource.title}
                          {resource.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Emergency
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {resource.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(resource.category)}
                      {resource.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm">
                    {resource.contact && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{resource.contact}</span>
                      </div>
                    )}
                    {resource.hours && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{resource.hours}</span>
                      </div>
                    )}
                    {resource.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{resource.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {resource.contact && resource.type === 'hotline' && (
                      <Button 
                        variant={resource.urgent ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => window.open(`tel:${resource.contact}`)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call Now
                      </Button>
                    )}
                    {resource.website && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(resource.website, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit Website
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">24/7</div>
            <p className="text-sm text-muted-foreground">Crisis Support</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{allResources.length}</div>
            <p className="text-sm text-muted-foreground">Total Resources</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">100%</div>
            <p className="text-sm text-muted-foreground">Free Services</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">∞</div>
            <p className="text-sm text-muted-foreground">Anonymous Access</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}