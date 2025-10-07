// Week-based localStorage-backed schedule service
const STORAGE_KEY = 'ikids_schedules';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const defaultWeek = Object.fromEntries(DAYS.map(day => [day, []]));

// Storage utilities
function getAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { weeks: {} };
    const parsed = JSON.parse(raw);
    if (parsed && parsed.weeks) return parsed;
    // Backward compatibility: if old format detected (flat days), migrate into current week
    const isOldFormat = DAYS.every((d) => Array.isArray(parsed?.[d]));
    if (isOldFormat) {
      const currentKey = getWeekKey(new Date());
      return { weeks: { [currentKey]: { ...defaultWeek, ...parsed } } };
    }
    return { weeks: {} };
  } catch (e) {
    console.warn('Failed to parse schedules from storage:', e);
    return { weeks: {} };
  }
}

function saveAll(all) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function ensureWeek(all, weekKey) {
  if (!all.weeks[weekKey]) {
    all.weeks[weekKey] = { ...defaultWeek };
  }
}

// Date utilities
export function getWeekKey(date) {
  // Create a new date object to avoid modifying the input
  const d = new Date(date);
  
  // Set to midnight to ensure consistent date handling
  d.setHours(0, 0, 0, 0);
  
  // Get the day of week (0-6, 0 = Sunday)
  const day = d.getDay();
  
  // Calculate days to Monday (if Sunday, go back 6 days, otherwise go back day-1 days)
  const daysToMonday = day === 0 ? 6 : day - 1;
  
  // Go back to Monday
  d.setDate(d.getDate() - daysToMonday);
  
  // Format as YYYY-MM-DD
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getWeekDates(weekKey) {
  // Parse the weekKey (YYYY-MM-DD)
  const [year, month, day] = weekKey.split('-').map(Number);
  
  // Create Monday date (month - 1 because JavaScript months are 0-based)
  const monday = new Date(year, month - 1, day);
  monday.setHours(0, 0, 0, 0);
  
  // Generate array of 7 dates starting from Monday
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
}

export function isPastDate(date) {
  // Create dates using local timezone
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  return checkDate < today;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

// Schedule operations
export function getSchedules(weekKey = getWeekKey(new Date())) {
  const all = getAll();
  ensureWeek(all, weekKey);
  saveAll(all);
  return all.weeks[weekKey];
}

export function addEntry(weekKey, day, entry) {
  const all = getAll();
  ensureWeek(all, weekKey);
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const newEntry = { id, ...entry };
  all.weeks[weekKey][day] = [...(all.weeks[weekKey][day] || []), newEntry];
  saveAll(all);
  return newEntry;
}

export function updateEntry(weekKey, day, id, data) {
  const all = getAll();
  ensureWeek(all, weekKey);
  all.weeks[weekKey][day] = (all.weeks[weekKey][day] || []).map((item) =>
    item.id === id ? { ...item, ...data } : item
  );
  saveAll(all);
}

export function deleteEntry(weekKey, day, id) {
  const all = getAll();
  ensureWeek(all, weekKey);
  all.weeks[weekKey][day] = (all.weeks[weekKey][day] || []).filter((item) => item.id !== id);
  saveAll(all);
}