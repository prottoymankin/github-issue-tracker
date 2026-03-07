const issuesContainer = document.querySelector("#issues-container");

async function loadIssues() {
  const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await response.json();
  displayIssues(data.data);
}

function displayIssues(issues) {
  issues.forEach(issue => {
    const {id, author, title, description, status, labels, createdAt, priority} = issue;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="bg-white shadow-xl rounded-[4px] border-t-4 ${status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'}">
        <div class="p-4">
          <div class="flex items-center justify-between mb-4">
            <img 
              src="./assets/${status === 'open' ? 'Open' : 'Closed'}-Status.png" 
              alt=""
            >
            <div class="bg-[#FEECEC] p-2 rounded-[40px] text-xs text-[#EF4444] font-medium w-20 text-center">${priority}</div>
          </div>
          <h2 class="text-sm font-semibold text-[#1F2937]">${title}</h2>
          <p class="text-xs text-[#64748B] mt-2.5 line-clamp-2">${description}</p>
          <div class="flex gap-2 text-xs font-medium my-2.5">
            ${(labels.map(label => {
              return `<p class="rounded-[40px] bg-[#e49a44] p-2">${label}</p>`
            })).join("")}
          </div>
        </div>

        <div class="border-t border-[#E4E4E7] p-4 text-[#64748B] text-xs space-y-2">
          <p>#${id} by ${author}</p>
          <p>${new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    `;
    issuesContainer.appendChild(div);
  });
}

loadIssues();