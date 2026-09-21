// Length-fix expansion (2026-09-21): extra sections + FAQs merged into the 8
// industry/partner pages by IndustryPage. Real substance, no padding. Keyed by
// route path. No em-dashes. [KARL: ...] facts stay as HTML comments only.

export const INDUSTRY_EXTRA = {
  "/industries/automotive-dealerships": {
    sections: [
      { h: "A vehicle sale with a closing incentive, step by step", html:
        `<p>Picture a Saturday on the lot. A couple has spent an hour with a certified pre-owned SUV they clearly love, but the husband keeps circling back to the price and says they want to look at one more store before deciding. The old reflex is to shave four hundred dollars off to keep them from leaving. Instead, the salesperson confirms the fit: "It sounds like this is the right vehicle. Is it the number, or the timing, that has you wanting to shop it?" The wife admits it is really about feeling like they got something extra for a big purchase.</p>
        <p>That is the opening. The salesperson holds the price and adds value: "I can't go lower without cutting into what makes this a good car for you, but if we finalize today I can include a getaway certificate as our thank-you for buying from us." Now the couple is comparing a vehicle-plus-getaway against a bare quote at the next store. They sign that afternoon at full gross, the dealership hands the certificate at delivery so the memory sticks, and the recipients book their trip directly with the travel support team. The rep never touched a single logistics detail, and the store protected roughly the same margin it would have discounted away.</p>` },
      { h: "Promotion calendar: dealership incentive ideas by season", html:
        `<p>A steady cadence keeps the reward fresh instead of feeling like a permanent giveaway.</p>
        <ul>
          <li><strong>Winter (Jan-Mar):</strong> Use a getaway reward to pull demand forward through the slow post-holiday months and clear prior-year units at full price rather than wholesaling them.</li>
          <li><strong>Spring (Apr-Jun):</strong> Tie the reward to tax-refund season and graduation shoppers, and run a service-lane trade-up campaign that converts fixed-ops traffic into sales.</li>
          <li><strong>Summer (Jul-Aug):</strong> Anchor the reward to model-year clearance so aging inventory moves on value, not markdown.</li>
          <li><strong>Fall (Sep-Dec):</strong> Layer the getaway onto year-end and holiday sales events, and reward referrals so your best customers bring their networks before the calendar turns.</li>
        </ul>
        <p>Rotate the qualifying threshold and the campaign window each quarter so the offer always carries urgency.</p>` },
    ],
    faqs: [
      { q: "Can we offer the reward on leased vehicles, not just purchases?", a: "Yes. Lease customers respond to the same value-add, and rewarding a lease signing today protects the deal from a competitor's last-minute pitch just as it does on a purchase." },
      { q: "What qualifying threshold should a dealership set?", a: "Set it at or just above your target deal so the reward nudges buyers toward the vehicle and options you want to move, while keeping the fixed program cost comfortably below the gross you protect." },
    ],
  },

  "/industries/furniture-retailers": {
    sections: [
      { h: "A furniture sale with a travel voucher, step by step", html:
        `<p>A shopper has been eyeing a sectional and a dining set for a new home but says the classic line: "We love it, but let us think about it." Most floors answer that with a coupon. Here, the associate first confirms the pieces fit: "Are these the right pieces for the space, or is something still not quite right?" The shopper confirms they are perfect; the hesitation is just the size of the total.</p>
        <p>The associate holds price and reframes: "I understand. These are pieces you'll live with for years. If you place the order today, I can include a getaway certificate as a thank-you, which is something a coupon at the next store won't give you." The shopper now weighs a full room of furniture plus a trip against walking away and starting over. They write the order before leaving, the store keeps its margin intact, and the customer redeems the getaway directly with the travel team. The associate simply issued the certificate on the spot and moved on to the next guest.</p>` },
      { h: "Promotion calendar: furniture incentive ideas by season", html:
        `<p>Furniture buying follows predictable rhythms you can build rewards around.</p>
        <ul>
          <li><strong>Winter (Jan-Feb):</strong> Run a getaway-with-purchase event during the post-holiday lull to pull traffic forward without a clearance markdown.</li>
          <li><strong>Spring (Mar-May):</strong> Target movers and remodelers, and set the qualifying threshold at a full-room package to lift average order value.</li>
          <li><strong>Summer (Jun-Aug):</strong> Anchor the reward to the July 4th and Labor Day windows so you draw sale-season traffic while holding floor prices.</li>
          <li><strong>Fall (Sep-Dec):</strong> Use the reward for pre-holiday delivery deadlines and design-consultation bookings, rewarding your highest-value path into the new year.</li>
        </ul>
        <p>Because the reward is not a markdown, running it across seasons never trains shoppers to wait for a deeper discount.</p>` },
    ],
    faqs: [
      { q: "Will a getaway reward work for a single-store independent retailer?", a: "Yes. Certificates are issued on demand with no minimum showroom size, so a single independent can run the same value-add campaign a multi-store chain uses." },
      { q: "How do we present the reward without cheapening a premium collection?", a: "Introduce it after the customer has chosen the pieces, framed as a thank-you for the purchase rather than a discount on it. Timing keeps the collection premium and the reward a bonus." },
    ],
  },

  "/industries/jewelry-stores": {
    sections: [
      { h: "A jewelry sale with a travel voucher, step by step", html:
        `<p>A customer is choosing an anniversary piece and clearly connects with a particular necklace, but pulls out a phone and mentions a lower online price for a similar stone. The losing move is to match the screen. Instead, the associate leans into the occasion: "Tell me about the anniversary. What do you want this to say to her?" The conversation shifts from a spec sheet to a milestone.</p>
        <p>The associate then establishes value the screen cannot: certification, craftsmanship, sizing, service, and lifetime care. To close, they add meaning rather than cut price: "Online can't do this for you, but I can. Buy today and I'll include a getaway certificate so the two of you can celebrate the anniversary somewhere memorable." Now the customer is buying a certified piece, in-person trust, and a celebration, not just a stone. They purchase at full margin, and the couple books their trip with the travel support team. The store competed on experience and won without ever discounting.</p>` },
      { h: "Promotion calendar: jewelry incentive ideas by season", html:
        `<p>Jewelry demand clusters around emotional occasions, which is exactly when a getaway reward resonates.</p>
        <ul>
          <li><strong>Winter (Nov-Feb):</strong> The holiday, engagement, and Valentine's windows are your peak; every qualifying purchase earning a romantic getaway gives shoppers a reason to choose you over a discounter.</li>
          <li><strong>Spring (Mar-May):</strong> Mother's Day and spring weddings pair naturally with a travel reward tied to the celebration.</li>
          <li><strong>Summer (Jun-Aug):</strong> Anniversary season and June weddings are ideal for honeymoon-style getaway rewards on higher-ticket pieces.</li>
          <li><strong>Fall (Sep-Oct):</strong> Promote custom-design bookings for the coming holidays, rewarding the premium bespoke path that carries your best margin.</li>
        </ul>` },
    ],
    faqs: [
      { q: "Does a travel reward work for repairs and lower-ticket sales?", a: "It is most effective above a set price point, so set the threshold at a meaningful ticket. Lower-ticket and repair customers still build loyalty, but the reward is designed to lift high-value purchases." },
      { q: "How do we handle a customer who still wants a price match?", a: "Acknowledge the number, then reframe on certification, service, and trust, and let the getaway be the tangible extra the online seller cannot provide. You answer price with value plus a memorable bonus." },
    ],
  },

  "/industries/boat-rv-dealers": {
    sections: [
      { h: "A boat or RV sale with a travel voucher, step by step", html:
        `<p>A family has toured a travel trailer twice and loves it, but the buyer says he wants to wait until next season so he does not rush a big decision. The discount reflex would knock off a thousand dollars to force the issue. Instead, the salesperson confirms the fit: "It sounds like this is the right coach for how you want to camp. Is it the trailer, or just the timing?" The buyer admits it is timing; he is not sure this season is the right time to spend.</p>
        <p>That is the opening for urgency without pressure. The salesperson holds price and adds the dream: "I can't hold this price into next year, but if you take it this season I'll include a getaway certificate so your first big trip is on us." Now the decision is about starting the adventure now versus waiting a year and paying the same or more. The family signs, the dealer protects gross on a floor-planned unit, and the buyers book their getaway with the travel team. The reward turned an emotional stall into a same-season sale.</p>` },
      { h: "Promotion calendar: boat and RV incentive ideas by season", html:
        `<p>Recreation sales are highly seasonal, so timing the reward is half the battle.</p>
        <ul>
          <li><strong>Winter (Jan-Feb):</strong> Boat and RV show season. Offer the getaway to show leads who buy within a set window to convert foot traffic into signed deals.</li>
          <li><strong>Spring (Mar-May):</strong> The season opener. Use the reward to pull decisions forward before competitors start discounting.</li>
          <li><strong>Summer (Jun-Aug):</strong> Peak use season. Reward trade-ups from owners who want more space for the trips they are already taking.</li>
          <li><strong>Fall (Sep-Nov):</strong> End-of-season. Replace a fire-sale markdown with a getaway reward so late-season units move on value, not desperation.</li>
        </ul>` },
    ],
    faqs: [
      { q: "How do we avoid the reward feeling like a gimmick to recreation buyers?", a: "Tie it to the lifestyle they are buying and present it as the first trip that comes with the purchase. Framed as part of the adventure, it reinforces the dream rather than distracting from it." },
      { q: "Can dealers use the reward on parts, service, or accessories?", a: "The reward is built to close units and trade-ups, but a threshold on large accessory or upfit packages can extend it. Keep it focused where it protects the most gross." },
    ],
  },

  "/industries/home-improvement-hvac": {
    sections: [
      { h: "An in-home sale with a travel voucher, step by step", html:
        `<p>A rep is at a homeowner's kitchen table quoting a full HVAC system replacement. The homeowner says the system still limps along and they want to get two more quotes before spending that kind of money. The typical response is to pre-emptively drop the price to lock the job. Instead, the rep confirms the need: "It sounds like reliability and comfort are what matter most here. Is it the scope, or just wanting to compare, that has you holding off?" The homeowner says it is really about feeling confident they are not overpaying.</p>
        <p>The rep holds price and shifts to value and urgency: "I understand. Here's what this price includes that a cheaper quote usually won't, and if you approve today I can include a getaway certificate as a thank-you for choosing us." Now the homeowner weighs a fully warranted install plus a getaway against restarting the whole bidding process. They sign during the visit, the contractor protects margin on labor-heavy work, and the homeowner books the trip with the travel team while the crew schedules the install. The comparison objection dissolved without a discount.</p>` },
      { h: "Promotion calendar: home improvement incentive ideas by season", html:
        `<p>Replacement demand tracks the weather, so time the reward to pull decisions forward.</p>
        <ul>
          <li><strong>Winter (Dec-Feb):</strong> Heating failures peak. Offer the reward on full-system replacements to move homeowners off limping through the cold.</li>
          <li><strong>Spring (Mar-May):</strong> Pre-cooling-season tune-ups convert to replacements; reward whole-home upgrades and window or remodel packages.</li>
          <li><strong>Summer (Jun-Aug):</strong> Cooling demand spikes. Use the reward to win competitive bids at your busiest, highest-stakes time.</li>
          <li><strong>Fall (Sep-Nov):</strong> Pre-winter replacements. Reward homeowners who decide before the first freeze rather than waiting for a breakdown.</li>
        </ul>` },
    ],
    faqs: [
      { q: "Does the reward work for repairs, or only full replacements?", a: "It has the most impact on full-system replacements and large remodels, where the ticket and the competition are highest. Set the threshold there so the program protects the most gross." },
      { q: "How does the reward help against a lowball competitor?", a: "It lets you compete on value and warranty instead of price. The homeowner gets a reason to choose you, plus a memorable extra, without you dropping into a race to the bottom." },
    ],
  },

  "/industries/roofing-contractors": {
    sections: [
      { h: "A roofing sale with a travel voucher, step by step", html:
        `<p>After a storm, a rep inspects a homeowner's damaged roof and presents a full replacement. The homeowner says a neighbor's contractor quoted less and they are inclined to go with the cheaper bid. Matching that number would gut the margin on a labor and material heavy job. Instead, the rep reframes: "I want you to compare the right things. Here's what our price includes that the lower bid may not: the crew, the warranty, the cleanup, and what it costs to redo a roof done wrong."</p>
        <p>Once the homeowner sees they are comparing different levels of work, the number stops being the whole story. The rep closes on value plus a reason to act: "If you approve today so we can get you on the schedule before the next system moves through, I'll include a getaway certificate as our thank-you." The homeowner signs the more thorough bid, the contractor protects gross, and the homeowner books the getaway with the travel team. A stressful, expense-only decision gained a bright side, and the crew won on value rather than price.</p>` },
      { h: "Promotion calendar: roofing incentive ideas by season", html:
        `<p>Roofing demand swings with weather and daylight, so match the reward to the work.</p>
        <ul>
          <li><strong>Winter (Dec-Feb):</strong> Slower months. Use the reward to keep crews booked with planned replacements rather than chasing the cheapest emergency jobs.</li>
          <li><strong>Spring (Mar-May):</strong> Storm season begins. Offer approve-today rewards to homeowners deciding among competing bids on the same street.</li>
          <li><strong>Summer (Jun-Aug):</strong> Peak installation. Reward full replacements over patch jobs to steer homeowners to the durable option.</li>
          <li><strong>Fall (Sep-Nov):</strong> Pre-winter urgency. Reward homeowners who lock in before weather closes the window, and reward neighbor referrals to turn one roof into a block of work.</li>
        </ul>` },
    ],
    faqs: [
      { q: "Does the reward complicate insurance or storm-restoration jobs?", a: "No. The reward is a thank-you from your company for choosing your crew and is separate from the insurance claim, so it differentiates your bid without affecting the claim itself." },
      { q: "How do we use the reward to drive neighborhood referrals?", a: "Reward homeowners whose referred neighbors also sign. On a storm-hit street where several roofs need work, that can turn a single job into a cluster of connected installs." },
    ],
  },

  "/industries/wedding-event-businesses": {
    sections: [
      { h: "A booking with a travel voucher, step by step", html:
        `<p>An engaged couple has toured a venue and loves it, but they are holding three vendors in play and say they need time to compare packages and prices. The reflex is to trim the package to win the booking. Instead, the coordinator keeps the conversation on the celebration: "Tell me what you want the day to feel like." The couple describes their vision, and the coordinator shows exactly how the venue delivers it.</p>
        <p>To close, they add to the emotion rather than cut the price: "I'd love to host your day. If you book with us this week, we'll include a getaway certificate so your honeymoon starts as our gift to you." Now the couple is choosing a venue that matches their vision and a honeymoon head start, not just the lowest quote. They sign, the business books the package at full value, and the couple redeems the getaway with the travel team. The reward made choosing this vendor the emotionally obvious call.</p>` },
      { h: "Promotion calendar: wedding and event incentive ideas by season", html:
        `<p>Booking cycles run ahead of event dates, so time rewards to the planning calendar.</p>
        <ul>
          <li><strong>Winter (Dec-Feb):</strong> Engagement season peaks around the holidays and Valentine's Day. Offer a honeymoon getaway reward to newly engaged couples booking early.</li>
          <li><strong>Spring (Mar-May):</strong> Peak booking for the coming year. Use a book-by reward to move couples off holding multiple vendors.</li>
          <li><strong>Summer (Jun-Aug):</strong> Busy event season and corporate mid-year planning; reward full-package upgrades and planner referrals.</li>
          <li><strong>Fall (Sep-Nov):</strong> Corporate holiday-event booking window. Reward planners whose events lead to repeat or referred bookings.</li>
        </ul>` },
    ],
    faqs: [
      { q: "Can we offer the reward to the couple or to the corporate client?", a: "Both. For weddings the getaway maps naturally onto the honeymoon; for corporate events it rewards the decision-maker or planner who books, and referrals from either build a steady pipeline." },
      { q: "When in the sales conversation should we introduce the reward?", a: "After the couple or planner is emotionally connected to your venue or service. Lead with the celebration and the vision, then present the getaway as the reason to commit now." },
    ],
  },

  "/partners/marketing-agencies": {
    sections: [
      { h: "Adding an incentive to a client campaign, step by step", html:
        `<p>Say a client's paid campaign is driving traffic but stalling at the demo-booking step, and the client's instinct is to run a discount or pour more budget into media. The agency proposes a sharper lever. First, it pinpoints the exact drop-off: strong clicks, weak form completions. Then it designs an incentive offer, layering a travel reward onto the call to action so booking a demo carries more pull without cutting the client's price.</p>
        <p>The agency launches it as a clean test: incentivized creative against a control audience, tracking conversion rate, cost per acquisition with the reward factored in, and downstream close rate. When the incentivized cohort converts meaningfully better at a defensible CPA, the agency has a measurable win to report and a repeatable play to extend across the client's other campaigns. The end customers redeem their rewards directly with the travel support team, so neither the agency nor the client carries any fulfillment overhead. The agency has added a conversion tool competitors are not bringing to the pitch.</p>` },
      { h: "Promotion calendar: incentive ideas by campaign season", html:
        `<p>Aligning incentive pushes with the client's calendar keeps the lever sharp.</p>
        <ul>
          <li><strong>Q1 (Jan-Mar):</strong> New-year demand. Use incentives to lift lead-gen and demo bookings while budgets reset.</li>
          <li><strong>Q2 (Apr-Jun):</strong> Spring buying and event seasons. Layer rewards onto high-intent campaigns and measure lift against control.</li>
          <li><strong>Q3 (Jul-Sep):</strong> Slower summer stretch. Deploy incentives to keep pipeline warm without discounting the client's product.</li>
          <li><strong>Q4 (Oct-Dec):</strong> Peak spend and holiday promotions. Use rewards to differentiate the client's offer in the noisiest quarter and to fuel referral flows into the new year.</li>
        </ul>` },
    ],
    faqs: [
      { q: "How do we price an incentive into a client's campaign budget?", a: "Treat the reward as a fixed, known cost per conversion rather than a variable discount. That makes it easy to model against target CPA and to show the client a clean return." },
      { q: "Can we white-label the incentive as part of our services?", a: "Yes. Agencies present the incentive strategy as their own conversion offering, with the travel support team handling redemption behind the scenes, so it strengthens your proposals without adding operational load." },
    ],
  },
};

export const getIndustryExtra = (path) => INDUSTRY_EXTRA[path];
