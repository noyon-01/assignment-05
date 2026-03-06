const create_element = (arr) => {
  const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
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
                        <h1 class="text-2xl font-bold">${details.title}</h1>
                        <div class="flex items-center gap-3 pt-3 pb-7">
                            <button class="btn btn-success outline-none rounded-full">${details.status}</button>
                            <div class="w-2 h-2 bg-[#64748B] rounded-full"></div>
                            <p class="text-sm text-[#64748B]">  Opened by Fahim Ahmed</p>
                            <div class="w-2 h-2 bg-[#64748B] rounded-full"></div>
                            <p class="text-sm text-[#64748B]">22/02/2026</p>
                        </div>
                        <div class="mt-2 mb-2.5">${create_element(details.labels)}</div>
                        <p class="text-[#64748B] py-6">${details.description}</p>
                            <div class="bg-[#F8FAFC] p-4 flex items-center gap-40">
                                <div>
                                    <p class="text-[#64748B]">Assignee:</p>
                                    <p class="text-[16px] font-semibold">${details.assignee}</p>
                                </div>
                                <div>
                                    <p class="text-[#64748B]">Priority:</p>
                                    <button class="bg-[#EF4444] text-white px-3.5 rounded-full">${details.priority}</button>
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
    // console.log(i);
    const card_div = document.createElement("div");
    card_div.innerHTML = `
    <div onclick="load_single_issue(${i.id})" class="shadow rounded border-t-3 border-green-600 h-full">
                <div class="bg-white rounded p-4">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="bg-[#FEECEC] text-[#EF4444] px-6 rounded-2xl">${i.priority.toUpperCase()}</p>
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
    card_container.appendChild(card_div);
  });
  manage_spinner(false);
};

load_issues();

const all_toggle_btn = document.getElementById("all_toggle_btn");
const open_toggle_btn = document.getElementById("open_toggle_btn");
const closed_toggle_btn = document.getElementById("closed_toggle_btn");

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

  current_job_count_list = id;

  if (id === "interview_toggle_btn") {
    job_cards_section.classList.add("hidden");
    filtered_job_section.classList.remove("hidden");
    rejectedJobCount.classList.add("hidden");
    if (interview_job_count_list.length > 0) {
      no_job_section.classList.add("hidden");
      interviewJobCount.classList.remove("hidden");
      countElement.classList.remove("hidden");
    } else {
      no_job_section.classList.remove("hidden");
      interviewJobCount.classList.add("hidden");
      countElement.classList.add("hidden");
    }
    renderInterviewJob();
  } else if (id === "all_toggle_btn") {
    filtered_job_section.classList.add("hidden");
    no_job_section.classList.add("hidden");
    interviewJobCount.classList.add("hidden");
    rejectedJobCount.classList.add("hidden");
    countElement.classList.add("hidden");
    job_cards_section.classList.remove("hidden");
  } else if (id === "rejected_toggle_btn") {
    job_cards_section.classList.add("hidden");
    filtered_job_section.classList.remove("hidden");
    interviewJobCount.classList.add("hidden");
    if (rejected_job_count_list.length > 0) {
      no_job_section.classList.add("hidden");
      rejectedJobCount.classList.remove("hidden");
      countElement.classList.remove("hidden");
    } else {
      no_job_section.classList.remove("hidden");
      rejectedJobCount.classList.add("hidden");
      countElement.classList.add("hidden");
    }
    renderRejectedJob();
  }
}
