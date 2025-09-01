const actionBtn = document.querySelectorAll(".btn-action");
let data;
async function fetchData() {
  try {
    const res = await fetch(`./data.json`);
    data = await res.json();
  } catch (err) {
    console.error(err);
    return;
  }
  displayUI(`daily`);
}
(async function () {
  fetchData();
})();

actionBtn.forEach((btn) => {
  btn.addEventListener("click", () => displayUI(btn.textContent.toLowerCase()));
});
function displayUI(range) {
  data.forEach((item) => {
    const sectionEl = document.querySelector(
      `.card-${item.title.toLowerCase().replace(" ", "")}`
    );
    if (!sectionEl) return;
    const labelObj = {
      daily: "Last Day",
      weekly: "Last Week",
      monthly: "Last Month",
    };
    sectionEl.querySelector(".total-time").textContent =
      item.timeframes[range][`current`] + `hrs`;
    sectionEl.querySelector(".label-time").textContent =
      item.timeframes[range][`previous`] + `hrs`;
    sectionEl.querySelector(
      ".label-action"
    ).textContent = `${labelObj[range]} -`;
  });
}
