export default function infoMessage(message, seconds = 6) {
  const container = document.querySelector("#message");
  container.innerHTML = message;
  container.classList.remove("hidden");
  setTimeout(() => container.classList.add("hidden"), seconds * 1000);
}
