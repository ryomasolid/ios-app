import { ContainerComponent } from '@/components/ContainerComponent';
import { STATUS_NO, STATUS_NONE, STATUS_YES } from '@/constants/Status';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { calendarAtom } from '@/store/atoms';
import { getAllData } from '@/store/firestore';
import { CalendarDto } from '@/types/api';
import React, { useEffect, useMemo } from 'react';
import { Calendar } from 'react-native-calendars';

const today = new Date().toISOString().split('T')[0];

export default function CalendarScreen() {
  const theme = useThemeStyles()

  const { useAtom } = require("jotai");
  const [calendarValues, setClendarValues] = useAtom(calendarAtom);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await getAllData();
        setClendarValues(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [])

  const color = (value?: string) => {
    switch (value) {
      case STATUS_NONE:
        return undefined
      case STATUS_YES:
        return '#FFC78A'
      case STATUS_NO:
        return '#5EDC74'
      default:
        return undefined
    }
  }

  const markedDates = useMemo(() => {
    return calendarValues.reduce((acc: any, current: CalendarDto) => {
      const year = current.date.substring(0, 4);
      const month = current.date.substring(4, 6);
      const day = current.date.substring(6, 8);
      const formattedDate = `${year}-${month}-${day}`;

      return {
        ...acc,
        [formattedDate]: { selected: current.status === STATUS_NONE ? false : true, selectedColor: color(current.status) },
      };
    }, {});
  }, [calendarValues]);

  return (
    <ContainerComponent>
      <Calendar
        current={today}
        markedDates={markedDates}
        firstDay={1}
        hideExtraDays={true}
        enableSwipeMonths={true}
        theme={{
          calendarBackground: theme.color2,
          arrowColor: '#2D4150'
        }}
        style={{
          marginVertical: 10,
          paddingBottom: 10,
          backgroundColor: theme.color2
        }}
      />
    </ContainerComponent>
  );
}