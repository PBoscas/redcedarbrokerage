import { getPublicAgents } from '@/lib/queries/agents';
import { ContactForm } from './contact-form';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Red Cedar Real Estate. Connect with a specific agent or send us a general inquiry.',
};

interface ContactPageProps {
  searchParams: Promise<{ agent?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { agent: agentSlug } = await searchParams;
  const agents = await getPublicAgents();

  const preselectedAgent = agentSlug
    ? agents.find((a) => a.slug === agentSlug) ?? null
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
    />
  );
}
