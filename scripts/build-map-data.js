const topojson = require('topojson-client');
const d3Geo = require('d3-geo');
const fs = require('fs');
const path = require('path');
const world = require('world-atlas/countries-110m.json');
const land = topojson.feature(world, world.objects.land);

const minLon = 28, maxLon = 82;
const minLat = 8, maxLat = 40;
const step = 0.85;

const points = [];
for (let lat = minLat; lat <= maxLat; lat += step) {
  for (let lon = minLon; lon <= maxLon; lon += step) {
    if (d3Geo.geoContains(land, [lon, lat])) {
      const nx = (lon - minLon) / (maxLon - minLon);
      const ny = 1 - (lat - minLat) / (maxLat - minLat);
      points.push([Number(nx.toFixed(4)), Number(ny.toFixed(4))]);
    }
  }
}

function projectHub(lon, lat) {
  const nx = (lon - minLon) / (maxLon - minLon);
  const ny = 1 - (lat - minLat) / (maxLat - minLat);
  return [Number(nx.toFixed(4)), Number(ny.toFixed(4))];
}

const hubs = [
  {
    name: 'Sargodha',
    country: 'Pakistan',
    coords: [72.67, 32.08],
    normalized: projectHub(72.67, 32.08),
    role: 'Studio Origin / Engine',
    isOrigin: true
  },
  {
    name: 'Dammam',
    country: 'Saudi Arabia',
    coords: [50.10, 26.43],
    normalized: projectHub(50.10, 26.43),
    role: 'Heavy Machinery & Fleet Portals',
    isOrigin: false
  },
  {
    name: 'Jeddah',
    country: 'Saudi Arabia',
    coords: [39.19, 21.49],
    normalized: projectHub(39.19, 21.49),
    role: 'Enterprise Commerce',
    isOrigin: false
  },
  {
    name: 'Dubai',
    country: 'UAE',
    coords: [55.27, 25.20],
    normalized: projectHub(55.27, 25.20),
    role: 'Technical Contracting & Services',
    isOrigin: false
  }
];

const tsContent = `// Auto-generated regional dot-matrix map data (Lon ${minLon}-${maxLon}, Lat ${minLat}-${maxLat})
// Sourced from world-atlas 110m land polygons via d3-geo
export interface MapHub {
  name: string;
  country: string;
  coords: [number, number];
  normalized: [number, number];
  role: string;
  isOrigin: boolean;
}

export const REGIONAL_BOUNDS = {
  minLon: ${minLon},
  maxLon: ${maxLon},
  minLat: ${minLat},
  maxLat: ${maxLat},
};

export const REGIONAL_HUBS: MapHub[] = ${JSON.stringify(hubs, null, 2)};

export const REGIONAL_LAND_DOTS: [number, number][] = ${JSON.stringify(points)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/regionalMapData.ts'), tsContent);
console.log('✓ Wrote src/data/regionalMapData.ts with', points.length, 'points');
