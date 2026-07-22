// Data for the head-to-head comparison pages (SEO/AEO). One dynamic page
// (/travel-incentives-vs-:key) renders each of these from data.

export const COMPARISONS = {
  discounting: {
    altLabel: "Discounting",
    heroWord: "discounting.",
    seoTitle: "Travel Incentives vs. Discounting: Which Closes More Deals?",
    seoDescription:
      "A head-to-head comparison of travel-incentive certificates versus discounting for high-ticket sales teams — margin impact, close rate, perceived value, referrals, and brand positioning.",
    heroSubtitle:
      "When you cut price to win a deal, the profit comes straight out of your pocket. Here's exactly how a travel incentive beats a discount on every dimension that matters to a high-ticket sales team.",
    rows: [
      { dim: "Effect on gross margin", alt: "Comes straight off profit — a 10% cut on a 30%-margin product erases about a third of that deal's profit.", incentive: "Costs a small fraction of the deal it closes. Your price — and your margin — stay intact." },
      { dim: "Close rate", alt: "Buyers still hesitate, and price cuts quickly become expected on every deal.", incentive: "Gives the buyer a compelling reason to act now — teams report an average close-rate lift of about 37%." },
      { dim: "Perceived value vs. your cost", alt: "1:1 — a $200 price cut costs you the full $200.", incentive: "Roughly 10:1 — the vacation's perceived value far exceeds what it costs you." },
      { dim: "Word of mouth & referrals", alt: "Nobody tells their friends about a discount.", incentive: "Guests post about and talk up their vacation — free exposure that drives new business." },
      { dim: "Brand positioning", alt: "Trains your market to wait for the next sale and compete on price.", incentive: "Positions you on experience and value — impossible to compare on a spreadsheet." },
      { dim: "Repeat & loyalty", alt: "Erodes price integrity and conditions one-time bargain hunters.", incentive: "A memorable reward builds loyalty and brings customers back." },
      { dim: "Who handles fulfillment", alt: "Not applicable.", incentive: "A dedicated travel support team handles every booking — your team does nothing." },
    ],
    mathLeft: { label: "The discount math", headline: "A 10% discount on a 30%-margin product wipes out about a third of your profit on that deal.", body: "And once you discount, buyers expect it next time. You've trained your market to wait for the price to drop." },
    mathRight: { label: "The incentive math", headline: "A vacation's perceived value runs about 10x what it costs you — and your price never moves.", body: "Higher close rate, higher average ticket, and more referrals — all with your margin intact." },
    faqs: [
      { q: "Is it better to offer a discount or a travel incentive?", a: "A travel incentive almost always wins. Discounting comes directly off your margin and trains buyers to wait for the next price cut, while a travel incentive adds high perceived value on top of your offer, so you hold your price and still give the customer a reason to say yes now." },
      { q: "Why do travel incentives close more deals than discounts?", a: "Because a vacation carries a perceived value many times its cost and creates an emotional reason to buy today, whereas a discount is simply expected and negotiated. Teams using travel incentives report an average close-rate lift of about 37%." },
      { q: "Does giving a vacation incentive hurt my margin?", a: "No. The certificate costs a small fraction of the deal it helps close, so your price and margin stay intact — unlike a discount, which removes profit dollar for dollar." },
    ],
  },

  "gift-cards": {
    altLabel: "Gift Cards",
    heroWord: "gift cards.",
    seoTitle: "Travel Incentives vs. Gift Cards: Which Reward Sells More?",
    seoDescription:
      "Travel-incentive certificates vs. gift cards as a sales reward — perceived value, emotional pull, margin impact, referrals, and why a vacation out-closes a gift card of the same cost.",
    heroSubtitle:
      "A gift card is practical but forgettable, and its value comes straight out of your pocket. A vacation costs you far less than buyers think it's worth — and it's something they actually get excited about.",
    rows: [
      { dim: "Perceived value vs. your cost", alt: "1:1 — a $100 card feels like $100 and costs you $100.", incentive: "Roughly 10:1 — a getaway feels far more valuable than it costs you." },
      { dim: "Emotional pull", alt: "Useful, but rarely exciting or memorable.", incentive: "A dream vacation people look forward to, talk about, and remember." },
      { dim: "Effect on gross margin", alt: "Full face value comes straight out of your profit.", incentive: "Costs a small fraction of the deal it helps close." },
      { dim: "Word of mouth & referrals", alt: "Gift cards are rarely shared or talked about.", incentive: "Guests post about and recommend their trip — free exposure." },
      { dim: "Brand positioning", alt: "A commodity reward any competitor can match.", incentive: "Differentiates you on experience, not on who gives the bigger card." },
      { dim: "Leftover value", alt: "Partial use, forgotten balances, and re-gifting.", incentive: "A complete experience that gets fully redeemed and enjoyed." },
      { dim: "Who handles fulfillment", alt: "You buy, distribute, and track balances.", incentive: "A dedicated travel support team handles every booking." },
    ],
    mathLeft: { label: "The gift-card math", headline: "A gift card feels worth exactly its face value — and costs you every dollar of it.", body: "It's a practical thank-you, not a reason to buy today, so it rarely moves a hesitant deal over the line." },
    mathRight: { label: "The incentive math", headline: "A vacation's perceived value runs about 10x its cost — and it creates real excitement.", body: "That excitement is what closes the deal, protects your margin, and earns referrals a gift card never will." },
    faqs: [
      { q: "Are travel incentives better than gift cards for closing sales?", a: "Yes. A gift card carries a fixed, known value that costs you dollar for dollar, while a travel incentive has a perceived value many times its cost and creates genuine excitement — which is what actually motivates a buying decision." },
      { q: "Why does a vacation outperform a gift card of the same cost?", a: "Because buyers judge a reward by how it makes them feel. A card is practical and forgettable; a vacation is aspirational and memorable, so it drives more closes, more referrals, and more loyalty for the same or lower cost." },
      { q: "Do gift cards hurt my margin more than a travel incentive?", a: "Generally yes — the gift card's full face value comes out of your profit, whereas a travel certificate costs only a fraction of the deal it helps you close." },
    ],
  },

  "cash-rebates": {
    altLabel: "Cash Rebates",
    heroWord: "cash rebates.",
    seoTitle: "Travel Incentives vs. Cash Rebates: Which Wins More Deals?",
    seoDescription:
      "Travel-incentive certificates vs. cash rebates as a sales offer — margin impact, perceived value, buyer behavior, redemption friction, and why a vacation beats cash back.",
    heroSubtitle:
      "A cash rebate is just a discount in disguise — it comes straight off your margin and trains buyers to chase money back. A vacation costs you far less and gives customers something to get excited about.",
    rows: [
      { dim: "Effect on gross margin", alt: "Cash back is a direct discount — the full amount comes off your profit.", incentive: "Costs a small fraction of the deal; your margin stays intact." },
      { dim: "Perceived value vs. your cost", alt: "Exactly its dollar amount — no more.", incentive: "Roughly 10x its cost in perceived value." },
      { dim: "Emotional pull", alt: "Treated as money owed, not a reward.", incentive: "An aspirational experience that motivates action." },
      { dim: "Buyer behavior", alt: "Trains customers to hold out for cash back.", incentive: "Keeps the conversation on value, not price." },
      { dim: "Word of mouth & referrals", alt: "Nobody tells their friends about a rebate.", incentive: "Vacations get shared and drive new referrals." },
      { dim: "Redemption experience", alt: "Forms, delays, processing — and breakage.", incentive: "Simple redemption handled by the travel support team." },
      { dim: "Brand positioning", alt: "Signals you compete on price.", incentive: "Positions you on experience and value." },
    ],
    mathLeft: { label: "The rebate math", headline: "A cash rebate is a discount with extra steps — every dollar comes off your margin.", body: "It's expected, negotiated, and forgotten the moment it's spent, so it does little to differentiate you." },
    mathRight: { label: "The incentive math", headline: "A vacation's perceived value runs about 10x its cost — and your price never drops.", body: "You protect margin, stand out on experience, and earn the referrals a rebate never generates." },
    faqs: [
      { q: "Is a travel incentive better than a cash rebate?", a: "Yes. A cash rebate is effectively a discount — its full value comes off your margin and buyers treat it as money owed. A travel incentive costs a fraction of the deal, carries far higher perceived value, and creates excitement that closes sales." },
      { q: "Why do cash rebates hurt margin more than travel incentives?", a: "A rebate pays out its full dollar amount straight from your profit, while a travel certificate costs only a small fraction of the deal it helps close — so the incentive protects margin the rebate erodes." },
      { q: "Do customers prefer cash back or a free vacation?", a: "Cash back is quickly absorbed and forgotten, but a vacation is memorable and aspirational. That emotional pull is why a travel incentive more reliably motivates a buying decision and earns referrals." },
    ],
  },
};

// Nav dropdown items
export const COMPARE_LINKS = [
  { label: "vs. Discounting", to: "/travel-incentives-vs-discounting" },
  { label: "vs. Gift Cards", to: "/travel-incentives-vs-gift-cards" },
  { label: "vs. Cash Rebates", to: "/travel-incentives-vs-cash-rebates" },
];
