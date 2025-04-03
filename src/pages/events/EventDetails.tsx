
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Edit, 
  MapPin, 
  Share2, 
  Trash2, 
  Users 
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

// Mock events data
const eventsData = [
  {
    id: 1,
    title: 'Annual Tech Exhibition',
    description: 'Showcase your innovative tech projects and ideas to the community. This is a great opportunity to display your technological prowess and learn from others. The exhibition will feature projects from all departments and clubs, with prizes for the most innovative solutions.',
    longDescription: `The Annual Tech Exhibition is our flagship technology event where students can showcase their innovative projects and ideas to the wider community. Whether you've built a robot, created a new app, designed a game, or developed any tech-related project, this is your chance to present it to peers, faculty, and industry visitors.

    The exhibition will have dedicated sections for different technologies including:
    - Software Development
    - Hardware & Robotics
    - Artificial Intelligence & Machine Learning
    - Web & Mobile Applications
    - Game Development

    Participants will have the opportunity to:
    - Display their projects to a wide audience
    - Receive feedback from faculty and industry professionals
    - Network with like-minded innovators
    - Win prizes in various categories

    The event will include a judging session, networking breaks, and a closing awards ceremony.`,
    date: '2025-04-15',
    time: '10:00 AM',
    endTime: '4:00 PM',
    location: 'Main Hall',
    club: 'Tech Enthusiasts',
    category: 'Technology',
    organizer: 'Sarah Johnson',
    participants: [
      { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 3, name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: 4, name: 'Emily Wilson', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: 5, name: 'David Clark', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 6, name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?img=6' },
      { id: 7, name: 'James Taylor', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: 8, name: 'Laura White', avatar: 'https://i.pravatar.cc/150?img=8' },
      { id: 9, name: 'Robert Green', avatar: 'https://i.pravatar.cc/150?img=9' },
      { id: 10, name: 'Linda Hall', avatar: 'https://i.pravatar.cc/150?img=10' },
    ],
  },
  {
    id: 2,
    title: 'Debate Competition Finals',
    description: 'The final showdown between the top debating teams. After weeks of preliminary rounds, witness the best debaters go head to head in the ultimate test of rhetoric and argumentation.',
    longDescription: `The Debate Competition Finals represents the culmination of our semester-long debate tournament. The top two teams from our preliminary rounds will face off in this grand finale to determine this year's champion.

    This year's debate motion will be revealed 48 hours before the event, giving teams limited but focused preparation time. The format will follow standard British Parliamentary style, with emphasis on clarity of argument, strength of reasoning, and persuasive delivery.

    A panel of distinguished judges including faculty members and guest experts from local universities will evaluate the performances and provide detailed feedback after the debate.

    The winning team will receive:
    - The Championship Trophy
    - Individual medals for team members
    - Representation opportunities at regional competitions

    This is a spectacular display of critical thinking, public speaking, and quick thinking under pressure. Don't miss this intellectual showdown!`,
    date: '2025-04-08',
    time: '3:30 PM',
    endTime: '5:30 PM',
    location: 'Auditorium',
    club: 'Debate Society',
    category: 'Academic',
    organizer: 'Mark Williams',
    participants: [
      { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=11' },
      { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: 3, name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=13' },
      { id: 4, name: 'Emily Wilson', avatar: 'https://i.pravatar.cc/150?img=14' },
      { id: 5, name: 'David Clark', avatar: 'https://i.pravatar.cc/150?img=15' },
    ],
  },
];

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const [registered, setRegistered] = useState(false);
  
  // Find the event with the matching ID
  const event = eventsData.find(e => e.id === Number(id));
  
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <Button variant="outline" onClick={() => navigate('/events')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const handleRegister = () => {
    setRegistered(true);
    toast.success(`Successfully registered for ${event.title}`);
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Event link copied to clipboard');
  };
  
  const handleEdit = () => {
    navigate(`/events/${id}/edit`);
  };
  
  const handleDelete = () => {
    toast.success('Event deleted successfully');
    navigate('/events');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <Button 
        variant="ghost" 
        className="flex items-center mb-4 -ml-4" 
        onClick={() => navigate('/events')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Button>
      
      <div className="bg-accent/50 p-8 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{event.category}</Badge>
              <Badge variant="secondary">{event.club}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{event.title}</h1>
            <p className="text-muted-foreground">Organized by {event.organizer}</p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            {isAdmin && (
              <>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="participants">Participants ({event.participants.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-4">
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{event.longDescription || event.description}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="participants">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {event.participants.map(participant => (
                      <div key={participant.id} className="flex items-center gap-3 p-2 border rounded-lg">
                        <Avatar>
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium truncate">{participant.name}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{formatDate(event.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time} - {event.endTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <p className="font-medium">{event.participants.length} registered</p>
                  </div>
                </div>
                
                {!isAdmin && (
                  <Button 
                    className="w-full mt-4" 
                    disabled={registered}
                    onClick={handleRegister}
                  >
                    {registered ? 'Registered' : 'Register for Event'}
                  </Button>
                )}
                
                {isAdmin && (
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => navigate(`/events/${id}/manage`)}
                  >
                    Manage Event
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Organized by</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => navigate(`/clubs/${event.club.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <div className="bg-primary/10 h-14 w-14 rounded-full flex items-center justify-center">
                  <span className="font-bold text-lg text-primary">
                    {event.club.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{event.club}</p>
                  <p className="text-sm text-muted-foreground">Organizer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
