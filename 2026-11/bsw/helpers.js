(function(){
const S=ms=>new Promise(r=>setTimeout(r,ms));
const W=async(f,ms=15000)=>{for(let i=0;i<ms/300;i++){const v=f(); if(v) return v; await S(300);} return null;};
window.__set=async(el,txt)=>{el.focus(); document.execCommand('selectAll'); document.execCommand('insertText',false,txt); el.dispatchEvent(new Event('input',{bubbles:true})); await S(300);};
window.__go=async id=>{history.pushState({},'','/video/'+id+'/edit'); dispatchEvent(new PopStateEvent('popstate')); await S(2500); await W(()=>location.href.includes(id)&&document.querySelectorAll('#textbox').length>=2&&document.querySelector('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]')); await S(1000);};
window.__do=async(key)=>{const m=__M[key]; const log=[];
 try{ await __go(m.id); const tb=document.querySelectorAll('#textbox');
 await __set(tb[0],m.t); await __set(tb[1],m.d);
 document.querySelector('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]').click(); await S(300);
 if(!document.querySelector('tp-yt-paper-radio-button[name="VIDEO_HAS_ALTERED_CONTENT_YES"]')?.offsetParent){document.querySelector('#toggle-button')?.click();}
 await W(()=>document.querySelector('tp-yt-paper-radio-button[name="VIDEO_HAS_ALTERED_CONTENT_YES"]'));
 document.querySelector('tp-yt-paper-radio-button[name="VIDEO_PAID_PRODUCT_PLACEMENT_NO"]')?.click(); await S(200);
 document.querySelector('tp-yt-paper-radio-button[name="VIDEO_HAS_ALTERED_CONTENT_YES"]').click(); await S(200);
 const ti=await W(()=>document.querySelector('ytcp-free-text-chip-bar input'));
 const have=[...document.querySelectorAll('ytcp-free-text-chip-bar ytcp-chip')].map(c=>c.innerText.trim());
 for(const t of m.tags){ if(have.includes(t)) continue; ti.focus(); ti.value=t; ti.dispatchEvent(new Event('input',{bubbles:true})); ti.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true})); await S(200);}
 log.push('texte');
 if(!/PolitikCheck: Themen/.test(document.querySelector('ytcp-video-metadata-playlists')?.innerText||'')){
  document.querySelector('ytcp-video-metadata-playlists ytcp-dropdown-trigger').click();
  const ve=await W(()=>[...document.querySelectorAll('ytcp-playlist-dialog #items ytcp-ve')].find(v=>v.innerText.trim()==='PolitikCheck: Themen'));
  ve.parentElement.querySelector('ytcp-checkbox-lit').click(); await S(500);
  [...document.querySelectorAll('ytcp-playlist-dialog ytcp-button')].find(b=>/Fertig/.test(b.innerText)).click(); await S(800);}
 log.push('pl');
 const inp=document.querySelector('ytcp-video-thumbnail-editor input#file-loader')||document.querySelector('input#file-loader');
 const b=await (await fetch('https://raw.githubusercontent.com/SebastianFlack/youtube-thumbnails/claude/project-thread-z580om/'+m.thumb)).blob();
 const dt=new DataTransfer(); dt.items.add(new File([b],m.thumb.split('/').pop(),{type:'image/jpeg'})); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true})); await S(4000);
 log.push('thumb');
 document.querySelector('#save').click(); await W(()=>document.querySelector('#save')?.getAttribute('aria-disabled')==='true',15000);
 log.push('saved:'+document.querySelector('#save')?.getAttribute('aria-disabled'));
 }catch(e){log.push('FEHLER '+e.message)} return log;};
window.__plan=async(key)=>{const m=__M[key]; const [dd,tt]=m.when.split(' '); const day=String(+dd.split('-')[2]);
 const btn=await W(()=>[...document.querySelectorAll('ytcp-button, button')].find(b=>b.offsetParent&&b.innerText.trim()==='Entwurf bearbeiten'),5000); if(!btn) return 'kein Entwurf-Button';
 btn.click(); const d=await W(()=>{const x=document.querySelector('ytcp-uploads-dialog'); return x&&x.querySelector('#step-badge-3')?.offsetParent&&x;}); await S(1500);
 d.querySelector('#step-badge-3').click(); await S(2000);
 const ex=await W(()=>d.querySelector('#second-container-expand-button')); ex.click(); await S(1500);
 d.querySelector('#datepicker-trigger').click();
 const c=await W(()=>[...document.querySelectorAll('ytcp-date-picker span.calendar-day')].find(e=>e.innerText.trim()===day&&e.closest('[aria-label]')?.getAttribute('aria-label')==='Nov. 2026')); c.click(); await S(1000);
 d.querySelector('ytcp-datetime-picker input').click();
 const it=await W(()=>[...document.querySelectorAll('tp-yt-paper-item')].find(i=>i.offsetParent&&i.innerText.trim()===tt)); it.click(); await S(800);
 const chk=d.querySelector('#datepicker-trigger').innerText.trim()+' '+d.querySelector('ytcp-datetime-picker input').value;
 d.querySelector('#done-button').click();
 const dl=await W(()=>[...document.querySelectorAll('tp-yt-paper-dialog')].find(e=>e.offsetParent&&/auf öffentlich gestellt/.test(e.innerText)),15000);
 const ok=dl?dl.innerText.match(/am (.+?) auf öffentlich/)[1]:'??';
 [...document.querySelectorAll('tp-yt-paper-dialog ytcp-button, tp-yt-paper-dialog button')].filter(b=>b.offsetParent&&/Schließen/.test(b.innerText)).forEach(b=>b.click()); await S(800);
 return 'plan '+chk+' => '+ok;};
window.__check=async k=>{const m=__M[k]; await __go(m.id); const tb=document.querySelectorAll('#textbox');
 if(!document.querySelector('tp-yt-paper-radio-button[name="VIDEO_HAS_ALTERED_CONTENT_YES"]')?.offsetParent) document.querySelector('#toggle-button')?.click(); await S(1200);
 const R=n=>document.querySelector('tp-yt-paper-radio-button[name="'+n+'"]')?.hasAttribute('checked');
 const chips=[...document.querySelectorAll('ytcp-free-text-chip-bar ytcp-chip')].map(c=>c.innerText.trim());
 const thumbSel=document.querySelector('ytcp-thumbnail-uploader')?.getAttribute('aria-checked')||document.querySelector('ytcp-thumbnail-uploader[selected], ytcp-thumbnail-uploader .selected')?'ja':'?';
 return {t:tb[0].innerText.trim()===m.t, d:tb[1].innerText.trim()===m.d.trim(), tags:m.tags.every(x=>chips.includes(x)), kids:R('VIDEO_MADE_FOR_KIDS_NOT_MFK'), ki:R('VIDEO_HAS_ALTERED_CONTENT_YES'), pl:/PolitikCheck: Themen/.test(document.querySelector('ytcp-video-metadata-playlists')?.innerText||''), draft:document.body.innerText.includes('Status "Entwurf"'), vis:document.querySelector('ytcp-video-metadata-visibility')?.innerText.replace(/\s+/g,' ').trim()};};
})();
