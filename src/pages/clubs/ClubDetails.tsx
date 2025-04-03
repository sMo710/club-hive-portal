
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Award,
  Calendar,
  Edit,
  Info,
  MessageSquare,
  Share2,
  Trash2,
  Trophy,
  Users,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

// Mock clubs data
const clubsData = [
  {
    id: 1,
    name: 'Tech Enthusiasts',
    description: 'For students passionate about technology, innovation, and software development.',
    longDescription: `The Tech Enthusiasts club is dedicated to fostering a community of technology lovers and innovators. We provide a platform for students to explore various aspects of technology, from software development and programming to hardware projects and cutting-edge tech trends.

    Our mission is to nurture technical skills, promote innovation, and create opportunities for members to work on real-world projects. We regularly organize workshops, hackathons, tech talks, and project showcases to enhance learning and collaboration.

    Founded in 2020, our club has quickly grown to become one of the most active and respected clubs on campus. We welcome everyone from beginners just starting their tech journey to advanced coders looking to share their expertise.

    As a member, you'll have access to:
    • Weekly coding sessions and tech workshops
    • Project teams working on innovative solutions
    • Mentorship from senior students and industry professionals
    • Networking opportunities with tech companies
    • Access to specialized equipment and resources

    Join us to expand your technical skills, build an impressive portfolio, and connect with fellow tech enthusiasts!`,
    category: 'Academic',
    members: 35,
    events: 12,
    achievementsCount: 8,
    ranking: 1,
    isMember: true,
    memberRole: 'Member',
    founderName: 'David Chen',
    foundedYear: 2020,
    meetingFrequency: 'Weekly on Tuesdays',
    meetingLocation: 'Tech Lab, Building B',
    contactEmail: 'tech.enthusiasts@example.edu',
    socialMedia: {
      github: 'tech-enthusiasts',
      discord: 'TechE',
    },
    announcements: [
      {
        id: 1,
        title: 'Upcoming Hackathon',
        content: 'Get ready for our 24-hour hackathon on April 20th. Registration opens next week!',
        date: '2025-04-01',
        author: 'David Chen',
      },
      {
        id: 2,
        title: 'New Equipment Arrived',
        content: 'Our club has received new Arduino kits and Raspberry Pi boards for member projects.',
        date: '2025-03-28',
        author: 'Sarah Johnson',
      },
    ],
    upcomingEvents: [
      {
        id: 101,
        title: 'Python Workshop',
        date: '2025-04-10',
        time: '6:00 PM',
        location: 'Computer Lab 3',
      },
      {
        id: 102,
        title: 'Annual Tech Exhibition',
        date: '2025-04-15',
        time: '10:00 AM',
        location: 'Main Hall',
      },
      {
        id: 103,
        title: 'Tech Industry Networking',
        date: '2025-04-22',
        time: '5:30 PM',
        location: 'Conference Room A',
      },
    ],
    leaders: [
      { id: 1, name: 'David Chen', role: 'President', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'Sarah Johnson', role: 'Vice President', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 3, name: 'Michael Liu', role: 'Technical Lead', avatar: 'https://i.pravatar.cc/150?img=3' },
    ],
    activeMembers: [
      { id: 4, name: 'Emily Wong', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: 5, name: 'James Smith', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 6, name: 'Aisha Patel', avatar: 'https://i.pravatar.cc/150?img=6' },
      { id: 7, name: 'Ryan Johnson', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: 8, name: 'Zoe Robinson', avatar: 'https://i.pravatar.cc/150?img=8' },
      { id: 9, name: 'Noah Williams', avatar: 'https://i.pravatar.cc/150?img=9' },
      { id: 10, name: 'Sophia Garcia', avatar: 'https://i.pravatar.cc/150?img=10' },
    ],
    achievementsList: [
      { id: 201, title: 'Best Technical Club', year: 2024, description: 'Awarded by the Student Union' },
      { id: 202, title: 'Regional Hackathon Winners', year: 2023, description: 'First place at StateU Hackathon' },
      { id: 203, title: 'Most Active Club', year: 2023, description: 'Most events organized in a semester' },
      { id: 204, title: 'Community Impact Award', year: 2022, description: 'For teaching coding to local high school students' },
    ]
  },
  {
    id: 2,
    name: 'Debate Society',
    description: 'Enhance your critical thinking and public speaking through competitive debates.',
    longDescription: `The Debate Society is dedicated to developing members' critical thinking, public speaking, and argumentation skills through the practice of formal debate. Our club welcomes students of all skill levels who are interested in improving their communication abilities and engaging with complex social, political, and philosophical issues.

    Founded in 2015, our club has established itself as a leading voice on campus, with an impressive record in regional and national debate competitions. We foster an environment where members can respectfully discuss and argue various perspectives on challenging topics.

    As a member of the Debate Society, you'll benefit from:
    • Regular practice debates in various formats (Parliamentary, Lincoln-Douglas, Public Forum)
    • Professional coaching and peer feedback
    • Participation in on-campus and intercollegiate tournaments
    • Workshops on research techniques, argument construction, and rebuttal strategies
    • A supportive community of thoughtful, articulate peers

    Whether you're interested in competitive debating or simply want to become more confident and persuasive in your communication, the Debate Society offers valuable skills that will serve you throughout your academic and professional career.`,
    category: 'Academic',
    members: 28,
    events: 8,
    achievementsCount: 5,
    ranking: 2,
    isMember: false,
    memberRole: null,
    founderName: 'Amanda Roberts',
    foundedYear: 2015,
    meetingFrequency: 'Twice weekly - Mondays and Thursdays',
    meetingLocation: 'Humanities Building, Room 204',
    contactEmail: 'debate.society@example.edu',
    socialMedia: {
      instagram: 'debate_society',
      twitter: 'DebateSociety',
    },
    announcements: [
      {
        id: 1,
        title: 'State Championships',
        content: 'Congratulations to our team for reaching the finals of the State Debate Championships!',
        date: '2025-03-30',
        author: 'Mark Williams',
      },
    ],
    upcomingEvents: [
      {
        id: 201,
        title: 'Debate Competition Finals',
        date: '2025-04-08',
        time: '3:30 PM',
        location: 'Auditorium',
      },
      {
        id: 202,
        title: 'Public Speaking Workshop',
        date: '2025-04-12',
        time: '2:00 PM',
        location: 'Seminar Room 3',
      },
    ],
    leaders: [
      { id: 11, name: 'Mark Williams', role: 'President', avatar: 'https://i.pravatar.cc/150?img=11' },
      { id: 12, name: 'Olivia Taylor', role: 'Vice President', avatar: 'https://i.pravatar.cc/150?img=12' },
    ],
    activeMembers: [
      { id: 13, name: 'Ethan Brown', avatar: 'https://i.pravatar.cc/150?img=13' },
      { id: 14, name: 'Chloe Davis', avatar: 'https://i.pravatar.cc/150?img=14' },
      { id: 15, name: 'Brandon Wilson', avatar: 'https://i.pravatar.cc/150?img=15' },
    ],
    achievementsList: [
      { id: 301, title: 'National Debating Finalists', year: 2024, description: 'Second place at National Collegiate Debate' },
      { id: 302, title: 'Best Speaker Award', year: 2023, description: 'Awarded to Mark Williams' },
      { id: 303, title: 'Regional Champions', year: 2022, description: 'First place at Regional Debate Tournament' },
    ]
  },
];

const ClubDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const [isMember, setIsMember] = useState<boolean | null>(null);
  
  // Find the club with the matching ID
  const club = clubsData.find(c => c.id === Number(id));
  
  // Set initial membership status based on club data
  React.useEffect(() => {
    if (club) {
      setIsMember(club.isMember);
    }
  }, [club]);
  
  if (!club) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold mb-4">Club not found</h2>
        <Button variant="outline" onClick={() => navigate('/clubs')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clubs
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const handleJoinLeave = () => {
    if (isMember) {
      setIsMember(false);
      toast.success(`You have left ${club.name}`);
    } else {
      setIsMember(true);
      toast.success(`Your request to join ${club.name} has been submitted`);
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Club link copied to clipboard');
  };
  
  const handleEdit = () => {
    navigate(`/clubs/${id}/edit`);
  };
  
  const handleDelete = () => {
    toast.success('Club deleted successfully');
    navigate('/clubs');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <Button 
        variant="ghost" 
        className="flex items-center mb-4 -ml-4" 
        onClick={() => navigate('/clubs')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Clubs
      </Button>
      
      <div className="bg-accent/50 p-8 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{club.category}</Badge>
              {club.ranking <= 3 && (
                <Badge variant="secondary" className="ml-1">
                  <Trophy className="h-3 w-3 mr-1" />
                  {club.ranking === 1 ? '1st' : club.ranking === 2 ? '2nd' : '3rd'} Place
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{club.name}</h1>
            <p className="text-muted-foreground">Founded in {club.foundedYear} by {club.founderName}</p>
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
              <CardTitle>About {club.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">
                    <Info className="h-4 w-4 mr-2" /> About
                  </TabsTrigger>
                  <TabsTrigger value="members">
                    <Users className="h-4 w-4 mr-2" /> Members
                  </TabsTrigger>
                  <TabsTrigger value="achievements">
                    <Award className="h-4 w-4 mr-2" /> Achievements
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-4">
                  <p className="whitespace-pre-line">{club.longDescription || club.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t">
                    <div>
                      <h4 className="font-semibold mb-1">Meeting Schedule</h4>
                      <p className="text-muted-foreground">{club.meetingFrequency}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Meeting Location</h4>
                      <p className="text-muted-foreground">{club.meetingLocation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Contact Email</h4>
                      <p className="text-muted-foreground">{club.contactEmail}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Social Media</h4>
                      <div className="flex gap-2">
                        {Object.entries(club.socialMedia).map(([platform, handle]) => (
                          <Badge key={platform} variant="outline">
                            {platform}: @{handle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="members">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Leadership Team</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {club.leaders.map(leader => (
                          <div key={leader.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Avatar>
                              <AvatarImage src={leader.avatar} />
                              <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{leader.name}</div>
                              <div className="text-sm text-muted-foreground">{leader.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Active Members</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {club.activeMembers.map(member => (
                          <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Avatar>
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{member.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements">
                  <div className="space-y-4">
                    {club.achievementsList && club.achievementsList.map(achievement => (
                      <div key={achievement.id} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <Badge variant="outline">{achievement.year}</Badge>
                        </div>
                        <p className="text-muted-foreground">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {club.announcements.map(announcement => (
                  <div key={announcement.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{announcement.title}</h4>
                      <Badge variant="outline">{formatDate(announcement.date)}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{announcement.content}</p>
                    <p className="text-sm text-muted-foreground">Posted by {announcement.author}</p>
                  </div>
                ))}
                {club.announcements.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No announcements at this time</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Members</p>
                    <p className="font-medium">{club.members}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Events</p>
                    <p className="font-medium">{club.events} events this semester</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                    <p className="font-medium">{club.achievementsCount} total achievements</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  variant={isMember ? "outline" : "default"}
                  onClick={handleJoinLeave}
                >
                  {isMember ? 'Leave Club' : 'Join Club'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {club.upcomingEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover-scale"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <div className="bg-accent w-12 h-12 rounded-lg flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-medium">{formatDate(event.date).split(' ')[0]}</span>
                      <span className="text-lg font-bold">{formatDate(event.date).split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                ))}
                {club.upcomingEvents.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No upcoming events</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
              <CardDescription>Join the conversation</CardDescription>
            </CardHeader>
            <CardContent>
              {isMember ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast.info('Discussion feature coming soon!')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Open Chat
                </Button>
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  Join the club to access discussions
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
