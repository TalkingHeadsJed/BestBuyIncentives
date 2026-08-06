import Seo from "@/components/site/Seo";

const CONTENT = {
  privacy: {
    title: "Privacy Policy | Best Buy Incentives",
    h1: "Privacy Policy",
    description: "How Best Buy Incentives collects and uses business contact, website attribution, and consultation information.",
    sections: [
      ["Information we collect", "We may collect business contact information you submit, including your name, work email, company, role, phone number, industry, sales objectives, and message. We also collect limited website attribution information such as landing page, referrer, campaign parameters, and interaction events."],
      ["How we use information", "We use this information to respond to consultation requests, evaluate campaign fit, deliver requested resources, improve the website and sales process, maintain attribution, and measure consultations, opportunities, sales, and commission."],
      ["Analytics and privacy", "Contact details, company names, phone numbers, and free-text messages must not be sent to website analytics. Business contact information may be stored in our customer relationship system and service providers used to process the request."],
      ["Service providers", "We may use scheduling, analytics, hosting, email, and customer relationship providers to operate the website and respond to requests. They receive only the information needed for their function."],
      ["Your choices", "You may request access, correction, or deletion of submitted business contact information by emailing sales@bestbuyincentives.com. We may retain records required for security, attribution, contracts, or legal obligations."],
    ],
  },
  terms: {
    title: "Website Terms | Best Buy Incentives",
    h1: "Website Terms",
    description: "Terms governing use of BestBuyIncentives.com and its sales-growth information and resources.",
    sections: [
      ["Website information", "This website provides general information about customer incentive programs, discounted travel vouchers, sales processes, and campaign measurement. It is not a promise that any particular campaign will produce a specific result."],
      ["Program terms control", "Each discounted travel voucher and campaign has its own eligibility, inclusions, recipient-paid costs, deadlines, availability, booking or redemption steps, restrictions, and support process. The written terms supplied for the selected program control."],
      ["Accurate presentation", "Businesses using a program are responsible for training representatives to present the offer accurately, identify eligible recipients, avoid misleading claims, and provide the applicable written terms."],
      ["Resources", "Playbooks, calculators, articles, scripts, and examples are provided for business planning. Users remain responsible for their pricing, sales practices, campaign design, customer communications, and compliance obligations."],
      ["Contact", "Questions about these terms may be sent to sales@bestbuyincentives.com or 866-843-8003."],
    ],
  },
  compliance: {
    title: "Program Compliance | Best Buy Incentives",
    h1: "Program Compliance",
    description: "Standards for accurately presenting discounted travel vouchers in customer-facing sales campaigns.",
    sections: [
      ["Use the approved product term", "Describe the product as a discounted travel voucher. Do not imply that travel is entirely without recipient cost or omit material conditions."],
      ["Disclose the customer experience", "Before presenting an offer, the sales team should understand what the voucher includes, what the recipient pays, deadlines, availability, restrictions, activation, booking or redemption, and where the recipient obtains support."],
      ["Apply campaign rules consistently", "Management should define who qualifies, when the voucher may be offered, whether it can be combined with discounts, how delivery is recorded, and how exceptions are handled."],
      ["Measure legitimate sales outcomes", "Evaluate qualified close rate, discounting, gross profit, cancellations, customer feedback, attributable revenue, and commission. Do not treat modeled results or client experiences as guaranteed outcomes."],
      ["Report concerns", "Send questions about program presentation, recipient terms, or campaign operation to sales@bestbuyincentives.com or call 866-843-8003 before making an uncertain representation."],
    ],
  },
};

export default function Legal({ type }) {
  const page = CONTENT[type];
  return <div data-testid={`page-${type}`}><Seo title={page.title} description={page.description} path={`/${type}`} /><section className="bg-[#F5F2EA] border-b border-black/10"><div className="mx-auto max-w-4xl px-6 pt-40 pb-16"><div className="text-[11px] font-mono uppercase tracking-widest font-bold">Best Buy Incentives</div><h1 className="font-display mt-5 text-5xl lg:text-7xl font-bold leading-[0.95]">{page.h1}</h1><p className="mt-6 text-lg text-black/70">{page.description}</p></div></section><article className="mx-auto max-w-4xl px-6 py-16">{page.sections.map(([heading, body]) => <section key={heading} className="mb-10"><h2 className="font-display text-3xl font-bold">{heading}</h2><p className="mt-3 text-lg leading-relaxed text-black/75">{body}</p></section>)}<p className="text-sm text-black/50">Last updated August 6, 2026.</p></article></div>;
}
