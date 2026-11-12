import { spawn } from "child_process";
import fs from "fs";
const out=process.argv[2],port=process.argv[3];
const PORT=9923;
const proc=spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",["--headless=new","--disable-gpu",`--remote-debugging-port=${PORT}`,"--hide-scrollbars","--user-data-dir="+out+"/fresh"+Date.now(),"about:blank"],{stdio:"ignore"});
await new Promise(r=>setTimeout(r,3000));
const page=(await(await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find(t=>t.type==="page");
const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pend=new Map();const errs=[];ws.onmessage=m=>{const d=JSON.parse(m.data);if(d.id&&pend.has(d.id)){pend.get(d.id)(d.result);pend.delete(d.id)}if(d.method==="Runtime.exceptionThrown")errs.push(d.params.exceptionDetails.exception?.description?.slice(0,300))};
const send=(method,params={})=>new Promise(res=>{const i=++id;pend.set(i,res);ws.send(JSON.stringify({id:i,method,params}));setTimeout(()=>{if(pend.has(i)){pend.delete(i);console.log("TIMEOUT",method);res({})}},20000)});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ev=async e=>(await send("Runtime.evaluate",{expression:e,returnByValue:true})).result?.value;
const shot=async n=>{const r=await send("Page.captureScreenshot",{format:"png"});if(r.data)fs.writeFileSync(`${out}/${n}.png`,Buffer.from(r.data,"base64"))};
const nudge=()=>send("Input.dispatchMouseEvent",{type:"mouseWheel",x:200,y:300,deltaX:0,deltaY:1});
await send("Runtime.enable");await send("Page.enable");
for(const [s,w,h] of [["light",1440,900],["dark",1440,900],["light",2560,1440],["light",390,900]]){
 await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:1,mobile:w<500});
 await send("Emulation.setEmulatedMedia",{features:[{name:"prefers-color-scheme",value:s}]});
 await send("Page.navigate",{url:`http://localhost:${port}/about`});await sleep(1200);await ev(`sessionStorage.setItem("ma-help-bubble","1")`);
 if(w<500)await ev("scrollTo(0,600)");
 await nudge();await sleep(6000);
 if(s==="light"&&w===1440){await ev(`document.querySelectorAll(".ar-car").forEach(e=>e.getAnimations().forEach(a=>{a.pause();a.currentTime=2400+16000*0.24}))`);await sleep(300);}
 console.log(s,w,await ev(`document.documentElement.scrollWidth>document.documentElement.clientWidth?"H-SCROLL":"ok"`));
 await shot(`map_${s}_${w}`);
}
console.log("errors:",errs.length?errs.join("|"):"none");ws.close();proc.kill();process.exit(0);
