const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

//api request (send data)
const WRITE_API_KEY = '0MJJMI1MBH6UVIA3';
const BASE_URL = 'https://api.thingspeak.com/update';
export const sendRequest = async (fieldName: string, fieldValue: number) => {
  try {
    let isSuccess = false;
    
    while (!isSuccess) {
      const url = `${BASE_URL}?api_key=${WRITE_API_KEY}&${fieldName}=${fieldValue}`;
      console.log('Sending request to:', url);
  
      const response = await fetch(url);
      const data = await response.text();
      console.log('API Response:', data);

      if (data !== '0') { 
        isSuccess = true
      } else {
        console.log('Response is 0, retrying...');
        await delay(10000);
      }
    }
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

//api request (receive data)
const READ_URL = 'https://api.thingspeak.com/channels/2910932/feeds.json?api_key=CB8FOHK2Y4UIA03R&results=100';
export const readRequest = async () => {
  try {
    const response = await fetch(READ_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    //console.log('Raw data from ThingSpeak:', data.feeds); 

    let mostRecentValues = {
      field1: null,
      field2: null,
      field3: null,
      field4: null,
    };

    for (let i = data.feeds.length - 1; i >= 0; i--) {
      const feed = data.feeds[i];

      if (mostRecentValues.field1 === null && feed.field1 !== null) {
        mostRecentValues.field1 = feed.field1;
      }
      if (mostRecentValues.field2 === null && feed.field2 !== null) {
        mostRecentValues.field2 = feed.field2;
      }
      if (mostRecentValues.field3 === null && feed.field3 !== null) {
        mostRecentValues.field3 = feed.field3;
      }
      if (mostRecentValues.field4 === null && feed.field4 !== null) {
        mostRecentValues.field4 = feed.field4;
      }

      if (mostRecentValues.field1 !== null && mostRecentValues.field2 !== null && mostRecentValues.field3 !== null && mostRecentValues.field4 !== null) {
        break;
      }
    }

    console.log('Most recent values:', mostRecentValues);
    return mostRecentValues;

  } catch (error) {
    console.error('Failed to fetch ThingSpeak data:', error);
    return null;
  }
};
