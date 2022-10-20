// Load full ifc 🏗️
model = await viewer.IFC.loadIfcUrl(
  ifcURL,
  false,
  (progress) => {
    loadingContainer.classList.remove("hidden");
    progressText.textContent = `Loading ${building.name}: ${Math.round(
      (progress.loaded * 100) / progress.total
    )}%`;
  },
  (error) => {}
);
