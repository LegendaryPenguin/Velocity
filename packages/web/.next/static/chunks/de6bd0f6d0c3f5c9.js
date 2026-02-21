(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,10877,e=>{"use strict";var t=e.i(43476),s=e.i(71645);let l=["Verification","Mint Agent","Faucet Claim"];function a(){let[e,a]=(0,s.useState)(l),[i,n]=(0,s.useState)("0xa237822F03A0D4c8C79219Bb65ad23A64c9B291a"),[r,o]=(0,s.useState)(86400),[d,c]=(0,s.useState)("human-agent"),m=(0,s.useMemo)(()=>`// Generated integration snippet
const flow = ${JSON.stringify(e)};
const config = {
  network: "0G Testnet",
  faucetAddress: "${i}",
  cooldownSec: ${r},
  verificationPolicy: "${d}"
};

// React widget:
<VerificationWidget onVerified={onVerified} />

// Contract guard:
require(agent.isVerified(msg.sender), "Agent not verified");`,[e,i,r,d]);return(0,t.jsxs)("div",{className:"grid gap-6 lg:grid-cols-[1.2fr_1fr]",children:[(0,t.jsxs)("section",{className:"glass rounded-2xl p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold",children:"Flow Canvas"}),(0,t.jsx)("div",{className:"mt-4 grid gap-3 md:grid-cols-3",children:l.map(s=>{let l=e.includes(s);return(0,t.jsx)("button",{onClick:()=>a(e=>l?e.filter(e=>e!==s):[...e,s]),className:`rounded-xl border px-4 py-4 text-left text-sm transition ${l?"border-indigo-300 bg-indigo-500/20":"border-white/15 bg-white/5"}`,children:s},s)})})]}),(0,t.jsxs)("section",{className:"glass rounded-2xl p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold",children:"Config Panel"}),(0,t.jsx)("p",{className:"mt-1 text-sm text-white/60",children:"Network: 0G Testnet"}),(0,t.jsxs)("label",{className:"mt-4 block text-sm",children:["Faucet address",(0,t.jsx)("input",{className:"mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2",value:i,onChange:e=>n(e.target.value)})]}),(0,t.jsxs)("label",{className:"mt-3 block text-sm",children:["Cooldown seconds",(0,t.jsx)("input",{type:"number",className:"mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2",value:r,onChange:e=>o(Number(e.target.value)||0)})]}),(0,t.jsxs)("label",{className:"mt-3 block text-sm",children:["Verification policy",(0,t.jsx)("input",{className:"mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2",value:d,onChange:e=>c(e.target.value)})]})]}),(0,t.jsxs)("section",{className:"glass rounded-2xl p-6 lg:col-span-2",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold",children:"Generate Integration"}),(0,t.jsx)("pre",{className:"mt-3 overflow-x-auto rounded-xl bg-black/30 p-4 text-xs text-emerald-200",children:m})]})]})}e.s(["default",()=>a])}]);