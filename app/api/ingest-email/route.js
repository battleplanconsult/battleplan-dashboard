import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(request) {
  try {
    const body = await request.json()
    
    const {
      from_email,
      from_name,
      subject,
      body_plain,
      to_email
    } = body

    const { data: routing, error: routingError } = await supabase
      .from('email_routing')
      .select('client_id')
      .eq('email_address', to_email)
      .single()

    if (routingError || !routing) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const intent = extractIntent(subject, body_plain)
    const summary = body_plain.substring(0, 200)

    const { data: comm, error: commError } = await supabase
      .from('communications')
      .insert({
        client_id: routing.client_id,
        type: 'email',
        sender_name: from_name || from_email,
        sender_email: from_email,
        intent,
        message_text: body_plain,
        summary,
        status: 'new'
      })
      .select()
      .single()

    if (commError) throw commError

    await supabase
      .from('opportunities')
      .insert({
        client_id: routing.client_id,
        lead_name: from_name || from_email,
        contact_info: from_email,
        source: 'email',
        stage: 'new',
        intent,
        notes: summary,
        value: 150
      })

    return NextResponse.json({ success: true, communication_id: comm.id })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function extractIntent(subject, body) {
  const text = `${subject} ${body}`.toLowerCase()
  
  if (text.includes('trial') || text.includes('try')) return 'Trial Request'
  if (text.includes('price') || text.includes('cost')) return 'Pricing Inquiry'
  if (text.includes('schedule') || text.includes('class')) return 'Schedule Question'
  if (text.includes('kid') || text.includes('child')) return 'Kids Program'
  
  return 'General Inquiry'
}
