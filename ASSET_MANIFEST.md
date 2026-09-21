Source: https://www.natural.com/

Every image/font/icon asset observed loading from natural.com's own origin while
recon-ing the homepage (desktop 1280px + mobile 390px), with a suggested local path
under `public/assets/`. Third-party script/analytics requests (GTM, PostHog, Vercel
Insights, Oscilar) are intentionally excluded — they are not visual assets to clone.

## Fonts
| Source URL | Suggested local path |
|---|---|
| `https://www.natural.com/fonts/gt-standard/GT-Standard-Mono-Standard-Regular.woff2` | `public/assets/fonts/gt-standard/GT-Standard-Mono-Standard-Regular.woff2` |
| `https://www.natural.com/fonts/stk-miso/STKMisoVariableComplete.woff2` | `public/assets/fonts/stk-miso/STKMisoVariableComplete.woff2` |

## Brand / logo
| Source URL | Suggested local path |
|---|---|
| `https://www.natural.com/assets/brand/natural-logo.svg` | `public/assets/brand/natural-logo.svg` |
| `https://www.natural.com/assets/images/brand/nature-desk.jpg` | `public/assets/images/brand/nature-desk.jpg` |
| `https://www.natural.com/favicon.png` | `public/favicon.png` |
| `https://www.natural.com/favicon.ico` | `public/favicon.ico` |
| `https://www.natural.com/favicon-512.png` | `public/favicon-512.png` |

## Hero / products
| Source URL | Suggested local path |
|---|---|
| `https://www.natural.com/assets/images/products/hero-dashboard.jpg` | `public/assets/images/products/hero-dashboard.jpg` |
| `https://www.natural.com/assets/images/products/flows-background.jpg` | `public/assets/images/products/flows-background.jpg` |
| `https://www.natural.com/assets/images/products/flows-hold.jpg` | `public/assets/images/products/flows-hold.jpg` |

## Agents / Control section
| Source URL | Suggested local path |
|---|---|
| `https://www.natural.com/assets/images/agents/penny-avatar.jpg` | `public/assets/images/agents/penny-avatar.jpg` |
| `https://www.natural.com/assets/images/agents/product-texture.png` | `public/assets/images/agents/product-texture.png` |
| `https://www.natural.com/assets/images/agents/product-mask.svg` | `public/assets/images/agents/product-mask.svg` |
| `https://www.natural.com/assets/icons/agents/verified.svg` | `public/assets/icons/agents/verified.svg` |
| `https://www.natural.com/assets/icons/agents/bank-account.svg` | `public/assets/icons/agents/bank-account.svg` |
| `https://www.natural.com/assets/icons/agents/wallet.svg` | `public/assets/icons/agents/wallet.svg` |
| `https://www.natural.com/assets/icons/agents/shield.svg` | `public/assets/icons/agents/shield.svg` |
| `https://www.natural.com/assets/icons/agents/people.svg` | `public/assets/icons/agents/people.svg` |
| `https://www.natural.com/assets/icons/agents/deposit.svg` | `public/assets/icons/agents/deposit.svg` |
| `https://www.natural.com/assets/icons/agents/withdraw.svg` | `public/assets/icons/agents/withdraw.svg` |
| `https://www.natural.com/assets/icons/agents/card.svg` | `public/assets/icons/agents/card.svg` |
| `https://www.natural.com/assets/icons/agents/agent.svg` | `public/assets/icons/agents/agent.svg` |
| `https://www.natural.com/assets/images/home/control-owner-avatar.png` | `public/assets/images/home/control-owner-avatar.png` |

## Developers section
| Source URL | Suggested local path |
|---|---|
| `https://www.natural.com/assets/images/home/developers-background.png` | `public/assets/images/home/developers-background.png` |

## Benefits section 2 (Scale with confidence)
| Source URL | Suggested local path |
|---|---|
| `https://www.natural.com/assets/images/benefits/fdic-card.jpg` | `public/assets/images/benefits/fdic-card.jpg` |

## Blog section
| Source URL | Suggested local path |
|---|---|
| `https://www.natural.com/assets/images/blog/agentic-payments-revisited/agentic-payments-revisited-hero.jpg` | `public/assets/images/blog/agentic-payments-revisited/agentic-payments-revisited-hero.jpg` |
| `https://www.natural.com/assets/images/blog/why-jerry-joined-natural/jerry-blog-hero.jpg` | `public/assets/images/blog/why-jerry-joined-natural/jerry-blog-hero.jpg` |
| `https://www.natural.com/assets/images/blog/why-david-joined-natural/david-blog-hero.jpg` | `public/assets/images/blog/why-david-joined-natural/david-blog-hero.jpg` |
| `https://www.natural.com/assets/images/blog/why-kishan-joined-natural/kishan-blog-hero.jpg` | `public/assets/images/blog/why-kishan-joined-natural/kishan-blog-hero.jpg` |

## Misc / decorative (possible splash/texture assets, exact placement not fully
confirmed — see CLONE_SPEC.md §10)
| Source URL | Suggested local path |
|---|---|
| `https://www.natural.com/images/previews/leaves.webp` | `public/assets/images/previews/leaves.webp` |

## Not included (third-party / analytics, do not clone)
GTM (`googletagmanager.com`), PostHog (`us-assets.i.posthog.com`, `us.i.posthog.com`),
Vercel Insights (`/_vercel/insights/*`, `/_vercel/speed-insights/*`), Oscilar fraud
scripts (`zqp.oscilar.com`). Also excluded: the site's own JS/CSS bundle files
(`assets/*.js`, `assets/*.css`) — those are build output, not assets to copy verbatim.
