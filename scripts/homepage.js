const issuesContainer = document.querySelector("#issues-container");
const tabButtons = document.querySelectorAll(".tab-btn");
const allButton = document.querySelector("#all-btn");
const openButton = document.querySelector("#open-btn");
const closedButton = document.querySelector("#closed-btn");
const loadingSpinner = document.querySelector("#loading-spinner");
const issueDetailsInfo = document.querySelector("#issue-details-info");
const issueCount = document.querySelector("#issue-count");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function formateDate(date) {
  return (new Date(date).toLocaleDateString());
}

function showLoadinSpinner() {
  issuesContainer.innerHTML = "";
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");
}

function hideLoadingSpinner() {
  issuesContainer.innerHTML = "";
  loadingSpinner.classList.add("hidden");
  loadingSpinner.classList.remove("flex");
}

async function loadIssues() {
  showLoadinSpinner();
  const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await response.json();
  hideLoadingSpinner();
  displayIssues(data.data);
}

function displayLabels(labels) {
  const labelsHTML = labels.map(label => {
    return `<p class="rounded-full text-[#D97706] bg-[#FFF8DB] px-2 py-1 border border-[#D97706]">${label}</p>`
  });
  return labelsHTML.join("");
}

function displayIssues(issues) {
  issueCount.textContent = issues.length;
  issuesContainer.innerHTML = "";
  issues.forEach(issue => {
    const {id, author, title, description, status, labels, createdAt, priority} = issue;
    const div = document.createElement("div");
    div.innerHTML = `
      <div onclick="loadIssueDetails(${id})" class="bg-white shadow-xl rounded-[4px] border-t-4 ${status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'}">
        <div class="p-4">
          <div class="flex items-center justify-between mb-4">
            <img 
              src="./assets/${status === 'open' ? 'Open' : 'Closed'}-Status.png" 
              alt=""
            >
            <div class="
            ${priority === 'high' ? 'high-priority' : priority === "medium" ? 'medium-priority': 'low-priority'} px-2 py-1 rounded-full text-xs font-medium w-20 text-center">${priority}</div>
          </div>
          <h2 class="text-sm font-semibold text-[#1F2937]">${title}</h2>
          <p class="text-xs text-[#64748B] mt-2.5 line-clamp-2">${description}</p>
          <div class="flex gap-2 text-xs font-medium my-2.5">${displayLabels(labels)}</div>
        </div>

        <div class="border-t border-[#E4E4E7] p-4 text-[#64748B] text-xs space-y-2">
          <p>#${id} by ${author}</p>
          <p>${formateDate(createdAt)}</p>
        </div>
      </div>
    `;
    issuesContainer.appendChild(div);
  });
}

loadIssues();

function removeActiveTab() {
  tabButtons.forEach(btn => {
    btn.classList.remove("active-tab");
  });
}

allButton.addEventListener("click", () => {
  searchInput.value = "";
  removeActiveTab();
  allButton.classList.add("active-tab");
  loadIssues();
});

async function loadOpenIssues() {
  showLoadinSpinner();
  const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await response.json();
  const openIssues = (data.data).filter(issue => issue.status === "open");
  hideLoadingSpinner();
  displayIssues(openIssues);
}

openButton.addEventListener("click", () => {
  searchInput.value = "";
  removeActiveTab();
  openButton.classList.add("active-tab");
  loadOpenIssues();
});

async function loadClosedIssues() {
  showLoadinSpinner();
  const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await response.json();
  const closedIssues = (data.data).filter(issue => issue.status === "closed");
  hideLoadingSpinner();
  displayIssues(closedIssues);
}

closedButton.addEventListener("click", () => {
  searchInput.value = "";
  removeActiveTab();
  closedButton.classList.add("active-tab");
  loadClosedIssues();
});

async function loadIssueDetails(id) {
  const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const data = await response.json();
  displayIssuesDetails(data.data);
}


function displayIssuesDetails(details) {
  console.log(details)
  const {title, status, author, labels, priority, description, assignee, createdAt} = details;
  issueDetailsInfo.innerHTML = `
    <div class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl text-[#1F2937] font-bold">${title}</h2>
        <div class="text-xs flex items-center gap-2 text-[#64748B]">
          <p class="font-medium text-white py-1.5 px-2 rounded-full ${status === "open" ? "bg-[#00A96E]" : "bg-[#EF4444]"}">${status}</p>
          <span>&#9679;</span>
          <p>Opened by ${author}</p>
          <span>&#9679;</span>
          <p>${formateDate(createdAt)}</p>
        </div>
      </div>

      <div class="flex gap-2 text-xs font-medium">${displayLabels(labels)}</div>

      <p class="text-[#64748B]">${description}</P>

      <div class="p-4 rounded-lg bg-[#F8FAFC] flex gap-2.5">
        <div class="w-1/2">
          <p class="text-[#64748B]">Assigne:</p>
          <p class="text-[#1F2937]" font-semibold>${assignee || "unknown"}</p>
        </div>
        <div class="w-1/2">
          <p class="text-[#64748B]">Priority:</p>
          <p class="${priority === 'high' ? 'high-priority' : priority === "medium" ? 'medium-priority': 'low-priority'} text-xs w-20 text-center rounded-full px-2 py-1">${priority}</p>
        </div>
      </div>
    </div>
  `;
  document.querySelector("#issue_details").showModal();
}

searchButton.addEventListener("click", () => {
  removeActiveTab();
  const searchValue = searchInput.value;
  loadSearchIssues(searchValue);
});

async function loadSearchIssues(searchValue) {
  showLoadinSpinner();
  const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`);
  const data = await response.json();
  hideLoadingSpinner();
  displayIssues(data.data);
}