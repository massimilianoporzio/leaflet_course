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
    'OpenStreetMap Standard': openstreetmapStandard,
    'Stadia Maps - Alidade Smooth Dark': stadiaMaps,
  };

  const layerControls = L.control
    .layers(
      baseLayers,
      {},
      {
        collapsed: true,
      }
    )
    .addTo(myMap);
  console.log('Map initialized');
}
