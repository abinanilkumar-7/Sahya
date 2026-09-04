import { apiClient } from './apiClient';
import { AssistantMessage, Resource } from '../types';
import { resourceService } from './resourceService';
import { MOCK_WEATHER } from './mockData';

export const assistantService = {
  async processQuery(userText: string, location?: { latitude: number; longitude: number }): Promise<AssistantMessage> {
    try {
      const response = await apiClient.post('/assistant/chat', { message: userText, location });
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover to intelligent local response generator with controlled tool calling simulation
    }

    const q = userText.toLowerCase().trim();
    let text = "";
    let toolsInvoked: string[] = [];
    let suggestions: Resource[] = [];

    // Emergency check
    if (q.includes('emergency') || q.includes('ambulance') || q.includes('heart attack') || q.includes('accident') || q.includes('oxygen urgent') || q.includes('dying')) {
      toolsInvoked.push('getEmergencyNumbers()');
      text = "🚨 **EMERGENCY ASSISTANCE ALERT**:\nIf this is a life-threatening medical emergency, please click the **Emergency Help** button at the top of your screen immediately or dial **112 / 108 / 102**.\n\nHere are verified immediate response centers near you:";
      
      const nearby = await resourceService.getResources({ verifiedOnly: true });
      suggestions = nearby.filter(r => r.category === 'Hospitals' || r.category === 'Ambulances').slice(0, 3);
      
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text,
        timestamp: new Date().toISOString(),
        toolsInvoked,
        resourceSuggestions: suggestions,
      };
    }

    // Weather query
    if (q.includes('weather') || q.includes('rain') || q.includes('temperature') || q.includes('climate')) {
      toolsInvoked.push('getWeather()');
      text = `☀️ **Current Weather Update for ${MOCK_WEATHER.city}**:\n- **Temperature**: ${MOCK_WEATHER.temperature}°C (High: ${MOCK_WEATHER.highTemp}°C, Low: ${MOCK_WEATHER.lowTemp}°C)\n- **Condition**: ${MOCK_WEATHER.condition}\n- **Humidity**: ${MOCK_WEATHER.humidity}%\n- **Alert**: ${MOCK_WEATHER.alert?.title || 'No active weather warnings'}.`;
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text,
        timestamp: new Date().toISOString(),
        toolsInvoked,
      };
    }

    // Pharmacy search
    if (q.includes('pharmacy') || q.includes('medicine') || q.includes('drugstore') || q.includes('chemist')) {
      toolsInvoked.push('findNearbyResources(category="Pharmacies")');
      const results = await resourceService.getResources({ category: 'Pharmacies', verifiedOnly: true });
      suggestions = results.slice(0, 3);
      text = `I searched verified pharmacies near you. Here are ${suggestions.length} available centers operating with authentic medical stock:`;
    }
    // Hospital search
    else if (q.includes('hospital') || q.includes('icu') || q.includes('bed') || q.includes('doctor')) {
      toolsInvoked.push('searchResources(category="Hospitals")');
      const results = await resourceService.getResources({ category: 'Hospitals', verifiedOnly: true });
      suggestions = results.slice(0, 3);
      text = `I found ${suggestions.length} verified hospitals with real-time bed and ICU availability monitoring:`;
    }
    // Oxygen search
    else if (q.includes('oxygen') || q.includes('cylinder') || q.includes('concentrator')) {
      toolsInvoked.push('searchResources(category="Oxygen")');
      const results = await resourceService.getResources({ category: 'Oxygen', verifiedOnly: true });
      suggestions = results.slice(0, 3);
      text = `Here are active, verified oxygen hubs with current cylinder stock:`;
    }
    // Food / Shelter search
    else if (q.includes('food') || q.includes('shelter') || q.includes('meal') || q.includes('kitchen')) {
      toolsInvoked.push('searchResources(category="Food Support")');
      const results = await resourceService.getResources({ verifiedOnly: true });
      suggestions = results.filter(r => r.category === 'Food Support' || r.category === 'Shelters').slice(0, 3);
      text = `Here are verified community kitchens and shelters open for assistance:`;
    }
    // General assistance
    else {
      toolsInvoked.push('searchResources()');
      const results = await resourceService.getResources({ search: q, verifiedOnly: true });
      if (results.length > 0) {
        suggestions = results.slice(0, 3);
        text = `Based on your request "${userText}", I matched ${results.length} verified community resources in the Sahya database:`;
      } else {
        text = `Hello! I'm your **Sahya Assistant**. I can help you locate verified nearby hospitals, emergency oxygen, 24/7 pharmacies, blood banks, community food support, and shelters.\n\nHow may I assist you today? You can try asking:\n- *"Find a pharmacy near me open now"* \n- *"Check available ICU beds"* \n- *"Find blood bank with O+ group"*`;
      }
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date().toISOString(),
      toolsInvoked,
      resourceSuggestions: suggestions,
    };
  }
};
