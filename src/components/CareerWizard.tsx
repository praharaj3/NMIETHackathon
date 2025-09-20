import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { ChevronRight, CheckCircle, ExternalLink, BookOpen, Briefcase } from 'lucide-react';

interface CareerRecommendation {
  career: string;
  match: number;
  why: string;
  nextSteps: string[];
  salary: string;
  growth: string;
  requiredTraining: string[];
}

export function CareerWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    education: '',
    skills: [] as string[],
    interests: '',
    timeline: '',
    location: '',
    salaryExpectation: '',
  });
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);

  const educationLevels = [
    '10th Pass',
    '12th Pass',
    'Diploma/ITI',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Professional Degree (CA/CS/Engineering)',
    'PhD/Research',
    'Other',
  ];

  const skillsOptions = [
    'Communication Skills',
    'Computer/IT Skills',
    'Sales & Marketing',
    'Teaching & Training',
    'Customer Service',
    'Data Analysis',
    'Project Management',
    'Technical/Engineering',
    'Creative/Design',
    'Financial Planning',
    'Healthcare/Medical',
    'Language Skills',
    'Digital Marketing',
    'Content Writing'
  ];

  const interests = [
    'Information Technology',
    'Healthcare & Medicine',
    'Education & Training',
    'Business & Entrepreneurship',
    'Government & Public Service',
    'Banking & Finance',
    'Media & Entertainment',
    'Agriculture & Food',
    'Manufacturing & Engineering',
    'Social Work & NGO',
    'Tourism & Hospitality',
    'Retail & E-commerce'
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const generateRecommendations = () => {
    // Indian job market-focused recommendation engine
    const recs: CareerRecommendation[] = [];

    // IT and Technology
    if (formData.skills.includes('Computer/IT Skills') || formData.interests === 'Information Technology') {
      recs.push({
        career: 'Software Developer',
        match: 92,
        why: 'Strong IT skills align with India\'s booming tech industry',
        nextSteps: [
          'Learn programming languages (Python, Java, JavaScript)',
          'Build portfolio projects on GitHub',
          'Apply to IT companies in Bangalore, Hyderabad, Pune'
        ],
        salary: '₹3-8 lakhs per annum',
        growth: 'High (25% growth projected)',
        requiredTraining: ['Programming Bootcamp', 'AWS/Cloud Certification', 'Full Stack Development']
      });
    }

    // Digital Marketing
    if (formData.skills.includes('Digital Marketing') || formData.skills.includes('Sales & Marketing')) {
      recs.push({
        career: 'Digital Marketing Specialist',
        match: 89,
        why: 'Digital marketing is expanding rapidly in Indian businesses',
        nextSteps: [
          'Get Google Ads and Analytics certification',
          'Create social media campaigns portfolio',
          'Apply to digital agencies or startups'
        ],
        salary: '₹2.5-6 lakhs per annum',
        growth: 'High (30% growth projected)',
        requiredTraining: ['Google Digital Marketing Course', 'Facebook Blueprint', 'SEO Certification']
      });
    }

    // Banking and Finance
    if (formData.interests === 'Banking & Finance' || formData.skills.includes('Financial Planning')) {
      recs.push({
        career: 'Banking Professional',
        match: 86,
        why: 'India\'s banking sector offers stable career opportunities',
        nextSteps: [
          'Prepare for IBPS or SBI bank exams',
          'Complete banking certification courses',
          'Apply to public and private sector banks'
        ],
        salary: '₹3-7 lakhs per annum',
        growth: 'Moderate (8% growth projected)',
        requiredTraining: ['JAIIB/CAIIB Certification', 'Banking Operations Course', 'Financial Planning Certification']
      });
    }

    // Teaching and Education
    if (formData.interests === 'Education & Training' || formData.skills.includes('Teaching & Training')) {
      recs.push({
        career: 'Educational Professional',
        match: 85,
        why: 'Education sector in India has diverse opportunities from teaching to EdTech',
        nextSteps: [
          'Complete B.Ed or teaching certification',
          'Apply to schools, colleges, or EdTech companies',
          'Consider online tutoring platforms'
        ],
        salary: '₹2-5 lakhs per annum',
        growth: 'Moderate (12% growth projected)',
        requiredTraining: ['B.Ed Degree', 'Teaching Methodology Course', 'Subject Matter Expertise']
      });
    }

    // Government Services
    if (formData.interests === 'Government & Public Service') {
      recs.push({
        career: 'Civil Services/Government Jobs',
        match: 88,
        why: 'Government jobs offer job security and social impact in India',
        nextSteps: [
          'Prepare for UPSC, SSC, or state PSC exams',
          'Join coaching institutes or online platforms',
          'Focus on current affairs and general knowledge'
        ],
        salary: '₹3.5-15 lakhs per annum',
        growth: 'Stable with regular promotions',
        requiredTraining: ['UPSC Preparation', 'Current Affairs', 'Public Administration']
      });
    }

    // Healthcare
    if (formData.interests === 'Healthcare & Medicine' || formData.skills.includes('Healthcare/Medical')) {
      recs.push({
        career: 'Healthcare Professional',
        match: 90,
        why: 'Healthcare sector is growing rapidly with government focus on health',
        nextSteps: [
          'Complete medical/nursing/paramedical courses',
          'Get relevant certifications and licenses',
          'Apply to hospitals, clinics, or healthcare startups'
        ],
        salary: '₹2.5-12 lakhs per annum',
        growth: 'High (20% growth projected)',
        requiredTraining: ['Medical/Nursing Degree', 'Specialized Certifications', 'Healthcare Management']
      });
    }

    // Business and Entrepreneurship
    if (formData.interests === 'Business & Entrepreneurship') {
      recs.push({
        career: 'Business Development/Entrepreneur',
        match: 84,
        why: 'India\'s startup ecosystem and business environment is thriving',
        nextSteps: [
          'Develop business plan and market research',
          'Apply to incubators like NASSCOM or TiE',
          'Consider MBA or business development roles'
        ],
        salary: '₹3-10+ lakhs per annum',
        growth: 'High with unlimited potential',
        requiredTraining: ['Business Development Course', 'Startup Incubation', 'Financial Management']
      });
    }

    // Default recommendation for fresh graduates
    if (recs.length === 0) {
      recs.push({
        career: 'Sales Executive',
        match: 75,
        why: 'Sales is a great entry point with high growth potential in Indian market',
        nextSteps: [
          'Develop communication and persuasion skills',
          'Apply to FMCG, telecom, or insurance companies',
          'Focus on relationship building and target achievement'
        ],
        salary: '₹2-4 lakhs per annum + incentives',
        growth: 'High (15% growth projected)',
        requiredTraining: ['Sales Training', 'Customer Relationship Management', 'Product Knowledge']
      });
    }

    setRecommendations(recs.sort((a, b) => b.match - a.match));
    setCurrentStep(4);
  };

  const steps = [
    { number: 1, title: 'Education Background' },
    { number: 2, title: 'Skills & Experience' },
    { number: 3, title: 'Career Preferences' },
    { number: 4, title: 'Recommendations' },
  ];

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="h-full">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Career Guidance Assistant</h3>
        <p className="text-sm text-muted-foreground">
          Personalized career recommendations based on the Indian job market and your profile
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step.number <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.number < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
              )}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          {steps.map((step) => (
            <span key={step.number}>{step.title}</span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && 'Education Background'}
            {currentStep === 2 && 'Skills & Experience'}
            {currentStep === 3 && 'Career Preferences'}
            {currentStep === 4 && 'Your Career Recommendations'}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Tell us about your educational qualification'}
            {currentStep === 2 && 'What skills have you developed?'}
            {currentStep === 3 && 'What type of career interests you?'}
            {currentStep === 4 && 'Based on the Indian job market, here are your best career matches'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Education */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Highest Educational Qualification
                </label>
                <Select
                  value={formData.education}
                  onValueChange={(value: string) => setFormData(prev => ({ ...prev, education: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => setCurrentStep(2)}
                disabled={!formData.education}
                className="w-full"
              >
                Continue to Skills
              </Button>
            </div>
          )}

          {/* Step 2: Skills */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Select your skills (choose all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {skillsOptions.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={formData.skills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <label htmlFor={skill} className="text-sm">
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  disabled={formData.skills.length === 0}
                  className="flex-1"
                >
                  Continue to Preferences
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Career Interest Area
                </label>
                <Select
                  value={formData.interests}
                  onValueChange={(value: string) => setFormData(prev => ({ ...prev, interests: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your area of interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {interests.map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Job Search Timeline
                </label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value: string) => setFormData(prev => ({ ...prev, timeline: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="When are you planning to start working?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (0-2 months)</SelectItem>
                    <SelectItem value="short">Short term (2-6 months)</SelectItem>
                    <SelectItem value="medium">Medium term (6-12 months)</SelectItem>
                    <SelectItem value="long">Long term (1+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Preferred Work Location
                </label>
                <Select
                  value={formData.location}
                  onValueChange={(value: string) => setFormData(prev => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi NCR</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                    <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                    <SelectItem value="remote">Remote/Work from Home</SelectItem>
                    <SelectItem value="anywhere">Open to relocate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button 
                  onClick={generateRecommendations}
                  disabled={!formData.interests || !formData.timeline}
                  className="flex-1"
                >
                  Get Recommendations
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Recommendations */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          {rec.career}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {rec.why}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {rec.match}% match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Salary Range:</span> {rec.salary}
                      </div>
                      <div>
                        <span className="font-medium">Job Growth:</span> {rec.growth}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Next Steps
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {rec.nextSteps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        Recommended Training
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {rec.requiredTraining.map((training) => (
                          <Badge key={training} variant="outline" className="text-xs">
                            {training}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Find Training Resources
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentStep(1);
                  setRecommendations([]);
                  setFormData({
                    education: '',
                    skills: [],
                    interests: '',
                    timeline: '',
                    location: '',
                    salaryExpectation: '',
                  });
                }}
                className="w-full"
              >
                Start Over
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}