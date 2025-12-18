// Symptom checker decision tree for risk assessment
// All processing happens locally for privacy

export interface Symptom {
  id: string;
  name: string;
  description: string;
  category: 'pain' | 'bleeding' | 'discharge' | 'movement' | 'general' | 'emergency';
  severity: 'low' | 'medium' | 'high';
}

export interface RiskAssessment {
  level: 'normal' | 'monitor' | 'seek-care' | 'emergency';
  title: string;
  description: string;
  recommendations: string[];
  color: string;
}

export const symptoms: Symptom[] = [
  // Emergency symptoms
  {
    id: 'heavy-bleeding',
    name: 'Heavy vaginal bleeding',
    description: 'Soaking through a pad in an hour or less',
    category: 'emergency',
    severity: 'high'
  },
  {
    id: 'severe-headache',
    name: 'Severe headache with vision changes',
    description: 'Intense headache with blurred vision or seeing spots',
    category: 'emergency',
    severity: 'high'
  },
  {
    id: 'seizure',
    name: 'Seizure or convulsions',
    description: 'Uncontrolled shaking or loss of consciousness',
    category: 'emergency',
    severity: 'high'
  },
  {
    id: 'no-movement',
    name: 'No baby movement for 24+ hours',
    description: 'Haven\'t felt baby move in over 24 hours (after 24 weeks)',
    category: 'emergency',
    severity: 'high'
  },
  {
    id: 'water-break',
    name: 'Water breaking before 37 weeks',
    description: 'Fluid leaking before full term',
    category: 'emergency',
    severity: 'high'
  },
  
  // High concern symptoms
  {
    id: 'regular-contractions',
    name: 'Regular contractions before 37 weeks',
    description: 'Painful tightening every 10 minutes or less',
    category: 'pain',
    severity: 'high'
  },
  {
    id: 'severe-abdominal-pain',
    name: 'Severe abdominal pain',
    description: 'Intense pain that doesn\'t go away',
    category: 'pain',
    severity: 'high'
  },
  {
    id: 'decreased-movement',
    name: 'Significantly decreased baby movement',
    description: 'Baby moving much less than usual',
    category: 'movement',
    severity: 'high'
  },
  {
    id: 'face-swelling',
    name: 'Sudden swelling of face or hands',
    description: 'Rapid, unusual swelling especially in face',
    category: 'general',
    severity: 'high'
  },
  
  // Medium concern symptoms
  {
    id: 'light-bleeding',
    name: 'Light vaginal bleeding or spotting',
    description: 'Small amount of blood or brown discharge',
    category: 'bleeding',
    severity: 'medium'
  },
  {
    id: 'painful-urination',
    name: 'Painful or burning urination',
    description: 'Discomfort when urinating, frequent urges',
    category: 'general',
    severity: 'medium'
  },
  {
    id: 'fever',
    name: 'Fever over 100.4°F (38°C)',
    description: 'Elevated temperature with or without chills',
    category: 'general',
    severity: 'medium'
  },
  {
    id: 'unusual-discharge',
    name: 'Unusual vaginal discharge',
    description: 'Change in color, smell, or amount',
    category: 'discharge',
    severity: 'medium'
  },
  {
    id: 'persistent-vomiting',
    name: 'Persistent vomiting',
    description: 'Cannot keep any food or fluids down',
    category: 'general',
    severity: 'medium'
  },
  
  // Lower concern symptoms
  {
    id: 'mild-headache',
    name: 'Mild headache',
    description: 'Manageable head pain without other symptoms',
    category: 'pain',
    severity: 'low'
  },
  {
    id: 'back-pain',
    name: 'Back pain',
    description: 'Aching in lower or upper back',
    category: 'pain',
    severity: 'low'
  },
  {
    id: 'leg-cramps',
    name: 'Leg cramps',
    description: 'Muscle cramps in calves or thighs',
    category: 'pain',
    severity: 'low'
  },
  {
    id: 'mild-swelling',
    name: 'Mild swelling in feet/ankles',
    description: 'Gradual swelling that improves with rest',
    category: 'general',
    severity: 'low'
  },
  {
    id: 'fatigue',
    name: 'Fatigue and tiredness',
    description: 'Feeling more tired than usual',
    category: 'general',
    severity: 'low'
  },
  {
    id: 'heartburn',
    name: 'Heartburn or indigestion',
    description: 'Burning sensation in chest or throat',
    category: 'general',
    severity: 'low'
  },
  {
    id: 'constipation',
    name: 'Constipation',
    description: 'Difficulty with bowel movements',
    category: 'general',
    severity: 'low'
  },
  {
    id: 'mood-changes',
    name: 'Mood changes',
    description: 'Feeling emotional or anxious',
    category: 'general',
    severity: 'low'
  }
];

