import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'Red Cedar Real Estate <inquiries@redcedarhomesales.com>';
const FALLBACK_TO = 'peter@redcedarre.com';

interface InquiryEmailParams {
  toEmail: string;
  toName: string;
  inquiry: {
    type: string;
    name: string;
    email: string;
    phone: string | null;
    message: string | null;
    metadata?: Record<string, unknown> | null;
  };
}

const TYPE_LABELS: Record<string, string> = {
  buying: 'Buying Inquiry',
  selling: 'Selling Inquiry',
  relocating: 'Relocation Inquiry',
  agent_inquiry: 'Agent Inquiry',
  general: 'General Inquiry',
};

export async function sendInquiryNotification({
  toEmail,
  toName,
  inquiry,
}: InquiryEmailParams) {
  const typeLabel = TYPE_LABELS[inquiry.type] || 'New Inquiry';
  const firstName = toName.split(' ')[0];

  const metadataLines: string[] = [];
  if (inquiry.metadata?.areas) {
    metadataLines.push(`Areas of Interest: ${inquiry.metadata.areas}`);
  }
  if (inquiry.metadata?.address) {
    metadataLines.push(`Property Address: ${inquiry.metadata.address}`);
  }

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: toEmail,
    replyTo: inquiry.email,
    subject: `${typeLabel} from ${inquiry.name}`,
    text: [
      `Hi ${firstName},`,
      '',
      `You have a new inquiry from the Red Cedar website.`,
      '',
      `--- Inquiry Details ---`,
      `Type: ${typeLabel}`,
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
      .join('\n'),
  });

  if (error) {
    console.error('Failed to send inquiry notification email:', error);
    throw error;
  }
}

export { FALLBACK_TO };
