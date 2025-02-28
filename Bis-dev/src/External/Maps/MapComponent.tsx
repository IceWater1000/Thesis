import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Polygon } from "ol/geom";
import Feature from "ol/Feature";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { transform } from "ol/proj";
import "./Maps.css";
interface props {
  lookAtBorder: boolean;
}
const MapComponent: React.FC<props> = ({ lookAtBorder }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Define polygon coordinates in EPSG:4326 (longitude, latitude)
    // Starts from bottom right to top right
    const polygonCoords4326 = lookAtBorder
      ? [
          [125.441446, 12.14019],
          [125.441739, 12.141026],
          [125.441777, 12.141675],
          [125.440975, 12.141595],
          [125.440023, 12.142133],
          [125.439786, 12.141994],
          [125.439341, 12.140869],
        ]
      : [[], [], []];

    // Convert each coordinate to EPSG:3857 (meters)
    const polygonCoords3857 = polygonCoords4326.map((coord) =>
      transform(coord, "EPSG:4326", "EPSG:3857")
    );

    // Create a polygon feature
    const polygonFeature = new Feature({
      geometry: new Polygon([polygonCoords3857]),
    });

    // Style the polygon
    polygonFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "blue", // Border color
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.3)", // Transparent blue fill
        }),
      })
    );

    // Add polygon to vector layer
    const vectorSource = new VectorSource({
      features: [polygonFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Get center of the polygon for map view
    const center4326 = [125.440439, 12.140964]; // Approximate center
    const center3857 = transform(center4326, "EPSG:4326", "EPSG:3857");

    // Create the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer, // Add the polygon layer
      ],
      view: new View({
        center: center3857, // Center map on polygon
        zoom: 18,
      }),
    });

    return () => map.setTarget("");
  }, [lookAtBorder]);

  return (
    <div
      className="mapLayer"
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default MapComponent;
