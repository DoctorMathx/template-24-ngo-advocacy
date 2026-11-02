# HerVoice Collective — FinStore NGO Template 24 (Advocacy)

A premium website template for **women's rights, advocacy and movement-building NGOs**. It's built for
supporters who sign, share, join and fundraise, for survivors looking for help, and for institutional funders.
The demo brand is *HerVoice Collective*, a fictional Nigerian women's rights movement (HQ Lagos, with chapters
in Abuja, Port Harcourt and Kaduna).

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. Icons come from lucide-react.
There's no backend: all content sits in typed mock files, and every form and payment is simulated on the client.

## Design language — "bold editorial activism"

- Cream base `#FBF3EA`, deep plum `#3D0C3A` for text and dark blocks, hot magenta `#E2337C` (`#D42A72` for
  AA-contrast buttons) and tangerine `#FF8A3D`.
- **Bricolage Grotesque** for display type. Its width and optical-size axes give the condensed poster headlines.
  **DM Sans** is the body font.
- Oversized poster typography, a scrolling marquee of campaign slogans, rotated "sticker" badges, cut-out photo
  frames with CSS duotone overlays (`mix-blend-mode`), thick borders with hard offset shadows, and asymmetric,
  staggered layouts.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Data-driven homepage (modules below) |
| `/donate` | Full donate flow: one-time / monthly / annual, preset amounts with impact lines, custom amount, designation, cover-fees, tribute, anonymous, donor details, Card / Bank transfer / USSD, sticky summary. Prefill: `?amount=&frequency=&campaign=&programme=&fundraiser=&fund=&membership=&designation=` |
| `/donate/thank-you` | Receipt (reference, amount, fee, frequency, designation, tribute, date, receipt note), share, next steps, print |
| `/petitions`, `/petitions/[slug]` | Signature counter vs goal, the ask and its target, demands, updates, sign form (name, email, state, opt-in), success state with WhatsApp / X / copy-link sharing and a donate upsell |
| `/campaigns`, `/campaigns/[slug]` | Appeals with raised vs goal, %, donors and days left; story, budget breakdown, update timeline, recent donors, prefilled donate CTAs |
| `/fundraisers` | Browse supporter fundraisers (birthday, marathon, church & mosque, office, memorial, challenge) with filter, search and sort |
| `/fundraisers/[slug]` | A supporter's personal page: organiser, story, goal and progress, supporters' messages, and donate CTAs prefilled with the fundraiser as the designation |
| `/fundraisers/start` | Five-step "start your own fundraiser" form with a live preview card |
| `/join` | Membership tiers (Student / Member / Champion / Patron), benefits and signup form, continuing into `/donate` with annual frequency |
| `/events`, `/events/[slug]` | Event list. Free events use an RSVP form; ticketed events (e.g. HerRun 5K) use ticket checkout |
| `/events/gala` | Annual gala: run of show, honourees, ticket tiers, tables and sponsorship with quantity pickers and live totals, then checkout |
| `/events/confirmation` | Ticket confirmation. Totals are recomputed on the server from the item ids |
| `/get-help` | Survivor support: emergency banner, helplines, WhatsApp/SMS, services, safe spaces, browse-safely tips, confidential legal-aid request form, FAQs |
| `/micro-grants` | Women's Micro-grant Fund: grant sizes, eligibility, process, application form, and donate-to-the-fund CTAs |
| `/partner` | Funding & partnerships: why partner, packages, how grant funds are managed, funders, enquiry/proposal form |
| `/transparency` | Income bars, expense donut (pure SVG), "of every ₦1,000" breakdown, reports to download, registration & governance, board |
| `/programmes`, `/programmes/[slug]` | Four programmes with stats, activities, locations and related appeals |
| `/impact` | Big stats, wins timeline, outcomes by programme, testimonials, stories |
| `/stories`, `/stories/[slug]` | Survivor stories (told with consent), news, wins, op-eds |
| `/get-involved` | Ways to act and a volunteer application form |
| `/about` | Mission, vision, values, history timeline, team, board |
| `/contact` | Form, phones, WhatsApp, chapter addresses, map placeholder |
| `/faq` | Grouped accordions (donations, tax & receipts, refunds, membership, petitions, fundraising, support) |

Also included: `opengraph-image`, `twitter-image`, `sitemap.xml`, `robots.txt` and a branded 404 page.

### Site-wide features

- **Quick exit**: a fixed button on every page (pressing Esc twice also triggers it). It calls
  `location.replace()` to a neutral site, so pressing Back won't return to this one.
- Sticky header, a top helpline strip, a full-screen menu, and a sticky mobile Sign / Donate bar.
- Accessibility: skip link, focus-visible rings, labelled controls, `aria-expanded` and `aria-invalid`,
  44px+ tap targets and reduced-motion support. Images sit in aspect-ratio boxes to avoid layout shift.

## Home modules

Reorder or remove modules in `siteConfig.home.modules` (`lib/site-config.ts`):

`hero` · `sloganMarquee` · `petitions` · `impactStats` · `campaigns` · `programmes` · `peerFundraising` ·
`getHelpBand` · `membership` · `gala` · `stories` · `transparency` · `partners` · `newsletter` (optional; the
footer already has a signup form) · `finalCta`

## Customising

| What | File |
| --- | --- |
| Brand, legal name, contacts, chapters, helplines, quick-exit URL, bank / USSD details, donation presets and impact lines, fee rate, slogans, home modules | `lib/site-config.ts` |
| Design tokens (colours, fonts) and utility classes (`.btn`, `.card`, `.sticker`, `.duotone`, `.poster` …) | `app/globals.css` |
| Fonts | `app/layout.tsx` |
| Petitions and Nigerian states list | `mock/petitions.ts` |
| Campaigns / appeals | `mock/campaigns.ts` |
| Supporter fundraisers and fundraiser types | `mock/fundraisers.ts` |
| Programmes | `mock/programmes.ts` |
| Stories / news | `mock/stories.ts` |
| Events, gala and ticket tiers | `mock/events.ts` |
| Team, board, history, values, membership tiers, partners, financials, impact, micro-grant fund, FAQs | `mock/organisation.ts` |
| Navigation and donation designations | `mock/navigation.ts` |
| Photo IDs (Unsplash) | `mock/images.ts` |

To connect real payments, replace the `router.push('/donate/thank-you?…')` in `app/donate/donate-client.tsx`
(and the matching call in `components/forms/ticket-checkout.tsx`) with a Paystack or Flutterwave checkout.

Set `NEXT_PUBLIC_SITE_URL` to your production URL. It's used for metadata and share links.

> Survivor-support content (helpline numbers, SMS short code, addresses) is fictional demo data apart from
> Nigeria's 112 emergency number. Replace it with verified services before going live.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```
