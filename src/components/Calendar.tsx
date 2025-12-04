import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Bell, X, Edit, Trash2 } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface CalendarProps {
  theme: 'light' | 'dark';
}

type EventType = 'study' | 'exam' | 'counseling' | 'assignment' | 'general';

interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  date: Date;
  time: string;
  notes?: string;
  hasReminder: boolean;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EVENT_COLORS: Record<EventType, { bg: string; text: string; dot: string; border: string }> = {
  study: { 
    bg: 'bg-blue-500/10', 
    text: 'text-blue-400', 
    dot: 'bg-blue-500',
    border: 'border-blue-500/30'
  },
  exam: { 
    bg: 'bg-red-500/10', 
    text: 'text-red-400', 
    dot: 'bg-red-500',
    border: 'border-red-500/30'
  },
  counseling: { 
    bg: 'bg-purple-500/10', 
    text: 'text-purple-400', 
    dot: 'bg-purple-500',
    border: 'border-purple-500/30'
  },
  assignment: { 
    bg: 'bg-yellow-500/10', 
    text: 'text-yellow-400', 
    dot: 'bg-yellow-500',
    border: 'border-yellow-500/30'
  },
  general: { 
    bg: 'bg-emerald-500/10', 
    text: 'text-emerald-400', 
    dot: 'bg-emerald-500',
    border: 'border-emerald-500/30'
  },
};

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  study: 'Study Session',
  exam: 'Exam/Test',
  counseling: 'Counseling',
  assignment: 'Assignment Deadline',
  general: 'General Event',
};

