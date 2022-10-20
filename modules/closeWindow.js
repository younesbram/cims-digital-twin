export default function closeWindow(bool = false) {
  // If bool is false, the window will close with the close icon
  if (!bool) {
    document.querySelector("#close-window").addEventListener("click", (e) => {
      document.querySelectorAll(".iframe").remove;
      document.querySelector("#selectors").classList.remove("hidden");
      document.querySelector("#close-window").classList.add("hidden");
      document.querySelector("#iframe-container").classList.add("hidden");
    });
  }
  // If bool is true, the window will close
  else {
    document.querySelectorAll(".iframe").remove;
    document.querySelector("#selectors").classList.remove("hidden");
    document.querySelector("#close-window").classList.add("hidden");
    document.querySelector("#iframe-container").classList.add("hidden");
  }
}
