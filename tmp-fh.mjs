import { spawn } from "child_process";
import fs from "fs";
const out=process.argv[2],port=process.argv[3];
const proc=spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",["--headless=new","--disable-gpu","--remote-debugging-port=9970","--hide-scrollbars","--user-data-dir="+out+"/p30","about:blank"],{stdio:"ignore"});
await new Promise(r=>setTimeout(r,2500));
const page=(await(await fetch("http://127.0.0.1:9970/json")).json()).find(t=>t.type==="page");
const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pend=new Map();const errs=[];ws.onmessage=m=>{const d=JSON.parse(m.data);if(d.id&&pend.has(d.id)){pend.get(d.id)(d.result);pend.delete(d.id)}if(d.method==="Runtime.exceptionThrown")errs.push(d.params.exceptionDetails.exception?.description?.slice(0,300))};
const send=(method,params={})=>new Promise(res=>{const i=++id;pend.set(i,res);ws.send(JSON.stringify({id:i,method,params}))});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
await send("Runtime.enable");await send("Page.enable");
for(const [n,w,h,s] of [["l",1440,900,"light"],["d",1440,900,"dark"],["m",390,1500,"light"]]){
await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:1,mobile:w<500});
await send("Emulation.setEmulatedMedia",{features:[{name:"prefers-color-scheme",value:s}]});
await send("Page.navigate",{url:`http://localhost:${port}/features`});await sleep(1500);await send("Input.dispatchMouseEvent",{type:"mouseWheel",x:200,y:300,deltaX:0,deltaY:2});await sleep(5500);
const r=await send("Page.captureScreenshot",{format:"png"});fs.writeFileSync(`${out}/fh_${n}.png`,Buffer.from(r.data,"base64"));}
console.log("errors:",errs.length?errs.join("|"):"none");ws.close();proc.kill();process.exit(0);
