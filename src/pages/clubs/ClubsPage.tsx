
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Plus, Search, Trophy, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

// Mock clubs data
const clubsData = [
  {
    id: 1,
    name: 'Tech Enthusiasts',
    description: 'For students passionate about technology, innovation, and software development.',
    category: 'Academic',
    members: 35,
    events: 12,
    achievements: 8,
    ranking: 1,
    isMember: true,
    memberRole: 'Member',
  },
  {
    id: 2,
    name: 'Debate Society',
    description: 'Enhance your critical thinking and public speaking through competitive debates.',
    category: 'Academic',
    members: 28,
    events: 8,
    achievements: 5,
    ranking: 2,
    isMember: false,
    memberRole: null,
  },
  {
    id: 3,
    name: 'Photography Club',
    description: 'Explore the world of photography and develop your visual storytelling skills.',
    category: 'Arts',
    members: 22,
    events: 6,
    achievements: 4,
    ranking: 3,
    isMember: true,
    memberRole: 'Member',
  },
  {
    id: 4,
    name: 'Chess Club',
    description: 'Master the game of kings and compete in tournaments at various levels.',
    category: 'Games',
    members: 18,
    events: 5,
    achievements: 3,
    ranking: 4,
    isMember: false,
    memberRole: null,
  },
  {
    id: 5,
    name: 'Literary Society',
    description: 'For lovers of literature, poetry, creative writing and literary discussions.',
    category: 'Arts',
    members: 25,
    events: 7,
    achievements: 2,
    ranking: 5,
    isMember: false,
    memberRole: null,
  },
  {
    id: 6,
    name: 'Dance Club',
    description: 'Express yourself through various dance forms and participate in performances.',
    category: 'Arts',
    members: 30,
    events: 9,
    achievements: 6,
    ranking: 6,
    isMember: false,
    memberRole: null,
  },
  {
    id: 7,
    name: 'Science Club',
    description: 'Explore scientific concepts through experiments, projects and discussions.',
    category: 'Academic',
    members: 32,
    events: 10,
    achievements: 7,
    ranking: 7,
    isMember: false,
    memberRole: null,
  },
  {
    id: 8,
    name: 'Sports Club',
    description: 'Participate in various sports activities and competitions.',
    category: 'Sports',
    members: 40,
    events: 15,
    achievements: 10,
    ranking: 8,
    isMember: false,
    memberRole: null,
  },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Arts', label: 'Arts' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Games', label: 'Games' },
];

const ClubsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [clubs, setClubs] = useState(clubsData);

  // Handle join/leave club
  const handleJoinLeaveClub = (club: typeof clubsData[0], e: React.MouseEvent) => {
    e.stopPropagation();
    
    const updatedClubs = clubs.map(c => {
      if (c.id === club.id) {
        if (c.isMember) {
          toast.success(`You have left ${club.name}`);
          return { ...c, isMember: false, memberRole: null, members: c.members - 1 };
        } else {
          toast.success(`You have requested to join ${club.name}`);
          return { ...c, isMember: true, memberRole: 'Pending', members: c.members + 1 };
        }
      }
      return c;
    });
    
    setClubs(updatedClubs);
  };

  // Filter clubs based on search query, category, and membership
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          club.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || club.category === categoryFilter;
    
    const matchesMembership = membershipFilter === 'all' || 
                             (membershipFilter === 'member' && club.isMember) ||
                             (membershipFilter === 'non-member' && !club.isMember);
    
    return matchesSearch && matchesCategory && matchesMembership;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clubs</h1>
          <p className="text-muted-foreground">Browse and join clubs that interest you</p>
        </div>
        {isAdmin && (
          <Button onClick={() => navigate('/clubs/create')}>
            <Plus className="mr-2 h-4 w-4" /> Create Club
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clubs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Select value={membershipFilter} onValueChange={setMembershipFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Membership" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clubs</SelectItem>
              <SelectItem value="member">My Clubs</SelectItem>
              <SelectItem value="non-member">Not Joined</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <Card 
              key={club.id} 
              className="hover-scale overflow-hidden cursor-pointer"
              onClick={() => navigate(`/clubs/${club.id}`)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline">{club.category}</Badge>
                    {club.ranking <= 3 && (
                      <Badge variant="secondary" className="ml-2">
                        <Trophy className="h-3 w-3 mr-1" />
                        {club.ranking === 1 ? '1st' : club.ranking === 2 ? '2nd' : '3rd'} Place
                      </Badge>
                    )}
                  </div>
                  {club.isMember && (
                    <Badge variant="default" className="ml-auto">
                      {club.memberRole}
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-2">{club.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {club.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between text-sm mb-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{club.members} members</span>
                  </div>
                  <div>{club.events} events</div>
                  <div>{club.achievements} achievements</div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant={club.isMember ? "outline" : "default"}
                  className="w-full"
                  onClick={(e) => handleJoinLeaveClub(club, e)}
                >
                  {club.isMember ? 
                    (club.memberRole === 'Pending' ? 'Request Pending' : 'Leave Club') : 
                    'Join Club'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No clubs match your search criteria</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setMembershipFilter('all');
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClubsPage;
