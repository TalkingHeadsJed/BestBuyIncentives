const http=require('http'),handler=require('serve-handler'),path=require('path');
const puppeteer=require('puppeteer-core');
(async()=>{
  const s=http.createServer((q,r)=>handler(q,r,{public:path.join(__dirname,'build'),cleanUrls:true}));
  await new Promise(r=>s.listen(6083,r));
  const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-dev-shm-usage']});
  const seen=new Set();
  for(const route of ['/','/resources','/contact','/resources/the-buyers-remorse-killer']){
    const p=await b.newPage();
    p.on('console',m=>{const t=m.text(); if(/RECOVER@/.test(t)&&!seen.has(t)){seen.add(t);console.log(t.slice(0,300));}});
    await p.goto('http://localhost:6083'+route,{waitUntil:'networkidle2',timeout:45000});
    await new Promise(r=>setTimeout(r,1200));
    await p.close();
  }
  console.log('\n(total unique:',seen.size,')');
  await b.close(); s.close();
})();
