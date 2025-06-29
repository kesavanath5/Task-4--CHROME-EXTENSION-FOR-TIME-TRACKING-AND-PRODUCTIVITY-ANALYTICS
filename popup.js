
const productivePatterns = ["stackoverflow.com", "github.com", "codepen.io"];
function isProductive(site) {
  if (productivePatterns.some(p => site.includes(p))) return true;
  if (["facebook.com","twitter.com","instagram.com"].some(u => site.includes(u))) return false;
  return null;
}

chrome.storage.local.get("times", data => {
  const times = data.times || {};
  const content = document.getElementById("content");
  content.innerHTML = "";
  let prod = 0, unprod = 0;

  Object.entries(times).forEach(([site, ms]) => {
    const mins = Math.round(ms / 60000);
    const cls = isProductive(site);
    if (cls === true) prod += ms;
    else if (cls === false) unprod += ms;

    const div = document.createElement("div");
    div.className = "site";
    div.textContent = `${site}: ${mins} min`;
    content.appendChild(div);
  });

  const pmins = Math.round(prod/60000);
  const umins = Math.round(unprod/60000);
  const total = pmins + umins;
  const score = total ? Math.round((pmins/total)*100) : 0;
  
  const summary = document.createElement("div");
  summary.innerHTML = `<hr>
    <b>Productive:</b> ${pmins} min<br>
    <b>Unproductive:</b> ${umins} min<br>
    <b>Score:</b> ${score}%`;
  content.appendChild(summary);
});
