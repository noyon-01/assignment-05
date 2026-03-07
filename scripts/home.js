const all_toggle_btn = document.getElementById("all_toggle_btn");
const open_toggle_btn = document.getElementById("open_toggle_btn");
const closed_toggle_btn = document.getElementById("closed_toggle_btn");
const count = document.getElementById("count");

const create_element = (arr) => {
  const htmlElement = arr.map(
    (el) =>
      `<span class="px-3 py-1 rounded-2xl text-[12px] font-semibold ${el.toLowerCase() === "bug" ? "bg-[#FECACA] text-[#EF4444]" : el.toLowerCase() === "help wanted" ? "bg-[#FDE68A] text-[#D97706]" : el.toLowerCase() === "enhancement" ? "bg-[#BBF7D0] text-[#00A96E]" : "bg-[#BBF7D0] text-[#00A96E]"}">${el.toUpperCase()}</span>`,
  );
  return htmlElement.join(" ");
};

const manage_spinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card_container").classList.add("hidden");
  } else if (status === false) {
    document.getElementById("card_container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const load_issues = async () => {
  manage_spinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  display_issues(data.data);
  count.innerText = data.data.length;
};

const load_single_issue = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  display_single_issue(details.data);
};

const display_single_issue = (details) => {
  const modal_container = document.getElementById("modal_container");
  modal_container.innerHTML = `
                     <div>
                        <h1 class="text-xl md:text-2xl font-bold">${details.title}</h1>
                        <div class="flex items-center gap-3 pt-3 pb-3 md:pb-7">
                            <button class="${details.status.toLowerCase() === "open" ? "bg-[#00A96E] text-white py-0.5" : "bg-[#A855F7] text-white py-1"}  outline-none rounded-full px-3 text-[12px] md:text-sm font-semibold">${details.status.toUpperCase()}</button>
                            <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#64748B] rounded-full"></div>
                            <p class="text-[12px] md:text-sm text-[#64748B]">Opened by Fahim Ahmed</p>
                            <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#64748B] rounded-full"></div>
                            <p class="text-[12px] md:text-sm text-[#64748B]">22/02/2026</p>
                        </div>
                        <div class="mt-2 md:mb-2.5">${create_element(details.labels)}</div>
                        <p class="text-[#64748B] py-6">${details.description}</p>
                            <div class="bg-[#F8FAFC] p-4 flex items-center gap-40">
                                <div>
                                    <p class="text-[#64748B]">Assignee:</p>
                                    <p class="text-[16px] font-semibold">${details.assignee === "" ? "Assignee not found" : details.assignee }</p>
                                </div>
                                <div>
                                    <p class="text-[#64748B] mb-1">Priority:</p>
                                    <button class="${details.priority.toLowerCase() === "high" ? "bg-[#FEECEC] text-[#EF4444]" : details.priority.toLowerCase() === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : details.priority.toLowerCase() === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]" : "bg-white"} px-4 py-1 rounded-full text-[12px] font-semibold">${details.priority.toUpperCase()}</button>
                                </div>
                            </div>
                    </div>
                    `;
  document.getElementById("my_issue_modal").showModal();
};

const display_issues = (issues) => {
  const card_container = document.getElementById("card_container");
  card_container.innerHTML = "";

  issues.forEach((i) => {
    const card_div = document.createElement("div");

    if (i.status === "open") {
      card_div.innerHTML = `<div onclick="load_single_issue(${i.id})" id="djdjdj" class="shadow rounded border-t-3 border-[#00A96E] h-full">
                <div class="bg-white rounded p-4">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="${i.priority.toLowerCase() === "high" ? "bg-[#FEECEC] text-[#EF4444]" : i.priority.toLowerCase() === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : i.priority.toLowerCase() === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]" : "bg-white"} px-6 rounded-2xl text-sm font-semibold">${i.priority.toUpperCase()}</p>
                    </div>
                    <h1 class="text-[16px] font-semibold mt-3 mb-2">${i.title}</h1>
                    <p class="text-[12px] text-[#64748B]">${i.description}</p>
                    <div class="mt-2 mb-2.5">${create_element(i.labels)}</div>
                </div>
                <div class="w-full h-0.5 bg-[#E4E4E7]"></div>
                <div class="bg-white rounded p-4">
                    <p class="text-sm text-[#64748B] mb-1.5">#1 by john_doe</p>
                    <p class="text-sm text-[#64748B]">1/15/2024</p>
                </div>
            </div>
    `;
    } else if (i.status === "closed") {
      card_div.innerHTML = `<div onclick="load_single_issue(${i.id})" id="djdjdj" class="shadow rounded border-t-3 border-[#A855F7] h-full">
                <div class="bg-white rounded p-4">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Closed-Status.png" alt="">
                        <p class="${i.priority.toLowerCase() === "high" ? "bg-[#FEECEC] text-[#EF4444]" : i.priority.toLowerCase() === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : i.priority.toLowerCase() === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]" : "bg-white"} px-6 rounded-2xl text-sm font-semibold">${i.priority.toUpperCase()}</p>
                    </div>
                    <h1 class="text-[16px] font-semibold mt-3 mb-2">${i.title}</h1>
                    <p class="text-[12px] text-[#64748B]">${i.description}</p>
                    <div class="mt-2 mb-2.5">${create_element(i.labels)}</div>
                </div>
                <div class="w-full h-0.5 bg-[#E4E4E7]"></div>
                <div class="bg-white rounded p-4">
                    <p class="text-sm text-[#64748B] mb-1.5">#1 by john_doe</p>
                    <p class="text-sm text-[#64748B]">1/15/2024</p>
                </div>
            </div>
    `;
    }

    card_container.appendChild(card_div);
  });
  manage_spinner(false);
};

