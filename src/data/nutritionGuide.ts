// Nutrition and care guide content
// Pre-loaded articles and food lists for offline access

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'nutrition' | 'exercise' | 'wellness' | 'preparation';
  trimester?: 1 | 2 | 3 | 'all';
  readTime: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'protein' | 'dairy' | 'grains' | 'fruits' | 'vegetables' | 'fats';
  benefits: string[];
  nutrients: string[];
  servingSize: string;
  safe: boolean;
  notes?: string;
}

export const articles: Article[] = [
  {
    id: 'iron-rich-foods',
    title: 'Iron-Rich Foods for Pregnancy',
    summary: 'Essential iron sources to support your increased blood volume and baby\'s development.',
    content: `Iron is crucial during pregnancy as your blood volume increases by 50%. Iron helps carry oxygen to your baby and prevents anemia.

**Best Iron Sources:**

**Heme Iron (from animal sources - better absorbed):**
- Lean red meat (beef, lamb)
- Chicken and turkey (especially dark meat)
- Fish (salmon, sardines)
- Eggs (especially yolks)

**Non-Heme Iron (from plants):**
- Spinach and leafy greens
- Lentils and beans
- Fortified cereals
- Tofu and tempeh
- Dried fruits (apricots, raisins)

**Tips for Better Absorption:**
- Pair iron-rich foods with vitamin C (citrus, bell peppers, tomatoes)
- Avoid drinking tea or coffee with iron-rich meals (tannins block absorption)
- Cook in cast iron pans to add iron to food
- Take iron supplements with orange juice, not milk

**Daily Requirement:** 27mg during pregnancy (compared to 18mg when not pregnant)`,
    category: 'nutrition',
    trimester: 'all',
    readTime: 4
  },
  {
    id: 'first-trimester-nutrition',
    title: 'First Trimester Nutrition Guide',
    summary: 'What to eat when morning sickness makes everything challenging.',
    content: `The first trimester can be challenging with nausea and food aversions. Focus on what you can keep down while meeting key nutrient needs.

**Priority Nutrients:**

**Folic Acid (400-800mcg daily):**
Critical for neural tube development in weeks 1-12.
- Fortified cereals
- Leafy greens
- Legumes
- Citrus fruits

**Managing Morning Sickness:**
- Eat small, frequent meals (every 2-3 hours)
- Keep crackers by your bedside
- Try ginger tea or ginger candies
- Cold foods may be more tolerable than hot
- Stay hydrated with small sips throughout the day

**Foods That Often Help:**
- Plain crackers or toast
- Bananas
- Rice
- Applesauce
- Ginger ale (flat)
- Popsicles
- Lemon water

**Don't Worry If:**
- You can't eat vegetables right now
- Your diet isn't "perfect"
- You're only eating a few foods

The baby will get what it needs. Focus on prenatal vitamins and staying hydrated.`,
    category: 'nutrition',
    trimester: 1,
    readTime: 5
  },
  {
    id: 'safe-exercises',
    title: 'Safe Exercises Per Trimester',
    summary: 'Stay active throughout pregnancy with trimester-appropriate exercises.',
    content: `Exercise during pregnancy offers many benefits: better mood, improved sleep, easier labor, and faster recovery.

**First Trimester:**
- Walking (20-30 minutes daily)
- Swimming
- Prenatal yoga
- Light strength training
- Stationary cycling
*Note: You may feel more tired - listen to your body*

**Second Trimester:**
Often the "golden period" with more energy!
- Continue first trimester activities
- Prenatal Pilates
- Low-impact aerobics
- Water aerobics
- Dancing
*Avoid exercises lying flat on your back after week 16*

**Third Trimester:**
- Walking remains excellent
- Swimming (great for swelling relief)
- Gentle prenatal yoga
- Pelvic floor exercises (Kegels)
- Light stretching
*Modify intensity as needed*

**Always Avoid:**
- Contact sports
- Hot yoga or exercising in heat
- Activities with falling risk
- Heavy lifting
- Lying flat on back (after first trimester)
- Exercises that cause pain or discomfort

**Stop Exercising and Contact Your Provider If:**
- Vaginal bleeding
- Dizziness or faintness
- Chest pain
- Calf pain or swelling
- Decreased fetal movement
- Contractions
- Fluid leaking`,
    category: 'exercise',
    trimester: 'all',
    readTime: 6
  },
  {
    id: 'sleep-comfort',
    title: 'Sleep Comfort Tips',
    summary: 'Strategies for better sleep as your body changes.',
    content: `Good sleep is essential for you and your baby. Here are strategies for each trimester.

**Sleep Position:**
- Left side is ideal (improves blood flow to baby)
- Use a pregnancy pillow between your knees
- Place a pillow behind your back for support
- Elevate your head if experiencing heartburn

**First Trimester Challenges:**
- Frequent urination: Limit fluids 2 hours before bed
- Fatigue: Allow yourself extra sleep
- Nausea: Keep crackers nearby

**Second Trimester:**
Usually the best sleep trimester!
- Start practicing side sleeping
- Use pillows for support as needed

**Third Trimester Strategies:**
- Multiple pillows: between knees, behind back, under belly
- Sleep slightly propped up for heartburn/breathing
- Limit fluids in evening (but stay hydrated during day)
- Try a warm bath before bed
- Practice relaxation techniques

**Sleep Hygiene Tips:**
- Keep bedroom cool and dark
- Establish a relaxing bedtime routine
- Limit screen time before bed
- Gentle stretching or prenatal yoga
- Avoid heavy meals close to bedtime

**When to Contact Your Provider:**
- Persistent insomnia
- Severe snoring (could indicate sleep apnea)
- Restless leg syndrome that affects sleep
- Excessive daytime sleepiness`,
    category: 'wellness',
    trimester: 'all',
    readTime: 5
  },
  {
    id: 'preparing-hospital',
    title: 'Preparing Your Hospital Bag',
    summary: 'What to pack for delivery day and your hospital stay.',
    content: `Pack your hospital bag around week 35-36, just in case baby arrives early!

**For Labor:**
- Birth plan copies
- Insurance card and ID
- Phone charger
- Comfortable robe or nightgown
- Warm socks with grips
- Hair ties
- Lip balm
- Pillow from home
- Music playlist/headphones
- Massage tool or tennis balls for back labor

**For After Delivery:**
- Comfortable going-home outfit (maternity clothes)
- Nursing bras and breast pads
- Toiletries
- Glasses if needed (contacts may be uncomfortable)
- Snacks
- Comfortable underwear

**For Baby:**
- Going-home outfit (bring a few sizes)
- Blanket
- Car seat (required for discharge)
- Newborn diapers
- Hat and socks

**For Your Partner:**
- Change of clothes
- Toiletries
- Snacks
- Camera
- Phone charger
- Pillow
- Entertainment for waiting

**Documents to Bring:**
- ID and insurance cards
- Birth plan
- Hospital pre-registration forms
- List of medications
- Emergency contacts

**Leave at Home:**
- Jewelry and valuables
- Large amounts of cash
- Too many outfits (hospital provides most basics)`,
    category: 'preparation',
    trimester: 3,
    readTime: 4
  }
];

