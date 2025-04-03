import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Filter, MapPin, Plus, Search, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Mock events data
const eventsData = [
  {
    id: 1,
    title: 'Annual Tech Exhibition',
    description: 'Showcase your innovative tech projects and ideas to the community.',
    date: '2025-04-15',
    time: '10:00 AM',
    location: 'Main Hall',
    club: 'Tech Enthusiasts',
    participants: 45,
    category: 'Technology',
    requirements: ['Laptop', 'Project files', 'Presentation materials'],
  },
  {
    id: 2,
    title: 'Debate Competition Finals',
    description: 'The final showdown between the top debating teams.',
    date: '2025-04-08',
    time: '3:30 PM',
    location: 'Auditorium',
    club: 'Debate Society',
    participants: 28,
    category: 'Academic',
    requirements: ['Formal attire', 'Notepad and pen'],
  },
  {
    id: 3,
    title: 'Photography Workshop',
    description: 'Learn advanced photography techniques from professional photographers.',
    date: '2025-04-10',
    time: '2:00 PM',
    location: 'Art Room 103',
    club: 'Photography Club',
    participants: 20,
    category: 'Arts',
  },
  {
    id: 4,
    title: 'Chess Tournament',
    description: 'Annual chess competition open to all skill levels.',
    date: '2025-04-20',
    time: '9:00 AM',
    location: 'Recreation Center',
    club: 'Chess Club',
    participants: 16,
    category: 'Sports',
  },
  {
    id: 5,
    title: 'Poetry Reading Session',
    description: 'Share your original poems or read from your favorite poets.',
    date: '2025-04-12',
    time: '5:00 PM',
    location: 'Library',
    club: 'Literary Society',
    participants: 22,
    category: 'Arts',
  },
  {
    id: 6,
    title: 'Science Fair',
    description: 'Exhibit your scientific projects and experiments.',
    date: '2025-05-05',
    time: '11:00 AM',
    location: 'Science Building',
    club: 'Science Club',
    participants: 50,
    category: 'Academic',
  },
  {
    id: 7,
    title: 'Basketball Tournament',
    description: 'Interdepartmental basketball championship.',
    date: '2025-04-25',
    time: '1:00 PM',
    location: 'Indoor Sports Complex',
    club: 'Sports Club',
    participants: 60,
    category: 'Sports',
  },
  {
    id: 8,
    title: 'Coding Hackathon',
    description: '24-hour coding challenge to build innovative solutions.',
    date: '2025-05-15',
    time: '9:00 AM',
    location: 'Computer Lab',
    club: 'Tech Enthusiasts',
    participants: 30,
    category: 'Technology',
  },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Arts', label: 'Arts' },
  { value: 'Sports', label: 'Sports' },
];

const EventsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const today = new Date();
  
  const upcomingEvents = eventsData.filter(event => new Date(event.date) >= today);
  const pastEvents = eventsData.filter(event => new Date(event.date) < today);

  const filteredUpcomingEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.club.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const filteredPastEvents = pastEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.club.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Browse and register for upcoming events</p>
        </div>
        {isAdmin && (
          <Button onClick={() => navigate('/events/create')}>
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events by title, description or club..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
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
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {filteredUpcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcomingEvents.map((event) => (
                <Card key={event.id} className="hover-scale overflow-hidden">
                  <div
                    className="h-40 bg-accent flex items-center justify-center cursor-pointer"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <div className="text-center">
                      <p className="text-xl font-medium">{formatDate(event.date).split(',')[0]}</p>
                      <p className="text-3xl font-bold">{formatDate(event.date).split(',')[1].trim().split(' ')[1]}</p>
                      <p>{formatDate(event.date).split(',')[1].trim().split(' ')[0]}</p>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div 
                      className="cursor-pointer" 
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{event.participants} registered</span>
                      </div>
                      <div>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">{event.club}</div>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming events match your filters</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {filteredPastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPastEvents.map((event) => (
                <Card key={event.id} className="hover-scale overflow-hidden opacity-80">
                  <div
                    className="h-40 bg-muted flex items-center justify-center cursor-pointer"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <div className="text-center">
                      <p className="text-xl font-medium">{formatDate(event.date).split(',')[0]}</p>
                      <p className="text-3xl font-bold">{formatDate(event.date).split(',')[1].trim().split(' ')[1]}</p>
                      <p>{formatDate(event.date).split(',')[1].trim().split(' ')[0]}</p>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div
                      className="cursor-pointer"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{event.participants} attended</span>
                      </div>
                      <div>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">{event.club}</div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No past events match your filters</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
