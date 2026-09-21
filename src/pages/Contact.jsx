import { useState } from 'react'

// Measured live (/contact, desktop 1280x900 + mobile 390x844): the section is a
// full-height flex container that centers the form both axes — section height is
// content-driven (828px desktop / 772px mobile, i.e. viewport-ish but not fixed),
// not a min-height floor. No FinalCta/splash on this route (confirmed live: no
// `.splash` element, no nature-desk.jpg) — this is the one route that skips it.
function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="contact-field-chevron">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', website: '', teamSize: '' })

  const canSubmit = form.name && form.email && form.website && form.teamSize

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="flex min-h-[772px] w-full flex-col items-center justify-center px-32 py-80 md:min-h-[828px] md:px-40">
      <form onSubmit={handleSubmit} noValidate className="w-full max-w-[480px]">
        <h1 className="text-[20px] leading-28 font-normal text-[rgb(17,20,0)] md:text-[32px] md:leading-40">
          Talk to the team
        </h1>

        <div className="mt-40 flex flex-col gap-24">
          <label className="flex flex-col">
            <span className="px-2 pb-8 text-[14px] leading-20 text-text-primary">Name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              maxLength={32}
              placeholder="Name"
              value={form.name}
              onChange={handleChange('name')}
              className="h-46 w-full rounded-lg border border-[rgb(236,236,235)] bg-white px-12 py-12 text-[14px] leading-20 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-[rgb(215,214,212)]"
            />
          </label>

          <label className="flex flex-col">
            <span className="px-2 pb-8 text-[14px] leading-20 text-text-primary">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              maxLength={80}
              placeholder="hi@natural.com"
              value={form.email}
              onChange={handleChange('email')}
              className="h-46 w-full rounded-lg border border-[rgb(236,236,235)] bg-white px-12 py-12 text-[14px] leading-20 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-[rgb(215,214,212)]"
            />
          </label>

          <label className="flex flex-col">
            <span className="px-2 pb-8 text-[14px] leading-20 text-text-primary">Website</span>
            <input
              type="text"
              name="website"
              autoComplete="url"
              maxLength={100}
              placeholder="company.com"
              value={form.website}
              onChange={handleChange('website')}
              className="h-46 w-full rounded-lg border border-[rgb(236,236,235)] bg-white px-12 py-12 text-[14px] leading-20 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-[rgb(215,214,212)]"
            />
          </label>

          <label className="flex flex-col">
            <span className="px-2 pb-8 text-[14px] leading-20 text-text-primary">Team size</span>
            <div className="relative">
              <select
                name="teamSize"
                value={form.teamSize}
                onChange={handleChange('teamSize')}
                className={`h-46 w-full appearance-none rounded-lg border border-[rgb(236,236,235)] bg-white py-12 pl-12 pr-40 text-[14px] leading-20 focus:outline-none focus:border-[rgb(215,214,212)] ${
                  form.teamSize ? 'text-text-primary' : 'text-text-tertiary'
                }`}
              >
                <option value="" disabled>
                  Select team size
                </option>
                <option value="1–9">1–9</option>
                <option value="10–99">10–99</option>
                <option value="100–499">100–499</option>
                <option value="500+">500+</option>
              </select>
              <span className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 text-text-primary">
                <ChevronIcon />
              </span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-24 h-40 w-full rounded-pill bg-background-button px-16 py-10 text-[14px] leading-20 text-white transition-colors duration-100 ease-out disabled:opacity-40 hover:enabled:bg-background-button-hover"
        >
          Continue
        </button>
      </form>
    </section>
  )
}

export default Contact
