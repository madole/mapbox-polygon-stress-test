import React from 'react'
import './App.css'
import Mapbox from "./MapboxMap";
import Polygons from "./Polygons";

const API_KEY = import.meta.env.VITE_MAPBOX_KEY as string;

const AUSTRALIA_BOUNDING_BOX = [[113.338953078, -43.6345972634], [153.569469029, -10.6681857235]]
const CENTER_OF_AUSTRALIA = [133.7751, -25.2744] as [number, number]

function App() {

    return (
        <div className="App">
            <Mapbox apiKey={API_KEY} center={CENTER_OF_AUSTRALIA} zoom={4}>
                <Polygons boundingBox={AUSTRALIA_BOUNDING_BOX.flat()}/>
            </Mapbox>
        </div>
    )
}

export default App
