import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  Volume2, 
  Moon, 
  Globe, 
  Download, 
  Trash2,
  AlertTriangle,
  Lock,
  User,
  Palette
} from 'lucide-react';
import { useApp } from '../App';
import { toast } from 'sonner';

export function SettingsPanel() {
  const { user, updateUser, logout } = useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePreferenceChange = (key: keyof NonNullable<typeof user>['preferences'], value: boolean) => {
    if (!user) return;
    updateUser({
      preferences: {
        ...user.preferences,
        [key]: value
      }
    });
    toast.success('Preference updated');
  };

  const handleExportData = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const exportData = {
      alias: user?.alias,
      joinedAt: user?.joinedAt,
      preferences: user?.preferences,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anukampa-data-${user?.alias}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
    toast.success('Data exported successfully');
  };

  const handleDeleteAccount = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    // Clear all local data
    localStorage.clear();
    sessionStorage.clear();
    
    toast.success('Account data cleared. Take care! 💙');
    logout();
  };

  return (
    <div className="h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="text-muted-foreground">
            Manage your preferences and account settings
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Shield className="h-4 w-4" />
          Anonymous Account
        </Badge>
      </div>

      <div className="grid gap-6">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>
              Your anonymous account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alias">Alias</Label>
                <Input
                  id="alias"
                  value={user?.alias || ''}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your alias cannot be changed for security reasons
                </p>
              </div>
              <div>
                <Label htmlFor="joined">Joined</Label>
                <Input
                  id="joined"
                  value={user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : ''}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Customize your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>General Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about platform updates and community activity
                </p>
              </div>
              <Switch
                checked={user?.preferences.notifications || false}
                onCheckedChange={(checked: boolean) => handlePreferenceChange('notifications', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Crisis Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive immediate alerts for crisis intervention resources
                </p>
              </div>
              <Switch
                checked={user?.preferences.crisisAlerts || false}
                onCheckedChange={(checked: boolean) => handlePreferenceChange('crisisAlerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use dark theme for better viewing in low light
                </p>
              </div>
              <Switch
                checked={user?.preferences.darkMode || false}
                onCheckedChange={(checked: boolean) => handlePreferenceChange('darkMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your privacy and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Anonymous Account</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your account is completely anonymous. No personal information is stored or tracked.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">End-to-End Encryption</span>
              </div>
              <p className="text-xs text-muted-foreground">
                All your conversations and data are encrypted and secure.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">No Data Selling</span>
              </div>
              <p className="text-xs text-muted-foreground">
                We never sell your data or share it with third parties.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Export or delete your account data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Export Your Data</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Download a copy of your account information and preferences
              </p>
              <Button
                onClick={handleExportData}
                disabled={isExporting}
                variant="outline"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export Data'}
              </Button>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-destructive">Delete Account Data</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently clear all your local account data. This action cannot be undone.
              </p>
              <Button
                onClick={handleDeleteAccount}
                variant={showDeleteConfirm ? 'destructive' : 'outline'}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {showDeleteConfirm ? 'Confirm Delete All Data' : 'Clear Account Data'}
              </Button>
              {showDeleteConfirm && (
                <p className="text-xs text-destructive mt-2">
                  Click again to confirm permanent deletion of all local data
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Need Help?
            </CardTitle>
            <CardDescription>
              Access support resources and emergency contacts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Crisis Resources
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency: Call 988
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}