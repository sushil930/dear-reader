
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Eye, Heart, MessageCircle, Calendar, Clock } from 'lucide-react';

const StatsCards = () => {
  const statsData = [
    { title: 'Views This Month', value: '2,847', change: '+12%', icon: Eye, color: 'text-blue-600' },
    { title: 'Engagements', value: '456', change: '+8%', icon: Heart, color: 'text-red-500' },
    { title: 'Comments', value: '89', change: '+15%', icon: MessageCircle, color: 'text-green-600' },
    { title: 'Reading Time', value: '24h 12m', change: '+5%', icon: Clock, color: 'text-purple-600' },
  ];

  const recentEntries = [
    { title: 'Morning Reflections', date: '2024-12-29', views: 124, mood: 'Peaceful' },
    { title: 'City Adventures', date: '2024-12-28', views: 89, mood: 'Excited' },
    { title: 'Quiet Evening Thoughts', date: '2024-12-27', views: 156, mood: 'Contemplative' },
    { title: 'Weekend Memories', date: '2024-12-26', views: 203, mood: 'Joyful' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 px-2 sm:px-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="vintage-card p-4 lg:p-6 border-2 border-muted-brown/20 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <IconComponent className={`w-6 h-6 lg:w-8 lg:h-8 ${stat.color}`} />
                <span className="text-xs lg:text-sm font-garamond text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="space-y-1 lg:space-y-2">
                <p className="text-2xl lg:text-3xl font-garamond font-bold text-ink-blue">{stat.value}</p>
                <p className="text-xs lg:text-sm font-garamond text-muted-brown">{stat.title}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity - Stack on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Popular Entries */}
        <Card className="vintage-card p-4 lg:p-6 border-2 border-muted-brown/20">
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-ink-blue" />
            <h3 className="text-xl lg:text-2xl font-garamond font-bold text-ink-blue">Popular Entries</h3>
          </div>
          
          <div className="space-y-3 lg:space-y-4">
            {recentEntries.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-cream/50 rounded-lg border border-muted-brown/10 hover:bg-cream/70 transition-colors">
                <div className="flex-1 min-w-0">
                  <h4 className="font-garamond font-medium text-ink-blue mb-1 text-sm lg:text-base truncate">{entry.title}</h4>
                  <div className="flex items-center gap-2 lg:gap-4 text-xs lg:text-sm text-muted-brown">
                    <span>{entry.date}</span>
                    <span className="px-2 py-1 bg-muted-brown/10 rounded-full text-xs">{entry.mood}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-brown ml-2">
                  <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="font-garamond text-sm lg:text-base">{entry.views}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Writing Calendar */}
        <Card className="vintage-card p-4 lg:p-6 border-2 border-muted-brown/20">
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-ink-blue" />
            <h3 className="text-xl lg:text-2xl font-garamond font-bold text-ink-blue">Writing Calendar</h3>
          </div>
          
          <div className="space-y-4">
            <div className="text-center p-3 lg:p-4 bg-cream/50 rounded-lg">
              <div className="text-3xl lg:text-4xl font-garamond font-bold text-ink-blue mb-2">127</div>
              <div className="text-base lg:text-lg font-garamond text-muted-brown">Day Writing Streak</div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 lg:gap-2 text-center text-xs font-garamond text-muted-brown">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-1 lg:py-2">{day}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-sm ${
                    Math.random() > 0.3 ? 'bg-ink-blue/20' : 'bg-gray-100'
                  } hover:bg-ink-blue/40 transition-colors cursor-pointer`}
                />
              ))}
            </div>
            
            <div className="flex justify-between text-xs lg:text-sm font-garamond text-muted-brown">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-gray-100 rounded-sm"></div>
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-ink-blue/20 rounded-sm"></div>
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-ink-blue/40 rounded-sm"></div>
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-ink-blue/60 rounded-sm"></div>
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-ink-blue/80 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StatsCards;
