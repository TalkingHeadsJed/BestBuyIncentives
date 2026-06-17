// Centralized content for BestBuyIncentives.com

export const NAV_LINKS = [
  { label: "Programs", to: "/programs" },
  { label: "Industries", to: "/industries" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
];

export const STATS = [
  { value: "Since 1992", label: "Trusted by sales teams" },
  { value: "37%", label: "Avg. close-rate lift" },
  { value: "1,200+", label: "Sales teams deployed" },
  { value: "$184M", label: "Added pipeline closed" },
  { value: "4.8x", label: "ROI vs. discount promos" },
  { value: "92%", label: "Reps actively use the tool" },
  { value: "<24h", label: "Certificates in your reps' hands" },
];

export const PROBLEM_POINTS = [
  {
    title: "Margin Erosion",
    body: "Every discount you offer comes straight off your bottom line. A 10% price cut on a 30% margin product cuts your profit by a third.",
  },
  {
    title: "Promotion Fatigue",
    body: "Customers stopped responding to your last three campaigns. The market is numb to 'sales' and 'limited-time' events.",
  },
  {
    title: "Sameness",
    body: "Your competitors are doing exactly what you're doing. Price, financing, free delivery — nobody's winning, everyone's bleeding.",
  },
  {
    title: "Stalled Closes",
    body: "Reps need a reason to push for the close today. Without something memorable to offer, deals slide into next quarter.",
  },
];

export const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Choose your program",
    body: "Pick from premium getaway certificates, cruise programs, or fully custom incentives sized to your deal value.",
  },
  {
    n: "02",
    title: "Equip your sales team",
    body: "Reps get a tangible, high-perceived-value tool to break stalls, justify price, and close on the first call.",
  },
  {
    n: "03",
    title: "Customers redeem with us",
    body: "We handle every redemption end-to-end — your team never touches travel logistics.",
  },
  {
    n: "04",
    title: "You measure the lift",
    body: "Close rate, average order value, and showroom traffic all move. Most clients see ROI inside 60 days.",
  },
];

export const BUSINESS_TESTIMONIALS = [
  {
    quote:
      "We've run promotions for decades. The vacation incentive outperformed every other promotion we tried — and it kept working year after year.",
    author: "Bricker-Tunis",
    role: "Owner, Bricker-Tunis",
    metric: "Decades of repeat purchase",
  },
  {
    quote:
      "We handed out hundreds of certificates. The phones rang off the hook and our showroom hadn't been that busy in five years.",
    author: "Regional Furniture Retailer",
    role: "General Manager",
    metric: "5-year traffic high",
  },
  {
    quote:
      "We had the single biggest sales day in dealership history when we ran the program. Customers literally asked when we'd run it again.",
    author: "Multi-Location Auto Dealer",
    role: "Sales Director",
    metric: "Record-breaking sales day",
  },
  {
    quote:
      "I stopped discounting. I started giving away vacations. My average ticket went up and my close rate went up. I will never go back.",
    author: "Luxury Jewelry Store",
    role: "Owner",
    metric: "+22% avg. ticket",
  },
];

export const CONSUMER_TESTIMONIALS = [
  {
    quote:
      "We took the kids to Punta Cana. Five days at an all-inclusive — I cannot believe this came as a thank-you from buying a couch.",
    author: "Jenna & Mark",
    location: "Punta Cana, Dominican Republic",
    image: "/images/testimonial-punta-cana.png",
  },
  {
    quote:
      "New Orleans for our anniversary. We told every couple at dinner where this came from. Best buying decision we ever made.",
    author: "Tom & Lisa",
    location: "New Orleans, LA",
    image: "/images/testimonial-new-orleans.png",
  },
  {
    quote:
      "A private villa in Greece. I keep telling people I bought a car and got a vacation. They don't believe me.",
    author: "Aaron K.",
    location: "Santorini, Greece",
    image: "/images/testimonial-greece.png",
  },
  {
    quote:
      "Times Square at night with my wife, the kid in our arms — we'll remember this trip for the rest of our lives.",
    author: "The Patel Family",
    location: "New York, NY",
    image: "/images/testimonial-times-square.png",
  },
  {
    quote:
      "Unpacking in a hotel suite we didn't pay for. Honestly the best surprise after buying a new sofa.",
    author: "Megan R.",
    location: "Resort getaway",
    image: "/images/testimonial-unpacking.png",
  },
];

