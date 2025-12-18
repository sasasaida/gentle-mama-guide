import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/appStore';
import { Baby, Calendar, Heart, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { setProfile, setHasCompletedOnboarding } = useAppStore();

  const handleComplete = () => {
    setProfile({
      name,
      dueDate: dueDate || null
    });
    setHasCompletedOnboarding(true);
    onComplete();
  };

  const steps = [
    // Welcome
    <div key="welcome" className="flex flex-col items-center text-center px-6 animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-gradient-sage flex items-center justify-center mb-6 shadow-glow animate-float">
        <Baby size={48} className="text-primary-foreground" />
      </div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-3">
        Welcome to Mellow
      </h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-sm">
        Your calm, private companion for a healthy pregnancy journey. All data stays on your device.
      </p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Heart size={16} className="text-secondary" />
        <span>Privacy-first & works offline</span>
      </div>
      <Button variant="sage" size="xl" onClick={() => setStep(1)} className="w-full max-w-xs">
        Get Started
        <ChevronRight size={20} />
      </Button>
    </div>,

    // Name
    <div key="name" className="flex flex-col items-center text-center px-6 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-blush-light flex items-center justify-center mb-6">
        <span className="text-3xl">👋</span>
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        What should we call you?
      </h2>
      <p className="text-muted-foreground mb-8">
        Your name stays private on your device.
      </p>
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-center text-lg h-14 mb-6 max-w-xs"
      />
      <div className="flex gap-3 w-full max-w-xs">
        <Button variant="outline" size="lg" onClick={() => setStep(0)} className="flex-1">
          Back
        </Button>
        <Button variant="sage" size="lg" onClick={() => setStep(2)} className="flex-1">
          Next
        </Button>
      </div>
    </div>,

    // Due date
    <div key="due-date" className="flex flex-col items-center text-center px-6 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mb-6">
        <Calendar size={32} className="text-primary" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        When is your due date?
      </h2>
      <p className="text-muted-foreground mb-2">
        This helps us show your pregnancy progress.
      </p>
      <p className="text-sm text-muted-foreground/70 mb-6">
        You can update this later or skip for now.
      </p>
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="text-center text-lg h-14 mb-6 max-w-xs"
      />
      <div className="flex gap-3 w-full max-w-xs">
        <Button variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button variant="sage" size="lg" onClick={handleComplete} className="flex-1">
          {dueDate ? "Continue" : "Skip"}
        </Button>
      </div>
    </div>
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        {/* Progress dots */}
        <div className="flex gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === step 
                  ? "w-6 bg-primary" 
                  : i < step 
                    ? "bg-primary/50" 
                    : "bg-muted"
              )}
            />
          ))}
        </div>

        {steps[step]}
      </div>
    </div>
  );
}
