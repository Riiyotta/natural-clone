// Re-measured live: every "midnight" (dark-filled) pill button carries a 12px
// forward-arrow icon with a 12px gap; ghost/transparent buttons ("Talk to the
// team") do not.
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

// Re-measured live from ".control-bullets"/".control-bullet-icon": a single
// checkmark glyph reused for every bullet, rendered as an inline <svg> (not an
// <img>) — matching that keeps the clone's image inventory (2 real photos) in
// sync with the live site's.
const BULLET_CHECK_PATH =
  'M12.1063 3.67119C12.2882 3.46335 12.6046 3.4424 12.8124 3.62431L13.1883 3.95341C13.3961 4.13527 13.417 4.45169 13.2352 4.65947L6.56431 12.2825C6.4154 12.4526 6.19745 12.5459 5.97153 12.5374C5.74582 12.5288 5.53587 12.4192 5.40024 12.2386L2.70005 8.63896C2.53449 8.41813 2.57991 8.10449 2.80064 7.93876L3.20005 7.63896C3.42094 7.47337 3.73457 7.51769 3.90025 7.73857L5.93345 10.4505C5.99068 10.5265 6.10314 10.5308 6.16587 10.4593L12.1063 3.67119Z'

const BULLETS = [
  'Agents always have stable identities',
  'All IDs tie back to a verifiable legal identity',
  'Natural mediates all disputes for you',
  'You have full auditability on agent actions',
]

function BulletCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d={BULLET_CHECK_PATH} fill="currentColor" />
    </svg>
  )
}

// Measured live (.control-card-verified): 18x18, filled rgb(26,155,229) — a blue
// badge, not the inherited near-black body color.
function VerifiedBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: 'rgb(26, 155, 229)' }}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.51446 0.096519C6.82524 -0.032208 7.17437 -0.032138 7.48517 0.096519L11.5379 1.77523C11.8488 1.90399 12.0957 2.15089 12.2244 2.46175L13.9031 6.51449C14.0318 6.8253 14.0319 7.17439 13.9031 7.48519L12.2244 11.5379C12.0956 11.8487 11.8487 12.0957 11.5379 12.2244L7.48517 13.9032C7.17441 14.0318 6.82519 14.0319 6.51446 13.9032L2.46173 12.2244C2.15097 12.0957 1.90395 11.8487 1.77521 11.5379L0.0964942 7.48519C-0.0322158 7.17446 -0.0321137 6.82525 0.0964942 6.51449L1.77521 2.46175C1.90392 2.151 2.15101 1.90403 2.46173 1.77523L6.51446 0.096519ZM9.83185 4.14144C9.61655 3.95296 9.28743 3.9833 9.11017 4.20785L6.15997 7.95199C6.10067 8.02723 5.98638 8.028 5.9256 7.95394L4.90313 6.70882C4.73327 6.5019 4.4307 6.46507 4.21661 6.62582L3.81329 6.92953C3.58768 7.09892 3.54628 7.42111 3.72247 7.64144L5.40021 9.7391C5.53583 9.91971 5.74579 10.0293 5.97149 10.0379C6.19729 10.0464 6.41536 9.95297 6.56427 9.78304L10.2654 5.15609C10.4325 4.94721 10.4061 4.64384 10.2049 4.46761L9.83185 4.14144Z"
        fill="currentColor"
      />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <g transform="translate(7.875 3.375)">
        <path
          d="M1.6875 9C1.99816 9 2.25 9.25184 2.25 9.5625V10.6875C2.25 10.9982 1.99816 11.25 1.6875 11.25H0.5625C0.25184 11.25 0 10.9982 0 10.6875V9.5625C0 9.25184 0.25184 9 0.5625 9H1.6875Z"
          fill="currentColor"
        />
        <path
          d="M1.6875 4.5C1.99816 4.5 2.25 4.75184 2.25 5.0625V6.1875C2.25 6.49816 1.99816 6.75 1.6875 6.75H0.5625C0.25184 6.75 0 6.49816 0 6.1875V5.0625C0 4.75184 0.25184 4.5 0.5625 4.5H1.6875Z"
          fill="currentColor"
        />
        <path
          d="M1.6875 0C1.99816 0 2.25 0.25184 2.25 0.5625V1.6875C2.25 1.99816 1.99816 2.25 1.6875 2.25H0.5625C0.25184 2.25 0 1.99816 0 1.6875V0.5625C0 0.25184 0.25184 0 0.5625 0H1.6875Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12.5 12.5" fill="none" aria-hidden="true" className="ml-4 inline-block align-middle">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 2.5C9.44036 2.5 10 3.05964 10 3.75V11.25C10 11.9404 9.44036 12.5 8.75 12.5H1.25C0.559644 12.5 0 11.9404 0 11.25V3.75C0 3.05964 0.559644 2.5 1.25 2.5H8.75ZM1.5 10.5C1.5 10.7761 1.72386 11 2 11H8C8.27614 11 8.5 10.7761 8.5 10.5V4.5C8.5 4.22386 8.27614 4 8 4H2C1.72386 4 1.5 4.22386 1.5 4.5V10.5Z"
        fill="currentColor"
      />
      <path
        d="M10.5 0C11.6046 7.21573e-06 12.5 0.895436 12.5 2V9.5C12.5 9.77614 12.2761 10 12 10H11.5C11.2239 10 11 9.77614 11 9.5V2C11 1.72386 10.7761 1.50001 10.5 1.5H3C2.72386 1.5 2.5 1.27614 2.5 1V0.5C2.5 0.223858 2.72386 0 3 0H10.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Re-measured live from ".control-card": the profile row and a large square
