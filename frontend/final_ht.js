const http=require('http'),handler=require('serve-handler'),path=require('path');
const puppeteer=require('puppeteer-core');
(async()=>{
  const s=http.createServer((q,r)=>handler(q,r,{public:path.join(__dirname,'build'),cleanUrls:true}));
  await new Promise(r=>s.listen(6085,r));
  const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-dev-shm-usage']});
  const routes=['/','/about','/programs','/industries','/case-studies','/resources','/faq','/contact','/resources/the-buyers-remorse-killer','/resources/stop-discounting-start-closing'];
  const found=[];
  for(const route of routes){
    const p=await b.newPage();
    p.on('console',m=>{const t=m.text(); if(/RECOVER@/.test(t))found.push(route+': '+t.slice(0,120));});
    await p.goto('http://localhost:6085'+route,{waitUntil:'domcontentloaded',timeout:30000});
    await new Promise(r=>setTimeout(r,1600));
    await p.close();
  }
  console.log('RECOVERABLE ERRORS FOUND:', found.length);
  found.forEach(f=>console.log(' -',f));
  console.log(found.length===0?'\n✅ ALL CLEAN — hydration is mismatch-free':'\n❌ still issues');
  await b.close(); s.close();
})();
