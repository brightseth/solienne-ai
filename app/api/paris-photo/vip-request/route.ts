import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // In production, this would save to a database or CMS
    // For now, we'll log it and return success
    console.log('VIP Request received:', {
      name: data.name,
      email: data.email,
      organization: data.organization,
      role: data.role,
      interest: data.interest,
      message: data.message,
      timestamp: data.timestamp,
      source: data.source
    });

    // You could also send this to a webhook, Supabase, or other storage
    // Example: await saveToSupabase(data);
    // Example: await sendToWebhook(process.env.CMS_WEBHOOK_URL, data);

    // Send notification email to ameesia@automata.art
    // await sendNotificationEmail(data);

    return NextResponse.json({ 
      success: true, 
      message: 'VIP request received successfully' 
    });
  } catch (error) {
    console.error('Error processing VIP request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    );
  }
}