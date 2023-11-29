console.log("Countdown Timer Script Initialized");

function updateTimeElement(element, time) {
  element.textContent = time < 10 ? "0" + time : time;
}

function parseDate(dateStr) {
  const parts = dateStr.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

function updateCountdown(timerContainer) {
  const endDateStr = timerContainer.getAttribute("data-countdown-end-date");
  const targetDate = parseDate(endDateStr);
  const now = new Date();
  const difference = targetDate - now;

  if (difference > 0) {
    updateTimeElement(
      timerContainer.querySelector(".days"),
      Math.floor(difference / (1000 * 60 * 60 * 24))
    );
    updateTimeElement(
      timerContainer.querySelector(".hours"),
      Math.floor((difference / (1000 * 60 * 60)) % 24)
    );
    updateTimeElement(
      timerContainer.querySelector(".minutes"),
      Math.floor((difference / (1000 * 60)) % 60)
    );
    updateTimeElement(
      timerContainer.querySelector(".seconds"),
      Math.floor((difference / 1000) % 60)
    );
  } else {
    timerContainer
      .querySelectorAll(".time")
      .forEach((element) => updateTimeElement(element, 0));
  }
}

function initializeCountdowns() {
  const countdownContainers = document.querySelectorAll(".countdown-addon");
  countdownContainers.forEach((container) => {
    setInterval(() => updateCountdown(container), 1000);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCountdowns);
} else {
  initializeCountdowns();
}
