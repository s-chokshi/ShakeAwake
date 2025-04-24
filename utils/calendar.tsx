import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import * as Calendar from 'expo-calendar';

type CalendarEvent = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  notes?: string;
  allDay?: boolean;
};

const CalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadCalendarEvents = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      console.log('Calendar permission status:', status); 

      if (status === 'granted') {
        const { status: remindersStatus } = await Calendar.requestRemindersPermissionsAsync();
        console.log('Reminders permission status:', remindersStatus); 

        if (remindersStatus === 'granted') {
          const calendars = await Calendar.getCalendarsAsync();
          console.log('Calendars available:', calendars); 

          if (calendars.length === 0) {
            setError('No calendars available.');
            return;
          }

          const calendarIds = calendars.map(cal => cal.id);
          console.log('Fetching events from calendar IDs:', calendarIds); 

          const now = new Date();
          const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          console.log('Fetching events between:', now, 'and', in7Days); 

          const fetchedEvents = await Calendar.getEventsAsync(
            calendarIds,
            now,
            in7Days
          );
          console.log('Fetched events:', fetchedEvents); 

          const calendarEvents: CalendarEvent[] = fetchedEvents.map((event) => ({
            ...event,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),    
          }));

    
          if (calendarEvents.length > 0) {
            setEvents(calendarEvents);
            setError(null); 
          } else {
            console.log('No events found in the next 7 days');
            setEvents([]); 
            setError('No events in the next 7 days');
          }
        } else {
          console.log('Reminders permission not granted');
          setError('Reminders permission not granted.');
        }
      } else {
        console.log('Calendar permission not granted');
        setError('Calendar permission not granted.');
      }
    } catch (error) {
      console.error('Error loading calendar events:', error);
      setError('Error loading calendar events.');
    }
  };

  useEffect(() => {
    loadCalendarEvents();
  }, []); 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.eventsTitle}>Upcoming Events:</Text>
      {error ? (
        <Text style={styles.errorMessage}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {events.length === 0 ? (
            <Text style={styles.noEvents}>No events in the next 7 days</Text>
          ) : (
            events.map((event) => (
              <View key={`${event.id}-${event.startDate.getTime()}`} style={styles.eventCard}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>
                  {event.startDate.toLocaleString()} - {event.endDate.toLocaleString()}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 20,
    marginTop: 15
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  noEvents: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20, 
  },
  eventCard: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  eventTime: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default CalendarEvents;