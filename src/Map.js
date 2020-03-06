import React from 'react';
import { loadModules, loadCss } from 'esri-loader';
import './Map.css';

export default class Map extends React.Component {

    view = null;

    options = {
        dojoConfig: {
            locale: 'en',
            has: { 'csp-restrictions': true },
        },
    };

    componentDidMount() {
        this.initEsriAPI(() => {
            this.createMap();
        });
    }

    componentWillUnmount() {
        if (this.view) {
            // destroy the map view
            this.view.container = null;
        }
    }

    initEsriAPI = callback => {
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic'], this.options)
            .then(esriLoadedModules => {
                this.createMap(esriLoadedModules[0], esriLoadedModules[1], esriLoadedModules[2]);
            })
            .catch(err => console.error(err));
        loadCss('https://js.arcgis.com/4.14/esri/themes/light/main.css');
    };

    createMap = (Map, MapView, Graphic) => {
        const map = new Map({
            basemap: 'topo-vector'
        });

        this.view = new MapView({
            container: 'view',
            map: map,
            center: [54, 24],
            zoom: 8
        });

        var pointGraphic1 = new Graphic({
            geometry: {
                type: "point", // autocasts as new Point()
                longitude: 54, // New York City
                latitude: 24,
            },
            attributes: {
                OBJECTID: 0
            },
            // symbol: {
            //     type: 'simple-marker',
            //     color: 'red',
            // }
        });


        this.view.graphics.addMany([pointGraphic1]);
    }

    render() {
        return (
            <div id="view" className="webmap" />
        );
    }
}