
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Award, 
  Camera, 
  Key, 
  LogOut, 
  Mail, 
  Save, 
  Shield, 
  User,
  Users
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState('Computer Science student passionate about technology and innovation.');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };
  
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (!currentPassword) {
      toast.error('Please enter your current password');
      return;
    }
    
    toast.success('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock data for achievements and memberships
  const achievements = [
    { id: 1, title: 'Tech Hackathon Winner', date: '2025-02-15', badge: '🏆 1st Place' },
    { id: 2, title: 'Outstanding Club Member', date: '2024-11-10', badge: '⭐ Tech Enthusiasts' },
    { id: 3, title: 'Photography Contest', date: '2024-09-05', badge: '🏅 Honorable Mention' },
  ];
  
  const memberships = [
    { id: 1, club: 'Tech Enthusiasts', role: 'Member', joinDate: '2024-09-01', status: 'active' },
    { id: 2, club: 'Photography Club', role: 'Member', joinDate: '2025-01-15', status: 'active' },
    { id: 3, club: 'Chess Club', role: 'Pending', joinDate: '2025-03-28', status: 'pending' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger value="security">
                <Key className="h-4 w-4 mr-2" /> Security
              </TabsTrigger>
              <TabsTrigger value="memberships">
                <Users className="h-4 w-4 mr-2" /> Memberships
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="text-2xl">{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <h3 className="font-medium text-lg">{user?.name}</h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <Badge variant="outline" className="capitalize">{user?.role}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        rows={4} 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                  <Button onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Change Password</h3>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                      />
                    </div>
                    
                    <Button onClick={handleChangePassword}>Update Password</Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Account Actions</h3>
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="memberships">
              <Card>
                <CardHeader>
                  <CardTitle>Club Memberships</CardTitle>
                  <CardDescription>Manage your club memberships</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {memberships.map(membership => (
                    <div key={membership.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{membership.club}</div>
                        <div className="text-sm text-muted-foreground">
                          Joined: {new Date(membership.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={membership.status === 'active' ? 'secondary' : 'outline'}>
                          {membership.status === 'active' ? membership.role : 'Pending Approval'}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/clubs/${membership.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/clubs')}
                  >
                    Explore More Clubs
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium capitalize">{user?.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Club Memberships</p>
                  <p className="font-medium">{memberships.filter(m => m.status === 'active').length} active clubs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map(achievement => (
                  <div key={achievement.id} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-medium">{achievement.title}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                      <Badge variant="outline">{achievement.badge}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/achievements')}
              >
                View All Achievements
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
