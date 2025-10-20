import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(request) {
  try {
    const body = await request.json()
    
    const from_email = body.from_email || body.fromEmail
    const from_name = body.from_name || body.fromName || from_email
    const subject = body.subject || ''
    const body_plain = body.body_plain || body.bodyPlain || body.body || ''
    const to_email = body.to_email || body.toEmail

    if (!from_email || !to_email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data: routing, error: routingError } = await supabase
      .from('email_routing')
      .select('client_id')
      .eq('email_address', to_email)
      .single()

    if (routingError || !routing) {
      return NextResponse.json({ error: 'Client not found for email: ' + to_email }, { status: 404 })
    }

    const intent = extractIntent(subject, body_plain)
    const summary = body_plain.substring(0, 200)

    const { data: comm, error: commError } = await supabase
      .from('communications')
      .insert({
        client_id: routing.client_id,
        type: 'email',
        sender_name: from_name,
        sender_email: from_email,
        intent,
        message_text: body_plain,
        summary,
        status: 'new'
      })
      .select()
      .single()

    if (commError) {
      console.error('Communication insert error:', commError)
      throw commError
    }

    await supabase
      .from('opportunities')
      .insert({
        client_id: routing.client_id,
        lead_name: from_name,
        contact_info: from_email,
        source: 'email',
        stage: 'new',
        intent,
        notes: summary,
        value: 150
      })

    return NextResponse.json({ 
      success: true, 
      communication_id: comm.id,
      client_id: routing.client_id 
    })
  } catch (error) {
    console.error('Email webhook error:', error)
    return NextResponse.json({ 
      error: error.message,
      details: error.toString() 
    }, { status: 500 })
  }
}

function extractIntent(subject, body) {
  const text = `${subject} ${body}`.toLowerCase()
  
  if (text.includes('trial') || text.includes('try')) return 'Trial Request'
  if (text.includes('price') || text.includes('cost') || text.includes('membership')) return 'Pricing Inquiry'
  if (text.includes('schedule') || text.includes('class') || text.includes('time')) return 'Schedule Question'
  if (text.includes('kid') || text.includes('child')) return 'Kids Program'
  
  return 'General Inquiry'
}
```

---

## 📝 **Steps:**

1. **Create new file:** `app/api/email-webhook/route.js`
2. **Delete old file:** `app/api/ingest-email/route.js` (if it exists)
3. **Commit changes**
4. **Wait for deployment**

Then your new API endpoint will be:
```
https://your-dashboard.vercel.app/api/email-webhook
