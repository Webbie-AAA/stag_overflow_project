import React, { useEffect } from "react";
import "./SightingMap.css";

import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";

import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";

export default function SightingMap({ mapId, latitude, longitude }) {
  useEffect(() => {
    const marker = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    });

    const map = new Map({
      target: mapId,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [marker],
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 13,
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, [mapId, latitude, longitude]);

  return (
    <div id={mapId} className="sighting-map">
      {}
    </div>
  );
}