load_issues();

const toggleStyle = (id) => {
  all_toggle_btn.classList.add("btn-primary", "btn-soft");
  open_toggle_btn.classList.add("btn-primary", "btn-soft");
  closed_toggle_btn.classList.add("btn-primary", "btn-soft");

  all_toggle_btn.classList.remove("btn-primary");
  open_toggle_btn.classList.remove("btn-primary");
  closed_toggle_btn.classList.remove("btn-primary");

  const selected_toggle_btn = document.getElementById(id);
  selected_toggle_btn.classList.remove("btn-primary", "btn-soft");
  selected_toggle_btn.classList.add("btn-primary");
};

all_toggle_btn.addEventListener("click", () => {
  load_issues();
});

open_toggle_btn.addEventListener("click", async () => {
  manage_spinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  display_open_status(data.data);
});

const display_open_status = (status) => {
  const card_container = document.getElementById("card_container");
  card_container.innerHTML = "";

  status.forEach((s) => {
    if (s.status === "open") {
      const card_open_div = document.createElement("div");
      card_open_div.innerHTML = `
      <div onclick="load_single_issue(${s.id})" class="shadow rounded border-t-4 border-[#00A96E] h-full">
                <div class="bg-white rounded p-4">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="${s.priority.toLowerCase() === "high" ? "bg-[#FEECEC] text-[#EF4444]" : s.priority.toLowerCase() === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : s.priority.toLowerCase() === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]" : "bg-white"} px-6 rounded-2xl text-sm font-semibold">${s.priority.toUpperCase()}</p>
                    </div>
                    <h1 class="text-[16px] font-semibold mt-3 mb-2">${s.title}</h1>
                    <p class="text-[12px] text-[#64748B]">${s.description}</p>
                    <div class="mt-2 mb-2.5">${create_element(s.labels)}</div>
                </div>
                <div class="w-full h-0.5 bg-[#E4E4E7]"></div>
                <div class="bg-white rounded p-4">
                    <p class="text-sm text-[#64748B] mb-1.5">#1 by john_doe</p>
                    <p class="text-sm text-[#64748B]">1/15/2024</p>
                </div>
            </div>
    `;
      card_container.appendChild(card_open_div);
    }
    manage_spinner(false);
    count.innerText = card_container.children.length;
  });
};

closed_toggle_btn.addEventListener("click", async () => {
  manage_spinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  display_closed_status(data.data);
});

const display_closed_status = (status) => {
  const card_container = document.getElementById("card_container");
  card_container.innerHTML = "";

  status.forEach((s) => {
    if (s.status === "closed") {
      const card_closed_div = document.createElement("div");
      card_closed_div.innerHTML = `
      <div onclick="load_single_issue(${s.id})" class="shadow rounded border-t-3 border-[#A855F7] h-full">
                <div class="bg-white rounded p-4">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Closed-Status.png" alt="">
                        <p class="${s.priority.toLowerCase() === "high" ? "bg-[#FEECEC] text-[#EF4444]" : s.priority.toLowerCase() === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : s.priority.toLowerCase() === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]" : "bg-white"} px-6 rounded-2xl text-sm font-semibold">${s.priority.toUpperCase()}</p>
                    </div>
                    <h1 class="text-[16px] font-semibold mt-3 mb-2">${s.title}</h1>
                    <p class="text-[12px] text-[#64748B]">${s.description}</p>
                    <div class="mt-2 mb-2.5">${create_element(s.labels)}</div>
                </div>
                <div class="w-full h-0.5 bg-[#E4E4E7]"></div>
                <div class="bg-white rounded p-4">
                    <p class="text-sm text-[#64748B] mb-1.5">#1 by john_doe</p>
                    <p class="text-sm text-[#64748B]">1/15/2024</p>
                </div>
            </div>
    `;
      card_container.appendChild(card_closed_div);
    }
    manage_spinner(false);
    count.innerText = card_container.children.length;
  });
};

document.getElementById("search_btn").addEventListener("click", () => {
  const input = document.getElementById("search_input");
  const inputValue = input.value.trim().toLowerCase();

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const all_issues = data.data;

      const filter_issues = all_issues.filter((data) => {
        return data.title.toLowerCase().includes(inputValue);
      });
      display_issues(filter_issues);
    });
});
