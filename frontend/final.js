const http=require('http'),handler=require('serve-handler'),path=require('path');
const puppeteer=require('puppeteer-core');
(async()=>{
  const s=http.createServer((q,r)=>handler(q,r,{public:path.join(__dirname,'build'),cleanUrls:true}));
  await new Promise(r=>s.listen(6090,r));
  const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-dev-shm-usage']});
  const routes=['/','/about','/programs','/industries','/case-studies','/resources','/faq','/contact','/resources/the-buyers-remorse-killer','/resources/stop-discounting-start-closing','/resources/compensation-plans-that-actually-motivate','/resources/how-to-position-a-vacation-incentive-in-a-close','/resources/running-a-21-day-blitz-campaign','/resources/differentiating-on-experience-not-price'];
  let total=0;
  for(const route of routes){
    const p=await b.newPage(); const errs=[];
    p.on('pageerror',e=>{if(!/favicon/.test(String(e)))errs.push(String(e).slice(0,55));});
    await p.goto('http://localhost:6090'+route,{waitUntil:'domcontentloaded',timeout:25000});
    await new Promise(r=>setTimeout(r,1300));
    total+=errs.length;
    if(errs.length)console.log('❌',route,errs[0]);
    await p.close();
  }
  console.log(total===0?`\n✅ ALL ${routes.length} ROUTES HYDRATE CLEANLY — 0 errors`:`\n❌ ${total} errors`);
  await b.close(); s.close();
})();
