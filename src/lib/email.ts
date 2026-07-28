import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'Red Cedar Real Estate <inquiries@redcedarhomesales.com>';
const FALLBACK_TO = 'peter@redcedarre.com';

interface InquiryEmailParams {
  toEmail: string;
  toName: string;
  // Addresses copied on the notification (a recruiting inquiry with no agent
  // chosen copies the principals). Empty or omitted means no CC header.
  ccEmails?: string[];
  inquiry: {
    type: string;
    name: string;
    email: string;
    phone: string | null;
    message: string | null;
    metadata?: Record<string, unknown> | null;
    // Who the visitor asked to work with. requestedAgentName is set when a
    // specific agent was chosen; noPreference is true when they explicitly
    // picked "No preference — connect me with anyone".
    requestedAgentName?: string | null;
    noPreference?: boolean;
  };
}

const TYPE_LABELS: Record<string, string> = {
  buying: 'Buying Inquiry',
  selling: 'Selling Inquiry',
  relocating: 'Relocation Inquiry',
  agent_inquiry: 'Agent Inquiry',
  recruiting: 'Join Red Cedar Inquiry',
  general: 'General Inquiry',
};

// Builds the plain-text body of the staff notification email. Pure/exported
// so the formatting (including the agent-preference line) can be tested
// without sending a real email.
export function buildInquiryEmailText(
  inquiry: InquiryEmailParams['inquiry'],
  toName: string,
): string {
  const typeLabel = TYPE_LABELS[inquiry.type] || 'New Inquiry';
  const firstName = toName.split(' ')[0];

  let agentPreferenceLine: string | null = null;
  if (inquiry.requestedAgentName) {
    agentPreferenceLine = `Requested Agent: ${inquiry.requestedAgentName}`;
  } else if (inquiry.noPreference) {
    agentPreferenceLine = 'Agent Preference: No preference — client is open to working with anyone';
  }

  const metadataLines: string[] = [];
  if (inquiry.metadata?.areas) {
    metadataLines.push(`Areas of Interest: ${inquiry.metadata.areas}`);
  }
  if (inquiry.metadata?.address) {
    metadataLines.push(`Property Address: ${inquiry.metadata.address}`);
  }

  return [
    `Hi ${firstName},`,
    '',
    `You have a new inquiry from the Red Cedar website.`,
    '',
    `--- Inquiry Details ---`,
    `Type: ${typeLabel}`,
    agentPreferenceLine,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    inquiry.phone ? `Phone: ${inquiry.phone}` : null,
    ...metadataLines,
    inquiry.message ? `\nMessage:\n${inquiry.message}` : null,
    '',
    `---`,
    `You can reply directly to this email to respond to ${inquiry.name}.`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export async function sendInquiryNotification({
  toEmail,
  toName,
  ccEmails,
  inquiry,
}: InquiryEmailParams) {
  const typeLabel = TYPE_LABELS[inquiry.type] || 'New Inquiry';

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: toEmail,
    ...(ccEmails?.length ? { cc: ccEmails } : {}),
    replyTo: inquiry.email,
    subject: `${typeLabel} from ${inquiry.name}`,
    text: buildInquiryEmailText(inquiry, toName),
  });

  if (error) {
    console.error('Failed to send inquiry notification email:', error);
    throw error;
  }
}

export { FALLBACK_TO };
