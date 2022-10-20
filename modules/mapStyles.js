export default mapStyles = {
  // Styles with labels
  map: { name: "Map", url: "mapbox://styles/mapbox/streets-v11" },
  satellite: {
    name: "Satellite with Labels",
    url: "mapbox://styles/mapbox/satellite-streets-v11",
  },
  outdoors: { name: "Outdoors", url: "mapbox://styles/mapbox/outdoors-v11" },
  light: { name: "Light", url: "mapbox://styles/mapbox/light-v10" },
  dark: { name: "Dark", url: "mapbox://styles/mapbox/dark-v10" },
  traffic: { name: "Traffic", url: "mapbox://styles/mapbox/navigation-day-v1" },
  // Styles without labels (The models don't show) -------------------
  satellite_no_layers: {
    name: "Satellite",
    url: "mapbox://styles/mapbox/satellite-v9",
  },
  google: {
    name: "Google satellite",
    url: {
      version: 8,
      sources: {
        "raster-tiles": {
          type: "raster",
          tiles: ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
          tileSize: 256,
          attribution:
            'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
        },
      },
      layers: [
        {
          id: "simple-tiles",
          type: "raster",
          source: "raster-tiles",
          minzoom: 0,
          maxzoom: 24,
        },
      ],
    },
  },
  goggle_labels: {
    name: "Google hybrid",
    url: {
      version: 8,
      sources: {
        "raster-tiles": {
          type: "raster",
          tiles: ["https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"],
          tileSize: 256,
          attribution:
            'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
        },
      },
      layers: [
        {
          id: "simple-tiles",
          type: "raster",
          source: "raster-tiles",
          minzoom: 0,
          maxzoom: 24,
        },
      ],
    },
  },
  watercolor: {
    name: "Watercolor",
    url: {
      version: 8,
      sources: {
        "raster-tiles": {
          type: "raster",
          tiles: ["http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"],
          tileSize: 256,
          attribution:
            'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
        },
      },
      layers: [
        {
          id: "simple-tiles",
          type: "raster",
          source: "raster-tiles",
          minzoom: 0,
          maxzoom: 24,
        },
      ],
    },
  },
};
