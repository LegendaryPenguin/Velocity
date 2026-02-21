module.exports=[60526,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(38246);function e({title:a="What this does",children:e,learnMore:f,actionLink:g}){let[h,i]=(0,c.useState)(!1);return(0,b.jsxs)("div",{className:"glass-card rounded-2xl p-5",children:[(0,b.jsx)("h3",{className:"text-lg font-semibold text-white/90",children:a}),(0,b.jsx)("div",{className:"mt-3 text-sm text-white/70 leading-relaxed",children:e}),g&&(0,b.jsxs)(d.default,{href:g.href,className:"mt-3 inline-block text-sm font-medium text-purple-300 hover:text-purple-200 transition",children:[g.label," →"]}),f&&(0,b.jsxs)("div",{className:"mt-4",children:[(0,b.jsx)("button",{type:"button",onClick:()=>i(a=>!a),className:"text-xs font-medium text-purple-300 hover:text-purple-200 transition",children:h?"Hide details":"Learn more"}),h&&(0,b.jsx)("div",{className:"mt-2 text-sm text-white/60",children:f})]})]})}a.s(["ConceptCard",()=>e])},94653,a=>{"use strict";var b=a.i(87924);function c({nodes:a,icons:c,children:d}){return(0,b.jsxs)("div",{className:"glass-card rounded-2xl p-5 overflow-x-auto",children:[(0,b.jsx)("h3",{className:"text-lg font-semibold text-white/90 mb-3",children:"Flow"}),a&&a.length>0?(0,b.jsx)("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:a.map((d,e)=>{let f=c?.[e];return(0,b.jsxs)("span",{className:"flex items-center gap-2",children:[(0,b.jsxs)("span",{className:"flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 font-medium text-white/90",children:[f&&(0,b.jsx)("span",{className:"text-base","aria-hidden":!0,children:f}),d]}),e<a.length-1&&(0,b.jsx)("span",{className:"text-purple-400/80",children:"→"})]},e)})}):(0,b.jsx)("div",{className:"text-sm text-white/70 leading-relaxed",children:d})]})}a.s(["FlowDiagram",()=>c])},27256,39633,40889,12585,10890,a=>{"use strict";var b=a.i(87924);function c({steps:a}){return(0,b.jsxs)("div",{className:"glass-card rounded-2xl p-5",children:[(0,b.jsx)("h3",{className:"text-lg font-semibold text-white/90",children:"Add to your project"}),(0,b.jsx)("ol",{className:"mt-4 space-y-4",children:a.map(a=>(0,b.jsxs)("li",{className:"flex gap-3",children:[(0,b.jsx)("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200",children:a.num}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"font-medium text-white/90",children:a.title}),a.filePath&&(0,b.jsx)("code",{className:"mt-1 block text-xs text-purple-300/90",children:a.filePath}),(0,b.jsx)("p",{className:"mt-1 text-sm text-white/60",children:a.body})]})]},a.num))})]})}a.s(["AddToProjectSteps",()=>c],27256);var d=a.i(72131);function e({title:a="Generated code",code:c,language:e="typescript"}){let[f,g]=(0,d.useState)(!1),h=(0,d.useCallback)(()=>{navigator.clipboard.writeText(c),g(!0),setTimeout(()=>g(!1),2e3)},[c]);return(0,b.jsxs)("div",{className:"glass-card rounded-2xl overflow-hidden",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between border-b border-white/10 px-4 py-2.5",children:[(0,b.jsx)("span",{className:"text-sm font-medium text-white/70",children:a}),(0,b.jsx)("button",{type:"button",onClick:h,className:"btn-secondary rounded-lg px-3 py-1.5 text-xs font-medium",children:f?"Copied":"Copy"})]}),(0,b.jsx)("pre",{className:"overflow-x-auto p-4 text-sm text-emerald-200/90",children:(0,b.jsx)("code",{children:c})})]})}function f({title:a,fields:c}){return(0,b.jsxs)("div",{className:"glass-card rounded-2xl p-5",children:[(0,b.jsx)("h3",{className:"text-lg font-semibold text-white/90",children:a}),(0,b.jsx)("div",{className:"mt-4 space-y-4",children:c.map(a=>(0,b.jsxs)("label",{className:"block text-sm",children:[(0,b.jsx)("span",{className:"mb-1.5 block font-medium text-white/70",children:a.label}),a.helper&&(0,b.jsx)("span",{className:"mb-1.5 block text-xs text-white/50",children:a.helper}),"select"===a.type&&a.options?(0,b.jsx)("select",{value:String(a.value),onChange:b=>a.onChange(b.target.value),className:"glass-input w-full px-4 py-2.5 text-white/90 bg-[#1a1428] border border-white/10 focus:border-purple-400/50",style:{colorScheme:"dark"},children:a.options.map(a=>(0,b.jsx)("option",{value:a.value,className:"bg-[#1a1428] text-white",children:a.label},a.value))}):(0,b.jsx)("input",{type:a.type??"text",value:a.value,onChange:b=>a.onChange("number"===a.type?Number(b.target.value)||0:b.target.value),placeholder:a.placeholder,className:"glass-input w-full px-4 py-2.5 text-white/90 placeholder-white/40"})]},a.id))})]})}function g({filePath:a,description:c,code:e,insertMarker:f}){let[g,h]=(0,d.useState)(!1),i=(0,d.useCallback)(()=>{let a=f?e.replace(f,"").trim():e;navigator.clipboard.writeText(a),h(!0),setTimeout(()=>h(!1),2e3)},[e,f]);return(0,b.jsxs)("div",{className:"glass-card rounded-2xl p-5",children:[(0,b.jsx)("h3",{className:"text-lg font-semibold text-white/90",children:"Where this goes"}),(0,b.jsx)("p",{className:"mt-1 text-sm text-white/60",children:c}),(0,b.jsx)("div",{className:"mt-3 flex items-center gap-2",children:(0,b.jsx)("code",{className:"rounded bg-white/10 px-2 py-1 text-xs font-mono text-purple-200",children:a})}),(0,b.jsxs)("div",{className:"mt-3 flex items-end justify-between gap-2",children:[(0,b.jsx)("pre",{className:"flex-1 overflow-x-auto rounded-lg border border-white/10 bg-black/20 p-4 text-xs text-emerald-200/90",children:(0,b.jsx)("code",{children:e})}),(0,b.jsx)("button",{type:"button",onClick:i,className:"btn-secondary shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium",children:g?"Copied":"Copy"})]}),f&&(0,b.jsx)("p",{className:"mt-2 text-xs text-purple-300/90",children:"← insert here"})]})}function h({title:a="Full example",code:c}){let[e,f]=(0,d.useState)(!1),[g,h]=(0,d.useState)(!1),i=(0,d.useCallback)(()=>{navigator.clipboard.writeText(c),h(!0),setTimeout(()=>h(!1),2e3)},[c]);return(0,b.jsxs)("div",{className:"glass-card rounded-2xl overflow-hidden",children:[(0,b.jsxs)("button",{type:"button",onClick:()=>f(a=>!a),className:"flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/5",children:[(0,b.jsx)("span",{className:"text-sm font-semibold text-white/90",children:a}),(0,b.jsx)("span",{className:"text-purple-300 text-sm",children:e?"▼":"▶"})]}),e&&(0,b.jsxs)("div",{className:"border-t border-white/10",children:[(0,b.jsx)("div",{className:"flex items-center justify-end gap-2 px-4 py-2",children:(0,b.jsx)("button",{type:"button",onClick:i,className:"btn-secondary rounded-lg px-3 py-1.5 text-xs font-medium",children:g?"Copied":"Copy"})}),(0,b.jsx)("pre",{className:"overflow-x-auto p-4 text-xs text-emerald-200/90",children:(0,b.jsx)("code",{children:c})})]})]})}a.s(["CodeOutput",()=>e],39633),a.s(["ConfigPanel",()=>f],40889),a.s(["PlacementGuide",()=>g],12585),a.s(["WorkedExample",()=>h],10890)},41948,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(27256),e=a.i(39633),f=a.i(60526),g=a.i(40889),h=a.i(94653),i=a.i(12585),j=a.i(10890),k=a.i(38246);function l(){let[a,l]=(0,c.useState)("0xa237822F03A0D4c8C79219Bb65ad23A64c9B291a"),[m,n]=(0,c.useState)(86400),[o,p]=(0,c.useState)("0xEbf8088636FF56497130784320286a05165481e3"),[q,r]=(0,c.useState)("full"),[s,t]=(0,c.useState)("app"),[u,v]=(0,c.useState)(!1),w=(0,c.useMemo)(()=>"full"===q?`// SPDX-License-Identifier: MIT
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
        ${u?"// TODO: ERC20 transfer to recipient":"// TODO: add transfer logic"}
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
require(block.timestamp >= lastClaimedAt[caller] + cooldownSec, "Cooldown active");`,[q,m,o,u]),x=(0,c.useMemo)(()=>{let a="app"===s?"app/api/claim/route.ts":"pages/api/claim.ts";return`// ${a}
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
}`},[s,a,m]),y=(0,c.useMemo)(()=>`# Faucet integration
NEXT_PUBLIC_FAUCET_ADDRESS=${a||"0x..."}
NEXT_PUBLIC_INFT_ADDRESS=${o||"0x..."}
OG_RPC_URL=https://evmrpc-testnet.0g.ai
PRIVATE_KEY=0x...`,[a,o]),z=(0,c.useMemo)(()=>`// Frontend: call claim after mint + verification
const claimRes = await fetch("/api/claim", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ wallet: userWallet, to: userWallet }),
});
const { ok, txHash, cooldownRemainingSec } = await claimRes.json();`,[]);return(0,b.jsxs)("div",{className:"mx-auto max-w-3xl space-y-8",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(k.default,{href:"/modules",className:"text-sm text-white/60 hover:text-white/90",children:"← Modules"}),(0,b.jsx)("h1",{className:"mt-2 text-2xl font-semibold",children:"Faucet Integration Builder"}),(0,b.jsx)("p",{className:"mt-1 text-sm text-white/60",children:"Generate contract and API code for faucet claims gated by Human Agent iNFT."})]}),(0,b.jsx)(f.ConceptCard,{title:"Faucet depends on iNFT",actionLink:{href:"/faucet",label:"See it in action"},learnMore:(0,b.jsxs)("p",{children:["The faucet contract uses ",(0,b.jsx)("code",{className:"rounded bg-white/10 px-1",children:"agent.isVerified"}),", ",(0,b.jsx)("code",{className:"rounded bg-white/10 px-1",children:"agent.ownerToTokenId"}),", and ",(0,b.jsx)("code",{className:"rounded bg-white/10 px-1",children:"agent.canUse"})," to ensure only verified humans can claim. Your API signs transactions and returns cooldown status."]}),children:"The faucet gates claims to users who hold a verified Human Agent iNFT. Users must complete captcha → mint iNFT first. The contract enforces isVerified + canUse + cooldown; your API proxies the claim transaction."}),(0,b.jsx)(h.FlowDiagram,{nodes:["User (verified)","API /api/claim","Faucet.claim(caller, to)","Cooldown check","Transfer"]}),(0,b.jsx)(g.ConfigPanel,{title:"Configure",fields:[{id:"faucet",label:"Faucet contract address",value:a,onChange:l,placeholder:"0x..."},{id:"agent",label:"iNFT agent address",value:o,onChange:p,placeholder:"0x..."},{id:"cooldown",label:"Cooldown (seconds)",type:"number",value:m,onChange:n},{id:"contractStyle",label:"Contract style",type:"select",value:q,onChange:r,options:[{value:"full",label:"Full Faucet.sol (isVerified + canUse + cooldown)"},{value:"minimal",label:"Minimal guard"}]},{id:"apiFramework",label:"API framework",type:"select",value:s,onChange:t,options:[{value:"app",label:"Next.js App Router"},{value:"pages",label:"Next.js Pages"}]}]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("input",{type:"checkbox",id:"transfer",checked:u,onChange:a=>v(a.target.checked),className:"h-4 w-4 rounded accent-purple-500"}),(0,b.jsx)("label",{htmlFor:"transfer",className:"text-sm text-white/70",children:"Include transfer logic skeleton (ERC20)"})]}),(0,b.jsxs)("section",{children:[(0,b.jsx)("h2",{className:"mb-3 text-lg font-semibold",children:"Generated code"}),(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsx)(e.CodeOutput,{title:"Contract",code:w}),(0,b.jsx)(e.CodeOutput,{title:"API route",code:x}),(0,b.jsx)(e.CodeOutput,{title:"Env hint",code:y})]})]}),(0,b.jsxs)("section",{children:[(0,b.jsx)("h2",{className:"mb-3 text-lg font-semibold",children:"Where this goes"}),(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsx)(i.PlacementGuide,{filePath:"contracts/Faucet.sol",description:"Deploy with constructor(agentAddress, cooldownSeconds).",code:w}),(0,b.jsx)(i.PlacementGuide,{filePath:"app/api/claim/route.ts",description:"Implement POST handler; call faucet.claim(wallet, to).",code:x})]})]}),(0,b.jsx)(d.AddToProjectSteps,{steps:[{num:1,title:"Deploy iNFT",body:"Deploy HumanAgentINFT first. Deploy Faucet with agent address and cooldown.",filePath:"packages/contracts"},{num:2,title:"Create API route",body:"Implement /api/claim using the generated template.",filePath:"app/api/claim/route.ts"},{num:3,title:"Set env vars",body:"NEXT_PUBLIC_FAUCET_ADDRESS, NEXT_PUBLIC_INFT_ADDRESS, PRIVATE_KEY, OG_RPC_URL.",filePath:".env.local"},{num:4,title:"Wire frontend",body:"Call /api/claim after mint + verification flow.",filePath:"app/faucet/page.tsx"}]}),(0,b.jsx)(j.WorkedExample,{title:"Show full example",code:z})]})}a.s(["default",()=>l])}];

//# sourceMappingURL=packages_web_d64e35ee._.js.map