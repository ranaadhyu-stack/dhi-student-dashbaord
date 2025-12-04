import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Droplet, 
  Coffee, 
  Apple, 
  Moon, 
  Heart,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Download,
  Share2,
  FileText
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../contexts/NotificationContext';

interface WellnessProps {
  theme: 'light' | 'dark';
}

type MoodType = 'happy' | 'fine' | 'neutral' | 'stressed' | 'bad';
type DietGoalType = 'lose' | 'gain' | 'maintain';

interface DailyMood {
  date: string;
  mood: MoodType;
  emoji: string;
  description: string;
}

interface MealItem {
  name: string;
  portion: number;
  size: string;
  oilLevel?: string;
  calories: number;
}

interface FoodItem {
  name: string;
  portion: number;
  size: string;
  oilLevel?: string;
  calories: number;
}

interface DailyDiet {
  date: string;
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
  water: number;
  totalCalories: number;
}

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood?: MoodType;
}

export const Wellness: React.FC<WellnessProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'mood' | 'diet' | 'journal' | 'graphs' | 'report'>('mood');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // November 2025
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'mood' | 'diet' | 'journal' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { addNotification } = useNotifications();

  // Mood state
  const [selectedMood, setSelectedMood] = useState<MoodType>('fine');
  const [moodDescription, setMoodDescription] = useState('');
  
  // Diet state
  const [dietGoal, setDietGoal] = useState<DietGoalType>('maintain');
  const [targetCalories] = useState(2000);
  const [breakfast, setBreakfast] = useState<MealItem[]>([]);
  const [lunch, setLunch] = useState<MealItem[]>([]);
  const [dinner, setDinner] = useState<MealItem[]>([]);
  const [snacks, setSnacks] = useState<MealItem[]>([]);
  const [waterIntake, setWaterIntake] = useState(4);
  const [energyLevel, setEnergyLevel] = useState(50);
  
  // Food input state
  const [activeInput, setActiveInput] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks' | null>(null);
  const [foodInput, setFoodInput] = useState('');
  const [detectedFoods, setDetectedFoods] = useState<FoodItem[]>([]);
  
  // Journal state
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalMood, setJournalMood] = useState<MoodType | undefined>();

  // Mock data
  const dailyMoods: DailyMood[] = [
    { date: 'Nov 27', mood: 'happy', emoji: '😄', description: 'Great study session!' },
    { date: 'Nov 26', mood: 'fine', emoji: '🙂', description: 'Productive day' },
    { date: 'Nov 25', mood: 'stressed', emoji: '😟', description: 'Lots of assignments' },
    { date: 'Nov 24', mood: 'neutral', emoji: '😐', description: 'Average day' },
    { date: 'Nov 23', mood: 'happy', emoji: '😄', description: 'Weekend fun!' },
  ];

  const weeklyMoodData = [
    { day: 'Mon', value: 4 },
    { day: 'Tue', value: 3 },
    { day: 'Wed', value: 5 },
    { day: 'Thu', value: 3 },
    { day: 'Fri', value: 4 },
    { day: 'Sat', value: 5 },
    { day: 'Sun', value: 4 },
  ];

  const dailyDiets: DailyDiet[] = [
    {
      date: 'Nov 27',
      breakfast: [{ name: 'Oatmeal', portion: '1 bowl', calories: 300 }],
      lunch: [{ name: 'Chicken salad', portion: '1 plate', calories: 450 }],
      dinner: [{ name: 'Salmon', portion: '150g', calories: 400 }],
      snacks: [{ name: 'Almonds', portion: '30g', calories: 180 }],
      water: 6,
      totalCalories: 1330,
    },
    {
      date: 'Nov 26',
      breakfast: [{ name: 'Eggs & toast', portion: '2 eggs', calories: 350 }],
      lunch: [{ name: 'Pasta', portion: '1 plate', calories: 550 }],
      dinner: [{ name: 'Grilled chicken', portion: '200g', calories: 380 }],
      snacks: [{ name: 'Protein bar', portion: '1 bar', calories: 200 }],
      water: 7,
      totalCalories: 1480,
    },
  ];

  const weeklyCaloriesData = [
    { day: 'Mon', calories: 1800 },
    { day: 'Tue', calories: 2100 },
    { day: 'Wed', calories: 1950 },
    { day: 'Thu', calories: 2050 },
    { day: 'Fri', calories: 1900 },
    { day: 'Sat', calories: 2200 },
    { day: 'Sun', calories: 1850 },
  ];

  const journalEntries: JournalEntry[] = [
    {
      id: '1',
      date: 'Nov 27, 2025',
      title: 'Productive Study Day',
      content: 'Completed three chapters of physics today. Feeling confident about the upcoming exam...',
      mood: 'happy',
    },
    {
      id: '2',
      date: 'Nov 25, 2025',
      title: 'Overwhelmed with Work',
      content: 'Too many assignments due this week. Need to manage time better...',
      mood: 'stressed',
    },
  ];

  const moods = [
    { id: 'happy', emoji: '😄', label: 'Happy' },
    { id: 'fine', emoji: '🙂', label: 'Fine' },
    { id: 'neutral', emoji: '😐', label: 'Neutral' },
    { id: 'stressed', emoji: '😟', label: 'Stressed' },
    { id: 'bad', emoji: '😭', label: 'Bad' },
  ];

  const tabs = [
    { id: 'mood', label: 'Mood' },
    { id: 'diet', label: 'Diet' },
    { id: 'journal', label: 'Journal' },
    { id: 'graphs', label: 'Graphs' },
    { id: 'report', label: 'Monthly Report' },
  ];

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const openMoodPanel = (date?: string) => {
    setSelectedDate(date || new Date().toLocaleDateString());
    setPanelMode('mood');
    setSidePanelOpen(true);
  };

  const openDietPanel = () => {
    setSelectedDate(new Date().toLocaleDateString());
    setPanelMode('diet');
    setSidePanelOpen(true);
  };

  const openJournalPanel = (entry?: JournalEntry) => {
    if (entry) {
      setJournalTitle(entry.title);
      setJournalContent(entry.content);
      setJournalMood(entry.mood);
    } else {
      setJournalTitle('');
      setJournalContent('');
      setJournalMood(undefined);
    }
    setPanelMode('journal');
    setSidePanelOpen(true);
  };

  const closePanel = () => {
    setSidePanelOpen(false);
    setTimeout(() => {
      setPanelMode(null);
      setSelectedDate('');
    }, 300);
  };

  const getCalorieEmoji = (calories: number) => {
    if (calories < 1200) return '😟';
    if (calories < 1800) return '🙂';
    if (calories < 2500) return '😄';
    return '😅';
  };

  const avgCalories = Math.round(dailyDiets.reduce((sum, d) => sum + d.totalCalories, 0) / dailyDiets.length);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - new Date().getDate();

  // Helper function to parse food input
  const understandFood = () => {
    const input = foodInput.toLowerCase();
    const foods: FoodItem[] = [];
    
    // Simple food database with calorie estimates
    const foodDatabase: { [key: string]: { calories: number; isOily: boolean } } = {
      'roti': { calories: 70, isOily: false },
      'chapati': { calories: 70, isOily: false },
      'dal': { calories: 120, isOily: false },
      'rice': { calories: 130, isOily: false },
      'biryani': { calories: 300, isOily: true },
      'gulab jamun': { calories: 150, isOily: true },
      'samosa': { calories: 250, isOily: true },
      'paratha': { calories: 150, isOily: true },
      'paneer': { calories: 200, isOily: false },
      'chicken': { calories: 165, isOily: false },
      'fish': { calories: 140, isOily: false },
      'egg': { calories: 70, isOily: false },
      'salad': { calories: 50, isOily: false },
      'curd': { calories: 60, isOily: false },
      'yogurt': { calories: 60, isOily: false },
      'milk': { calories: 100, isOily: false },
      'bread': { calories: 80, isOily: false },
      'curry': { calories: 150, isOily: true },
      'sabzi': { calories: 100, isOily: true },
      'vegetable': { calories: 50, isOily: false },
      'fruit': { calories: 60, isOily: false },
      'apple': { calories: 95, isOily: false },
      'banana': { calories: 105, isOily: false },
    };

    // Try to detect foods and quantities
    Object.keys(foodDatabase).forEach(food => {
      if (input.includes(food)) {
        // Extract quantity (simple regex for numbers before the food)
        const regex = new RegExp(`(\\d+)\\s*(?:bowl|plate|piece|pieces|katori)?\\s*${food}`, 'i');
        const match = input.match(regex);
        const quantity = match ? parseInt(match[1]) : 1;
        
        const foodInfo = foodDatabase[food];
        foods.push({
          name: food.charAt(0).toUpperCase() + food.slice(1),
          portion: quantity,
          size: 'regular',
          oilLevel: foodInfo.isOily ? 'normal' : undefined,
          calories: foodInfo.calories * quantity,
        });
      }
    });

    setDetectedFoods(foods);
  };

  // Helper function to calculate meal calories
  const calculateMealCalories = (mealItems: MealItem[]) => {
    return mealItems.reduce((sum, item) => sum + item.calories, 0);
  };

  // Helper function to save meal
  const saveMeal = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    const setters = {
      breakfast: setBreakfast,
      lunch: setLunch,
      dinner: setDinner,
      snacks: setSnacks,
    };
    
    const setter = setters[mealType];
    setter(prev => [...prev, ...detectedFoods]);
    
    const totalCalories = detectedFoods.reduce((sum, item) => sum + item.calories, 0);
    const mealNames = {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snacks: 'Snacks'
    };
    
    addNotification({
      title: `${mealNames[mealType]} Logged`,
      message: `Added ${detectedFoods.length} item(s) with ${totalCalories} calories.`,
      type: 'success',
      tab: 'wellness',
    });
    
    // Reset
    setActiveInput(null);
    setFoodInput('');
    setDetectedFoods([]);
  };

  // Helper function to update food item
  const updateFoodItem = (index: number, field: keyof FoodItem, value: any) => {
    setDetectedFoods(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      
      // Recalculate calories based on portion and size
      if (field === 'portion' || field === 'size' || field === 'oilLevel') {
        const baseCalories = updated[index].calories / updated[index].portion;
        let multiplier = updated[index].portion;
        
        // Adjust for size
        if (updated[index].size === 'small') multiplier *= 0.75;
        if (updated[index].size === 'large') multiplier *= 1.5;
        
        // Adjust for oil
        if (updated[index].oilLevel === 'low') multiplier *= 0.9;
        if (updated[index].oilLevel === 'heavy') multiplier *= 1.2;
        
        updated[index].calories = Math.round(baseCalories * multiplier);
      }
      
      return updated;
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Horizontal Tab Navigation */}
      <div className={`border-b ${theme === 'dark' ? 'border-zinc-800/50' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-8 pt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 px-2 relative transition-all ${
                  activeTab === tab.id
                    ? theme === 'dark'
                      ? 'text-white'
                      : 'text-gray-900'
                    : theme === 'dark'
                    ? 'text-zinc-500 hover:text-zinc-300'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className={activeTab === tab.id ? 'font-semibold' : 'font-medium'}>
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      {activeTab !== 'report' && (
        <div className="max-w-7xl mx-auto px-8 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateMonth('prev')}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        {/* MOOD TAB */}
        {activeTab === 'mood' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Mood Summary */}
            <div className={`rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Monthly Mood Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Average Mood
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">😊</span>
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      4.2/5
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Best Day
                  </span>
                  <span className={`${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Nov 23 😄
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Tough Day
                  </span>
                  <span className={`${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                    Nov 25 😟
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Days Logged
                  </span>
                  <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {dailyMoods.length}/27
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Mood Chart */}
            <div className={`rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                This Week's Trend
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyMoodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#27272A' : '#E5E7EB'} />
                  <XAxis dataKey="day" stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} />
                  <YAxis stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} domain={[0, 5]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#18181B' : '#FFFFFF',
                      border: `1px solid ${theme === 'dark' ? '#27272A' : '#E5E7EB'}`,
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#4ADE80" strokeWidth={2} dot={{ fill: '#4ADE80' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Daily Mood Entries */}
            <div className={`lg:col-span-2 rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Daily Entries
                </h3>
                <button
                  onClick={() => openMoodPanel()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Log Today
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {dailyMoods.map((entry, idx) => (
                  <button
                    key={idx}
                    onClick={() => openMoodPanel(entry.date)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'bg-zinc-800/50 hover:bg-zinc-800'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{entry.emoji}</span>
                      <div className="text-left">
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {entry.date}
                        </p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DIET TAB */}
        {activeTab === 'diet' && (
          <div className="space-y-6">
            {/* Monthly Diet Goal Card */}
            <div className={`rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Monthly Diet Goal
                </h3>
                <button
                  onClick={openDietPanel}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Log Today's Diet
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Goal
                  </p>
                  <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Maintain Weight
                  </p>
                </div>
                <div>
                  <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Target Calories/Day
                  </p>
                  <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {targetCalories} cal
                  </p>
                </div>
                <div>
                  <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Average Calories/Day
                  </p>
                  <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {avgCalories} cal
                  </p>
                </div>
                <div>
                  <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Days Left
                  </p>
                  <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {daysLeft} days
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                    Monthly Progress
                  </span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {Math.round((avgCalories / targetCalories) * 100)}%
                  </span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
                }`}>
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all"
                    style={{ width: `${(avgCalories / targetCalories) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Meal Summaries */}
              <div className={`rounded-xl p-6 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border border-zinc-800'
                  : 'bg-white border border-gray-200'
              }`}>
                <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Recent Meals
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {dailyDiets.map((day, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {day.date}
                        </span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          {day.totalCalories} cal
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <Coffee className={`w-4 h-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
                          <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                            {day.breakfast.length} items
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Apple className={`w-4 h-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                          <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                            {day.lunch.length} items
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Moon className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                          <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                            {day.dinner.length} items
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className={`w-4 h-4 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />
                          <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                            {day.snacks.length} items
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Water & Calories Widget */}
              <div className="space-y-6">
                {/* Water Intake */}
                <div className={`rounded-xl p-6 ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border border-zinc-800'
                    : 'bg-white border border-gray-200'
                }`}>
                  <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Today's Water Intake
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-3xl ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      💧
                    </span>
                    <span className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      6/8 glasses
                    </span>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
                  }`}>
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>

                {/* Daily Calories Meter */}
                <div className={`rounded-xl p-6 ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border border-zinc-800'
                    : 'bg-white border border-gray-200'
                }`}>
                  <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Today's Calories
                  </h3>
                  <div className="text-center mb-4">
                    <span className="text-5xl">{getCalorieEmoji(1650)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                        Consumed
                      </span>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        1,650 / 2,000 cal
                      </span>
                    </div>
                    <div className={`h-3 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
                    }`}>
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all"
                        style={{ width: '82.5%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Calories Graph */}
            <div className={`rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Weekly Calories Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyCaloriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#27272A' : '#E5E7EB'} />
                  <XAxis dataKey="day" stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} />
                  <YAxis stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#18181B' : '#FFFFFF',
                      border: `1px solid ${theme === 'dark' ? '#27272A' : '#E5E7EB'}`,
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="calories" fill="#4ADE80" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* JOURNAL TAB */}
        {activeTab === 'journal' && (
          <div className={`rounded-xl p-6 ${
            theme === 'dark'
              ? 'bg-zinc-900 border border-zinc-800'
              : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Journal Entries
              </h3>
              <button
                onClick={() => openJournalPanel()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                <Plus className="w-4 h-4" />
                New Entry
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => openJournalPanel(entry)}
                  className={`w-full text-left p-6 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-800/50 hover:bg-zinc-800'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {entry.mood && (
                        <span className="text-2xl">
                          {moods.find(m => m.id === entry.mood)?.emoji}
                        </span>
                      )}
                      <div>
                        <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {entry.title}
                        </h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                          {entry.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className={`text-sm line-clamp-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    {entry.content}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GRAPHS TAB */}
        {activeTab === 'graphs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mood Trend */}
            <div className={`rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Mood Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyMoodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#27272A' : '#E5E7EB'} />
                  <XAxis dataKey="day" stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} />
                  <YAxis stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} domain={[0, 5]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#18181B' : '#FFFFFF',
                      border: `1px solid ${theme === 'dark' ? '#27272A' : '#E5E7EB'}`,
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#4ADE80" strokeWidth={2} dot={{ fill: '#4ADE80' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Calories Trend */}
            <div className={`rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Calories Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyCaloriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#27272A' : '#E5E7EB'} />
                  <XAxis dataKey="day" stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} />
                  <YAxis stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#18181B' : '#FFFFFF',
                      border: `1px solid ${theme === 'dark' ? '#27272A' : '#E5E7EB'}`,
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="calories" stroke="#60A5FA" strokeWidth={2} dot={{ fill: '#60A5FA' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Water Intake Graph */}
            <div className={`rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Water Intake Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailyDiets.map(d => ({ day: d.date.slice(-2), water: d.water }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#27272A' : '#E5E7EB'} />
                  <XAxis dataKey="day" stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} />
                  <YAxis stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} domain={[0, 8]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#18181B' : '#FFFFFF',
                      border: `1px solid ${theme === 'dark' ? '#27272A' : '#E5E7EB'}`,
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="water" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Weight Progress (Mock) */}
            <div className={`rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Weight Progress
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={[
                  { week: 'W1', weight: 70 },
                  { week: 'W2', weight: 69.5 },
                  { week: 'W3', weight: 69.8 },
                  { week: 'W4', weight: 69.2 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#27272A' : '#E5E7EB'} />
                  <XAxis dataKey="week" stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} />
                  <YAxis stroke={theme === 'dark' ? '#71717A' : '#9CA3AF'} domain={[68, 71]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#18181B' : '#FFFFFF',
                      border: `1px solid ${theme === 'dark' ? '#27272A' : '#E5E7EB'}`,
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* MONTHLY REPORT TAB */}
        {activeTab === 'report' && (
          <div className="max-w-4xl mx-auto space-y-6 pt-8">
            {/* Generate Report Section */}
            <div className={`rounded-xl p-8 text-center ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <div className="mb-6">
                <Calendar className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                }`} />
                <h2 className={`text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  November 2025 Wellness Report
                </h2>
                <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Comprehensive summary of your wellness journey this month
                </p>
              </div>
              <button
                className={`px-6 py-3 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Generate Report
              </button>
            </div>

            {/* Summary Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mood Summary */}
              <div className={`rounded-xl p-6 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border border-zinc-800'
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">😊</span>
                  <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Mood Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Average
                    </span>
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      4.2/5
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Happy Days
                    </span>
                    <span className={`${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      18 days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Improvement
                    </span>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diet Summary */}
              <div className={`rounded-xl p-6 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border border-zinc-800'
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🍎</span>
                  <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Diet Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Avg Calories
                    </span>
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      1,950 cal
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Goal Achievement
                    </span>
                    <span className={`${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      92%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Consistency
                    </span>
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      25/27 days
                    </span>
                  </div>
                </div>
              </div>

              {/* Water Summary */}
              <div className={`rounded-xl p-6 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border border-zinc-800'
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">💧</span>
                  <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Hydration Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Avg Glasses/Day
                    </span>
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      6.5/8
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Goal Met Days
                    </span>
                    <span className={`${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      20 days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Improvement
                    </span>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>+8%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Energy Summary */}
              <div className={`rounded-xl p-6 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border border-zinc-800'
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">⚡</span>
                  <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Energy Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Avg Level
                    </span>
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      72%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Peak Days
                    </span>
                    <span className={`${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      12 days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Trend
                    </span>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>Improving</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className={`rounded-xl p-6 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Export & Share
              </h3>
              <div className="flex gap-4">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Export to PDF
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  Send to SharePoint
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Email Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide-Out Panel */}
      <AnimatePresence>
        {sidePanelOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed top-0 right-0 h-full w-full md:w-[480px] ${
                theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
              } shadow-2xl z-50 overflow-y-auto`}
            >
              {/* Panel Header */}
              <div className={`sticky top-0 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} border-b ${
                theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
              } p-6 flex items-center justify-between z-10`}>
                <h3 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {panelMode === 'mood' && 'Log Your Mood'}
                  {panelMode === 'diet' && 'Log Today\'s Diet'}
                  {panelMode === 'journal' && 'Journal Entry'}
                </h3>
                <button
                  onClick={closePanel}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-zinc-800 text-zinc-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="p-6 space-y-6">
                {/* MOOD PANEL */}
                {panelMode === 'mood' && (
                  <>
                    <div>
                      <label className={`block text-sm mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        How are you feeling?
                      </label>
                      <div className="grid grid-cols-5 gap-3">
                        {moods.map((mood) => (
                          <button
                            key={mood.id}
                            onClick={() => setSelectedMood(mood.id as MoodType)}
                            className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                              selectedMood === mood.id
                                ? theme === 'dark'
                                  ? 'bg-emerald-500/20 ring-2 ring-emerald-500'
                                  : 'bg-emerald-50 ring-2 ring-emerald-500'
                                : theme === 'dark'
                                ? 'bg-zinc-800 hover:bg-zinc-700'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            <span className="text-2xl">{mood.emoji}</span>
                            <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                              {mood.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Description (optional)
                      </label>
                      <textarea
                        value={moodDescription}
                        onChange={(e) => setMoodDescription(e.target.value)}
                        placeholder="What's on your mind?"
                        className={`w-full h-32 px-4 py-3 rounded-lg resize-none ${
                          theme === 'dark'
                            ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      />
                    </div>

                    <button
                      onClick={() => {
                        addNotification({
                          title: 'Mood Logged',
                          message: `Your ${selectedMood} mood for ${selectedDate} has been recorded.`,
                          type: 'success',
                          tab: 'wellness',
                        });
                        closePanel();
                      }}
                      className={`w-full py-3 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      Save Mood
                    </button>
                  </>
                )}

                {/* DIET PANEL */}
                {panelMode === 'diet' && (
                  <>
                    {/* Breakfast */}
                    <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Coffee className={`w-5 h-5 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Breakfast
                          </h4>
                        </div>
                        {breakfast.length > 0 && (
                          <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            {calculateMealCalories(breakfast)} cal
                          </span>
                        )}
                      </div>

                      {/* Saved Items */}
                      {breakfast.length > 0 && (
                        <div className={`mb-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-white'}`}>
                          <div className="space-y-1 text-sm">
                            {breakfast.map((item, idx) => (
                              <div key={idx} className={`${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                                {item.name} ({item.portion}x {item.size})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add Item Button */}
                      {activeInput !== 'breakfast' && (
                        <button
                          onClick={() => setActiveInput('breakfast')}
                          className={`w-full py-2 rounded-lg text-sm transition-colors ${
                            theme === 'dark'
                              ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <Plus className="w-4 h-4 inline mr-2" />
                          Add Item
                        </button>
                      )}

                      {/* Food Input Popup */}
                      {activeInput === 'breakfast' && (
                        <div className="space-y-4">
                          <div className={`p-4 rounded-lg border ${
                            theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-gray-100 border-gray-300'
                          }`}>
                            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                              What did you eat for Breakfast?
                            </p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={foodInput}
                                onChange={(e) => setFoodInput(e.target.value)}
                                placeholder="e.g. 2 roti, 1 bowl dal, some rice"
                                className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                                  theme === 'dark'
                                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                              />
                              <button
                                onClick={understandFood}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                Understand Food
                              </button>
                            </div>
                          </div>

                          {/* Confirm Foods */}
                          {detectedFoods.length > 0 && (
                            <div className="space-y-3">
                              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                                Confirm your food:
                              </p>
                              {detectedFoods.map((food, idx) => (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-lg ${
                                    theme === 'dark' ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                      {food.name}
                                    </span>
                                    <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                      {food.calories} cal
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Portion
                                      </label>
                                      <select
                                        value={food.portion}
                                        onChange={(e) => updateFoodItem(idx, 'portion', Number(e.target.value))}
                                        className={`w-full px-2 py-1.5 rounded text-sm ${
                                          theme === 'dark'
                                            ? 'bg-zinc-800 border-zinc-700 text-white'
                                            : 'bg-gray-50 border-gray-200 text-gray-900'
                                        } border`}
                                      >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Size
                                      </label>
                                      <select
                                        value={food.size}
                                        onChange={(e) => updateFoodItem(idx, 'size', e.target.value)}
                                        className={`w-full px-2 py-1.5 rounded text-sm ${
                                          theme === 'dark'
                                            ? 'bg-zinc-800 border-zinc-700 text-white'
                                            : 'bg-gray-50 border-gray-200 text-gray-900'
                                        } border`}
                                      >
                                        <option value="small">Small</option>
                                        <option value="regular">Regular</option>
                                        <option value="large">Large</option>
                                      </select>
                                    </div>
                                    {food.oilLevel && (
                                      <div className="col-span-2">
                                        <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                          Oil Level
                                        </label>
                                        <select
                                          value={food.oilLevel}
                                          onChange={(e) => updateFoodItem(idx, 'oilLevel', e.target.value)}
                                          className={`w-full px-2 py-1.5 rounded text-sm ${
                                            theme === 'dark'
                                              ? 'bg-zinc-800 border-zinc-700 text-white'
                                              : 'bg-gray-50 border-gray-200 text-gray-900'
                                          } border`}
                                        >
                                          <option value="low">Low</option>
                                          <option value="normal">Normal</option>
                                          <option value="heavy">Heavy</option>
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                              <button
                                onClick={() => saveMeal('breakfast')}
                                className={`w-full py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                Save to Breakfast
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Lunch */}
                    <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Apple className={`w-5 h-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Lunch
                          </h4>
                        </div>
                        {lunch.length > 0 && (
                          <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            {calculateMealCalories(lunch)} cal
                          </span>
                        )}
                      </div>

                      {/* Saved Items */}
                      {lunch.length > 0 && (
                        <div className={`mb-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-white'}`}>
                          <div className="space-y-1 text-sm">
                            {lunch.map((item, idx) => (
                              <div key={idx} className={`${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                                {item.name} ({item.portion}x {item.size})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeInput !== 'lunch' && (
                        <button
                          onClick={() => setActiveInput('lunch')}
                          className={`w-full py-2 rounded-lg text-sm transition-colors ${
                            theme === 'dark'
                              ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <Plus className="w-4 h-4 inline mr-2" />
                          Add Item
                        </button>
                      )}

                      {activeInput === 'lunch' && (
                        <div className="space-y-4">
                          <div className={`p-4 rounded-lg border ${
                            theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-gray-100 border-gray-300'
                          }`}>
                            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                              What did you eat for Lunch?
                            </p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={foodInput}
                                onChange={(e) => setFoodInput(e.target.value)}
                                placeholder="e.g. 2 roti, 1 bowl dal, some rice"
                                className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                                  theme === 'dark'
                                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                              />
                              <button
                                onClick={understandFood}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                Understand Food
                              </button>
                            </div>
                          </div>

                          {detectedFoods.length > 0 && (
                            <div className="space-y-3">
                              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                                Confirm your food:
                              </p>
                              {detectedFoods.map((food, idx) => (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-lg ${
                                    theme === 'dark' ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                      {food.name}
                                    </span>
                                    <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                      {food.calories} cal
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Portion
                                      </label>
                                      <select
                                        value={food.portion}
                                        onChange={(e) => updateFoodItem(idx, 'portion', Number(e.target.value))}
                                        className={`w-full px-2 py-1.5 rounded text-sm ${
                                          theme === 'dark'
                                            ? 'bg-zinc-800 border-zinc-700 text-white'
                                            : 'bg-gray-50 border-gray-200 text-gray-900'
                                        } border`}
                                      >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Size
                                      </label>
                                      <select
                                        value={food.size}
                                        onChange={(e) => updateFoodItem(idx, 'size', e.target.value)}
                                        className={`w-full px-2 py-1.5 rounded text-sm ${
                                          theme === 'dark'
                                            ? 'bg-zinc-800 border-zinc-700 text-white'
                                            : 'bg-gray-50 border-gray-200 text-gray-900'
                                        } border`}
                                      >
                                        <option value="small">Small</option>
                                        <option value="regular">Regular</option>
                                        <option value="large">Large</option>
                                      </select>
                                    </div>
                                    {food.oilLevel && (
                                      <div className="col-span-2">
                                        <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                          Oil Level
                                        </label>
                                        <select
                                          value={food.oilLevel}
                                          onChange={(e) => updateFoodItem(idx, 'oilLevel', e.target.value)}
                                          className={`w-full px-2 py-1.5 rounded text-sm ${
                                            theme === 'dark'
                                              ? 'bg-zinc-800 border-zinc-700 text-white'
                                              : 'bg-gray-50 border-gray-200 text-gray-900'
                                          } border`}
                                        >
                                          <option value="low">Low</option>
                                          <option value="normal">Normal</option>
                                          <option value="heavy">Heavy</option>
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                              <button
                                onClick={() => saveMeal('lunch')}
                                className={`w-full py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                Save to Lunch
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Dinner */}
                    <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Dinner
                          </h4>
                        </div>
                        {dinner.length > 0 && (
                          <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            {calculateMealCalories(dinner)} cal
                          </span>
                        )}
                      </div>

                      {dinner.length > 0 && (
                        <div className={`mb-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-white'}`}>
                          <div className="space-y-1 text-sm">
                            {dinner.map((item, idx) => (
                              <div key={idx} className={`${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                                {item.name} ({item.portion}x {item.size})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeInput !== 'dinner' && (
                        <button
                          onClick={() => setActiveInput('dinner')}
                          className={`w-full py-2 rounded-lg text-sm transition-colors ${
                            theme === 'dark'
                              ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <Plus className="w-4 h-4 inline mr-2" />
                          Add Item
                        </button>
                      )}

                      {activeInput === 'dinner' && (
                        <div className="space-y-4">
                          <div className={`p-4 rounded-lg border ${
                            theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-gray-100 border-gray-300'
                          }`}>
                            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                              What did you eat for Dinner?
                            </p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={foodInput}
                                onChange={(e) => setFoodInput(e.target.value)}
                                placeholder="e.g. 2 roti, 1 bowl dal, some rice"
                                className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                                  theme === 'dark'
                                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                              />
                              <button
                                onClick={understandFood}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                Understand Food
                              </button>
                            </div>
                          </div>

                          {detectedFoods.length > 0 && (
                            <div className="space-y-3">
                              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                                Confirm your food:
                              </p>
                              {detectedFoods.map((food, idx) => (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-lg ${
                                    theme === 'dark' ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                      {food.name}
                                    </span>
                                    <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                      {food.calories} cal
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Portion
                                      </label>
                                      <select
                                        value={food.portion}
                                        onChange={(e) => updateFoodItem(idx, 'portion', Number(e.target.value))}
                                        className={`w-full px-2 py-1.5 rounded text-sm ${
                                          theme === 'dark'
                                            ? 'bg-zinc-800 border-zinc-700 text-white'
                                            : 'bg-gray-50 border-gray-200 text-gray-900'
                                        } border`}
                                      >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Size
                                      </label>
                                      <select
                                        value={food.size}
                                        onChange={(e) => updateFoodItem(idx, 'size', e.target.value)}
                                        className={`w-full px-2 py-1.5 rounded text-sm ${
                                          theme === 'dark'
                                            ? 'bg-zinc-800 border-zinc-700 text-white'
                                            : 'bg-gray-50 border-gray-200 text-gray-900'
                                        } border`}
                                      >
                                        <option value="small">Small</option>
                                        <option value="regular">Regular</option>
                                        <option value="large">Large</option>
                                      </select>
                                    </div>
                                    {food.oilLevel && (
                                      <div className="col-span-2">
                                        <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                          Oil Level
                                        </label>
                                        <select
                                          value={food.oilLevel}
                                          onChange={(e) => updateFoodItem(idx, 'oilLevel', e.target.value)}
                                          className={`w-full px-2 py-1.5 rounded text-sm ${
                                            theme === 'dark'
                                              ? 'bg-zinc-800 border-zinc-700 text-white'
                                              : 'bg-gray-50 border-gray-200 text-gray-900'
                                          } border`}
                                        >
                                          <option value="low">Low</option>
                                          <option value="normal">Normal</option>
                                          <option value="heavy">Heavy</option>
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                              <button
                                onClick={() => saveMeal('dinner')}
                                className={`w-full py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                Save to Dinner
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Snacks */}
                    <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Heart className={`w-5 h-5 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Snacks
                          </h4>
                        </div>
                        {snacks.length > 0 && (
                          <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            {calculateMealCalories(snacks)} cal
                          </span>
                        )}
                      </div>

                      {snacks.length > 0 && (
                        <div className={`mb-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-white'}`}>
                          <div className="space-y-1 text-sm">
                            {snacks.map((item, idx) => (
                              <div key={idx} className={`${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                                {item.name} ({item.portion}x {item.size})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeInput !== 'snacks' && (
                        <button
                          onClick={() => setActiveInput('snacks')}
                          className={`w-full py-2 rounded-lg text-sm transition-colors ${
                            theme === 'dark'
                              ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <Plus className="w-4 h-4 inline mr-2" />
                          Add Item
                        </button>
                      )}

                      {activeInput === 'snacks' && (
                        <div className="space-y-4">
                          <div className={`p-4 rounded-lg border ${
                            theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-gray-100 border-gray-300'
                          }`}>
                            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                              What did you eat for Snacks?
                            </p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={foodInput}
                                onChange={(e) => setFoodInput(e.target.value)}
                                placeholder="e.g. 2 samosa, 1 gulab jamun"
                                className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                                  theme === 'dark'
                                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                              />
                              <button
                                onClick={understandFood}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                Understand Food
                              </button>
                            </div>
                          </div>

                          {detectedFoods.length > 0 && (
                            <div className="space-y-3">
                              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                                Confirm your food:
                              </p>
                              {detectedFoods.map((food, idx) => (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-lg ${
                                    theme === 'dark' ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                      {food.name}
                                    </span>
                                    <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                      {food.calories} cal
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Portion
                                      </label>
                                      <select
                                        value={food.portion}
                                        onChange={(e) => updateFoodItem(idx, 'portion', Number(e.target.value))}
                                        className={`w-full px-2 py-1.5 rounded text-sm ${
                                          theme === 'dark'
                                            ? 'bg-zinc-800 border-zinc-700 text-white'
                                            : 'bg-gray-50 border-gray-200 text-gray-900'
                                        } border`}
                                      >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Size
                                      </label>
                                      <select
                                        value={food.size}
                                        onChange={(e) => updateFoodItem(idx, 'size', e.target.value)}
                                        className={`w-full px-2 py-1.5 rounded text-sm ${
                                          theme === 'dark'
                                            ? 'bg-zinc-800 border-zinc-700 text-white'
                                            : 'bg-gray-50 border-gray-200 text-gray-900'
                                        } border`}
                                      >
                                        <option value="small">Small</option>
                                        <option value="regular">Regular</option>
                                        <option value="large">Large</option>
                                      </select>
                                    </div>
                                    {food.oilLevel && (
                                      <div className="col-span-2">
                                        <label className={`text-xs mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                          Oil Level
                                        </label>
                                        <select
                                          value={food.oilLevel}
                                          onChange={(e) => updateFoodItem(idx, 'oilLevel', e.target.value)}
                                          className={`w-full px-2 py-1.5 rounded text-sm ${
                                            theme === 'dark'
                                              ? 'bg-zinc-800 border-zinc-700 text-white'
                                              : 'bg-gray-50 border-gray-200 text-gray-900'
                                          } border`}
                                        >
                                          <option value="low">Low</option>
                                          <option value="normal">Normal</option>
                                          <option value="heavy">Heavy</option>
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                              <button
                                onClick={() => saveMeal('snacks')}
                                className={`w-full py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                Save to Snacks
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Water Intake */}
                    <div>
                      <label className={`block text-sm mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Water Intake (glasses)
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            theme === 'dark'
                              ? 'bg-zinc-800 hover:bg-zinc-700'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className={`text-2xl flex-1 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {waterIntake} / 8
                        </span>
                        <button
                          onClick={() => setWaterIntake(Math.min(8, waterIntake + 1))}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            theme === 'dark'
                              ? 'bg-zinc-800 hover:bg-zinc-700'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Energy Level */}
                    <div>
                      <label className={`block text-sm mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Energy Level: {energyLevel}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={energyLevel}
                        onChange={(e) => setEnergyLevel(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #4ADE80 0%, #4ADE80 ${energyLevel}%, ${
                            theme === 'dark' ? '#27272A' : '#E5E7EB'
                          } ${energyLevel}%, ${theme === 'dark' ? '#27272A' : '#E5E7EB'} 100%)`,
                        }}
                      />
                    </div>

                    {/* Disclaimer */}
                    <div className={`text-xs text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Calories are approximate and for reference only, not medical advice.
                    </div>

                    <button
                      onClick={() => {
                        const totalCals = calculateMealCalories(breakfast) + calculateMealCalories(lunch) + calculateMealCalories(dinner) + calculateMealCalories(snacks);
                        addNotification({
                          title: 'Diet Logged',
                          message: `Daily diet saved with ${totalCals} total calories and ${waterIntake} glasses of water.`,
                          type: 'success',
                          tab: 'wellness',
                        });
                        closePanel();
                      }}
                      className={`w-full py-3 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      Save Day
                    </button>
                  </>
                )}

                {/* JOURNAL PANEL */}
                {panelMode === 'journal' && (
                  <>
                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Title
                      </label>
                      <input
                        type="text"
                        value={journalTitle}
                        onChange={(e) => setJournalTitle(e.target.value)}
                        placeholder="Entry title..."
                        className={`w-full px-4 py-3 rounded-lg ${
                          theme === 'dark'
                            ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Content
                      </label>
                      <textarea
                        value={journalContent}
                        onChange={(e) => setJournalContent(e.target.value)}
                        placeholder="What's on your mind today?"
                        className={`w-full h-64 px-4 py-3 rounded-lg resize-none ${
                          theme === 'dark'
                            ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Mood Tag (optional)
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {moods.map((mood) => (
                          <button
                            key={mood.id}
                            onClick={() => setJournalMood(mood.id as MoodType)}
                            className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                              journalMood === mood.id
                                ? theme === 'dark'
                                  ? 'bg-emerald-500/20 ring-2 ring-emerald-500'
                                  : 'bg-emerald-50 ring-2 ring-emerald-500'
                                : theme === 'dark'
                                ? 'bg-zinc-800 hover:bg-zinc-700'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            <span className="text-xl">{mood.emoji}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addNotification({
                          title: 'Journal Entry Saved',
                          message: journalTitle ? `"${journalTitle}" has been saved to your journal.` : 'Your journal entry has been saved.',
                          type: 'success',
                          tab: 'wellness',
                        });
                        closePanel();
                      }}
                      className={`w-full py-3 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      Save Entry
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
