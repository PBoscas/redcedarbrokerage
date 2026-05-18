// One-time script to create Better Auth users for all staff
const AUTH_BASE = 'https://ep-ancient-pine-ajvea5e7.neonauth.c-3.us-east-2.aws.neon.tech/neondb/auth';

const agents = [
  { id: '03c86261-213e-456e-aaba-a938d80dcb34', name: 'Eric Pakulla', email: 'eric@ericpakulla.com' },
  { id: 'b29fd228-2f0d-46c4-b6cb-e2af82488e17', name: 'Hollie Pakulla', email: 'hollie@brianpakulla.com' },
  { id: '4ec3ab1c-cc4a-40da-99e2-09e8ff945785', name: 'Stephanie Ridgely', email: 'stephanie@thebird.team' },
  { id: '733fec14-ed9e-4ef4-b731-7aed4672b41d', name: 'Jennifer Scicchitano', email: 'jen@brianpakulla.com' },
  { id: 'e1388766-8523-4fa7-a2a6-65e98856734f', name: 'Gayle Soriano', email: 'gayle@thebird.team' },
  { id: '4b9911f1-baa6-4e9d-b6b4-eb645cd40ab2', name: 'Lauren Teal', email: 'lauren@thebird.team' },
];

const PASSWORD = 'RedCedar2026!';

async function createUser(agent) {
  const url = `${AUTH_BASE}/sign-up/email`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3002',
    },
    body: JSON.stringify({
      name: agent.name,
      email: agent.email,
      password: PASSWORD,
    }),
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }

  if (!res.ok) {
    console.log(`FAIL  ${agent.name} (${agent.email}): ${res.status} ${typeof data === 'string' ? data : JSON.stringify(data)}`);
    return null;
  }

  const userId = data?.user?.id || data?.id;
  console.log(`OK    ${agent.name} (${agent.email}) -> auth user ${userId}`);
  return { agentId: agent.id, authUserId: userId };
}

async function main() {
  console.log('Creating auth users...\n');

  const results = [];
  for (const agent of agents) {
    const result = await createUser(agent);
    if (result) results.push(result);
    // Avoid rate limiting
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`\nCreated ${results.length}/${agents.length} users.`);

  if (results.length > 0) {
    console.log('\nUser ID mapping (agent_id -> auth_user_id):');
    for (const r of results) {
      console.log(`  ${r.agentId} -> ${r.authUserId}`);
    }
  }
}

main().catch(console.error);
