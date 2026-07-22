const http=require('http'),handler=require('serve-handler'),path=require('path');
const puppeteer=require('puppeteer-core');
(async()=>{
  const s=http.createServer((q,r)=>handler(q,r,{public:path.join(__dirname,'build'),cleanUrls:true}));
  await new Promise(r=>s.listen(6094,r));
  const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-dev-shm-usage']});
  const routes=['/','/about','/programs','/industries','/case-studies','/resources','/faq','/contact','/travel-incentives-vs-discounting','/travel-incentives-vs-gift-cards','/travel-incentives-vs-cash-rebates','/resources/the-buyers-remorse-killer'];
  let total=0;
  for(const route of routes){
    const p=await b.newPage(); const e=[];
    p.on('pageerror',x=>{if(!/favicon/.test(String(x)))e.push(String(x).slice(0,50));});
    await p.goto('http://localhost:6094'+route,{waitUntil:'domcontentloaded',timeout:22000});
    await new Promise(r=>setTimeout(r,1000));
    total+=e.length; if(e.length)console.log('❌',route,e[0]);
    await p.close();
  }
  console.log(total===0?`✅ ALL ${routes.length} ROUTES CLEAN`:'❌ '+total);
  await b.close(); s.close();
})();
