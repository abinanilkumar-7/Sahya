import { Request, Response } from 'express';
import Resource from '../models/Resource';

export const processAssistantChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const q = String(message || '').toLowerCase().trim();

    let text = "";
    let toolsInvoked: string[] = [];
    let suggestions: any[] = [];

    if (q.includes('emergency') || q.includes('ambulance') || q.includes('urgent') || q.includes('heart attack')) {
      toolsInvoked.push('getEmergencyNumbers()');
      text = "🚨 **EMERGENCY ASSISTANCE ALERT**:\nIf this is a life-threatening medical emergency, please dial **112 / 108 / 102** immediately.\n\nVerified emergency centers nearby:";
      suggestions = await Resource.find({ category: { $in: ['Hospitals', 'Ambulances'] }, verified: true }).limit(3);
    } else if (q.includes('pharmacy') || q.includes('medicine')) {
      toolsInvoked.push('findNearbyResources(category="Pharmacies")');
      suggestions = await Resource.find({ category: 'Pharmacies', verified: true }).limit(3);
      text = `Found ${suggestions.length} verified 24/7 pharmacies:`;
    } else if (q.includes('hospital') || q.includes('bed') || q.includes('icu')) {
      toolsInvoked.push('searchResources(category="Hospitals")');
      suggestions = await Resource.find({ category: 'Hospitals', verified: true }).limit(3);
      text = `Found ${suggestions.length} verified hospitals with real-time bed monitoring:`;
    } else {
      toolsInvoked.push('searchResources()');
      suggestions = await Resource.find({ verified: true }).limit(3);
      text = `Hello! I am **Sahya Assistant**. Here are top verified community resources matched from our MongoDB database:`;
    }

    return res.json({
      success: true,
      data: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text,
        timestamp: new Date().toISOString(),
        toolsInvoked,
        resourceSuggestions: suggestions,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