export const PROGRAMS = [
  {
    slug: "be-our-guest",
    name: "Be Our Guest",
    tagline: "The closer's classic",
    description:
      "Premium 3-night, 4-day hotel certificate at top destinations. Designed for sales managers who need a high-perceived-value asset reps can hand a buyer in seconds.",
    bullets: [
      "Hotels in 100+ destinations",
      "Issued on demand — no inventory",
      "Bulk pricing from 50 units",
    ],
    image: "/images/cert-be-our-guest-outside.jpg",
    altImage: "/images/cert-be-our-guest-inside.jpg",
    badge: "Best for: $1K–$10K ticket",
  },
  {
    slug: "enjoy-a-great-escape",
    name: "Enjoy a Great Escape",
    tagline: "The traffic driver",
    description:
      "Multi-night domestic & international getaway. Pairs perfectly with limited-time campaigns to drive net-new showroom traffic and reanimate stalled pipeline.",
    bullets: [
      "Multi-night package",
      "Co-branded marketing collateral",
      "Used by furniture, flooring, and home improvement",
    ],
    image: "/images/cert-escape-v1.jpg",
    altImage: "/images/cert-escape-v2.jpg",
    badge: "Best for: $5K–$25K ticket",
  },
  {
    slug: "ultimate-cruise",
    name: "Ultimate 7-Night Cruise",
    tagline: "The high-ticket weapon",
    description:
      "A full cruise certificate that rewards your largest buyers and gives your reps a closing tool with no comparable equivalent in the market.",
    bullets: [
      "7 nights, premium itineraries",
      "Used to close $25K+ deals",
      "Reduces buyer's remorse on big purchases",
    ],
    image: "/images/cert-cruise-outside.jpg",
    altImage: "/images/cert-alaska-front.jpg",
    badge: "Best for: $25K+ ticket",
  },
  {
    slug: "alaska-cruise",
    name: "Ultimate 7-Night Alaska Cruise",
    tagline: "The signature program",
    description:
      "Our flagship Alaska cruise certificate. Reserved for premium clients running once-a-year flagship campaigns or rewarding their highest-value accounts.",
    bullets: [
      "Alaska premium itinerary",
      "Limited annual allocation",
      "Co-marketing support included",
    ],
    image: "/images/cert-alaska-front.jpg",
    altImage: "/images/cert-alaska-back.jpg",
    badge: "Signature program",
  },
];

export const INDUSTRIES = [
  {
    name: "Auto Dealerships",
    desc: "Move slow inventory. Win the price-shopper. Reward your highest-ticket buyers and reduce buyer's remorse on the lot.",
    metric: "+38% close on test-driven units",
  },
  {
    name: "Jewelry Stores",
    desc: "Engagement season, holiday, and Mother's Day campaigns that don't depend on discounting your margins.",
    metric: "+22% average ticket",
  },
  {
    name: "Furniture",
    desc: "Hundreds of certificates per quarter is standard. Showroom traffic responds within 48 hours of campaign launch.",
    metric: "5-year traffic highs",
  },
  {
    name: "Home Improvement",
    desc: "High-ticket projects (windows, roofing, solar, kitchens) where the close window is short and the competition is fierce.",
    metric: "+31% in-home close rate",
  },
  {
    name: "Flooring",
    desc: "Differentiate your bid. Win the project with a memorable customer experience your competitor can't match.",
    metric: "+19% bid win rate",
  },
  {
    name: "Mattress",
    desc: "Decision-stalled customers find the urgency to buy today when there's a vacation waiting for them.",
    metric: "+27% same-day close",
  },
  {
    name: "Luxury Retail",
    desc: "Reward your VIP clients. Generate referrals. Reinforce the premium relationship between you and your best buyers.",
    metric: "VIP referrals 2.4x",
  },
  {
    name: "B2B Sales Orgs",
    desc: "SDRs need a meeting opener. AEs need a closing tool. Vacation incentives sit perfectly in the sales playbook.",
    metric: "+44% meeting acceptance",
  },
];

