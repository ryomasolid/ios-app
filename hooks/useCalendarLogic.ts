import { STATUS_NO, STATUS_NONE, STATUS_YES } from '@/constants/Status';
import { calendarAtom } from '@/store/atoms';
import { getAllData, setStatusForDate } from '@/store/firestore';
import { CalendarDto } from '@/types/api';
import { useEffect, useMemo, useState } from 'react';

const getTodayJST = (): string => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tokyo',
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find(p => p.type === 'year')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const day = parts.find(p => p.type === 'day')?.value;
  return `${year}-${month}-${day}`;
};

const color = (value?: string): string | undefined => {
  switch (value) {
    case STATUS_YES:
      return '#FFC78A';
    case STATUS_NO:
      return '#5EDC74';
    default:
      return undefined;
  }
};

export const useCalendarLogic = () => {
  const { useAtom } = require("jotai");
  const [calendarValues, setClendarValues] = useAtom(calendarAtom);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [status, setStatus] = useState<string>(STATUS_NONE);
  const [maxNoStreak, setMaxNoStreak] = useState<number>(0);
  const [currentNoStreak, setCurrentNoStreak] = useState<number>(0);

  const today = useMemo(getTodayJST, []);

  const loadData = async () => {
    try {
      const fetchedData = await getAllData();
      setClendarValues(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateStreak = () => {
    const todayYYYYMMDD = today.replace(/-/g, '');
    const sortedData = [...calendarValues].sort((a, b) => a.date.localeCompare(b.date));

    let maxStreakCount = 0;
    let currentStreakCount = 0;
    for (const item of sortedData) {
      if (item.date > todayYYYYMMDD) break;
      if (item.status === STATUS_NO) {
        currentStreakCount++;
      } else {
        maxStreakCount = Math.max(maxStreakCount, currentStreakCount);
        currentStreakCount = 0;
      }
    }
    maxStreakCount = Math.max(maxStreakCount, currentStreakCount);

    let todayStreakCount = 0;
    const todayData = sortedData.find(item => item.date === todayYYYYMMDD);
    if (todayData && todayData.status === STATUS_NO) {
      todayStreakCount = 1;
      let currentDate = new Date(today);
      while (true) {
        currentDate.setDate(currentDate.getDate() - 1);
        const previousDateYYYYMMDD = currentDate.toISOString().split('T')[0].replace(/-/g, '');
        const previousData = sortedData.find(item => item.date === previousDateYYYYMMDD);
        if (previousData && previousData.status === STATUS_NO) {
          todayStreakCount++;
        } else {
          break;
        }
      }
    }

    setMaxNoStreak(maxStreakCount);
    setCurrentNoStreak(todayStreakCount);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (calendarValues.length > 0) {
      calculateStreak();
    }
  }, [calendarValues]);

  const handleSetStatus = async (value: string) => {
    if (!selectedDate) return;
    const yyyymmdd = selectedDate.replace(/-/g, '');
    await setStatusForDate({ date: yyyymmdd, status: value });
    setStatus(value);
    await loadData();
  };

  const handleDayPress = (date: { dateString: string }) => {
    setSelectedDate(date.dateString);
    const selectedData = calendarValues.find((item: CalendarDto) => item.date === date.dateString.replace(/-/g, ''));
    setStatus(selectedData?.status || STATUS_NONE);
  };

  const markedDates = useMemo(() => {
    const allMarkedDates = calendarValues.reduce((acc: any, current: CalendarDto) => {
      const formattedDate = `${current.date.substring(0, 4)}-${current.date.substring(4, 6)}-${current.date.substring(6, 8)}`;
      return {
        ...acc,
        [formattedDate]: { selected: current.status !== STATUS_NONE, selectedColor: color(current.status) },
      };
    }, {});
    if (selectedDate) {
      allMarkedDates[selectedDate] = {
        ...allMarkedDates[selectedDate],
        selected: true,
        selectedColor: 'rgba(0, 122, 255, 0.2)',
        selectedTextColor: '#000000',
        marked: true,
        dotColor: '#007AFF',
      };
    }
    return allMarkedDates;
  }, [calendarValues, selectedDate]);

  return {
    today,
    calendarValues,
    selectedDate,
    status,
    setStatus,
    maxNoStreak,
    currentNoStreak,
    markedDates,
    handleDayPress,
    handleSetStatus,
  };
};