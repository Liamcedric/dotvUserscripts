JSON.parse(localStorage.getItem("scriptSettings"))?.smartAutoHeal&&async function t(){let e=await async function(){let t;return await fetch("https://api.dragonsofthevoid.com/api/usable/consume/u.healing-potion",{headers:{authorization:this.localStorage.token}}).then((t=>t.json())).then((e=>{t=e.success?360:parseInt(e.errorMsg.match(/\d+/)[0])})),t}();setTimeout(t,1e3*(e+1))}(),settings=(null===localStorage.getItem("scriptSettings")&&(scripts={smartAutoHeal:!1,dailyStats:!1,raidShareGroup:!1},localStorage.setItem("scriptSettings",JSON.stringify(scripts))),JSON.parse(localStorage.getItem("scriptSettings"))),new MutationObserver((t=>{t.forEach((t=>{t.addedNodes.forEach((t=>{t instanceof Element&&t.classList.contains("modal-shell")&&function(){const t=document.getElementById("settings");if(null===t)return;const e=document.createElement("fieldset");e.style.borderRadius="5px",e.style.backgroundColor="#252525",e.style.padding="20px",e.style.borderColor="#a0725f";const n=document.createElement("legend");n.innerText="Scripts",n.style.fontSize="36px",n.style.fontWeight="bold";const s=document.createElement("div");e.appendChild(n),e.appendChild(s),t.appendChild(e),Object.entries(settings).forEach((([t,e])=>{const n=document.createElement("input");n.type="checkbox",n.checked=e,n.style.marginRight="10px",n.style.width="20px",n.style.height="20px",n.addEventListener("change",(()=>{settings[t]=n.checked,localStorage.setItem("scriptSettings",JSON.stringify(settings)),console.log(settings)}));const a=document.createElement("label");a.appendChild(n),a.appendChild(document.createTextNode(t.replace(/([A-Z])/g," $1"))),a.style.marginBottom="10px",a.style.textTransform="capitalize",a.style.fontSize="24px",a.style.display="block",s.appendChild(a)}))}()}))}))})).observe(document.getElementById("game-view"),{childList:!0,subtree:!0}),JSON.parse(localStorage.getItem("scriptSettings"))?.raidShareGroup&&new MutationObserver((t=>{t.forEach((t=>{t.addedNodes.forEach((t=>{t instanceof Element&&t.querySelector("div.dotv-container.router-container > div:nth-child(7)")&&function(){const t=document.querySelector("#game-view > div > div.dotv-container.router-container > div:nth-child(6) > div > div:nth-child(6)"),e=t?.lastChild?.cloneNode(!0);e.firstChild.classList.add("inactive");const n=e.querySelector("h4").textContent="test";e.addEventListener("click",(()=>{e.firstChild.classList.remove("inactive"),window.history.pushState({},"",`#/${n}-raid`),Array.from(t.childNodes).slice(0,-1).forEach((t=>{t.firstChild.classList.add("inactive")}))})),Array.from(t.childNodes).slice(0,-1).forEach((t=>{t.addEventListener("click",(()=>{e.firstChild.classList.add("inactive")}))})),t?.appendChild(e)}()}))}))})).observe(document.getElementById("game-view"),{childList:!0,subtree:!0}),(()=>{let t;async function e(){const t=function(t){const e=t.inventory.items["p.stats"].qty;let n={constitution:0,strength:0,agility:0,intellect:0,perception:0,leadership:0,vitalitycap:0,energycap:0,honorcap:0,level:0},s=Object.fromEntries(Object.entries(t.user).filter((([t,e])=>n.hasOwnProperty(t))));return s.sp=e,s}(await async function(){const t=await fetch("https://api.dragonsofthevoid.com/api/user/info",{method:"GET",headers:{authorization:localStorage.token}});return(await t.json()).payload}()),e=function(t){let e=0;for(const[n,s]of Object.entries(t))"level"!==n?e+=s:e-=s;return e}(t);yesterdayStats=JSON.parse(localStorage.getItem("dailyStats"));const n=(new Date).toISOString().split("T")[0];if(new Date(n)>new Date(yesterdayStats.lastUpdated)){const s={lastUpdated:n,spVal:e,lvl:t.level};localStorage.setItem("dailyStats",JSON.stringify(s))}return`sp gained: ${e-yesterdayStats.spVal}\nlevel gained: ${t.level-yesterdayStats.lvl}`}JSON.parse(localStorage.getItem("scriptSettings"))?.dailyStats&&async function(){if(null===localStorage.getItem("dailyStats")){const t={lastUpdated:"2021-01-01",spVal:0,lvl:0};localStorage.setItem("dailyStats",JSON.stringify(t))}t=await e(),async function(){let n=null;const s=document.getElementsByClassName("avatar")[0].firstChild;s.addEventListener("mouseover",(()=>{n=document.createElement("div"),n.innerText=t,n.style.position="absolute",n.style.backgroundColor="black",n.style.color="white",n.style.padding="4px",n.style.borderRadius="4px",n.style.zIndex="9999";const a=s.getBoundingClientRect();n.style.left=`${a.left+window.scrollX}px`,n.style.top=`${a.top+window.scrollY}px`,n.style.pointerEvents="none",document.body.appendChild(n),e().then((e=>{n.innerText=e,t=e})).catch((t=>{console.error(t)}))})),s.addEventListener("mouseout",(()=>{n&&(n.remove(),n=null)}))}()}()})();