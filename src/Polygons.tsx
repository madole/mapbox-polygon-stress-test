import React, {useEffect} from 'react';
import {useMapboxMap} from "./MapboxMap";
import generatePolygons from "./generate-polygons";
import {useControls} from "leva";

interface Props {
    boundingBox: number[],
    numberOfPolygons: number,
    numberOfVertices: number,
}

const Polygons: React.VFC<Props> = ({boundingBox, numberOfPolygons, numberOfVertices}) => {
    const map = useMapboxMap()
    useEffect(() => {
        const polygons = generatePolygons(numberOfPolygons, numberOfVertices, boundingBox)
        map.addSource('polygons', {
            'type': 'geojson',
            'data': polygons
        })
        map.addLayer({
            'id': 'polys',
            'type': 'fill',
            'source': 'polygons',
            'paint': {
                'fill-color': 'red',
                'fill-opacity': 1
            },
            'filter': ['==', '$type', 'Polygon']
        });
        // add outline layer
        map.addLayer({
            'id': 'polys-outline',
            'type': 'line',
            'source': 'polygons',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#fff',
                'line-width': 2
            },
            'filter': ['==', '$type', 'Polygon']
        });
        return () => {
            map.removeLayer('polys')
            map.removeLayer('polys-outline')
            map.removeSource('polygons')
        }
    }, [numberOfPolygons, numberOfVertices, boundingBox]);

    return null;
};

export default (props: {boundingBox: number[]}) => {
    const values = useControls('Polygon configuration', {
        numberOfPolygons: {
            value: 10,
            min: 1,
            max: 10000,
            step: 10
        },
        numberOfVertices: {
            value: 10,
            min: 10,
            max: 200,
            step: 10
        },
    })
    return <Polygons
        key={`${values.numberOfPolygons}-${values.numberOfVertices}`}
        boundingBox={props.boundingBox}
        numberOfPolygons={values.numberOfPolygons}
        numberOfVertices={values.numberOfVertices}
    />
}
