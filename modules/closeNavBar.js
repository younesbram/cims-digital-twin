const navigationBar = document.querySelector("#selectors");
const navigationButton = document.querySelector("#close-nav-bar");

export default function closeNavBar() {
  let togglenavigationBar = false;
  navigationButton.addEventListener("click", () => {
    navigationBar.style.visibility = togglenavigationBar
      ? "visible"
      : "collapse";
    navigationButton.style.transform = togglenavigationBar
      ? ""
      : "rotate(180deg)";
    const navBarBackground = document.querySelector("#nav-bar");
    navBarBackground.style.backgroundColor = togglenavigationBar
      ? ""
      : "#FFFFFF00";
    navBarBackground.style.boxShadow = togglenavigationBar ? "" : "none";
    togglenavigationBar = !togglenavigationBar;
  });
}
