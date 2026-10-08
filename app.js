
var C=[["📣","Advanced Digital Marketing","3 Months","Performance Marketing","Full-funnel playbook: keyword research, on-page SEO, paid search and social, conversion tracking and GA4 reporting.","digital-marketing-diploma"],
["📊","Data Science & Data Analytics","6 Months","Data Scientist","From statistics to supervised learning, model evaluation and deployment concepts.","data-science-data-analytics"],
["💰","Finance","2 Months","Financial Analyst","Financial statements, budgeting, valuation basics and Excel modeling.","finance"],
["🧑‍🤝‍🧑","HR Management","2 Months","HR Generalist","The employee lifecycle: sourcing, interviewing, compliance and HR metrics.","hr"],
["🤖","AI Tools & Automation","3 Months","AI Specialist","AI tools, workflow automation, ChatGPT, prompt engineering and business automation.","ai-tools-automation"],
["🚀","Digital Marketing Diploma","9 Months","Digital Marketing Executive","SEO, paid ads, social media, lead generation, AI marketing tools and performance campaigns.","digital-marketing-diploma-program"]];
var T=[["Piyush Joshi","Delhi","Deloitte","4.3"],["Vaishnavi Gupta","Madhya Pradesh","UTO","4.8"],["Sanskriti Khodre","Madhya Pradesh","ICICI Bank","4.1"],["Krishna Rathore","Chhattisgarh","HCL","4.1"],["Mohnish Baviskar","Maharashtra","Zoho","3.0"],["Harshita Jain","Madhya Pradesh","Microsoft","3.9"],["Harsh Parmar","Madhya Pradesh","Accenture","5.7"],["Dhaval Dholariya","Gujarat","Amazon","5.7"]];
var H="Deloitte,TCS,Zoho,Infosys,Wipro,HCLTech,Tech Mahindra,Mphasis,LTIMindtree,EY,Accenture,Capgemini,Genpact,IBM,PwC,Amazon,Flipkart".split(",");
var D=document.createElement("div");document.createElement("div").appendChild(D);var $=function(i){return document.getElementById(i)||D};
$("cg").innerHTML=C.map(function(c,i){return '<div class="card cc tilt rv" id="c'+i+'"><div class="ic">'+c[0]+'</div><h3>'+c[1]+'</h3><div class="meta"><span>⏱ '+c[2]+'</span><span>🎯 '+c[3]+'</span></div><p>'+c[4]+'</p><p style="margin-top:12px"><a href="https://robotgenie.in/courses/'+c[5]+'/">Explore course →</a></p></div>'}).join("");
$("s2").innerHTML='<option value="">Select a course</option>'+C.map(function(c){return "<option>"+c[1]+"</option>"}).join("");
$("mt").innerHTML=H.concat(H).map(function(x){return "<span>"+x+"</span>"}).join("");
$("chips").onclick=function(e){var k=e.target.dataset.c;if(k==null)return;document.querySelectorAll(".chip").forEach(function(b){b.classList.toggle("on",b===e.target)});
document.querySelectorAll(".cc").forEach(function(x){x.classList.remove("hl")});var el=$("c"+k);void el.offsetWidth;el.classList.add("hl");
$("res").textContent="✨ Great match: "+C[k][1]+" ("+C[k][2]+")";$("s2").value=C[k][1];el.scrollIntoView({behavior:"smooth",block:"center"})};
var ti=0,tc=$("tc");function show(){tc.style.opacity=0;tc.style.transform="translateY(8px)";setTimeout(function(){var t=T[ti];tc.innerHTML='<div class="av">'+t[0][0]+'</div><div class="lpa gt">'+t[3]+' LPA</div><b>'+t[0]+'</b><p style="color:var(--mut);margin:4px 0 0">Placed at '+t[2]+' · '+t[1]+'</p>';tc.style.opacity=1;tc.style.transform="none"},300)}
function go(d){ti=(ti+d+T.length)%T.length;show()}$("nx").onclick=function(){go(1)};$("pv").onclick=function(){go(-1)};show();setInterval(function(){go(1)},4500);
function tick(){var n=new Date(),e=new Date(n);e.setHours(24,0,0,0);var d=Math.floor((e-n)/1000),f=function(x){return String(x).padStart(2,"0")};$("h").textContent=f(Math.floor(d/3600));$("m").textContent=f(Math.floor(d%3600/60));$("s").textContent=f(d%60)}tick();setInterval(tick,1000);
var W=["AI-powered","job-ready","future-proof","hands-on"],wi=0,r=$("rot");setInterval(function(){r.style.opacity=0;setTimeout(function(){wi=(wi+1)%W.length;r.textContent=W[wi];r.style.opacity=1},250)},2600);r.style.transition="opacity .25s";
function count(el){var t=+el.dataset.n,i=0,st=Math.max(1,Math.ceil(t/60)),s=setInterval(function(){i=Math.min(t,i+st);el.textContent=i;if(i>=t)clearInterval(s)},25)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");e.target.querySelectorAll("[data-n]").forEach(count);io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll(".rv").forEach(function(x){io.observe(x)});
var links=document.querySelectorAll("nav a");
links.forEach(function(a){a.addEventListener("click",function(){$("nav").classList.remove("open")})});$("mb").onclick=function(){$("nav").classList.toggle("open")};
addEventListener("scroll",function(){var d=document.documentElement;$("pg").style.width=(scrollY/(d.scrollHeight-innerHeight)*100)+"%"},{passive:true});
addEventListener("pointermove",function(e){$("glow").style.left=e.clientX+"px";$("glow").style.top=e.clientY+"px"});
document.addEventListener("pointermove",function(e){var c=e.target.closest&&e.target.closest(".tilt");if(!c||e.pointerType==="touch")return;var b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;c.style.setProperty("--mx",(x+.5)*100+"%");c.style.setProperty("--my",(y+.5)*100+"%");c.style.transform="perspective(700px) rotateY("+x*8+"deg) rotateX("+-y*8+"deg)"});
document.addEventListener("pointerout",function(e){var c=e.target.closest&&e.target.closest(".tilt");if(c)c.style.transform=""});
var root=document.documentElement;try{var sv=localStorage.getItem("rg-t");if(sv)root.setAttribute("data-theme",sv)}catch(x){}
$("th").onclick=function(){var l=root.getAttribute("data-theme")==="light"||(!root.getAttribute("data-theme")&&matchMedia("(prefers-color-scheme:light)").matches),v=l?"dark":"light";root.setAttribute("data-theme",v);try{localStorage.setItem("rg-t",v)}catch(x){}};
(document.querySelector(".plates")||D).onclick=function(e){var b=e.target;if(b.id==="kp"){$("th").click();return}if(!b.dataset.v)return;root.style.setProperty(b.dataset.v,b.classList.toggle("off")?"#777":"")};
$("f").onsubmit=function(e){e.preventDefault();var n=$("n"),p=$("p"),c=$("s2"),ok=true;[n,p,c].forEach(function(x){x.classList.remove("err")});
if(!n.value.trim()){n.classList.add("err");ok=false}if(!/^[+\d\s-]{10,15}$/.test(p.value.trim())){p.classList.add("err");ok=false}if(!c.value){c.classList.add("err");ok=false}
if(!ok){$("ok").textContent="Please complete all fields.";return}$("ok").textContent="";
sendEnq(n.value,p.value,c.value)};
if(document.getElementById("cv")){var cv=$("cv"),x=cv.getContext("2d"),pt=[],cols=["#00aeef","#ec008c","#ffe600"],mx=-999,my=-999,RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
function rs(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;pt=[];for(var i=0;i<Math.min(60,cv.width/18);i++)pt.push({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:Math.random()-.5,vy:Math.random()-.5})}
cv.parentNode.addEventListener("pointermove",function(e){var b=cv.getBoundingClientRect();mx=e.clientX-b.left;my=e.clientY-b.top});
function dr(){x.clearRect(0,0,cv.width,cv.height);pt.forEach(function(a,i){a.x+=a.vx*.5;a.y+=a.vy*.5;if(a.x<0||a.x>cv.width)a.vx*=-1;if(a.y<0||a.y>cv.height)a.vy*=-1;
var dx=a.x-mx,dy=a.y-my,d=Math.hypot(dx,dy);if(d<110){a.x+=dx/d*1.5;a.y+=dy/d*1.5}
x.globalAlpha=.85;x.fillStyle=cols[i%3];x.beginPath();x.arc(a.x,a.y,2,0,6.3);x.fill();
for(var j=i+1;j<pt.length;j++){var b=pt[j],q=Math.hypot(a.x-b.x,a.y-b.y);if(q<120){x.globalAlpha=(1-q/120)*.5;x.strokeStyle=cols[i%3];x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}});if(!RM)requestAnimationFrame(dr)}
window.rsz=rs;rs();dr();addEventListener("resize",rs)}

function setNav(h){links.forEach(function(a){a.classList.toggle("on",a.dataset.p===h)})}
var P={home:["Robot Genie | Best Digital Marketing Course in Delhi | AI-Powered Career Institute","Robot Genie is an AI-powered career institute in Delhi: digital marketing, data science, finance, HR and AI tools courses with live projects and placement support."],about:["About Robot Genie | Live Projects, Expert Trainers, Placement Support","Learn how Robot Genie trains students with live projects, small batches, expert trainers and career launchpad support in Delhi."],courses:["Courses | Digital Marketing, Data Science, Finance, HR, AI Tools | Robot Genie","Explore six Robot Genie courses from 2 to 9 months and find the right program with our interactive course finder."],placements:["Placements | Student Success Stories & Hiring Partners | Robot Genie","See Robot Genie student placements and 300+ hiring partners including Deloitte, TCS, Zoho, Infosys and Amazon."],contact:["Contact Robot Genie | Reserve Your Seat in Delhi","Reserve your seat or ask a question. Robot Genie, Laxmi Nagar Delhi. Call +91-9891707129 or WhatsApp us."]};
function route(){var h=(location.hash||"#home").slice(1);if(!P[h])h="home";document.querySelectorAll(".page").forEach(function(s){s.classList.toggle("on",s.id==="p-"+h)});setNav(h);document.title=P[h][0];document.querySelector("meta[name=description]").content=P[h][1];$("nav").classList.remove("open");scrollTo(0,0);if(window.rsz)setTimeout(rsz,60)}
if(document.body.dataset.mode==="single"){addEventListener("hashchange",route);route()}else setNav(document.body.dataset.page);

(function(){var seen;try{seen=sessionStorage.getItem("rg-sp")}catch(e){}
if(seen||matchMedia("(prefers-reduced-motion:reduce)").matches)return;try{sessionStorage.setItem("rg-sp","1")}catch(e){}
var sp=document.createElement("div");sp.id="splash";sp.innerHTML='<div><div class="logo">'+document.querySelector("header .logo").innerHTML+'</div><p>AI-Powered Career Institute</p></div>';document.body.appendChild(sp);setTimeout(function(){sp.remove()},2400)})();

(function(){var hd=document.querySelector("header"),up=$("up");addEventListener("scroll",function(){hd.classList.toggle("sc",scrollY>30);up.classList.toggle("on",scrollY>500)},{passive:true});up.onclick=function(){scrollTo({top:0,behavior:"smooth"})};
document.addEventListener("pointermove",function(e){var b=e.target.closest&&e.target.closest(".btn");if(!b||e.pointerType==="touch")return;var r=b.getBoundingClientRect();b.style.transform="translate("+(e.clientX-r.left-r.width/2)*.18+"px,"+(e.clientY-r.top-r.height/2)*.28+"px)"});
document.addEventListener("pointerout",function(e){var b=e.target.closest&&e.target.closest(".btn");if(b)b.style.transform=""})})();

function sendEnq(n,p,c){var cfg=window.RG_CONFIG||{};
var wa=function(){location.href="https://wa.me/"+(cfg.whatsapp||"919891707129")+"?text="+encodeURIComponent("Hi Robot Genie, I'm "+n+" ("+p+"). I'd like to reserve a seat for "+c+".")};
var api=cfg.apiUrl===undefined?"/api":cfg.apiUrl;if(!api||location.protocol==="file:"){wa();return}
var o=$("ok");o.style.color="";o.textContent="Sending…";
fetch(api+"/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,phone:p,course:c,website:$("hp").value})}).then(function(r){if(!r.ok)throw new Error("api");o.textContent="Thank you! We will call you shortly.";$("f").reset()}).catch(function(){o.textContent="";wa()})}
