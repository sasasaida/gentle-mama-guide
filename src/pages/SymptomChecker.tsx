import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { symptoms, assessRisk, emergencyContacts, Symptom, RiskAssessment } from '@/data/symptomChecker';
import { useAppStore } from '@/store/appStore';
import { 
  Activity, AlertTriangle, Phone, Check, ArrowLeft, 
  Heart, Shield, ChevronRight, Plus, User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

export function SymptomChecker() {
  const location = useLocation();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [showEmergency, setShowEmergency] = useState(location.hash === '#emergency');
  const { customEmergencyContacts } = useAppStore();

  useEffect(() => {
    if (location.hash === '#emergency') {
      setShowEmergency(true);
    }
  }, [location.hash]);

  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    const severity = symptom.severity;
    if (!acc[severity]) acc[severity] = [];
    acc[severity].push(symptom);
    return acc;
  }, {} as Record<string, Symptom[]>);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
    setAssessment(null);
  };

  const handleAssess = () => {
    const result = assessRisk(selectedSymptoms);
    setAssessment(result);
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setAssessment(null);
  };

  if (showEmergency) {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-destructive/10 border-b border-destructive/20 px-5 pt-12 pb-4 sticky top-0 z-10">
          <div className="max-w-lg mx-auto">
            <button 
              onClick={() => setShowEmergency(false)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">Back to checker</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive flex items-center justify-center">
                <Phone size={22} className="text-destructive-foreground" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-foreground">
                  Emergency Contacts
                </h1>
                <p className="text-xs text-muted-foreground">Tap to call directly</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 max-w-lg mx-auto space-y-4">
          {/* Emergency services */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Emergency Services
            </h3>
            {emergencyContacts.map((contact) => (
              <a
                key={contact.id}
                href={`tel:${contact.number}`}
                className="block"
              >
                <Card variant="default" className="card-hover">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        contact.id === 'emergency' ? "bg-destructive" : "bg-muted"
                      )}>
                        <Phone size={20} className={contact.id === 'emergency' ? "text-destructive-foreground" : "text-muted-foreground"} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                      </div>
                    </div>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {contact.number}
                    </span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Custom contacts */}
          {customEmergencyContacts.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Your Contacts
              </h3>
              {customEmergencyContacts.map((contact, i) => (
                <a
                  key={i}
                  href={`tel:${contact.number}`}
                  className="block"
                >
                  <Card variant="soft" className="card-hover">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
                          <User size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                        </div>
                      </div>
                      <span className="font-mono text-foreground">
                        {contact.number}
                      </span>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}

          <Card variant="outlined" className="mt-6">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground text-center">
                You can add personal emergency contacts in your Profile settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (assessment) {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className={cn(
          "px-5 pt-12 pb-6",
          assessment.level === 'emergency' && "bg-destructive/10",
          assessment.level === 'seek-care' && "bg-warning/10",
          assessment.level === 'monitor' && "bg-gold/10",
          assessment.level === 'normal' && "bg-success/10"
        )}>
          <div className="max-w-lg mx-auto text-center">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
              assessment.level === 'emergency' && "bg-destructive",
              assessment.level === 'seek-care' && "bg-warning",
              assessment.level === 'monitor' && "bg-gold",
              assessment.level === 'normal' && "bg-success"
            )}>
              {assessment.level === 'emergency' && <AlertTriangle size={32} className="text-destructive-foreground" />}
              {assessment.level === 'seek-care' && <AlertTriangle size={32} className="text-warning-foreground" />}
              {assessment.level === 'monitor' && <Activity size={32} className="text-warning-foreground" />}
              {assessment.level === 'normal' && <Heart size={32} className="text-success-foreground" />}
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              {assessment.title}
            </h1>
            <p className="text-muted-foreground">
              {assessment.description}
            </p>
          </div>
        </div>

        <div className="px-5 py-4 max-w-lg mx-auto space-y-4">
          {/* Recommendations */}
          <Card variant="default">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-3">Recommendations</h3>
              <ul className="space-y-3">
                {assessment.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Selected symptoms */}
          <Card variant="soft">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-3">
                Selected Symptoms ({selectedSymptoms.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map(id => {
                  const symptom = symptoms.find(s => s.id === id);
                  return symptom ? (
                    <span 
                      key={id}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs",
                        symptom.severity === 'high' && "bg-destructive/10 text-destructive",
                        symptom.severity === 'medium' && "bg-warning/10 text-warning-foreground",
                        symptom.severity === 'low' && "bg-muted text-muted-foreground"
                      )}
                    >
                      {symptom.name}
                    </span>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            {(assessment.level === 'emergency' || assessment.level === 'seek-care') && (
              <Button 
                variant={assessment.level === 'emergency' ? 'destructive' : 'default'}
                size="lg" 
                className="w-full"
                onClick={() => setShowEmergency(true)}
              >
                <Phone size={18} />
                View Emergency Contacts
              </Button>
            )}
            <Button variant="outline" size="lg" className="w-full" onClick={resetChecker}>
              Start New Check
            </Button>
          </div>

          {/* Disclaimer */}
          <Card variant="outlined" className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Shield size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  This assessment is for informational purposes only and does not replace 
                  professional medical advice. Always consult your healthcare provider 
                  for medical decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 pt-12 pb-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Symptom Checker
              </h1>
              <p className="text-sm text-muted-foreground">
                Select any symptoms you're experiencing
              </p>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setShowEmergency(true)}
            >
              <Phone size={16} />
              Emergency
            </Button>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 max-w-lg mx-auto space-y-6">
        {/* Emergency symptoms */}
        <div>
          <h3 className="text-sm font-medium text-destructive uppercase tracking-wide mb-3 flex items-center gap-2">
            <AlertTriangle size={14} />
            Urgent Symptoms
          </h3>
          <div className="space-y-2">
            {groupedSymptoms.high?.filter(s => s.category === 'emergency').map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                  selectedSymptoms.includes(symptom.id)
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-card hover:border-destructive/50"
                )}
              >
                <p className="font-medium text-foreground">{symptom.name}</p>
                <p className="text-sm text-muted-foreground">{symptom.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* High concern symptoms */}
        <div>
          <h3 className="text-sm font-medium text-warning uppercase tracking-wide mb-3">
            Contact Provider Today
          </h3>
          <div className="space-y-2">
            {groupedSymptoms.high?.filter(s => s.category !== 'emergency').map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                  selectedSymptoms.includes(symptom.id)
                    ? "border-warning bg-warning/10"
                    : "border-border bg-card hover:border-warning/50"
                )}
              >
                <p className="font-medium text-foreground">{symptom.name}</p>
                <p className="text-sm text-muted-foreground">{symptom.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Medium concern symptoms */}
        <div>
          <h3 className="text-sm font-medium text-gold uppercase tracking-wide mb-3">
            Monitor These Symptoms
          </h3>
          <div className="space-y-2">
            {groupedSymptoms.medium?.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                  selectedSymptoms.includes(symptom.id)
                    ? "border-gold bg-gold/10"
                    : "border-border bg-card hover:border-gold/50"
                )}
              >
                <p className="font-medium text-foreground">{symptom.name}</p>
                <p className="text-sm text-muted-foreground">{symptom.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Common symptoms */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Common Symptoms
          </h3>
          <div className="space-y-2">
            {groupedSymptoms.low?.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                  selectedSymptoms.includes(symptom.id)
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <p className="font-medium text-foreground">{symptom.name}</p>
                <p className="text-sm text-muted-foreground">{symptom.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assess button */}
      {selectedSymptoms.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-5 py-3 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom">
          <div className="max-w-lg mx-auto">
            <Button variant="sage" size="lg" className="w-full" onClick={handleAssess}>
              Check {selectedSymptoms.length} Symptom{selectedSymptoms.length > 1 ? 's' : ''}
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
