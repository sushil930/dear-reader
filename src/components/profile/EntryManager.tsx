
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid, List, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const EntryManager = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterMood, setFilterMood] = useState('all');

  const entries = [
    {
      id: 1,
      title: 'Morning Reflections on Life',
      date: '2024-12-29',
      mood: 'Peaceful',
      status: 'Published',
      views: 124,
      tags: ['reflection', 'morning', 'life'],
      excerpt: 'Today I woke up feeling grateful for the simple things in life...'
    },
    {
      id: 2,
      title: 'City Adventures and New Discoveries',
      date: '2024-12-28',
      mood: 'Excited',
      status: 'Published',
      views: 89,
      tags: ['adventure', 'city', 'discovery'],
      excerpt: 'Exploring the hidden corners of the city revealed so many surprises...'
    },
    {
      id: 3,
      title: 'Quiet Evening Contemplations',
      date: '2024-12-27',
      mood: 'Contemplative',
      status: 'Draft',
      views: 0,
      tags: ['evening', 'thoughts', 'peace'],
      excerpt: 'As the sun sets, I find myself thinking about the choices we make...'
    },
    {
      id: 4,
      title: 'Weekend Memories with Family',
      date: '2024-12-26',
      mood: 'Joyful',
      status: 'Published', 
      views: 203,
      tags: ['family', 'weekend', 'memories'],
      excerpt: 'Spending time with loved ones always fills my heart with warmth...'
    }
  ];

  const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      'Peaceful': 'bg-blue-100 text-blue-800',
      'Excited': 'bg-orange-100 text-orange-800',
      'Contemplative': 'bg-purple-100 text-purple-800',
      'Joyful': 'bg-green-100 text-green-800',
      'Melancholy': 'bg-gray-100 text-gray-800'
    };
    return colors[mood] || 'bg-gray-100 text-gray-800';
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => (
        <Card key={entry.id} className="vintage-card p-6 border-2 border-muted-brown/20 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <Badge variant={entry.status === 'Published' ? 'default' : 'secondary'} className="font-garamond">
              {entry.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-cream border-2 border-muted-brown/20">
                <DropdownMenuItem className="font-garamond hover:bg-muted-brown/10">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="font-garamond hover:bg-muted-brown/10">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem className="font-garamond hover:bg-muted-brown/10 text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h3 className="text-xl font-garamond font-bold text-ink-blue mb-3 line-clamp-2">
            {entry.title}
          </h3>

          <p className="text-muted-brown font-garamond mb-4 line-clamp-3">
            {entry.excerpt}
          </p>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs font-garamond border-muted-brown/30">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-brown font-garamond">
              <span>{entry.date}</span>
              <Badge className={getMoodColor(entry.mood)}>
                {entry.mood}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-brown">
              <Eye className="w-4 h-4" />
              <span className="font-garamond">{entry.views} views</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="vintage-card p-6 border-2 border-muted-brown/20 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-xl font-garamond font-bold text-ink-blue">{entry.title}</h3>
                <Badge variant={entry.status === 'Published' ? 'default' : 'secondary'} className="font-garamond">
                  {entry.status}
                </Badge>
                <Badge className={getMoodColor(entry.mood)}>
                  {entry.mood}
                </Badge>
              </div>
              
              <p className="text-muted-brown font-garamond mb-3 line-clamp-2">
                {entry.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-muted-brown font-garamond">
                <span>{entry.date}</span>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{entry.views} views</span>
                </div>
                <div className="flex gap-2">
                  {entry.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-muted-brown/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-muted-brown hover:text-ink-blue">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-brown hover:text-ink-blue">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-brown hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-3xl font-garamond font-bold text-ink-blue mb-2">My Entries</h2>
          <p className="text-muted-brown font-garamond">Manage and organize your diary entries</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-2 border-muted-brown/20 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-ink-blue text-cream' : 'text-muted-brown'}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-ink-blue text-cream' : 'text-muted-brown'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-brown w-4 h-4" />
          <Input
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-cream/50 border-2 border-muted-brown/30 font-garamond focus:border-ink-blue"
          />
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48 bg-cream/50 border-2 border-muted-brown/30 font-garamond">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="views">Sort by Views</SelectItem>
            <SelectItem value="title">Sort by Title</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterMood} onValueChange={setFilterMood}>
          <SelectTrigger className="w-48 bg-cream/50 border-2 border-muted-brown/30 font-garamond">
            <SelectValue placeholder="Filter by Mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Moods</SelectItem>
            <SelectItem value="Peaceful">Peaceful</SelectItem>
            <SelectItem value="Excited">Excited</SelectItem>
            <SelectItem value="Contemplative">Contemplative</SelectItem>
            <SelectItem value="Joyful">Joyful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Entry Display */}
      {viewMode === 'grid' ? <GridView /> : <ListView />}
    </div>
  );
};

export default EntryManager;
