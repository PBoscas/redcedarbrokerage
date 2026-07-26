import { getPublicAgents } from '@/lib/queries/agents';
import { ContactForm, INQUIRY_TYPES, type InquiryType } from './contact-form';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Red Cedar Real Estate. Connect with a specific agent or send us a general inquiry.',
};

interface ContactPageProps {
  searchParams: Promise<{ agent?: string; type?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { agent: agentSlug, type } = await searchParams;
  const agents = await getPublicAgents();

  const preselectedAgent = agentSlug
    ? agents.find((a) => a.slug === agentSlug) ?? null
    : null;

  // ?type= lets other pages deep-link straight into a specific inquiry
  // (e.g. /join-red-cedar sends people to /contact?type=joining).
  const preselectedType: InquiryType =
    type && (INQUIRY_TYPES as readonly string[]).includes(type)
      ? (type as InquiryType)
      : null;

  const agentOptions = agents.map((a) => ({
    slug: a.slug,
    name: `${a.first_name} ${a.last_name}`,
    title: a.title,
    headshot_url: a.headshot_url,
    phone: a.phone,
    email: a.email,
  }));

  return (
    <ContactForm
      agents={agentOptions}
      preselectedAgentSlug={preselectedAgent?.slug ?? null}
      preselectedType={preselectedType}
    />
  );
}
