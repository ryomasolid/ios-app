import { CheckmarkComponent } from '@/components/CheckmarkComponent';
import { CircleWithTextComponent } from '@/components/CircleWithTextComponent';
import { ContainerComponent } from '@/components/ContainerComponent';
import { STATUS_NO, STATUS_NONE, STATUS_YES } from '@/constants/Status';
import { useCalendarLogic } from '@/hooks/useCalendarLogic';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
  const theme = useThemeStyles()
  const {
    today,
    selectedDate,
    status,
    maxNoStreak,
    currentNoStreak,
    markedDates,
    handleDayPress,
    handleSetStatus,
  } = useCalendarLogic();

  const handleClickYes = () => {
    const value = status === STATUS_YES ? STATUS_NONE : STATUS_YES;
    handleSetStatus(value);
  };

  const handleClickNo = () => {
    const value = status === STATUS_NO ? STATUS_NONE : STATUS_NO;
    handleSetStatus(value);
  };

  return (
    <ContainerComponent>
      <Calendar
        key={theme.color2}
        current={today}
        markedDates={markedDates}
        onDayPress={handleDayPress}
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

      <View style={styles.streakContainer}>
        <View style={styles.streakItem}>
          <Ionicons name="trophy-outline" size={32} color="#FFD700" />
          <Text style={styles.streakLabel}>最大連続日数</Text>
          <Text style={styles.streakValue}>{maxNoStreak}日</Text>
        </View>

        <View style={styles.streakItem}>
          <Ionicons name="flame" size={32} color="#FF4500" />
          <Text style={styles.streakLabel}>今日の連続日数</Text>
          <Text style={styles.streakValue}>{currentNoStreak}日</Text>
        </View>
      </View>

      {
        selectedDate &&
        <View style={styles.checkContainer}>
          {status !== STATUS_YES
            ? <CircleWithTextComponent text1='Yes,' text2='I snacked' isGreen={false} handleClick={handleClickYes} />
            : <CheckmarkComponent isGreen={false} onPress={handleClickYes} />
          }
          {status !== STATUS_NO
            ? <CircleWithTextComponent text1='No,' text2="I didn't" isGreen={true} handleClick={handleClickNo} />
            : <CheckmarkComponent isGreen={true} onPress={handleClickNo} />
          }
        </View>
      }
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginBottom: 20,
  },
  streakItem: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#383838',
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  streakLabel: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
    textAlign: 'center',
  },
  streakValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
});