export function assessRisk(selectedSymptomIds: string[]): RiskAssessment {
  const selectedSymptoms = symptoms.filter(s => selectedSymptomIds.includes(s.id));
  
  // Check for emergency symptoms
  const hasEmergency = selectedSymptoms.some(s => s.category === 'emergency');
  const hasHighSeverity = selectedSymptoms.some(s => s.severity === 'high');
  const hasMediumSeverity = selectedSymptoms.some(s => s.severity === 'medium');
  const multipleMedium = selectedSymptoms.filter(s => s.severity === 'medium').length >= 2;
  
  if (hasEmergency) {
    return {
      level: 'emergency',
      title: 'Seek Emergency Care Immediately',
      description: 'The symptoms you\'ve selected may indicate a serious condition requiring immediate medical attention.',
      recommendations: [
        'Call emergency services or go to the nearest hospital immediately',
        'Do not drive yourself - have someone take you or call an ambulance',
        'Bring any relevant medical records and list of medications',
        'Stay calm and try to have someone with you'
      ],
      color: 'destructive'
    };
  }
  
  if (hasHighSeverity) {
    return {
      level: 'seek-care',
      title: 'Contact Your Healthcare Provider Today',
      description: 'The symptoms you\'ve selected should be evaluated by a healthcare professional within 24 hours.',
      recommendations: [
        'Call your healthcare provider\'s office as soon as possible',
        'Explain your symptoms clearly and mention you are pregnant',
        'Ask about same-day or next-day appointment availability',
        'If symptoms worsen, go to the emergency room',
        'Rest and stay hydrated while waiting for your appointment'
      ],
      color: 'warning'
    };
  }
  
  if (hasMediumSeverity || multipleMedium) {
    return {
      level: 'monitor',
      title: 'Monitor Your Symptoms',
      description: 'These symptoms are worth tracking and discussing at your next appointment, or sooner if they worsen.',
      recommendations: [
        'Note when symptoms started and any patterns',
        'Try recommended home remedies for relief',
        'Schedule an appointment if symptoms persist over 2-3 days',
        'Contact your provider sooner if symptoms worsen',
        'Stay hydrated and get adequate rest'
      ],
      color: 'gold'
    };
  }
  
  return {
    level: 'normal',
    title: 'Common Pregnancy Symptoms',
    description: 'The symptoms you\'ve selected are typically normal during pregnancy, but always trust your instincts.',
    recommendations: [
      'These are common experiences during pregnancy',
      'Try recommended comfort measures and home remedies',
      'Mention these at your next prenatal visit',
      'Contact your provider if you\'re concerned or symptoms change',
      'Take care of yourself with rest, hydration, and nutrition'
    ],
    color: 'success'
  };
}

export const emergencyContacts = [
  {
    id: 'emergency',
    name: 'Emergency Services',
    number: '911',
    description: 'For life-threatening emergencies'
  },
  {
    id: 'poison-control',
    name: 'Poison Control Center',
    number: '1-800-222-1222',
    description: 'For poisoning emergencies (US)'
  },
  {
    id: 'maternal-hotline',
    name: 'Maternal Health Hotline',
    number: '1-800-311-2229',
    description: 'National maternal health support'
  },
  {
    id: 'mental-health',
    name: 'Mental Health Crisis Line',
    number: '988',
    description: 'Suicide & Crisis Lifeline'
  }
];
