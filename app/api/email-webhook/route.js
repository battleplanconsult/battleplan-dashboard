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

    const { data: routing } = await supabase
      .from('email_routing')
      .select('client_id')
      .eq('email_address', to_email)
      .single()

    if (!routing) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const intent = extractIntent(subject, body_plain)
    const summary = body_plain.substring(0, 200)

    const { data: comm } = await supabase
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

    return NextResponse.json({ success: true, communication_id: comm.id })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function extractIntent(subject, body) {
  const text = `${subject} ${body}`.toLowerCase()
  if (text.includes('trial')) return 'Trial Request'
  if (text.includes('price')) return 'Pricing Inquiry'
  if (text.includes('schedule')) return 'Schedule Question'
  if (text.includes('kid')) return 'Kids Program'
  return 'General Inquiry'
}
