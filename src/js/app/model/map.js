/**
 * Created with JetBrains WebStorm.
 * User: christopherfricke
 * Date: 2/15/14
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */

(function () {

    "use strict";
    define(['Leaflet', 'app/config'], function(L, config) {
        var instance = null;

        function MapModel() {
            var self = this;
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one MapModel, use MapModel.getInstance()");
            }

            this.mapInstance = null;
            this.mapLayers = [];
            this.initialize();


        }

        MapModel.prototype = {
            initialize: function(){
                this.createMap();
            },
            createMap: function() {

                this.mapInstance = L.map('mapview').setView(config.map.initialCenter,
                                                            config.map.initialZoom);


                // Create a layer of open streetmap tile layer
                var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                var osmAttrib='Map data © OpenStreetMap contributors';
                var osm = new L.TileLayer(osmUrl, {minZoom: 2,
                                                   maxZoom: 21,
                                                   attribution: osmAttrib});
                // add tiles to the map
                this.mapInstance.addLayer(osm);

                console.log('Map Created');
            }

        };

        MapModel.getInstance = function () {
            // summary:
            //      Gets an instance of the singleton
            if (instance === null) {
                instance = new MapModel();
            }
            return instance;
        };

        return MapModel.getInstance();
    });
} ());