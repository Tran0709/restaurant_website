// 菜园子 website – opening-hours banner, reservation form, scroll effects
const h=document.getElementById('hdr');const onS=()=>h.classList.toggle('solid',scrollY>40);addEventListener('scroll',onS,{passive:true});onS();
// opening hours in Singapore time, minutes after midnight
const HOURS=[[690,870],[1050,1290]];
const hm=m=>{const h=Math.floor(m/60);return `${(h+11)%12+1}:${String(m%60).padStart(2,"0")}${h<12?"am":"pm"}`};
function showHours(){const d=new Date(Date.now()+8*3600e3),n=d.getUTCHours()*60+d.getUTCMinutes(),w=HOURS.find(([a,b])=>n>=a&&n<b),nx=HOURS.find(([a])=>a>n),el=document.getElementById('openpill');
  el.className='pill'+(w?'':' closed');el.textContent=w?'Open now · until '+hm(w[1]):'Closed · opens '+(nx?hm(nx[0])+' today':hm(HOURS[0][0])+' tomorrow');
  document.documentElement.style.setProperty('--hdr',h.offsetHeight+'px')}
showHours();setInterval(showHours,60e3);
// reservations: seatings run until an hour before each closing time
const SEATS=[[690,810],[1050,1230]], RPHONE='6560419403';
const sgDate=(o=0)=>new Date(Date.now()+8*3600e3+o*864e5).toISOString().slice(0,10);
const rdate=document.getElementById('rdate'),rtime=document.getElementById('rtime'),rpax=document.getElementById('rpax');
rdate.min=sgDate();rdate.max=sgDate(60);rdate.value=sgDate();
function fillTimes(){const d=new Date(Date.now()+8*3600e3),now=d.getUTCHours()*60+d.getUTCMinutes(),today=rdate.value===sgDate(),keep=rtime.value;
  const opts=[];for(const [a,b] of SEATS)for(let m=a;m<=b;m+=15)if(!today||m>now+30)opts.push(hm(m));
  rtime.innerHTML=opts.length?opts.map(t=>`<option${t===keep?' selected':''}>${t}</option>`).join(''):'<option value="">No more seatings today</option>'}
rdate.onchange=fillTimes;fillTimes();
document.querySelectorAll('.guests button').forEach(b=>b.onclick=()=>{rpax.value=Math.min(20,Math.max(1,+rpax.value+ +b.dataset.d))});
document.getElementById('rform').onsubmit=e=>{e.preventDefault();const err=document.getElementById('rerr'),v=id=>document.getElementById(id).value.trim(),pax=+rpax.value;
  const phone=v('rphone').replace(/\D/g,'').replace(/^65(?=\d{8}$)/,'');
  if(!rdate.value||rdate.value<rdate.min||rdate.value>rdate.max)return err.textContent='Please choose a date within the next 60 days.';
  if(!rtime.value)return err.textContent='No more seatings on this date. Please pick another date.';
  if(!v('rname'))return err.textContent='Please enter your name.';
  if(!/^[689]\d{7}$/.test(phone))return err.textContent='Please enter a valid Singapore mobile number.';
  if(pax>10)return err.textContent='For groups of more than 10, please call us on 6041 9403.';
  err.textContent='';
  const day=new Date(rdate.value+'T00:00:00').toLocaleDateString('en-SG',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
  const msg=`Hi 菜园子, I'd like to book a table.\nName: ${v('rname')}\nDate: ${day}\nTime: ${rtime.value}\nGuests: ${pax}\nMobile: ${phone}`+(v('rnote')?`\nRequests: ${v('rnote')}`:'');
  window.__lastWa='https://wa.me/'+RPHONE+'?text='+encodeURIComponent(msg);
  window.open(window.__lastWa,'_blank','noopener');
  document.getElementById('rdone').classList.add('on')};addEventListener('resize',showHours);
document.getElementById('yr').textContent=new Date().getFullYear();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
