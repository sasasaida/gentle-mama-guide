// Local database for offline Q&A health assistant
// Pre-loaded with trusted, cited answers from WHO and health guidelines

export interface HealthQuestion {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  source: string;
  category: 'nutrition' | 'symptoms' | 'exercise' | 'medications' | 'general';
  trimester?: 1 | 2 | 3 | 'all';
}

export const healthDatabase: HealthQuestion[] = [
  // Nutrition questions
  {
    id: 'papaya-safety',
    keywords: ['papaya', 'fruit', 'safe', 'eat'],
    question: 'Is it safe to eat papaya during pregnancy?',
    answer: 'Ripe papaya is generally considered safe during pregnancy and is a good source of vitamins A, C, and folate. However, unripe or semi-ripe papaya contains latex and papain which may trigger uterine contractions. It\'s best to avoid unripe papaya and consume only fully ripe papaya in moderate amounts.',
    source: 'WHO Nutrition Guidelines, 2023',
    category: 'nutrition',
    trimester: 'all'
  },
  {
    id: 'caffeine-limit',
    keywords: ['coffee', 'caffeine', 'tea', 'limit', 'safe'],
    question: 'How much caffeine is safe during pregnancy?',
    answer: 'The WHO recommends limiting caffeine intake to less than 200mg per day during pregnancy (about one 12oz cup of coffee). High caffeine intake has been associated with restricted fetal growth and low birth weight. Remember that caffeine is also found in tea, chocolate, and some soft drinks.',
    source: 'World Health Organization, 2020',
    category: 'nutrition',
    trimester: 'all'
  },
  {
    id: 'folic-acid',
    keywords: ['folic', 'acid', 'folate', 'vitamin', 'supplement'],
    question: 'Why is folic acid important during pregnancy?',
    answer: 'Folic acid is crucial for preventing neural tube defects in your baby\'s brain and spine. The WHO recommends 400mcg daily, ideally starting before conception and continuing through the first 12 weeks. Good food sources include leafy greens, fortified cereals, and legumes.',
    source: 'WHO Antenatal Care Guidelines, 2022',
    category: 'nutrition',
    trimester: 1
  },
  {
    id: 'fish-mercury',
    keywords: ['fish', 'seafood', 'mercury', 'omega', 'safe'],
    question: 'Can I eat fish during pregnancy?',
    answer: 'Fish is an excellent source of omega-3 fatty acids and protein. Eat 2-3 servings per week of low-mercury fish like salmon, sardines, and tilapia. Avoid high-mercury fish like shark, swordfish, king mackerel, and tilefish. Always ensure fish is fully cooked.',
    source: 'FDA/EPA Advisory, 2023',
    category: 'nutrition',
    trimester: 'all'
  },
  {
    id: 'iron-rich-foods',
    keywords: ['iron', 'anemia', 'blood', 'foods', 'supplement'],
    question: 'How can I get enough iron during pregnancy?',
    answer: 'Iron needs increase significantly during pregnancy to support increased blood volume. Good sources include lean red meat, poultry, fish, beans, spinach, and iron-fortified cereals. Pair iron-rich foods with vitamin C to enhance absorption. Your healthcare provider may recommend iron supplements if needed.',
    source: 'WHO Iron Supplementation Guidelines, 2020',
    category: 'nutrition',
    trimester: 'all'
  },
  // Symptoms questions
  {
    id: 'morning-sickness',
    keywords: ['nausea', 'vomiting', 'morning', 'sickness', 'sick'],
    question: 'How can I manage morning sickness?',
    answer: 'Morning sickness affects up to 80% of pregnant women, usually in the first trimester. Try eating small, frequent meals, avoiding strong odors, eating crackers before getting up, staying hydrated, and trying ginger tea. If vomiting is severe and you can\'t keep fluids down, contact your healthcare provider as this may be hyperemesis gravidarum.',
    source: 'ACOG Practice Bulletin, 2023',
    category: 'symptoms',
    trimester: 1
  },
  {
    id: 'back-pain',
    keywords: ['back', 'pain', 'ache', 'spine', 'posture'],
    question: 'Is back pain normal during pregnancy?',
    answer: 'Back pain is very common during pregnancy due to hormonal changes, weight gain, and shifting center of gravity. Relief strategies include good posture, supportive shoes, sleeping on your side with a pillow between knees, gentle stretching, and prenatal massage. Contact your provider if pain is severe or accompanied by other symptoms.',
    source: 'ACOG Patient Education, 2022',
    category: 'symptoms',
    trimester: 'all'
  },
  {
    id: 'swelling-edema',
    keywords: ['swelling', 'swollen', 'feet', 'ankles', 'edema', 'hands'],
    question: 'Is swelling during pregnancy normal?',
    answer: 'Mild swelling in feet, ankles, and hands is common, especially in the third trimester. Elevate your feet, avoid standing for long periods, stay hydrated, and wear comfortable shoes. However, sudden or severe swelling, especially in the face, could be a sign of preeclampsia - contact your healthcare provider immediately.',
    source: 'WHO Preeclampsia Guidelines, 2021',
    category: 'symptoms',
    trimester: 3
  },
  {
    id: 'heartburn',
    keywords: ['heartburn', 'acid', 'reflux', 'indigestion', 'burning'],
    question: 'How can I relieve heartburn during pregnancy?',
    answer: 'Heartburn is common due to hormonal changes and the growing uterus pressing on your stomach. Try eating smaller meals, avoiding spicy/fatty foods, not lying down after eating, and sleeping with your head elevated. Antacids containing calcium or magnesium are generally safe, but avoid those with aluminum or aspirin.',
    source: 'ACOG Practice Guidelines, 2023',
    category: 'symptoms',
    trimester: 'all'
  },
  // Exercise questions
  {
    id: 'exercise-safe',
    keywords: ['exercise', 'workout', 'physical', 'activity', 'safe', 'gym'],
    question: 'Is exercise safe during pregnancy?',
    answer: 'For most healthy pregnancies, 150 minutes of moderate exercise per week is recommended. Safe activities include walking, swimming, prenatal yoga, and stationary cycling. Avoid contact sports, activities with falling risk, hot yoga, and lying flat on your back after the first trimester. Always stay hydrated and stop if you feel dizzy or have pain.',
    source: 'WHO Physical Activity Guidelines, 2022',
    category: 'exercise',
    trimester: 'all'
  },
  {
    id: 'walking-pregnancy',
    keywords: ['walking', 'walk', 'steps', 'daily'],
    question: 'How much walking is recommended during pregnancy?',
    answer: 'Walking is one of the safest exercises during pregnancy. Aim for 20-30 minutes daily or as your energy allows. It helps maintain fitness, reduces stress, and may help with labor preparation. Wear supportive shoes, stay hydrated, and avoid overheating. Listen to your body and rest when needed.',
    source: 'ACOG Exercise Guidelines, 2023',
    category: 'exercise',
    trimester: 'all'
  },
  // Medications questions
  {
    id: 'pain-relief-safe',
    keywords: ['painkiller', 'pain', 'relief', 'acetaminophen', 'paracetamol', 'ibuprofen'],
    question: 'What pain relievers are safe during pregnancy?',
    answer: 'Acetaminophen (paracetamol) is generally considered safe when used as directed. Avoid NSAIDs like ibuprofen and aspirin, especially in the third trimester, as they may affect fetal heart development and amniotic fluid levels. Always consult your healthcare provider before taking any medication.',
    source: 'FDA Drug Safety Communication, 2023',
    category: 'medications',
    trimester: 'all'
  },
  {
    id: 'prenatal-vitamins',
    keywords: ['prenatal', 'vitamin', 'supplement', 'multivitamin'],
    question: 'Do I need prenatal vitamins?',
    answer: 'Yes, prenatal vitamins are recommended to ensure you get adequate folic acid, iron, calcium, and DHA. Start taking them before conception if possible. Key nutrients include 400-800mcg folic acid, 27mg iron, 1000mg calcium, and 200-300mg DHA. Your provider may recommend additional supplements based on your needs.',
    source: 'WHO Antenatal Care Recommendations, 2022',
    category: 'medications',
    trimester: 'all'
  },
  // General questions
  {
    id: 'sleep-position',
    keywords: ['sleep', 'position', 'side', 'back', 'lying'],
    question: 'What is the safest sleep position during pregnancy?',
    answer: 'Sleeping on your left side is recommended, especially after 20 weeks. This position improves blood flow to your baby and helps your kidneys eliminate waste. Use pillows for support between knees and behind your back. Avoid sleeping flat on your back as it can compress major blood vessels.',
    source: 'American Pregnancy Association, 2023',
    category: 'general',
    trimester: 'all'
  },
  {
    id: 'travel-flying',
    keywords: ['travel', 'fly', 'flying', 'airplane', 'trip'],
    question: 'Is it safe to fly during pregnancy?',
    answer: 'Air travel is generally safe until 36 weeks for uncomplicated pregnancies. Walk around frequently, stay hydrated, and wear compression stockings to prevent blood clots. Most airlines require a doctor\'s note after 28-36 weeks. Discuss with your provider if you have any complications.',
    source: 'ACOG Committee Opinion, 2022',
    category: 'general',
    trimester: 'all'
  },
  {
    id: 'weight-gain',
    keywords: ['weight', 'gain', 'pounds', 'kilos', 'gaining'],
    question: 'How much weight should I gain during pregnancy?',
    answer: 'Recommended weight gain depends on your pre-pregnancy BMI. For normal weight (BMI 18.5-24.9): 25-35 lbs (11-16 kg). Underweight: 28-40 lbs. Overweight: 15-25 lbs. Obese: 11-20 lbs. Most weight gain occurs in the second and third trimesters. Focus on nutritious foods rather than "eating for two."',
    source: 'Institute of Medicine Guidelines, 2022',
    category: 'general',
    trimester: 'all'
  },
  {
    id: 'dental-care',
    keywords: ['dental', 'teeth', 'dentist', 'gums', 'oral'],
    question: 'Is dental care safe during pregnancy?',
    answer: 'Yes, dental care is important and safe during pregnancy. Hormonal changes can increase risk of gum disease. Regular cleanings, x-rays with proper shielding, and local anesthetics are generally safe. Inform your dentist you\'re pregnant. Good oral health may reduce risk of preterm birth.',
    source: 'American Dental Association, 2023',
    category: 'general',
    trimester: 'all'
  }
];

// Function to search the database for relevant answers
export function searchHealthDatabase(query: string): HealthQuestion[] {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
  
  const results = healthDatabase.map(item => {
    let score = 0;
    
    // Check keywords
    searchTerms.forEach(term => {
      if (item.keywords.some(keyword => keyword.includes(term) || term.includes(keyword))) {
        score += 3;
      }
      if (item.question.toLowerCase().includes(term)) {
        score += 2;
      }
      if (item.answer.toLowerCase().includes(term)) {
        score += 1;
      }
    });
    
    return { item, score };
  });
  
  return results
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(r => r.item);
}
