// dialect-polygons.js
// GeoJSON dialect region polygons for the map page

const dialectPolygons = {
  "type": "FeatureCollection",
  "features": [

    {
      "type": "Feature",
      "properties": {
        "id": "akchin",
        "name": "Ak-Chin"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-112.25, 33.20],
          [-111.90, 33.20],
          [-111.90, 32.85],
          [-112.25, 32.85],
          [-112.25, 33.20]
        ]]
      }
    },

    {
      "type": "Feature",
      "properties": {
        "id": "stanfield",
        "name": "Stanfield"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-112.05, 33.00],
          [-111.75, 33.00],
          [-111.75, 32.75],
          [-112.05, 32.75],
          [-112.05, 33.00]
        ]]
      }
    }

  ]
};
