const http=require('http'),handler=require('serve-handler'),path=require('path');
const puppeteer=require('puppeteer-core');
(async()=>{
  const s=http.createServer((q,r)=>handler(q,r,{public:path.join(__dirname,'build'),cleanUrls:true}));
  await new Promise(r=>s.listen(6086,r));
  const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-dev-shm-usage']});
  const routes=['/','/about','/programs','/industries','/case-studies','/resources','/faq','/contact','/resources/the-buyers-remorse-killer','/resources/stop-discounting-start-closing','/resources/compensation-plans-that-actually-motivate','/resources/how-to-position-a-vacation-incentive-in-a-close','/resources/running-a-21-day-blitz-campaign','/resources/differentiating-on-experience-not-price'];
  const found=[];
  for(const route of routes){
    const p=await b.newPage();
    p.on('console',m=>{const t=m.text(); if(/RECOVER@/.test(t))found.push(route+' :: '+t.slice(9,110));});
    await p.goto('http://localhost:6086'+route,{waitUntil:'domcontentloaded',timeout:25000});
    await new Promise(r=>setTimeout(r,1400));
    await p.close();
  }
  console.log('routes:',routes.length,'| recoverable errors:',found.length);
  found.forEach(f=>console.log(' -',f));
  console.log(found.length===0?'✅ HYDRATION FULLY CLEAN':'❌');
  await b.close(); s.close();
})();
