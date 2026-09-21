// Copy transcribed verbatim from the live site (natural.com), one entry per product
// route. Eyebrow values were re-verified directly against live: ALL 10 routes carry an
// eyebrow above the h2 (Accounts / Money movement / Developer & billing / Features).
// An earlier extraction pass wrongly reported that identity, observability, disputes
// and compliance had none — it inferred that from DOM node counts. Measure, don't infer.
const productContent = {
  wallet: {
    h1: 'Wallets',
    heroBody:
      'Store funds in FDIC-insured wallets for your agent to use. Create a single wallet or spin up multiple to manage finances. All from one unified API.',
    heroImage: '/assets/images/products/wallets-hero.jpg',
    eyebrow: 'Accounts',
    h2: 'Accounts built for agents',
    cards: [
      {
        title: 'Multiple wallets',
        body: 'Use one wallet for all your agents, or one for each. You decide.',
        image: '/assets/images/products/wallet-graphic-multiple.jpg',
      },
      {
        title: 'Expanded FDIC insurance',
        body: 'All Natural accounts receive expanded FDIC coverage.',
        image: '/assets/images/benefits/fdic-card.jpg',
      },
      {
        title: 'Fully programmable',
        body: 'Create new wallets on top of Natural entirely programmatically.',
        image: '/assets/images/products/wallet-graphic-programmable.jpg',
      },
    ],
  },
  vault: {
    h1: 'Vault',
    heroBody:
      'One-way wallets for agents. Agents move money in, never out. Keep your funds separated in your Vault for only you to access.',
    heroImage: '/assets/images/products/vault-hero.jpg',
    eyebrow: 'Accounts',
    h2: 'Peace of mind with Vaults',
    cards: [
      {
        title: 'Expanded FDIC insurance',
        body: 'All Natural accounts receive expanded FDIC coverage.',
        image: '/assets/images/benefits/fdic-card.jpg',
      },
      {
        title: 'Stay in control',
        body: "Agents are only allowed to deposit into vaults, but can't move money out.",
        image: '/assets/images/products/vault-graphic-2.jpg',
      },
      {
        title: 'Instant transfers',
        body: 'Move money between your Vault and Wallets instantly for free.',
        image: '/assets/images/products/vault-graphic-3.jpg',
      },
    ],
  },
  pay: {
    h1: 'Pay',
    heroBody:
      "Pay an agent, email, phone number, and more. Natural powers every type of payments workflow, handling the orchestration, ledgering, routing, compliance, risk, and disputes.",
    heroImage: '/assets/images/products/pay-hero.jpg',
    eyebrow: 'Money movement',
    h2: 'Send payments with ease',
    cards: [
      {
        title: 'Start building immediately',
        body: 'Pay an agent, email, or phone number. Natural handles the onboarding and compliance.',
        image: '/assets/images/products/pay-graphic-1.jpg',
      },
      {
        title: 'Safe by design',
        body: "Rely on Natural's network to manage risk, flag fraudulent transactions, and handle disputes.",
        image: '/assets/images/products/pay-graphic-2.jpg',
      },
      {
        title: 'Built for scale',
        body: 'Whether your agent makes one transaction or one million, Natural scales with you.',
        image: '/assets/images/products/pay-graphic-3.jpg',
      },
    ],
  },
  request: {
    h1: 'Request',
    heroBody:
      'Request from an agent, email, phone number, and more. Natural powers every type of payments workflow, handling the orchestration, ledgering, routing, compliance, risk, and disputes.',
    heroImage: '/assets/images/products/request-hero.jpg',
    eyebrow: 'Money movement',
    h2: 'Request payments with ease',
    cards: [
      {
        title: 'Start building immediately',
        body: 'Request from an agent, email, or phone number. Natural handles the rest.',
        image: '/assets/images/products/request-graphic-1.jpg',
      },
      {
        title: 'Safe by design',
        body: "Rely on Natural's network to manage risk, flag fraudulent transactions, and handle disputes.",
        image: '/assets/images/products/request-graphic-2.jpg',
      },
      {
        title: 'Built for scale',
        body: 'Whether your agent makes one transaction or one million, Natural scales with you.',
        image: '/assets/images/products/request-graphic-3.jpg',
      },
    ],
  },
  transfer: {
    h1: 'Transfer',
    heroBody:
      'Transfer money between internal and external accounts. Give your agents access to automated treasury management and empower your financial stack.',
    heroImage: '/assets/images/products/transfer-hero.jpg',
    eyebrow: 'Money movement',
    h2: 'Agentic financial management',
    cards: [
      {
        title: 'Multiple rails',
        body: 'Natural handles all types of payment rails so you can use what is best for you.',
        image: '/assets/images/products/transfer-graphic-1.jpg',
      },
      {
        title: 'Fully programmable',
        body: 'Any connected agent can send, receive, or request funds with an API call.',
        image: '/assets/images/products/transfer-graphic-2.jpg',
      },
      {
        title: 'Total visibility',
        body: 'Every transfer is observable and fully auditable so you have maximum visibility.',
        image: '/assets/images/products/transfer-graphic-3.jpg',
      },
    ],
  },
  connect: {
    h1: 'Connect',
    heroBody:
      'Build a platform that enables money movement for your customers. Onboard your customers to Natural, grant your agents access, and give your customers the full suite of Natural products.',
    heroImage: '/assets/images/products/connect-hero.jpg',
    eyebrow: 'Developer & billing',
    h2: 'Create your platform',
    cards: [
      {
        title: 'Full platform capabilities',
        body: 'Your customers get full access to all Natural products like Wallets, Pay, Accept, and more.',
        image: '/assets/images/products/connect-graphic-1.jpg',
      },
      {
        title: 'Fully programmable',
        body: 'Invite customers and orchestrate money movement all via the API.',
        image: '/assets/images/products/connect-graphic-2.jpg',
      },
      {
        title: 'Create dynamic workflows',
        body: 'Connect multiple agents at a time, each powering one or more workflows.',
        image: '/assets/images/products/connect-graphic-3.jpg',
      },
    ],
  },
  identity: {
    h1: 'Identity',
    heroBody:
      'Persistent and verifiable identities to know your agents. Tie all actions back to that identity, and be notified when your agent deviates from expected behavior.',
    heroImage: '/assets/images/products/identity-hero.jpg',
    eyebrow: 'Features',
    h2: 'Know your agent',
    cards: [
      {
        title: 'Build history',
        body: 'Give your agent a stable identity and build transaction history over time.',
        image: '/assets/images/products/identity-graphic-activity.jpg',
      },
      {
        title: 'Transact safely',
        body: 'Revokable agent keys so access can be temporarily suspended without losing history.',
        image: '/assets/images/products/identity-graphic-revoke.jpg',
      },
      {
        title: 'Granular control',
        body: 'Set limits and permission so an agent can never gain more access than it was built for.',
        image: '/assets/images/products/identity-graphic-control.jpg',
      },
    ],
  },
  observability: {
    h1: 'Observability',
    heroBody:
      "Monitor and trace every action your agents take. Pull one agent's activity for an audit in seconds or move through your full transaction history to understand who is doing what.",
    heroImage: '/assets/images/products/observability-hero.jpg',
    eyebrow: 'Features',
    h2: 'Your data, your control',
    cards: [
      {
        title: 'Access history',
        body: 'See all requests from and responses to your agents, with original tool calls for debugging.',
        image: '/assets/images/products/observability-graphic-history.jpg',
      },
      {
        title: 'Set alerts and monitors',
        body: 'Create monitors and alerts so your agents act predictably.',
        image: '/assets/images/products/observability-graphic-alerts.jpg',
      },
      {
        title: 'Protect your business',
        body: "Answer disputes with supporting evidence backed by Natural's ledger.",
        image: '/assets/images/products/observability-graphic-protect.jpg',
      },
    ],
  },
  disputes: {
    h1: 'Disputes',
    heroBody:
      'Transact safely with Natural managed disputes. Protect your business with evidence upload and customer support, and spot malicious patterns before they cost you.',
    heroImage: '/assets/images/products/disputes-hero.jpg',
    eyebrow: 'Features',
    h2: 'Money agents your agents can use',
    cards: [
      {
        title: 'One system',
        body: 'Your support team can see context and resolve disputes end to end.',
        image: '/assets/images/products/disputes-graphic-system.jpg',
      },
      {
        title: 'Get notifications & webhooks',
        body: 'Handle disputes via API and receive webhooks and events for updates.',
        image: '/assets/images/products/disputes-graphic-webhooks.jpg',
      },
      {
        title: 'Catch patterns',
        body: 'Use Agent IDs to spot unusual activity and create disputes.',
        image: '/assets/images/products/disputes-graphic-patterns.jpg',
      },
    ],
  },
  compliance: {
    h1: 'Compliance',
    heroBody:
      'Transact safely knowing all parties have been verified. Natural automates compliance and regulatory requirements so you can have peace of mind.',
    heroImage: '/assets/images/products/compliance-hero.jpg',
    eyebrow: 'Features',
    h2: 'Real accounts, like yours',
    cards: [
      {
        title: 'Up to date requirements',
        body: 'Natural ensures parties are compliant with all major regulatory bodies.',
        image: '/assets/images/products/compliance-graphic-onboarding.jpg',
      },
      {
        title: 'Automatically handled',
        body: "Your compliance is managed automatically, and you're notified of alerts.",
        image: '/assets/images/products/compliance-graphic-automation.jpg',
      },
      {
        title: 'Total visibility',
        body: 'Every movement is observable with a full ledger and real-time webhooks.',
        image: '/assets/images/products/compliance-graphic-visibility.jpg',
      },
    ],
  },
}

export default productContent
