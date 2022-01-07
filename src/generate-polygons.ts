import {randomPolygon} from "@turf/random";

function generatePolygons(numberOfPolygons: number, numberOfVertices: number, boundingBox: number[]) {
    return randomPolygon(numberOfPolygons, {num_vertices: numberOfVertices, bbox: boundingBox as any, max_radial_length: 2});
}


export default generatePolygons;
