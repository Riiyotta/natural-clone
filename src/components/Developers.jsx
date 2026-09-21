import { useState } from 'react'

// Re-measured live (.api-explorer-tab-brand-icon): each install-method tab carries a
// 16x16 brand glyph before its label. Simplified monochrome marks (not full-color
// logos) since the tabs render them as `fill="currentColor"`.
const TABS = [
  {
    id: 'claude',
    label: 'Claude Code',
    command: 'claude mcp add --transport http natural https://mcp.natural.com --scope user',
    icon: (
      <path d="M4 9h8M8 5v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    ),
  },
  {
    id: 'codex',
    label: 'Codex',
    command: 'codex mcp add natural --url https://mcp.natural.com',
    icon: (
      <path
        d="M4 5.5 1.5 8 4 10.5M12 5.5 14.5 8 12 10.5M9.5 3.5l-3 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: 'sdk',
    label: 'SDK',
    command: 'npm install @naturalpay/sdk',
    icon: <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" fill="currentColor" />,
  },
  {
    id: 'cli',
    label: 'CLI',
    command: 'curl -fsSL https://natural.com/install.sh | bash',
    icon: (
      <path
        d="M2 4l4 4-4 4M8 12h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
]

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 9.5V2.5C2 2.22386 2.22386 2 2.5 2H9.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

// Re-measured live: every "midnight" (dark-filled) pill button carries a 12px
// forward-arrow icon with a 12px gap; ghost/transparent buttons do not.
function ArrowForwardIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path
        d="M2 7h10M7.5 2.5L12 7l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Developers() {
  const [active, setActive] = useState(TABS[0].id)
  const [copied, setCopied] = useState(false)
  const activeTab = TABS.find((t) => t.id === active)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeTab.command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard not available; no-op
    }
  }

  return (
    // Re-measured live (.api-container): a single flex COLUMN — eyebrow+h2 (480px
    // max-width), then a full-bleed 1200x560 (400px tall below md) "explorer" panel
    // with its own background photo, then the CTA row — not a 2-col grid with text
    // on the left and code on the right.
    <section className="mx-auto flex max-w-[1280px] flex-col gap-40 px-32 py-120 md:px-40">
      <div>
        <p className="eyebrow">Developers</p>
        <h2 className="section-h2 mt-12 max-w-[480px] text-text-primary">
          Start moving money via MCP, CLI, SDK, or API
        </h2>
      </div>

      {/* Re-measured live (.api-explorer): 560px tall at md+, 400px below md; the
          photo fills the whole panel and the tabs/terminal float centered on top,
          with unselected tabs showing white text on the dark photo. */}
      <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-sm p-24 md:h-[560px]">
        <img
          src="/assets/images/home/developers-background.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Measured live: 60px between the tab row and the terminal card, not 20px. */}
        <div className="relative flex w-full max-w-[720px] flex-col gap-60">
          <div className="flex flex-wrap gap-8" role="tablist" aria-label="Install method">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-8 rounded-md border-0 px-12 py-[9px] text-[14px] leading-16 transition-colors duration-100 ease-out ${
                  active === tab.id
                    ? 'bg-white text-text-primary'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  {tab.icon}
                </svg>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Re-measured live (.api-explorer-terminal): white terminal card with a
              macOS-style dotted header (3x 12px dots, 6px gap) on a translucent white
              fill, radius 4px — not a dark rgb(22,21,20) code box. */}
          <div className="overflow-hidden rounded-sm">
            {/* Measured live: the header row is 20px tall with no padding of its own
                (was 42px with 12px/20px padding, which made the terminal 122px
                instead of 100px). */}
            <div className="flex h-20 items-center justify-between bg-white/90 px-20">
              <span className="flex shrink-0 gap-6">
                <span className="h-12 w-12 rounded-full bg-text-primary" />
                <span className="h-12 w-12 rounded-full bg-text-primary" />
                <span className="h-12 w-12 rounded-full bg-text-primary" />
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-6 text-[13px] leading-18 text-text-secondary hover:text-text-primary"
              >
                <CopyIcon />
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            {/* Measured live: the terminal body holds a constant 80px (terminal 100px)
                on every tab — the longest command wraps to two lines and the shorter
                ones simply leave the second line empty. Letting the body size to its
                content made it snap 80->60px on each switch, which read as a jerk. */}
            <div
              className="relative flex items-start bg-white"
              style={{ padding: '20px 20px 20px 64px', height: '80px' }}
            >
              <span className="absolute left-20 top-20 font-mono text-[12px] leading-20 text-text-primary">❯</span>
              <code className="block whitespace-pre-wrap break-all text-[14px] leading-20 text-text-primary">
                {activeTab.command}
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-16">
        <a
          href="https://docs.natural.com"
          className="flex items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-[15px] leading-24 text-text-on-color transition-colors duration-100 ease-out hover:bg-background-button-hover"
        >
          <p>Read docs</p>
          <ArrowForwardIcon size={12} />
        </a>
        <a href="/contact" className="rounded-pill px-16 py-6 text-[15px] leading-24 text-text-primary hover:bg-background-hover">
          Talk to the team
        </a>
      </div>
    </section>
  )
}

export default Developers
