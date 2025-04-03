
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, Users, Award, Bell, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data
const upcomingEvents = [
  {
    id: 1,
    title: 'Annual Tech Exhibition',
    date: '2025-04-15',
    time: '10:00 AM',
    club: 'Tech Enthusiasts',
  },
  {
    id: 2,
    title: 'Debate Competition Finals',
    date: '2025-04-08',
    time: '3:30 PM',
    club: 'Debate Society',
  },
  {
    id: 3,
    title: 'Photography Workshop',
    date: '2025-04-10',
    time: '2:00 PM',
    club: 'Photography Club',
  },
];

const membershipRequests = [
  {
    id: 1,
    user: 'Jane Smith',
    club: 'Debate Society',
    date: '2025-04-01',
  },
  {
    id: 2,
    user: 'Michael Johnson',
    club: 'Photography Club',
    date: '2025-04-02',
  },
];

const myClubs = [
  {
    id: 1,
    name: 'Tech Enthusiasts',
    role: 'Member',
    members: 35,
  },
  {
    id: 2,
    name: 'Photography Club',
    role: 'Member',
    members: 22,
  },
];

const clubPerformance = [
  {
    id: 1,
    name: 'Tech Enthusiasts',
    points: 456,
    members: 35,
    position: 1,
  },
  {
    id: 2,
    name: 'Debate Society',
    points: 412,
    members: 28,
    position: 2,
  },
  {
    id: 3,
    name: 'Photography Club',
    points: 398,
    members: 22,
    position: 3,
  },
  {
    id: 4,
    name: 'Chess Club',
    points: 356,
    members: 18,
    position: 4,
  },
];

const announcements = [
  {
    id: 1,
    title: 'New Policy Update',
    content: 'All clubs must submit event reports within 48 hours after completion.',
    date: '2025-04-01',
  },
  {
    id: 2,
    title: 'Annual Club Awards',
    content: 'Nominations for annual club awards are now open until April 15.',
    date: '2025-03-28',
  },
];

const notifications = [
  {
    id: 1,
    content: 'Your membership request for Photography Club was approved',
    date: '2025-04-01',
    read: false,
  },
  {
    id: 2,
    content: 'Tech Exhibition rescheduled to April 15th',
    date: '2025-03-30',
    read: true,
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button onClick={() => navigate('/events/create')} className="hidden md:flex">
          {isAdmin ? 'Create Event' : 'Register for Event'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6 md:col-span-2">
          {/* Welcome Card */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle>Welcome back, {user?.name}!</CardTitle>
              <CardDescription>
                {isAdmin 
                  ? "Here's what's happening with your clubs and events" 
                  : "Here's what's happening in your clubs"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 bg-accent/50 p-3 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Upcoming Events</p>
                    <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-accent/50 p-3 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{isAdmin ? 'Total Clubs' : 'My Clubs'}</p>
                    <p className="text-2xl font-bold">{isAdmin ? 8 : myClubs.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-accent/50 p-3 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Achievements</p>
                    <p className="text-2xl font-bold">{isAdmin ? 15 : 3}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events happening in the next 14 days</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/events')}>
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 hover-scale p-3 cursor-pointer rounded-lg hover:bg-accent/50" onClick={() => navigate(`/events/${event.id}`)}>
                    <div className="bg-accent w-12 h-12 rounded-lg flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-medium">{formatDate(event.date).split(' ')[0]}</span>
                      <span className="text-lg font-bold">{formatDate(event.date).split(' ')[1]}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground gap-3">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {event.time}
                        </div>
                        <Badge variant="outline">{event.club}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Admin-specific: Membership Requests */}
          {isAdmin && (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Membership Requests</CardTitle>
                  <CardDescription>Students waiting for club approval</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/approvals')}>
                  View all
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {membershipRequests.length > 0 ? (
                  <div className="space-y-4">
                    {membershipRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">{request.user}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{request.club}</span>
                            <span className="mx-2">•</span>
                            <span>{formatDate(request.date)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => console.log('Rejected')}>
                            Reject
                          </Button>
                          <Button size="sm" onClick={() => console.log('Approved')}>
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending membership requests
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Student-specific: My Clubs */}
          {!isAdmin && (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Clubs</CardTitle>
                  <CardDescription>Clubs you're a member of</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/clubs')}>
                  Explore clubs
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myClubs.map((club) => (
                    <div key={club.id} className="hover-scale p-4 cursor-pointer rounded-lg border flex items-center justify-between" onClick={() => navigate(`/clubs/${club.id}`)}>
                      <div>
                        <h4 className="font-medium">{club.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                          <Badge variant="secondary">{club.role}</Badge>
                          <span>•</span>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {club.members} members
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/clubs/${club.id}`);
                      }}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Notifications</CardTitle>
                <Badge className="px-2 py-1 rounded-full text-xs" variant="secondary">
                  {notifications.filter(n => !n.read).length} new
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border ${!notification.read ? 'bg-accent/50 border-primary/20' : ''}`}
                  >
                    <p className="text-sm">{notification.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(notification.date)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Club Performance / Leaderboard */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Club Leaderboard</CardTitle>
                <CardDescription>Top performing clubs</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/leaderboard')}>
                Full rankings
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clubPerformance.map((club) => (
                  <div key={club.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      club.position === 1 ? 'bg-yellow-100 text-yellow-700' : 
                      club.position === 2 ? 'bg-gray-100 text-gray-700' : 
                      club.position === 3 ? 'bg-amber-100 text-amber-700' : 
                      'bg-muted text-muted-foreground'
                    }`}>
                      {club.position}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{club.name}</p>
                        <p className="font-bold">{club.points}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {club.members} members
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <span className="text-xs text-muted-foreground">{formatDate(announcement.date)}</span>
                    </div>
                    <p className="text-sm">{announcement.content}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/announcements')}>
                  View all announcements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
