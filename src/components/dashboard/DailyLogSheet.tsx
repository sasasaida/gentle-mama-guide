import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

interface DailyLogSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const moods = [
  { value: 'great', emoji: '😊', label: 'Great' },
  { value: 'good', emoji: '🙂', label: 'Good' },
  { value: 'okay', emoji: '😐', label: 'Okay' },
  { value: 'tired', emoji: '😴', label: 'Tired' },
  { value: 'difficult', emoji: '😔', label: 'Difficult' },
] as const;

const commonSymptoms = [
  'Nausea', 'Fatigue', 'Back pain', 'Headache', 
  'Heartburn', 'Swelling', 'Cramps', 'Insomnia'
];

export function DailyLogSheet({ open, onOpenChange }: DailyLogSheetProps) {
  const today = new Date().toISOString().split('T')[0];
  const { getDailyLog, addDailyLog } = useAppStore();
  const existingLog = getDailyLog(today);

  const [mood, setMood] = useState<typeof moods[number]['value'] | null>(existingLog?.mood || null);
  const [symptoms, setSymptoms] = useState<string[]>(existingLog?.symptoms || []);
  const [weight, setWeight] = useState(existingLog?.weight?.toString() || '');
  const [notes, setNotes] = useState(existingLog?.notes || '');

  const handleSave = () => {
    addDailyLog({
      date: today,
      mood,
      symptoms,
      weight: weight ? parseFloat(weight) : null,
      bloodPressure: null,
      notes
    });
    onOpenChange(false);
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="font-display text-xl">Daily Check-in</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto h-[calc(100%-120px)] pb-4 space-y-6">
          {/* Mood */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              How are you feeling?
            </label>
            <div className="flex gap-2 justify-between">
              {moods.map(m => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-xl transition-all duration-200 flex-1",
                    mood === m.value 
                      ? "bg-primary/10 ring-2 ring-primary scale-105" 
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  <span className="text-2xl mb-1">{m.emoji}</span>
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Any symptoms today?
            </label>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm transition-all duration-200",
                    symptoms.includes(symptom)
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Weight (optional)
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="flex-1"
              />
              <span className="text-muted-foreground text-sm">lbs</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Notes (optional)
            </label>
            <Textarea
              placeholder="Any thoughts, concerns, or things to remember..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border safe-bottom">
          <Button variant="sage" size="lg" className="w-full" onClick={handleSave}>
            Save Check-in
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
