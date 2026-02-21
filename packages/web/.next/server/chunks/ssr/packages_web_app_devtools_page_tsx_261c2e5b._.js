module.exports=[28821,a=>{"use strict";var b=a.i(87924),c=a.i(72131);let d=["Verification","Mint Agent","Faucet Claim"];function e(){let[a,e]=(0,c.useState)(d),[f,g]=(0,c.useState)("0xa237822F03A0D4c8C79219Bb65ad23A64c9B291a"),[h,i]=(0,c.useState)(86400),[j,k]=(0,c.useState)("human-agent"),l=(0,c.useMemo)(()=>`// Generated integration snippet
const flow = ${JSON.stringify(a)};
const config = {
  network: "0G Testnet",
  faucetAddress: "${f}",
  cooldownSec: ${h},
  verificationPolicy: "${j}"
};

// React widget:
<VerificationWidget onVerified={onVerified} />

// Contract guard:
require(agent.isVerified(msg.sender), "Agent not verified");`,[a,f,h,j]);return(0,b.jsxs)("div",{className:"grid gap-6 lg:grid-cols-[1.2fr_1fr]",children:[(0,b.jsxs)("section",{className:"glass rounded-2xl p-6",children:[(0,b.jsx)("h2",{className:"text-xl font-semibold",children:"Flow Canvas"}),(0,b.jsx)("div",{className:"mt-4 grid gap-3 md:grid-cols-3",children:d.map(c=>{let d=a.includes(c);return(0,b.jsx)("button",{onClick:()=>e(a=>d?a.filter(a=>a!==c):[...a,c]),className:`rounded-xl border px-4 py-4 text-left text-sm transition ${d?"border-indigo-300 bg-indigo-500/20":"border-white/15 bg-white/5"}`,children:c},c)})})]}),(0,b.jsxs)("section",{className:"glass rounded-2xl p-6",children:[(0,b.jsx)("h2",{className:"text-xl font-semibold",children:"Config Panel"}),(0,b.jsx)("p",{className:"mt-1 text-sm text-white/60",children:"Network: 0G Testnet"}),(0,b.jsxs)("label",{className:"mt-4 block text-sm",children:["Faucet address",(0,b.jsx)("input",{className:"mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2",value:f,onChange:a=>g(a.target.value)})]}),(0,b.jsxs)("label",{className:"mt-3 block text-sm",children:["Cooldown seconds",(0,b.jsx)("input",{type:"number",className:"mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2",value:h,onChange:a=>i(Number(a.target.value)||0)})]}),(0,b.jsxs)("label",{className:"mt-3 block text-sm",children:["Verification policy",(0,b.jsx)("input",{className:"mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2",value:j,onChange:a=>k(a.target.value)})]})]}),(0,b.jsxs)("section",{className:"glass rounded-2xl p-6 lg:col-span-2",children:[(0,b.jsx)("h2",{className:"text-xl font-semibold",children:"Generate Integration"}),(0,b.jsx)("pre",{className:"mt-3 overflow-x-auto rounded-xl bg-black/30 p-4 text-xs text-emerald-200",children:l})]})]})}a.s(["default",()=>e])}];

//# sourceMappingURL=packages_web_app_devtools_page_tsx_261c2e5b._.js.map