const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

//api request (send data)
const API_KEY = '0MJJMI1MBH6UVIA3';
const BASE_URL = 'https://api.thingspeak.com/update';
export const sendRequest = async (fieldName: string, fieldValue: number) => {
  try {
    let isSuccess = false;
    
    while (!isSuccess) {
      const url = `${BASE_URL}?api_key=${API_KEY}&${fieldName}=${fieldValue}`;
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
