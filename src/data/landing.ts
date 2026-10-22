export const launchUrl = '#pricing';
export const navigation = [
  { label: 'Templates', href: '#' }, { label: 'Collections', href: '#' },
  { label: 'Pricing', href: '#pricing' }, { label: 'Blog', href: '#' },
];
export const hero = {
  badge: 'Live in about 3 minutes',
  description: 'Run Claude Code, Codex, Hermes and 27 more in the cloud, 24/7. Each agent gets its own sealed machine, and your API keys never leave it.',
};
export const features = [
  { title: 'Sealed machine', description: 'Each agent runs alone, on its own machine.', scene: 'sealed' },
  { title: 'Key ownership', description: 'Only you can see your API keys.', scene: 'key' },
  { title: 'Persistent storage', description: 'Your agent picks up right where it left off.', scene: 'storage' },
] as const;
export const plans = [
  { name: 'Starter', description: 'One agent, always on.', monthly: 25, recommended: false, waitlist: false, resources: ['1 vCPU', '2 GiB', '10 GiB', '100 Mbit/s', 'Auto-assigned', 'No'] },
  { name: 'Pro', description: 'Room for heavier agents.', monthly: 49, recommended: true, waitlist: false, resources: ['2 vCPU', '6 GiB', '50 GiB', '200 Mbit/s', 'Custom domain', 'No'] },
  { name: 'Max', description: "For agents you can’t lose.", monthly: 99, recommended: false, waitlist: true, resources: ['4 vCPU', '12 GiB', '100 GiB', '500 Mbit/s', 'Custom domain', 'Included'] },
];
export const resourceLabels = ['CPU', 'Memory', 'Storage', 'Bandwidth', 'Web address', 'Daily snapshots'];
export const footerGroups = [
  { title: 'Product', items: [{ label: 'Pricing', href: '#pricing' }, { label: 'Templates', href: '#' }, { label: 'Collections', href: '#' }, { label: 'Swarm', href: '#' }] },
  { title: 'Platform', items: [{ label: 'Memory', href: '#features' }, { label: 'Blog', href: '#' }, { label: 'Observability', href: '#' }, { label: 'Communication', href: '#' }, { label: 'Docs', href: '#' }] },
  { title: 'Agents', items: [{ label: 'Claude Code', href: '#' }, { label: 'Codex CLI', href: '#' }, { label: 'Hermes', href: '#' }, { label: 'OpenClaw', href: '#' }, { label: 'All agents', href: '#' }] },
  { title: 'Company', items: [{ label: 'Home', href: '#home' }, { label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '#' }] },
  { title: 'Free tools', items: [{ label: 'Deploy recipe', href: '#' }, { label: 'Cost calculator', href: '#' }] },
  { title: 'Follow', items: [{ label: 'X', href: '#' }, { label: 'GitHub', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Discord', href: '#' }] },
];
