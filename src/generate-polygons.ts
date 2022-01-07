import {randomPolygon} from "@turf/random";

function generatePolygons(numberOfPolygons: number, numberOfVertcies: number, boundingBox: number[]) {
    return randomPolygon(numberOfPolygons, {num_vertices: numberOfVertcies, bbox: boundingBox, max_radial_length: 2});
}


export default generatePolygons;
