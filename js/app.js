'use strict';
const BASES=['https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/','https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/'];let BI=0;window.imgFail=el=>{if(!el.dataset.t&&el.dataset.p){el.dataset.t=1;el.src=BASES[1-BI]+'exercises/'+el.dataset.p}else el.remove()};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const J=u=>fetch(u).then(r=>{if(!r.ok)throw Error(u+' '+r.status);return r.json()});
const MODE={G:'Gym',H:'Home',B:'Gym & Home'},DIFF={B:'Beginner',I:'Intermediate',A:'Advanced'};
const key=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'').replace(/s$/,'');
const sing=w=>/(ch|sh|ss|x)es$/.test(w)?w.slice(0,-2):/ss$/.test(w)?w:w.replace(/s$/,'');const toks=s=>new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).map(sing));
const QUAL=['incline','decline','reverse','close','wide','single','one','alternate','seated','standing','lying','dumbbell','barbell','cable','band','machine','smith','kettlebell','overhead','front','side','rear','bent','hammer','preacher','ball','weighted','kneeling','assisted','oblique','twist','bicycle','knee','leg','rope','ez','stability','narrow','sumo','jump','flat','chair','bosu','wall','lateral','behind','neck','alternating','isometric'];
const FEDB={'push-up':['Pushups'],'pull-up':['Pullups'],'chin-up':['Chin-Up'],'barbell-bench-press':['Barbell Bench Press - Medium Grip'],'incline-barbell-bench-press':['Barbell Incline Bench Press - Medium Grip'],'dumbbell-fly':['Dumbbell Flyes'],'lat-pulldown':['Wide-Grip Lat Pulldown'],'barbell-bent-over-row':['Bent Over Barbell Row'],'seated-cable-row':['Seated Cable Rows'],'conventional-deadlift':['Barbell Deadlift'],'barbell-back-squat':['Barbell Full Squat'],'leg-extension':['Leg Extensions'],'lying-leg-curl':['Lying Leg Curls'],'standing-calf-raise':['Standing Calf Raises'],'hammer-curl':['Hammer Curls'],'concentration-curl':['Concentration Curls'],'cable-triceps-pushdown':['Triceps Pushdown'],'skull-crusher':['EZ-Bar Skullcrusher'],'bench-dip':['Bench Dips'],'dumbbell-lateral-raise':['Side Lateral Raise'],'dumbbell-front-raise':['Front Dumbbell Raise'],'arnold-press':['Arnold Dumbbell Press'],'crunch':['Crunches'],'glute-bridge':['Butt Lift (Bridge)'],'ab-wheel-rollout':['Ab Roller'],'cat-cow':['Cat Stretch'],'close-grip-bench-press':['Close-Grip Barbell Bench Press'],'overhead-barbell-press':['Standing Military Press']};
const D={},C={};let FE=[],FM={},app,Q=new URLSearchParams(location.search);
const NAV=[['index','Home'],['categories','Categories'],['library','Exercise Library'],['plans','Workout Plans'],['anatomy','Muscle Anatomy'],['about','About'],['contact','Contact']];
function chrome(){const pg=document.body.dataset.page,cur=pg==='home'?'index':pg==='exercise'?'library':pg;
$('#hdr').innerHTML=`<nav class="nav" aria-label="Main"><a class="brand" href="index.html"><img src="assets/logo/gym-logo-compact.svg" alt="" width="40" height="40">GYM</a><button id="mt" aria-expanded="false" aria-controls="nl">Menu</button><ul id="nl">${NAV.map(([h,t])=>`<li><a href="${h}.html"${h===cur?' aria-current="page"':''}>${t}</a></li>`).join('')}</ul></nav>`;
$('#mt').onclick=e=>{const o=$('#nl').classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
$('#ftr').innerHTML='<p><strong>GYM</strong> · Train With Purpose. Build Strength. Master Every Movement.</p><p>Educational reference only. Not medical advice or a substitute for a qualified coach. Sets and reps are general suggestions; use manageable loads, control your form and stop if you feel sharp pain.</p>'}
function bc(t){return pageNum()?'':''}function pageNum(){return document.body.dataset.page==='home'}
function crumbs(t){if(!pageNum())app.insertAdjacentHTML('afterbegin',`<nav class="bc" aria-label="Breadcrumb"><a href="index.html">Home</a> / ${esc(t)}</nav>`)}
async function boot(){app=$('#app');chrome();
try{const G=window.GYM_DATA;const[c,e,m,p,a]=[G.categories,G.exercises,G.muscles,G.plans,G.attr];D.cats=c;D.ex=e;D.mus=m;D.plans=p;D.attr=a;c.forEach(x=>C[x.slug]=x);
for(let i=0;i<2&&!FE.length;i++)try{FE=(await J(BASES[i]+'dist/exercises.json')).map(f=>({...f,t:toks(f.name)}));BI=i;FE.forEach(f=>FM[key(f.name)]=f)}catch(_){FE=[]}
D.ex.forEach(e=>e.m=match(e));D.msg=FE.length?`Demo images matched for ${D.ex.filter(e=>e.m).length} of ${D.ex.length} exercises (source: free-exercise-db). The rest show "Demo media pending".`:'Could not reach the demo image source (check your internet, or try another network or DNS). Placeholders are shown instead.';
(P[document.body.dataset.page]||(()=>{}))()}
catch(err){app.innerHTML=`<p class="note">Could not load data (${esc(err.message)}). Check that js/data.js is present and has no typos (a missing comma breaks it).</p>`}}
function match(e){const nm=[e.name,...e.aliases,...[].concat(e.fedb||[]),...(FEDB[e.slug]||[])];
for(const n of nm){const m=FM[key(n)];if(m)return m}
let best=null,bs=0;for(const n of nm){const x=toks(n);for(const f of FE){const b=f.t,mi=[...x].filter(w=>!b.has(w)),ex=[...b].filter(w=>!x.has(w));
if(mi.length||ex.length>2||ex.some(w=>QUAL.includes(w)))continue;const s=1/(1+ex.length);if(s>bs){bs=s;best=f}}}
return best}
function demo(e,big){const o=D.attr.overrides[e.slug];
const fr=!o&&e.m?e.m.images.map(p=>`<img class="f" loading="lazy" alt="${esc(e.name)} demonstration, frame" src="${BASES[BI]}exercises/${p}" data-p="${p}" onerror="imgFail(this)">`).join(''):'';
const own=o?`<img loading="lazy" alt="${esc(e.name)} animated demonstration" src="${esc(o.src)}" onerror="this.remove()">`:'';
return `<div class="demo"><span class="ph">${e.m||o?'':'Demo media pending'}</span>${fr}${own}</div>`}
const card=e=>`<a class="card" href="exercise.html?slug=${e.slug}">${demo(e)}<div class="b"><h3>${esc(e.name)}</h3><p>${esc(C[e.cat].name)} · ${esc(e.sub)}</p><p><span class="tag">${DIFF[e.diff]}</span><span class="tag">${MODE[e.mode]}</span></p><p class="m">${esc(e.primary.join(', '))}</p></div></a>`;
const catCard=c=>`<div class="card pad"><h3>${c.icon} ${c.name}</h3><p>${c.blurb}</p><p>${c.subs.map(s=>`<span class="tag">${esc(s)}</span>`).join('')}</p><p style="margin-top:10px"><a class="btn o" href="library.html?cat=${c.slug}&mode=G">Gym (${c.gym})</a> <a class="btn o" href="library.html?cat=${c.slug}&mode=H">Home (${c.home})</a></p></div>`;
const find=n=>D.ex.find(e=>e.name===n);
const planCard=p=>`<a class="card pad" href="plans.html#${p.slug}"><h3>${esc(p.name)}</h3><p>${p.level} · ${p.daysPerWeek} days/week</p></a>`;
const P={};
P.home=()=>{const pick=['Barbell Bench Press','Pull-Up','Barbell Back Squat','Push-Up','Plank','Dumbbell Lateral Raise'].map(find).filter(Boolean);
app.innerHTML=`<section class="hero"><img src="assets/logo/gym-logo.svg" alt="GYM dragon emblem" width="150" height="150"><h1>FORGE YOUR STRONGEST SELF.</h1><p>GYM is a free exercise encyclopedia for gym and home training: ${D.ex.length} exercises across nine categories, with target muscles, form guidance and demonstrations.</p><a class="btn" href="categories.html">Explore Workouts</a></section>
<h2>Nine Workout Categories</h2><div class="grid">${D.cats.map(catCard).join('')}</div>
<h2>Featured Exercises</h2><div class="grid">${pick.map(card).join('')}</div>
<h2>Gym or Home?</h2><div class="grid two"><a class="card pad" href="library.html?mode=G"><h3>Gym Workouts</h3><p>Barbells, dumbbells, cables, machines, Smith machine, racks and cardio equipment.</p></a><a class="card pad" href="library.html?mode=H"><h3>Home Workouts</h3><p>Bodyweight, resistance bands, dumbbells, kettlebells, bench and pull-up bar.</p></a></div>
<h2>Popular Muscle Groups</h2><div class="chips">${D.mus.slice(0,12).map(m=>`<a class="chip" href="anatomy.html?m=${m.slug}">${m.name}</a>`).join('')}</div>
<h2>Muscle Anatomy</h2><p>Pick a muscle group to see what it does and which exercises train it as a primary or secondary mover. <a href="anatomy.html">Open anatomy</a></p>
<h2>Workout Plans</h2><div class="grid">${D.plans.map(planCard).join('')}</div>
<h2>Training Safety</h2><p class="note">Warm up first, choose manageable loads, control every rep, breathe steadily and stop if you feel sharp pain. This site is educational and does not replace medical care or personal coaching.</p>`};
P.categories=()=>{app.insertAdjacentHTML('beforeend',`<h1>Workout Categories</h1><p>Each category has Gym and Home workouts.</p><div class="grid" style="margin-top:16px">${D.cats.map(catCard).join('')}</div>`);crumbs('Categories')};
P.library=()=>{const opt=(a,all)=>`<option value="">${all}</option>`+a.map(([v,t])=>`<option value="${esc(v)}">${esc(t)}</option>`).join('');
app.innerHTML=`<h1>Exercise Library</h1><form class="filters" id="ff" style="max-width:none" onsubmit="return false"><label>Search<input id="s" type="search" placeholder="Name, muscle, equipment..."></label>
<label>Category<select id="cat">${opt(D.cats.map(c=>[c.slug,c.name]),'All')}</select></label><label>Location<select id="mode"><option value="">Gym & Home</option><option value="G">Gym</option><option value="H">Home</option></select></label>
<label>Equipment<select id="eq">${opt([['none','No equipment'],...[...new Set(D.ex.flatMap(e=>e.equipment))].filter(x=>x!=='none').sort().map(x=>[x,x])],'Any')}</select></label>
<label>Target muscle<select id="mu">${opt(D.mus.map(m=>[m.name,m.name]),'Any')}</select></label><label>Difficulty<select id="df">${opt([['B','Beginner'],['I','Intermediate'],['A','Advanced']],'Any')}</select></label>
<label>Type<select id="ty">${opt([...new Set(D.ex.map(e=>e.pattern))].sort().map(x=>[x,x]),'Any')}</select></label>
<label>Sort<select id="so"><option value="az">A-Z</option><option value="za">Z-A</option><option value="easy">Beginner first</option><option value="hard">Advanced first</option><option value="new">Recently added</option></select></label><button type="button" class="btn o" id="rs">Reset filters</button></form><p id="ct" role="status"></p><p class="src">${esc(D.msg)}</p><div class="grid" id="lg"></div>`;
crumbs('Exercise Library');
const ids=['s','cat','mode','eq','mu','df','ty','so'],g=i=>$('#'+i);
if(Q.get('cat'))g('cat').value=Q.get('cat');if(Q.get('mode'))g('mode').value=Q.get('mode');if(Q.get('q'))g('s').value=Q.get('q');if(Q.get('m'))g('mu').value=(D.mus.find(m=>m.slug===Q.get('m'))||{}).name||'';
const rank={B:0,I:1,A:2};
const run=()=>{const s=g('s').value.toLowerCase().trim();
let r=D.ex.filter(e=>(!g('cat').value||e.cat===g('cat').value)&&(!g('mode').value||e.mode===g('mode').value||e.mode==='B')&&(!g('eq').value||e.equipment.includes(g('eq').value))&&(!g('mu').value||e.primary.includes(g('mu').value)||e.secondary.includes(g('mu').value))&&(!g('df').value||e.diff===g('df').value)&&(!g('ty').value||e.pattern===g('ty').value)
&&(!s||[e.name,...e.aliases,e.sub,C[e.cat].name,e.pattern,...e.equipment,...e.primary,...e.secondary].join(' ').toLowerCase().includes(s)));
const so=g('so').value;r.sort((a,b)=>so==='za'?b.name.localeCompare(a.name):so==='easy'?rank[a.diff]-rank[b.diff]||a.name.localeCompare(b.name):so==='hard'?rank[b.diff]-rank[a.diff]||a.name.localeCompare(b.name):so==='new'?b.id-a.id:a.name.localeCompare(b.name));
$('#ct').textContent=`${r.length} exercise${r.length===1?'':'s'} found`;$('#lg').innerHTML=r.length?r.map(card).join(''):'<p class="note" style="grid-column:1/-1">No exercises match. Try fewer filters or click Reset filters.</p>'};
ids.forEach(i=>g(i).addEventListener('input',run));g('rs').onclick=()=>{$('#ff').reset();run()};run()};
P.exercise=()=>{const e=D.ex.find(x=>x.slug===Q.get('slug'));
if(!e){app.innerHTML='<h1>Exercise not found</h1><p><a href="library.html">Back to the library</a></p>';return}
document.title=e.name+' · GYM';const o=D.attr.overrides[e.slug],c=C[e.cat],li=a=>`<ul class="l">${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const i=D.ex.indexOf(e),pv=D.ex[i-1],nx=D.ex[i+1];
const src=o?`Media: ${esc(o.source||'')} (${esc(o.license||'')})`:e.m?`Demo frames: free-exercise-db (public domain). Matched automatically by name ("${esc(e.m.name)}"); please verify it shows this exact exercise.`:'Demo media pending: no verified match yet. Add one via data/media-attribution.json.';
app.innerHTML=`<h1>${esc(e.name)}</h1><p><a href="library.html?cat=${e.cat}">${c.name}</a> · ${esc(e.sub)} <span class="tag">${DIFF[e.diff]}</span><span class="tag">${MODE[e.mode]}</span><span class="tag">${esc(e.pattern)}</span></p>
<div class="detail"><div>${demo(e,1)}<p class="src">${src}</p><p class="src">Content status: ${esc(e.review)}</p></div><div><p>${esc(e.description)}${e.aliases.length?` Also known as: ${esc(e.aliases.join(', '))}.`:''}</p>
<h2>Muscles</h2><p><strong>Primary:</strong> ${esc(e.primary.join(', '))}</p>${e.secondary.length?`<p><strong>Secondary:</strong> ${esc(e.secondary.join(', '))}</p>`:''}<p><strong>Equipment:</strong> ${esc(e.equipment.join(', '))}</p>
<h2>Starting position</h2><p>${esc(e.start)}</p><h2>Steps</h2><ol class="l">${e.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><h2>Breathing</h2><p>${esc(e.breathing)}</p>
<h2>Suggested volume</h2><p>${e.sets} sets · ${esc(e.reps)} · rest ${esc(e.rest)}</p><h2>Common mistakes</h2>${li(e.mistakes)}<h2>Safety</h2><p class="note">${esc(e.safety)}</p>
<h2>Easier</h2><p>${esc(e.beginner)}</p><h2>Harder</h2><p>${esc(e.advanced)}</p></div></div>
<h2>Related exercises</h2><div class="grid">${e.related.map(s=>D.ex.find(x=>x.slug===s)).filter(Boolean).map(card).join('')}</div>
<div class="pn">${pv?`<a class="btn o" href="exercise.html?slug=${pv.slug}">← ${esc(pv.name)}</a>`:'<span></span>'}${nx?`<a class="btn o" href="exercise.html?slug=${nx.slug}">${esc(nx.name)} →</a>`:''}</div>`;crumbs('Exercise Library / '+e.name)};
const WU=[['Arm Circles','30 s each direction'],['Leg Swings','10 per leg'],['Inchworm','5 reps'],['Light practice sets of your first lift','1-2 easy sets']],CD=[["Child's Pose",'30-60 s'],['Standing Hamstring Stretch','30 s per leg']];
P.plans=()=>{const lk=n=>{const e=find(n);return e?`<a href="exercise.html?slug=${e.slug}">${esc(n)}</a>`:esc(n)},rows=(h,a)=>`<tr><th colspan="4">${h}</th></tr>`+a.map(([n,r])=>`<tr><td>${lk(n)}</td><td colspan="3">${esc(r)}</td></tr>`).join('');
let st={};try{st=JSON.parse(localStorage.getItem('gym-done')||'{}')}catch(_){}
app.innerHTML=`<h1>Workout Plans</h1><p class="note">Sample plans for education only. Adjust to your ability and stop if you feel sharp pain. "Mark complete" ticks are saved only in this browser on this device (no account sync).</p>`+D.plans.map(p=>`<section id="${p.slug}"><h2>${esc(p.name)}</h2><p>${p.level} · ${p.daysPerWeek} training days/week</p>${p.schedule.map((d,i)=>{const k=p.slug+':'+i;return `<h3 style="margin:12px 0 6px">${esc(d.day)}: ${esc(d.focus)}</h3><div class="tw"><table>${rows('Warm-up (5-8 min)',WU)}<tr><th>Main workout</th><th>Sets</th><th>Reps</th><th>Rest</th></tr>${d.items.map(([n,s,r,t])=>`<tr><td>${lk(n)}</td><td>${s}</td><td>${r}</td><td>${t}</td></tr>`).join('')}${rows('Cool-down (3-5 min)',CD)}</table></div><label class="done"><input type="checkbox" data-k="${k}"${st[k]?' checked':''}> Mark this day complete${st[k]?` (${esc(st[k])})`:''}</label>`}).join('')}<p><strong>Progression:</strong> ${esc(p.progression)}</p><p><strong>Recovery:</strong> ${esc(p.recovery)}</p></section>`).join('');
app.onchange=e=>{const c=e.target.closest('input[data-k]');if(!c)return;if(c.checked)st[c.dataset.k]=new Date().toLocaleDateString();else delete st[c.dataset.k];try{localStorage.setItem('gym-done',JSON.stringify(st))}catch(_){}};crumbs('Workout Plans')};
P.anatomy=()=>{app.innerHTML=`<h1>Muscle Anatomy</h1><p>Select a muscle group. (Interactive body illustration is planned; this is the functional muscle-group version.)</p><div class="chips" id="mc" style="margin:16px 0">${D.mus.map(m=>`<button class="chip" data-s="${m.slug}" aria-pressed="false">${m.name}</button>`).join('')}</div><div id="mo"></div>`;crumbs('Muscle Anatomy');
const show=s=>{const m=D.mus.find(x=>x.slug===s)||D.mus[0];$$('#mc .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.s===m.slug));
const p=D.ex.filter(e=>e.primary.includes(m.name)),sc=D.ex.filter(e=>e.secondary.includes(m.name));
$('#mo').innerHTML=`<h2>${m.name}</h2><p>${esc(m.desc)}</p><h3 style="margin:16px 0 8px">Primary (${p.length})</h3><div class="grid">${p.map(card).join('')||'<p>None listed.</p>'}</div><h3 style="margin:16px 0 8px">Secondary (${sc.length})</h3><div class="grid">${sc.map(card).join('')||'<p>None listed.</p>'}</div>`};
$('#mc').onclick=e=>{const b=e.target.closest('button');if(b)show(b.dataset.s)};show(Q.get('m'))};
P.about=()=>crumbs('About');
P.contact=()=>{crumbs('Contact');const f=$('#cf'),st=$('#st');
f.onsubmit=e=>{e.preventDefault();const d=new FormData(f),n=d.get('name').trim(),m=d.get('email').trim(),t=d.get('msg').trim();st.className='err';
if(!n||!/^\S+@\S+\.\S+$/.test(m)||t.length<5){st.textContent='Please enter your name, a valid email and a message (5+ characters).';return}
st.className='ok';st.textContent='Opening your email app. This site has no server, so nothing is sent automatically.';
location.href='mailto:tejab6902@gmail.com?subject='+encodeURIComponent('GYM message from '+n)+'&body='+encodeURIComponent(t+'\n\n'+m)}};
boot();
