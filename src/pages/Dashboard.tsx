import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore, calculatePregnancyWeek, getDaysUntilDue, getTrimester } from '@/store/appStore';
import { 
  Baby, Calendar, TrendingUp, Heart, Sparkles, 
  BookOpen, MessageCircle, Activity, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { DailyLogSheet } from '@/components/dashboard/DailyLogSheet';

export function Dashboard() {
  const { profile, dailyLogs } = useAppStore();
  const [showLogSheet, setShowLogSheet] = useState(false);
  
  const pregnancyInfo = useMemo(() => {
    const weekInfo = calculatePregnancyWeek(profile.dueDate);
    const daysUntil = getDaysUntilDue(profile.dueDate);
    const trimester = weekInfo ? getTrimester(weekInfo.week) : null;
    return { weekInfo, daysUntil, trimester };
  }, [profile.dueDate]);

  const todayLog = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return dailyLogs.find(l => l.date === today);
  }, [dailyLogs]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const babyFact = useMemo(() => {
    const facts: Record<number, string> = {
      4: "Your baby is the size of a poppy seed",
      8: "Your baby is the size of a raspberry",
      12: "Your baby is the size of a lime",
      16: "Your baby is the size of an avocado",
      20: "Your baby is the size of a banana",
      24: "Your baby is the size of an ear of corn",
      28: "Your baby is the size of an eggplant",
      32: "Your baby is the size of a coconut",
      36: "Your baby is the size of a honeydew melon",
      40: "Your baby is the size of a small pumpkin"
    };
    
    if (!pregnancyInfo.weekInfo) return null;
    const week = pregnancyInfo.weekInfo.week;
    const nearestWeek = Object.keys(facts)
      .map(Number)
      .reduce((prev, curr) => 
        Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
      );
    return facts[nearestWeek];
  }, [pregnancyInfo.weekInfo]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-sage px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <p className="text-primary-foreground/80 text-sm font-medium mb-1">
            {greeting}
          </p>
          <h1 className="font-display text-2xl font-bold text-primary-foreground">
            {profile.name || 'Mama'}
          </h1>
          
          {pregnancyInfo.weekInfo && (
            <div className="mt-6 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wide mb-1">
                    Trimester {pregnancyInfo.trimester}
                  </p>
                  <p className="text-primary-foreground text-3xl font-bold font-display">
                    Week {pregnancyInfo.weekInfo.week}
                    <span className="text-lg font-normal ml-1">
                      Day {pregnancyInfo.weekInfo.day}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-primary-foreground/70 text-xs mb-1">Days to go</p>
                  <p className="text-primary-foreground text-2xl font-bold">
                    {pregnancyInfo.daysUntil && pregnancyInfo.daysUntil > 0 
                      ? pregnancyInfo.daysUntil 
                      : '🎉'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 -mt-4 max-w-lg mx-auto">
        {/* Baby fact card */}
        {babyFact && (
          <Card variant="elevated" className="mb-4 animate-fade-in">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blush-light flex items-center justify-center flex-shrink-0">
                <Baby size={24} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This week</p>
                <p className="font-medium text-foreground">{babyFact}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daily log prompt */}
        <Card 
          variant="soft" 
          className={cn(
            "mb-6 cursor-pointer card-hover animate-fade-in",
            "[animation-delay:50ms]"
          )}
          onClick={() => setShowLogSheet(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {todayLog ? 'Update today\'s log' : 'How are you feeling today?'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {todayLog 
                      ? `Mood: ${todayLog.mood || 'Not logged'}` 
                      : 'Track your mood, symptoms & more'}
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp size={16} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <h2 className="font-display text-lg font-semibold mb-3 text-foreground">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-6 stagger-children">
          <Link to="/assistant">
            <Card variant="default" className="card-hover">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-3">
                  <MessageCircle size={24} className="text-primary" />
                </div>
                <p className="font-medium text-sm text-foreground">Ask Assistant</p>
                <p className="text-xs text-muted-foreground">Health questions</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/checker">
            <Card variant="default" className="card-hover">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-blush-light flex items-center justify-center mb-3">
                  <Activity size={24} className="text-secondary" />
                </div>
                <p className="font-medium text-sm text-foreground">Symptom Check</p>
                <p className="text-xs text-muted-foreground">Quick assessment</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/guide">
            <Card variant="default" className="card-hover">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-lavender/30 flex items-center justify-center mb-3">
                  <BookOpen size={24} className="text-lavender" />
                </div>
                <p className="font-medium text-sm text-foreground">Care Guide</p>
                <p className="text-xs text-muted-foreground">Articles & tips</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/checker#emergency">
            <Card variant="default" className="card-hover">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-3">
                  <AlertCircle size={24} className="text-destructive" />
                </div>
                <p className="font-medium text-sm text-foreground">Emergency</p>
                <p className="text-xs text-muted-foreground">Quick contacts</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Tip of the day */}
        <Card variant="outlined" className="animate-fade-in [animation-delay:200ms]">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Heart size={16} className="text-gold" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground mb-1">Daily Tip</p>
                <p className="text-sm text-muted-foreground">
                  Stay hydrated! Aim for 8-10 glasses of water daily. Proper hydration helps 
                  maintain amniotic fluid levels and reduces common pregnancy discomforts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily log sheet */}
      <DailyLogSheet open={showLogSheet} onOpenChange={setShowLogSheet} />
    </div>
  );
}