// thumbnail photo sit side-by-side (thumbnail is ~160x160, rounded-lg,
// object-cover) — there is no separate small circular avatar next to the name.
function EditAgentCard() {
  return (
    // Re-measured live (.control-card / .control-card-profile / .control-card-row):
    // the outer card (440x372, 24px padding, radius 14px, border rgb(236,236,235),
    // NO box-shadow, 40px gap) wraps a SECOND bordered card (the profile row: 20px
    // padding, radius 12px, same border color) — not a single flat panel. Name is
    // 20px/28px (not 15px), handle/pill/row text is 14px/20px (not 13px), the edit
    // icon sits in its own 36x36 bordered circle button, and the owner avatar is
    // 18x18 (not 16x16).
    // Re-measured live: card width is fluid below the row/column breakpoint — it's
    // effectively min(440px, 100vw - 104px), not a flat max-width: 440px cap (which
    // would stay full-bleed and overflow narrow viewports).
    <div
      className="relative flex flex-col gap-40 rounded-[14px] border border-[#ececeb] bg-white p-24"
      style={{ width: 'min(440px, calc(100vw - 104px))' }}
    >
      <div className="flex items-start justify-between gap-40 rounded-xl border border-[#ececeb] p-20">
        {/* Re-measured live (.control-card-profile-main): height matches the 160px
            thumbnail via a space-between column, not a small top-aligned gap-8 stack. */}
        <div className="flex h-[160px] flex-col justify-between">
          <div>
            <div className="flex items-center gap-6">
              <span className="text-[20px] leading-28 text-text-primary">Penny</span>
              <VerifiedBadge />
            </div>
            <p className="text-[14px] leading-20 text-text-secondary">@gabby-penny</p>
          </div>

          <div className="flex items-center gap-8">
            <span className="rounded-pill bg-[#f6f6f6] px-16 py-8 text-[14px] leading-20 text-text-primary">
              Edit agent
            </span>
            <span
              className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full border border-[#ececeb] text-text-secondary"
              aria-hidden="true"
            >
              <EditIcon />
            </span>
          </div>
        </div>

        <img
          src="/assets/images/agents/penny-avatar.jpg"
          alt=""
          aria-hidden="true"
          className="h-[160px] w-[160px] shrink-0 rounded-lg object-cover"
        />
      </div>

      <div>
        <div className="flex items-center justify-between py-10">
          <span className="text-[14px] leading-20 text-text-secondary">Agent ID</span>
          <span className="flex items-center gap-6 font-mono text-[14px] leading-20 text-text-primary">
            agt...a81225
            <CopyIcon />
          </span>
        </div>
        <div className="flex items-center justify-between py-10">
          <span className="text-[14px] leading-20 text-text-secondary">Owner</span>
          <span className="flex items-center gap-6 text-[14px] leading-20 text-text-primary">
            <img
              src="/assets/images/home/control-owner-avatar.png"
              alt=""
              className="h-[18px] w-[18px] rounded-full object-cover"
            />
            Gabby Smith
          </span>
        </div>
      </div>
    </div>
  )
}

function Control() {
  // Measured live: at 390px the stage is hoisted above the text panel (order:-1)
  // and the section runs 1160px tall; at 1280px both sit side by side in an
  // 800px section. The 800px floor is therefore desktop-only.
  // The two columns are NOT an even 50/50 grid — live is a flex row inside a 1200px
  // container with a 556px text panel and a 604px stage (40px gap). An even
  // grid-cols-2 gave 580/580 and made the stage 24px too narrow.
  return (
    <section className="control-section mx-auto flex max-w-[1280px] flex-col items-center gap-40 px-32 py-120 md:flex-row md:px-40">
      <div className="control-panel">
        <p className="eyebrow">Control</p>
        <h2 className="section-h2 mt-12 max-w-[480px] text-text-primary">
          Identity, observability, and managed disputes
        </h2>

        {/* Re-measured live (.control-bullets): 40px gap between bullets, not 16px. */}
        {/* Measured live: h2 -> list gap is 40px (not 32), and each bullet row is
            15px/18px, so the row is 18px tall rather than 24px. */}
        <ul className="mt-40 flex flex-col gap-40">
          {BULLETS.map((text) => (
            <li key={text} className="flex items-center gap-12 text-text-primary">
              <BulletCheckIcon />
              <span className="text-[15px] leading-18 text-text-primary">{text}</span>
            </li>
          ))}
        </ul>

        {/* Measured live (.control-actions): 12px between the two CTAs, not 16px. */}
        <div className="mt-32 flex items-center gap-12">
          <a href="/identity" className="flex items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-[15px] leading-24 text-text-on-color transition-colors duration-100 ease-out hover:bg-background-button-hover">
            <p>Learn more</p>
            <ArrowForwardIcon size={12} />
          </a>
          <a href="/contact" className="rounded-pill px-16 py-6 text-[15px] leading-24 text-text-primary hover:bg-background-hover">
            Talk to the team
          </a>
        </div>
      </div>

      {/* .control-stage carries its own panel styling (gray fill, radius, padding,
          centring) in index.css — measured off live. */}
      <div className="control-stage">
        <EditAgentCard />
      </div>
    </section>
  )
}

export default Control