export const CASE_STUDIES = [
  {
    slug: "midwest-furniture-chain",
    company: "Midwest Furniture Chain (8 stores)",
    industry: "Furniture",
    challenge: "Memorial Day promo fatigue — discounts no longer moving traffic.",
    solution: "Deployed 800 'Enjoy a Great Escape' certificates across 8 stores for a 21-day campaign.",
    results: [
      { k: "Showroom traffic", v: "+58%" },
      { k: "Close rate", v: "+24%" },
      { k: "Avg. order value", v: "+12%" },
      { k: "ROI vs. discount promo", v: "5.2x" },
    ],
    image: "/images/cert-escape-v1.jpg",
  },
  {
    slug: "luxury-auto-dealer",
    company: "Luxury Auto Dealer (Top 100 nationally)",
    industry: "Auto",
    challenge: "High buyer's remorse on $80K+ vehicles, leading to lost referrals.",
    solution: "Bundled 'Ultimate 7-Night Cruise' with every $75K+ delivery as a thank-you reward.",
    results: [
      { k: "Buyer's remorse calls", v: "−63%" },
      { k: "Referrals per delivery", v: "+2.1x" },
      { k: "Repeat buyer rate (24mo)", v: "+18%" },
      { k: "CSI score", v: "98.7" },
    ],
    image: "/images/cert-cruise-outside.jpg",
  },
  {
    slug: "regional-jeweler",
    company: "Regional Jewelry Chain (12 locations)",
    industry: "Jewelry",
    challenge: "Engagement-season margin pressure from online discounters.",
    solution: "Every $3K+ purchase included a 'Be Our Guest' getaway. No price match needed.",
    results: [
      { k: "Average ticket", v: "+22%" },
      { k: "Online-comparison loss rate", v: "−41%" },
      { k: "Walk-out rate", v: "−19%" },
      { k: "Net new social mentions", v: "3,200+" },
    ],
    image: "/images/cert-be-our-guest-outside.jpg",
  },
];

export const FAQS = [
  {
    q: "How is this different from a gift card?",
    a: "Gift cards have a known dollar value. Vacations carry a perceived value far higher than their cost. A $25K vacation memory closes deals a $200 gift card never will — and protects your margin.",
  },
  {
    q: "Do my reps need training to use this?",
    a: "We give every team a 30-minute playbook on exactly how to position the certificate in a close. Reps integrate it within their first week.",
  },
  {
    q: "What does it cost us per certificate?",
    a: "Programs are priced for bulk deployment. Per-certificate cost is a small fraction of the deal it closes. Pricing depends on volume and program — request a custom quote.",
  },
  {
    q: "What's the customer's experience like?",
    a: "Customers redeem directly with us. Our team handles every reservation, every change, every issue. You never touch travel logistics.",
  },
  {
    q: "How are these offers possible?",
    a: "Resorts want to fill empty rooms because they want guests to spend money at their resort. They also love the free advertising from guests posting about their vacation on social media. It's a Win/Win.",
  },
  {
    q: "How quickly can we launch?",
    a: "Most clients are live in 5–10 business days. Certificates are issued on demand — there's no inventory to stock.",
  },
];

