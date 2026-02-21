(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,59002,e=>{"use strict";var t=e.i(43476),s=e.i(71645),a=e.i(22016);function l({title:e="What this does",children:l,learnMore:n,actionLink:i}){let[r,o]=(0,s.useState)(!1);return(0,t.jsxs)("div",{className:"glass-card rounded-2xl p-5",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white/90",children:e}),(0,t.jsx)("div",{className:"mt-3 text-sm text-white/70 leading-relaxed",children:l}),i&&(0,t.jsxs)(a.default,{href:i.href,className:"mt-3 inline-block text-sm font-medium text-purple-300 hover:text-purple-200 transition",children:[i.label," →"]}),n&&(0,t.jsxs)("div",{className:"mt-4",children:[(0,t.jsx)("button",{type:"button",onClick:()=>o(e=>!e),className:"text-xs font-medium text-purple-300 hover:text-purple-200 transition",children:r?"Hide details":"Learn more"}),r&&(0,t.jsx)("div",{className:"mt-2 text-sm text-white/60",children:n})]})]})}e.s(["ConceptCard",()=>l])},20544,e=>{"use strict";var t=e.i(43476);function s({nodes:e,icons:s,children:a}){return(0,t.jsxs)("div",{className:"glass-card rounded-2xl p-5 overflow-x-auto",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white/90 mb-3",children:"Flow"}),e&&e.length>0?(0,t.jsx)("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:e.map((a,l)=>{let n=s?.[l];return(0,t.jsxs)("span",{className:"flex items-center gap-2",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 font-medium text-white/90",children:[n&&(0,t.jsx)("span",{className:"text-base","aria-hidden":!0,children:n}),a]}),l<e.length-1&&(0,t.jsx)("span",{className:"text-purple-400/80",children:"→"})]},l)})}):(0,t.jsx)("div",{className:"text-sm text-white/70 leading-relaxed",children:a})]})}e.s(["FlowDiagram",()=>s])},21863,29541,88333,41395,90472,e=>{"use strict";var t=e.i(43476);function s({steps:e}){return(0,t.jsxs)("div",{className:"glass-card rounded-2xl p-5",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white/90",children:"Add to your project"}),(0,t.jsx)("ol",{className:"mt-4 space-y-4",children:e.map(e=>(0,t.jsxs)("li",{className:"flex gap-3",children:[(0,t.jsx)("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200",children:e.num}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-medium text-white/90",children:e.title}),e.filePath&&(0,t.jsx)("code",{className:"mt-1 block text-xs text-purple-300/90",children:e.filePath}),(0,t.jsx)("p",{className:"mt-1 text-sm text-white/60",children:e.body})]})]},e.num))})]})}e.s(["AddToProjectSteps",()=>s],21863);var a=e.i(71645);function l({title:e="Generated code",code:s,language:l="typescript"}){let[n,i]=(0,a.useState)(!1),r=(0,a.useCallback)(()=>{navigator.clipboard.writeText(s),i(!0),setTimeout(()=>i(!1),2e3)},[s]);return(0,t.jsxs)("div",{className:"glass-card rounded-2xl overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between border-b border-white/10 px-4 py-2.5",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-white/70",children:e}),(0,t.jsx)("button",{type:"button",onClick:r,className:"btn-secondary rounded-lg px-3 py-1.5 text-xs font-medium",children:n?"Copied":"Copy"})]}),(0,t.jsx)("pre",{className:"overflow-x-auto p-4 text-sm text-emerald-200/90",children:(0,t.jsx)("code",{children:s})})]})}function n({title:e,fields:s}){return(0,t.jsxs)("div",{className:"glass-card rounded-2xl p-5",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white/90",children:e}),(0,t.jsx)("div",{className:"mt-4 space-y-4",children:s.map(e=>(0,t.jsxs)("label",{className:"block text-sm",children:[(0,t.jsx)("span",{className:"mb-1.5 block font-medium text-white/70",children:e.label}),e.helper&&(0,t.jsx)("span",{className:"mb-1.5 block text-xs text-white/50",children:e.helper}),"select"===e.type&&e.options?(0,t.jsx)("select",{value:String(e.value),onChange:t=>e.onChange(t.target.value),className:"glass-input w-full px-4 py-2.5 text-white/90 bg-[#1a1428] border border-white/10 focus:border-purple-400/50",style:{colorScheme:"dark"},children:e.options.map(e=>(0,t.jsx)("option",{value:e.value,className:"bg-[#1a1428] text-white",children:e.label},e.value))}):(0,t.jsx)("input",{type:e.type??"text",value:e.value,onChange:t=>e.onChange("number"===e.type?Number(t.target.value)||0:t.target.value),placeholder:e.placeholder,className:"glass-input w-full px-4 py-2.5 text-white/90 placeholder-white/40"})]},e.id))})]})}function i({filePath:e,description:s,code:l,insertMarker:n}){let[i,r]=(0,a.useState)(!1),o=(0,a.useCallback)(()=>{let e=n?l.replace(n,"").trim():l;navigator.clipboard.writeText(e),r(!0),setTimeout(()=>r(!1),2e3)},[l,n]);return(0,t.jsxs)("div",{className:"glass-card rounded-2xl p-5",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white/90",children:"Where this goes"}),(0,t.jsx)("p",{className:"mt-1 text-sm text-white/60",children:s}),(0,t.jsx)("div",{className:"mt-3 flex items-center gap-2",children:(0,t.jsx)("code",{className:"rounded bg-white/10 px-2 py-1 text-xs font-mono text-purple-200",children:e})}),(0,t.jsxs)("div",{className:"mt-3 flex items-end justify-between gap-2",children:[(0,t.jsx)("pre",{className:"flex-1 overflow-x-auto rounded-lg border border-white/10 bg-black/20 p-4 text-xs text-emerald-200/90",children:(0,t.jsx)("code",{children:l})}),(0,t.jsx)("button",{type:"button",onClick:o,className:"btn-secondary shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium",children:i?"Copied":"Copy"})]}),n&&(0,t.jsx)("p",{className:"mt-2 text-xs text-purple-300/90",children:"← insert here"})]})}function r({title:e="Full example",code:s}){let[l,n]=(0,a.useState)(!1),[i,r]=(0,a.useState)(!1),o=(0,a.useCallback)(()=>{navigator.clipboard.writeText(s),r(!0),setTimeout(()=>r(!1),2e3)},[s]);return(0,t.jsxs)("div",{className:"glass-card rounded-2xl overflow-hidden",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>n(e=>!e),className:"flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/5",children:[(0,t.jsx)("span",{className:"text-sm font-semibold text-white/90",children:e}),(0,t.jsx)("span",{className:"text-purple-300 text-sm",children:l?"▼":"▶"})]}),l&&(0,t.jsxs)("div",{className:"border-t border-white/10",children:[(0,t.jsx)("div",{className:"flex items-center justify-end gap-2 px-4 py-2",children:(0,t.jsx)("button",{type:"button",onClick:o,className:"btn-secondary rounded-lg px-3 py-1.5 text-xs font-medium",children:i?"Copied":"Copy"})}),(0,t.jsx)("pre",{className:"overflow-x-auto p-4 text-xs text-emerald-200/90",children:(0,t.jsx)("code",{children:s})})]})]})}e.s(["CodeOutput",()=>l],29541),e.s(["ConfigPanel",()=>n],88333),e.s(["PlacementGuide",()=>i],41395),e.s(["WorkedExample",()=>r],90472)},17884,e=>{"use strict";var t=e.i(43476),s=e.i(71645),a=e.i(21863),l=e.i(29541),n=e.i(59002),i=e.i(88333),r=e.i(20544),o=e.i(41395),c=e.i(90472),d=e.i(22016);function u(){let[e,u]=(0,s.useState)("0xa237822F03A0D4c8C79219Bb65ad23A64c9B291a"),[m,x]=(0,s.useState)(86400),[p,h]=(0,s.useState)("0xEbf8088636FF56497130784320286a05165481e3"),[f,g]=(0,s.useState)("full"),[w,b]=(0,s.useState)("app"),[j,v]=(0,s.useState)(!1),N=(0,s.useMemo)(()=>"full"===f?`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IHumanAgentINFT {
    function isVerified(address wallet) external view returns (bool);
    function ownerToTokenId(address owner) external view returns (uint256);
    function canUse(uint256 tokenId, address executor) external view returns (bool);
}

contract Faucet {
    IHumanAgentINFT public immutable agent;
    uint256 public immutable cooldownSec;
    mapping(address => uint256) public lastClaimedAt;

    event Claimed(address indexed caller, address indexed recipient, uint256 claimedAt);

    constructor(address agentAddress, uint256 cooldownSeconds) {
        agent = IHumanAgentINFT(agentAddress);
        cooldownSec = cooldownSeconds;
    }

    function claim(address caller, address recipient) external {
        require(caller != address(0), "Invalid caller");
        require(recipient != address(0), "Invalid recipient");
        require(agent.isVerified(caller), "Agent not verified");

        uint256 tokenId = agent.ownerToTokenId(caller);
        require(tokenId != 0, "No agent token");
        require(agent.canUse(tokenId, caller), "Action not authorized");

        uint256 nowTs = block.timestamp;
        uint256 unlockAt = lastClaimedAt[caller] + cooldownSec;
        require(nowTs >= unlockAt, "Cooldown active");

        lastClaimedAt[caller] = nowTs;
        emit Claimed(caller, recipient, nowTs);
        ${j?"// TODO: ERC20 transfer to recipient":"// TODO: add transfer logic"}
    }

    function cooldownRemaining(address wallet) external view returns (uint256) {
        uint256 unlockAt = lastClaimedAt[wallet] + cooldownSec;
        if (block.timestamp >= unlockAt) return 0;
        return unlockAt - block.timestamp;
    }
}`:`// Minimal guard (use Faucet.sol for full pattern)
require(agent.isVerified(caller), "Agent not verified");
uint256 tokenId = agent.ownerToTokenId(caller);
require(agent.canUse(tokenId, caller), "Action not authorized");
require(block.timestamp >= lastClaimedAt[caller] + cooldownSec, "Cooldown active");`,[f,m,p,j]),C=(0,s.useMemo)(()=>{let e="app"===w?"app/api/claim/route.ts":"pages/api/claim.ts";return`// ${e}
// Env: NEXT_PUBLIC_FAUCET_ADDRESS, PRIVATE_KEY, OG_RPC_URL

import { NextResponse } from "next/server";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { FAUCET_ABI } from "@/lib/inftAbi";

function isAddress(v: string) { return /^0x[a-fA-F0-9]{40}$/.test(v); }

export async function POST(req: Request) {
  const { wallet, to } = await req.json();
  if (!isAddress(wallet) || !isAddress(to)) {
    return NextResponse.json({ ok: false, error: "Invalid wallet input." }, { status: 400 });
  }

  const rpc = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
  const pk = process.env.PRIVATE_KEY ?? "";
  const faucetAddress = process.env.NEXT_PUBLIC_FAUCET_ADDRESS ?? "";
  if (!pk.startsWith("0x") || !isAddress(faucetAddress)) {
    return NextResponse.json({ ok: false, error: "Faucet env missing." }, { status: 500 });
  }

  const provider = new JsonRpcProvider(rpc);
  const signer = new Wallet(pk, provider);
  const faucet = new Contract(faucetAddress, FAUCET_ABI, signer);

  const tx = await faucet.claim(wallet, to);
  const receipt = await tx.wait();
  const cooldownRemaining = Number(await faucet.cooldownRemaining(wallet));

  return NextResponse.json({
    ok: true,
    txHash: receipt?.hash,
    cooldownRemainingSec: cooldownRemaining,
  });
}`},[w,e,m]),A=(0,s.useMemo)(()=>`# Faucet integration
NEXT_PUBLIC_FAUCET_ADDRESS=${e||"0x..."}
NEXT_PUBLIC_INFT_ADDRESS=${p||"0x..."}
OG_RPC_URL=https://evmrpc-testnet.0g.ai
PRIVATE_KEY=0x...`,[e,p]),T=(0,s.useMemo)(()=>`// Frontend: call claim after mint + verification
const claimRes = await fetch("/api/claim", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ wallet: userWallet, to: userWallet }),
});
const { ok, txHash, cooldownRemainingSec } = await claimRes.json();`,[]);return(0,t.jsxs)("div",{className:"mx-auto max-w-3xl space-y-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)(d.default,{href:"/modules",className:"text-sm text-white/60 hover:text-white/90",children:"← Modules"}),(0,t.jsx)("h1",{className:"mt-2 text-2xl font-semibold",children:"Faucet Integration Builder"}),(0,t.jsx)("p",{className:"mt-1 text-sm text-white/60",children:"Generate contract and API code for faucet claims gated by Human Agent iNFT."})]}),(0,t.jsx)(n.ConceptCard,{title:"Faucet depends on iNFT",actionLink:{href:"/faucet",label:"See it in action"},learnMore:(0,t.jsxs)("p",{children:["The faucet contract uses ",(0,t.jsx)("code",{className:"rounded bg-white/10 px-1",children:"agent.isVerified"}),", ",(0,t.jsx)("code",{className:"rounded bg-white/10 px-1",children:"agent.ownerToTokenId"}),", and ",(0,t.jsx)("code",{className:"rounded bg-white/10 px-1",children:"agent.canUse"})," to ensure only verified humans can claim. Your API signs transactions and returns cooldown status."]}),children:"The faucet gates claims to users who hold a verified Human Agent iNFT. Users must complete captcha → mint iNFT first. The contract enforces isVerified + canUse + cooldown; your API proxies the claim transaction."}),(0,t.jsx)(r.FlowDiagram,{nodes:["User (verified)","API /api/claim","Faucet.claim(caller, to)","Cooldown check","Transfer"]}),(0,t.jsx)(i.ConfigPanel,{title:"Configure",fields:[{id:"faucet",label:"Faucet contract address",value:e,onChange:u,placeholder:"0x..."},{id:"agent",label:"iNFT agent address",value:p,onChange:h,placeholder:"0x..."},{id:"cooldown",label:"Cooldown (seconds)",type:"number",value:m,onChange:x},{id:"contractStyle",label:"Contract style",type:"select",value:f,onChange:g,options:[{value:"full",label:"Full Faucet.sol (isVerified + canUse + cooldown)"},{value:"minimal",label:"Minimal guard"}]},{id:"apiFramework",label:"API framework",type:"select",value:w,onChange:b,options:[{value:"app",label:"Next.js App Router"},{value:"pages",label:"Next.js Pages"}]}]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("input",{type:"checkbox",id:"transfer",checked:j,onChange:e=>v(e.target.checked),className:"h-4 w-4 rounded accent-purple-500"}),(0,t.jsx)("label",{htmlFor:"transfer",className:"text-sm text-white/70",children:"Include transfer logic skeleton (ERC20)"})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"mb-3 text-lg font-semibold",children:"Generated code"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(l.CodeOutput,{title:"Contract",code:N}),(0,t.jsx)(l.CodeOutput,{title:"API route",code:C}),(0,t.jsx)(l.CodeOutput,{title:"Env hint",code:A})]})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"mb-3 text-lg font-semibold",children:"Where this goes"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(o.PlacementGuide,{filePath:"contracts/Faucet.sol",description:"Deploy with constructor(agentAddress, cooldownSeconds).",code:N}),(0,t.jsx)(o.PlacementGuide,{filePath:"app/api/claim/route.ts",description:"Implement POST handler; call faucet.claim(wallet, to).",code:C})]})]}),(0,t.jsx)(a.AddToProjectSteps,{steps:[{num:1,title:"Deploy iNFT",body:"Deploy HumanAgentINFT first. Deploy Faucet with agent address and cooldown.",filePath:"packages/contracts"},{num:2,title:"Create API route",body:"Implement /api/claim using the generated template.",filePath:"app/api/claim/route.ts"},{num:3,title:"Set env vars",body:"NEXT_PUBLIC_FAUCET_ADDRESS, NEXT_PUBLIC_INFT_ADDRESS, PRIVATE_KEY, OG_RPC_URL.",filePath:".env.local"},{num:4,title:"Wire frontend",body:"Call /api/claim after mint + verification flow.",filePath:"app/faucet/page.tsx"}]}),(0,t.jsx)(c.WorkedExample,{title:"Show full example",code:T})]})}e.s(["default",()=>u])}]);