export function Calendar({ theme }: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
  
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  // Sample events
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Biology Study Session',
      type: 'study',
      date: new Date(2024, 10, 28),
      time: '14:00',
      notes: 'Chapter 5-7 review',
      hasReminder: true,
    },
    {
      id: '2',
      title: 'Math Midterm',
      type: 'exam',
      date: new Date(2024, 10, 28),
      time: '09:00',
      hasReminder: true,
    },
    {
      id: '3',
      title: 'Career Counseling',
      type: 'counseling',
      date: new Date(2024, 10, 28),
      time: '16:30',
      hasReminder: false,
    },
    {
      id: '4',
      title: 'English Essay Due',
      type: 'assignment',
      date: new Date(2024, 10, 30),
      time: '23:59',
      hasReminder: true,
    },
    {
      id: '5',
      title: 'Physics Quiz',
      type: 'exam',
      date: new Date(2024, 11, 2),
      time: '11:00',
      hasReminder: true,
    },
    {
      id: '6',
      title: 'Team Meeting',
      type: 'general',
      date: new Date(2024, 11, 5),
      time: '15:00',
      hasReminder: false,
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    type: 'study' as EventType,
    date: '',
    time: '',
    notes: '',
    hasReminder: false,
  });

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setShowSidePanel(false);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    setShowSidePanel(false);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToMonth = (monthIndex: number) => {
    setShowSidePanel(false);
    setCurrentMonth(monthIndex);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const getTodayEvents = () => {
    return events.filter((event) => isSameDay(event.date, today));
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset to start of day for comparison
    
    return events
      .filter((event) => event.date >= now) // Only future and today's events
      .sort((a, b) => a.date.getTime() - b.date.getTime()) // Sort by date ascending
      .slice(0, 3); // Get top 3
  };

  const isPastDate = (date: Date) => {
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    clickedDate.setHours(0, 0, 0, 0);
    
    if (isPastDate(clickedDate)) {
      setWarningMessage('Cannot add events to past dates. Please select today or a future date.');
      setTimeout(() => setWarningMessage(null), 3000);
      return;
    }
    
    setSelectedDate(clickedDate);
    setShowSidePanel(true);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      type: 'study',
      date: today.toISOString().split('T')[0],
      time: '',
      notes: '',
      hasReminder: false,
    });
    setShowEventModal(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      date: event.date.toISOString().split('T')[0],
      time: event.time,
      notes: event.notes || '',
      hasReminder: event.hasReminder,
    });
    setShowSidePanel(false);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    const deletedEvent = events.find(e => e.id === eventId);
    setEvents(events.filter(e => e.id !== eventId));
    const remainingEvents = events.filter(e => 
      e.id !== eventId && 
      selectedDate && 
      isSameDay(e.date, selectedDate)
    );
    if (remainingEvents.length === 0) {
      setShowSidePanel(false);
    }
    if (deletedEvent) {
      addNotification({
        title: 'Event Deleted',
        message: `"${deletedEvent.title}" has been removed from your calendar.`,
        type: 'info',
        tab: 'calendar',
      });
    }
  };

  const handleSaveEvent = () => {
    const eventDate = new Date(formData.date);
    eventDate.setHours(0, 0, 0, 0);
    
    // Validate date is not in the past (only for new events, not edits)
    if (!editingEvent && isPastDate(eventDate)) {
      setWarningMessage('Cannot create events for past dates. Please select today or a future date.');
      setTimeout(() => setWarningMessage(null), 3000);
      return;
    }
    
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(e => 
        e.id === editingEvent.id 
          ? {
              ...e,
              title: formData.title,
              type: formData.type,
              date: new Date(formData.date),
              time: formData.time,
              notes: formData.notes,
              hasReminder: formData.hasReminder,
            }
          : e
      ));
      addNotification({
        title: 'Event Updated',
        message: `"${formData.title}" has been updated successfully.`,
        type: 'success',
        tab: 'calendar',
      });
    } else {
      // Create new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: formData.title,
        type: formData.type,
        date: new Date(formData.date),
        time: formData.time,
        notes: formData.notes,
        hasReminder: formData.hasReminder,
      };
      setEvents([...events, newEvent]);
      addNotification({
        title: 'Event Created',
        message: `"${formData.title}" scheduled for ${eventDate.toLocaleDateString()}.`,
        type: 'success',
        tab: 'calendar',
      });
    }
    setShowEventModal(false);
    setEditingEvent(null);
  };

  const closeModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className={`aspect-square border-r border-b ${
            theme === 'dark' ? 'border-zinc-800 bg-zinc-900/30' : 'border-gray-200 bg-gray-50/30'
          } ${i === 6 ? 'border-r-0' : ''}`}
        />
      );
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      date.setHours(0, 0, 0, 0);
      const isToday = isSameDay(date, today);
      const isPast = isPastDate(date);
      const dayEvents = getEventsForDate(date);
      const hasEvents = dayEvents.length > 0;

      // Get unique event colors (max 3)
      const eventDots = dayEvents.slice(0, 3).map(e => e.type);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isPast && !hasEvents}
          className={`aspect-square border-r border-b flex flex-col items-center justify-center relative transition-colors ${
            theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
          } ${
            (day + firstDay - 1) % 7 === 6 ? 'border-r-0' : ''
          } ${
            isToday
              ? theme === 'dark'
                ? 'bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/50'
                : 'bg-emerald-50 ring-1 ring-inset ring-emerald-600/50'
              : ''
          } ${
            isPast && !hasEvents
              ? theme === 'dark'
                ? 'text-zinc-700 cursor-not-allowed opacity-40'
                : 'text-gray-400 cursor-not-allowed opacity-40'
              : theme === 'dark'
              ? 'hover:bg-zinc-800/50 text-zinc-300'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <span className={`text-sm ${isToday ? 'font-medium' : ''}`}>{day}</span>
          {hasEvents && (
            <div className="flex gap-0.5 mt-1">
              {eventDots.map((type, idx) => (
                <div
                  key={idx}
                  className={`w-1 h-1 rounded-full ${EVENT_COLORS[type].dot}`}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const dayName = DAYS[today.getDay()].toUpperCase();
  const monthName = MONTHS[today.getMonth()];
  const todayEvents = getTodayEvents();
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className={`h-screen flex ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Left Panel - Today Card */}
      <div
        className={`w-80 border-r ${
          theme === 'dark'
            ? 'bg-zinc-900/50 border-zinc-800/50'
            : 'bg-white border-gray-200'
        } p-8 flex flex-col flex-shrink-0`}
      >
        {/* Date Display */}
        <div className="mb-8">
          <div
            className={`text-7xl mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {today.getDate()}
          </div>
          <div
            className={`text-xs tracking-widest mb-1 ${
              theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
            }`}
          >
            {dayName}
          </div>
          <div
            className={`text-xs ${
              theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'
            }`}
          >
            {monthName} {today.getFullYear()}
          </div>
        </div>

        {/* Separator */}
        <div
          className={`h-px mb-6 ${
            theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
          }`}
        />

        {/* Today's Events */}
        <div className="flex-1">
          <div
            className={`text-xs tracking-wide mb-4 ${
              theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
            }`}
          >
            UPCOMING EVENTS
          </div>
          <div className="space-y-3">
            {getUpcomingEvents().length > 0 ? (
              getUpcomingEvents().map((event) => (
                <div key={event.id} className="flex items-start gap-2">
                  <div className={`w-1 h-1 rounded-full ${EVENT_COLORS[event.type].dot} mt-1.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm ${
                        theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                      }`}
                    >
                      {event.title}
                    </div>
                    <div
                      className={`text-xs ${
                        theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'
                      }`}
                    >
                      {MONTHS[event.date.getMonth()]} {event.date.getDate()} • {event.time}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className={`text-sm ${
                  theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'
                }`}
              >
                No upcoming events
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <div
          className={`h-px my-6 ${
            theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
          }`}
        />

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleAddEvent}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              theme === 'dark'
                ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
          <button
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              theme === 'dark'
                ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'
            }`}
          >
            <Bell className="w-4 h-4" />
            Set Reminder
          </button>
        </div>
      </div>

      {/* Right Panel - Calendar Grid */}
      <div className="flex-1 p-8 overflow-auto relative">
        {/* Warning Message */}
        {warningMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div
              className={`px-6 py-3 rounded-lg shadow-2xl border ${
                theme === 'dark'
                  ? 'bg-red-900/90 border-red-800 text-red-200'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              <p className="text-sm">{warningMessage}</p>
            </div>
          </div>
        )}

        {/* Month Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={prevMonth}
              className={`p-1 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-zinc-800 text-zinc-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div
              className={`text-lg min-w-[180px] text-center ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {MONTHS[currentMonth]} {currentYear}
            </div>
            <button
              onClick={nextMonth}
              className={`p-1 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-zinc-800 text-zinc-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Month Selector */}
          <div className="flex justify-center gap-3 flex-wrap max-w-3xl mx-auto">
            {MONTHS.map((month, index) => (
              <button
                key={month}
                onClick={() => goToMonth(index)}
                className={`px-3 py-1 rounded-md text-xs transition-colors ${
                  currentMonth === index
                    ? theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-200'
                      : 'bg-gray-200 text-gray-900'
                    : theme === 'dark'
                    ? 'text-zinc-600 hover:text-zinc-400'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className={`max-w-4xl mx-auto ${showSidePanel ? 'mr-96' : ''} transition-all duration-300`}>
          {/* Day Headers */}
          <div className={`grid grid-cols-7 border ${
            theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
          }`}>
            {DAYS.map((day, index) => (
              <div
                key={day}
                className={`text-center text-xs py-3 border-r ${
                  theme === 'dark' ? 'text-zinc-500 border-zinc-800' : 'text-gray-500 border-gray-200'
                } ${index === 6 ? 'border-r-0' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className={`grid grid-cols-7 border-l border-r border-b ${
            theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
          }`}>{renderCalendarDays()}</div>
        </div>

        {/* Right Side Panel - Event Details */}
        {showSidePanel && selectedDate && (
          <div
            className={`fixed top-0 right-0 h-full w-80 ${
              theme === 'dark'
                ? 'bg-zinc-900 border-l border-zinc-800'
                : 'bg-white border-l border-gray-200'
            } shadow-2xl p-6 overflow-auto z-40`}
          >
            {/* Panel Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div
                  className={`text-2xl mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {selectedDate.getDate()}
                </div>
                <div
                  className={`text-sm ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                  }`}
                >
                  {DAYS[selectedDate.getDay()]}, {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </div>
              </div>
              <button
                onClick={() => setShowSidePanel(false)}
                className={`p-1 rounded-md transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-zinc-800 text-zinc-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Separator */}
            <div
              className={`h-px mb-6 ${
                theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
              }`}
            />

            {/* Events List */}
            <div className="space-y-4">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-xl border ${
                      theme === 'dark'
                        ? `${EVENT_COLORS[event.type].bg} ${EVENT_COLORS[event.type].border}`
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${EVENT_COLORS[event.type].dot}`} />
                        <span
                          className={`text-xs ${
                            theme === 'dark' ? EVENT_COLORS[event.type].text : 'text-gray-600'
                          }`}
                        >
                          {EVENT_TYPE_LABELS[event.type]}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className={`p-1 rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'hover:bg-zinc-800 text-zinc-500'
                              : 'hover:bg-gray-200 text-gray-600'
                          }`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className={`p-1 rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'hover:bg-zinc-800 text-zinc-500'
                              : 'hover:bg-gray-200 text-gray-600'
                          }`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4
                      className={`mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {event.title}
                    </h4>
                    <div
                      className={`text-sm mb-2 ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}
                    >
                      {event.time}
                    </div>
                    {event.notes && (
                      <p
                        className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                        }`}
                      >
                        {event.notes}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div
                  className={`text-sm text-center py-8 ${
                    theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'
                  }`}
                >
                  No events on this day
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div
            className={`${
              theme === 'dark'
                ? 'bg-zinc-900 border-zinc-800'
                : 'bg-white border-gray-200'
            } border rounded-xl p-6 max-w-md w-full`}
          >
            <h3
              className={`text-lg mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {editingEvent ? 'Edit Event' : 'New Event'}
            </h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label
                  className={`block text-xs mb-2 ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'
                  }`}
                >
                  EVENT TITLE
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter event title"
                />
              </div>

              {/* Type */}
              <div>
                <label
                  className={`block text-xs mb-2 ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'
                  }`}
                >
                  TYPE
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as EventType,
                    })
                  }
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-xs mb-2 ${
                      theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'
                    }`}
                  >
                    DATE
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={today.toISOString().split('T')[0]}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      theme === 'dark'
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs mb-2 ${
                      theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'
                    }`}
                  >
                    TIME
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      theme === 'dark'
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  className={`block text-xs mb-2 ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'
                  }`}
                >
                  NOTES
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Add notes..."
                />
              </div>

              {/* Reminder Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={formData.hasReminder}
                  onChange={(e) =>
                    setFormData({ ...formData, hasReminder: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-emerald-600"
                />
                <label
                  htmlFor="reminder"
                  className={`text-sm ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}
                >
                  Set reminder
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={closeModal}
                className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750'
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 bg-emerald-600 rounded-lg text-sm text-white hover:bg-emerald-500 transition-colors"
              >
                {editingEvent ? 'Update Event' : 'Save Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
