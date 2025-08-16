import { ContainerComponent } from '@/components/ContainerComponent';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import React from 'react';
import { Calendar } from 'react-native-calendars';

const today = new Date().toISOString().split('T')[0];

export default function CalendarScreen() {
  const theme = useThemeStyles()

  return (
    <ContainerComponent>
      <Calendar
        current={today}
        markedDates={{
          '2025-08-19': { selected: true, selectedColor: '#5EDC74' },
          '2025-08-20': { selected: true, selectedColor: '#FFC78A' }
        }}
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