export const foodItems: FoodItem[] = [
  // Proteins
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    category: 'protein',
    benefits: ['Lean protein', 'Supports muscle development', 'Low fat'],
    nutrients: ['Protein', 'B vitamins', 'Selenium'],
    servingSize: '3 oz cooked',
    safe: true
  },
  {
    id: 'salmon',
    name: 'Salmon',
    category: 'protein',
    benefits: ['Omega-3 for brain development', 'High quality protein'],
    nutrients: ['Omega-3', 'Protein', 'Vitamin D', 'B12'],
    servingSize: '3 oz cooked',
    safe: true,
    notes: 'Limit to 2-3 servings per week. Choose wild-caught when possible.'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    category: 'protein',
    benefits: ['Complete protein', 'Choline for brain development'],
    nutrients: ['Protein', 'Choline', 'B12', 'Vitamin D'],
    servingSize: '2 eggs',
    safe: true,
    notes: 'Must be fully cooked. Avoid runny yolks during pregnancy.'
  },
  {
    id: 'lentils',
    name: 'Lentils',
    category: 'protein',
    benefits: ['Plant protein', 'High fiber', 'Iron-rich'],
    nutrients: ['Protein', 'Folate', 'Iron', 'Fiber'],
    servingSize: '1/2 cup cooked',
    safe: true
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    category: 'dairy',
    benefits: ['High protein', 'Probiotics', 'Calcium-rich'],
    nutrients: ['Protein', 'Calcium', 'Probiotics', 'B12'],
    servingSize: '1 cup',
    safe: true,
    notes: 'Choose plain varieties and add your own fruit to reduce sugar.'
  },
  // Fruits
  {
    id: 'berries',
    name: 'Mixed Berries',
    category: 'fruits',
    benefits: ['Antioxidants', 'Vitamin C', 'Fiber'],
    nutrients: ['Vitamin C', 'Fiber', 'Antioxidants', 'Folate'],
    servingSize: '1 cup',
    safe: true
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'fruits',
    benefits: ['Easy to digest', 'Potassium for muscle cramps', 'Energy'],
    nutrients: ['Potassium', 'B6', 'Fiber', 'Vitamin C'],
    servingSize: '1 medium',
    safe: true
  },
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'fats',
    benefits: ['Healthy fats', 'Folate-rich', 'Fiber'],
    nutrients: ['Healthy fats', 'Folate', 'Potassium', 'Fiber'],
    servingSize: '1/2 avocado',
    safe: true
  },
  // Vegetables
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'vegetables',
    benefits: ['Iron-rich', 'Folate', 'Vitamin A'],
    nutrients: ['Iron', 'Folate', 'Vitamin A', 'Vitamin K'],
    servingSize: '2 cups raw / 1 cup cooked',
    safe: true,
    notes: 'Wash thoroughly. Cooking can help with iron absorption.'
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    category: 'vegetables',
    benefits: ['Vitamin A for baby\'s development', 'Fiber', 'Complex carbs'],
    nutrients: ['Vitamin A', 'Fiber', 'Vitamin C', 'Potassium'],
    servingSize: '1 medium',
    safe: true
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'vegetables',
    benefits: ['Calcium', 'Folate', 'Fiber', 'Vitamin C'],
    nutrients: ['Calcium', 'Folate', 'Vitamin C', 'Fiber'],
    servingSize: '1 cup',
    safe: true
  },
  // Grains
  {
    id: 'oatmeal',
    name: 'Oatmeal',
    category: 'grains',
    benefits: ['Fiber for digestion', 'Iron', 'Sustained energy'],
    nutrients: ['Fiber', 'Iron', 'B vitamins', 'Protein'],
    servingSize: '1/2 cup dry',
    safe: true
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'grains',
    benefits: ['Complete protein', 'Iron', 'Fiber'],
    nutrients: ['Protein', 'Iron', 'Fiber', 'Magnesium'],
    servingSize: '1/2 cup cooked',
    safe: true
  }
];

export const foodCategories = [
  { id: 'protein', name: 'Proteins', icon: '🥩' },
  { id: 'dairy', name: 'Dairy', icon: '🥛' },
  { id: 'grains', name: 'Grains', icon: '🌾' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
  { id: 'fats', name: 'Healthy Fats', icon: '🥑' }
];
