import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix per le icone di Leaflet con bundler - punta alla cartella public
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

window.onload = init;

function init() {
  const mapElement = document.getElementById('mapid');

  const stadiaMaps = L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',
    {
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png',
    }
  );

  const openstreetmapStandard = L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  const myMap = L.map(mapElement, {
    center: [48, 14],
    zoom: 5,
    minZoom: 4,
    layers: [openstreetmapStandard],
  });

  const baseLayers = {
    '<b>OpenStreetMap Standard</b>': openstreetmapStandard,
    'Stadia Maps - Alidade Smooth Dark': stadiaMaps,
  };

  // Griglia personalizzata con linee semplici
  const gridLines = L.layerGroup();

  function drawGrid() {
    gridLines.clearLayers();
    const zoom = myMap.getZoom();
    let interval = 10;

    if (zoom < 4) interval = 30;
    else if (zoom < 6) interval = 10;
    else if (zoom < 8) interval = 5;
    else interval = 2;

    // Linee di latitudine
    for (let lat = -90; lat <= 90; lat += interval) {
      const line = L.polyline(
        [
          [lat, -180],
          [lat, 180],
        ],
        { color: '#666', weight: 1, opacity: 0.4, interactive: false }
      );
      gridLines.addLayer(line);
    }

    // Linee di longitudine
    for (let lng = -180; lng <= 180; lng += interval) {
      const line = L.polyline(
        [
          [-90, lng],
          [90, lng],
        ],
        { color: '#666', weight: 1, opacity: 0.4, interactive: false }
      );
      gridLines.addLayer(line);
    }
  }

  myMap.on('zoomend', drawGrid);
  drawGrid();

  const overlays = {
    Griglia: gridLines,
  };

  const layerControls = L.control
    .layers(baseLayers, overlays, {
      collapsed: true,
      position: 'topright',
    })
    .addTo(myMap);

  console.log('Map initialized');
}