export const RESOURCES = [
  {
    slug: "stop-discounting-start-closing",
    title: "Stop Discounting. Start Closing.",
    category: "Sales Strategy",
    minutes: 6,
    excerpt: "Why every 1% you discount costs you 3% of profit — and the alternative that beats discounting on every measurable dimension.",
    image: "/images/vac-relaxing.jpg",
    body: [
      "Discounting trains your market to wait for the next discount. Worse, every dollar you give up in price comes straight off your gross margin — which means a 10% discount on a 30% margin product wipes out a third of your profit on that deal.",
      "Vacation incentives invert the math. The perceived value is 10x the cost to you. Customers feel like they 'won' something memorable instead of feeling like they got a deal. They tell their friends. They come back.",
      "When you stop discounting and start exciting, three things happen: average ticket goes up, close rate goes up, and referral rate goes up. Margin stays intact.",
    ],
  },
  {
    slug: "the-buyers-remorse-killer",
    title: "The Buyer's Remorse Killer",
    category: "Closing Tactics",
    minutes: 5,
    excerpt: "Buyer's remorse kills referrals and torpedoes repeat business. Here's the one move that eliminates it on high-ticket sales.",
    image: "/images/vac-island.jpg",
    body: [
      "Buyer's remorse peaks 24–72 hours after a high-ticket purchase. The amygdala panics. The buyer second-guesses. Calls come in to cancel.",
      "A vacation certificate handed at the moment of close shifts the post-purchase emotion from 'did I spend too much?' to 'I'm going somewhere.' The emotional state changes. Cancellations drop. Referrals climb.",
      "Top auto dealers have cut buyer's remorse cancellations by more than 60% using this single move.",
    ],
  },
  {
    slug: "how-to-position-a-vacation-incentive-in-a-close",
    title: "How to Position a Vacation Incentive in a Close",
    category: "Sales Tactics",
    minutes: 8,
    excerpt: "The four-line script your reps need. When to introduce it. How to use it for stall-breaking and same-day close.",
    image: "/images/vac-plane.jpg",
    body: [
      "Never lead with the vacation. Lead with the value of the purchase. Introduce the incentive only after the buyer has emotionally committed to the product.",
      "Use it to break a stall: 'We can't hold this price beyond today, but we can include the getaway if we sign by close of business.' That single line moves 22% of stalled deals to close on the same day in field tests.",
      "Use it to reduce remorse: hand the certificate at delivery, not at signing. Customers remember the moment forever.",
    ],
  },
  {
    slug: "compensation-plans-that-actually-motivate",
    title: "Sales Comp Plans That Actually Motivate",
    category: "Sales Leadership",
    minutes: 7,
    excerpt: "Money motivates to a point. Memorable experiences create rep behavior changes money cannot.",
    image: "/images/vac-sanfran.jpg",
    body: [
      "Cash bonuses get spent on bills. Vacation incentives become stories told for years. When you put a trip on the table for the top quartile, behavior changes overnight.",
      "Top sales orgs blend cash + experience-based incentives at a 70/30 ratio. The 30% delivers an outsized lift in rep effort and pipeline coverage.",
    ],
  },
  {
    slug: "running-a-21-day-blitz-campaign",
    title: "The 21-Day Blitz Campaign Playbook",
    category: "Campaign Playbook",
    minutes: 9,
    excerpt: "Exactly how a national furniture chain ran a 21-day campaign that posted a 5-year traffic high. Step by step.",
    image: "/images/vac-palm.jpg",
    body: [
      "Day 1–3: Pre-launch teaser to existing CRM. Subject line discipline matters more than budget.",
      "Day 4–21: Daily creative rotation with the certificate as the hook. Showroom traffic peaks day 7–10.",
      "Day 22: Debrief and measure. Most clients see 4–6x ROI vs. their prior discount-led campaign.",
    ],
  },
  {
    slug: "differentiating-on-experience-not-price",
    title: "Differentiating on Experience, Not Price",
    category: "Sales Strategy",
    minutes: 5,
    excerpt: "Your competitor will match your price. They cannot match an experience your customer will remember for years.",
    image: "/images/vac-beach.jpg",
    body: [
      "Price is the lazy lever. Experience is the leverage your competitor cannot copy overnight.",
      "Build a customer experience around purchase — including a vacation moment — and you become impossible to compare on a spreadsheet.",
    ],
  },
];

export const VIDEO_PLACEHOLDERS = [
  {
    title: "How to Use a Vacation Incentive in Your Close",
    duration: "08:24",
    label: "Sales Tactic — Coming Soon",
  },
  {
    title: "The Stall-Breaker Script (Verbatim)",
    duration: "06:11",
    label: "Closer's Playbook — Coming Soon",
  },
  {
    title: "Deploying the Certificate at Delivery",
    duration: "05:47",
    label: "Buyer's Remorse Prevention — Coming Soon",
  },
];

export const TRUST_LOGOS = [
  "MERIDIAN AUTO GROUP",
  "GRANT & SONS JEWELERS",
  "NORTHWAY FURNITURE",
  "APEX HOME EXTERIORS",
  "REGENCY MATTRESS",
  "CRESTLINE FLOORING",
  "WEST COAST LUXURY",
  "PINNACLE B2B",
];
