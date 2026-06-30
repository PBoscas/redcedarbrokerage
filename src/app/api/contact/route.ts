import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendInquiryNotification, FALLBACK_TO } from '@/lib/email';

// Maps form type values to DB enum values
const TYPE_MAP: Record<string, string> = {
  buying: 'buying',
  selling: 'selling',
  relocating: 'relocating',
  agent: 'agent_inquiry',
  general: 'general',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { type, name, email, phone, message, agent_slug, metadata } = body;

    // Validate required fields
    if (!type || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: type, name, and email are required.' },
        { status: 400 }
      );
    }

    const dbType = TYPE_MAP[type];
    if (!dbType) {
      return NextResponse.json(
        { error: `Invalid inquiry type. Must be one of: ${Object.keys(TYPE_MAP).join(', ')}` },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // If agent_slug is provided, look up the agent
    let agentId: string | null = null;
    let agentEmail: string | null = null;
    let agentName: string | null = null;
    if (agent_slug) {
      const agentRows = await sql`
        SELECT id, email, first_name || ' ' || last_name as full_name
        FROM agents WHERE slug = ${agent_slug} LIMIT 1
      `;
      if (agentRows.length > 0) {
        agentId = agentRows[0].id;
        agentEmail = agentRows[0].email;
        agentName = agentRows[0].full_name;
      }
    }

    // Insert into contact_submissions
    const result = await sql`
      INSERT INTO contact_submissions (type, name, email, phone, message, agent_id, metadata)
      VALUES (
        ${dbType},
        ${name.trim()},
        ${email.trim().toLowerCase()},
        ${phone?.trim() || null},
        ${message?.trim() || null},
        ${agentId},
        ${metadata ? JSON.stringify(metadata) : null}
      )
      RETURNING id, created_at
    `;

    // Send email notification — must await in serverless environments
    const recipientEmail = agentEmail || FALLBACK_TO;
    const recipientName = agentName || 'Team';
    try {
      await sendInquiryNotification({
        toEmail: recipientEmail,
        toName: recipientName,
        inquiry: { type: dbType, name, email, phone, message, metadata },
      });
    } catch (err) {
      console.error('Email notification failed:', err);
      // Still return success since the submission was saved to the database
    }

    return NextResponse.json(
      { success: true, id: result[0].id, created_at: result[0].created_at },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
