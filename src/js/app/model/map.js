/**
 * Created with JetBrains WebStorm.
 * User: christopherfricke
 * Date: 2/15/14
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */

(function () {

    "use strict";
    define(['leaflet', 'app/config'], function(L, config) {
        var instance = null;

        function MapModel() {
            var self = this;
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one MapModel, use MapModel.getInstance()");
            }
            this.mapInstance = null;
            this.initialize();
        }

        MapModel.prototype = {
            initialize: function(){
                this.createMap();
            },
            createMap: function() {
                // Create a leaflet map on mapview object!
                this.mapInstance = L.map('mapview');
            },
            basemap: function(basemap_url, basemap_attribution){
                // Create a layer of open streetmap tile layer
                var osmUrl= basemap_url;
                var osmAttrib= basemap_attribution;
                var osm = new L.TileLayer(osmUrl, {minZoom: 2,
                    maxZoom: 21,
                    attribution: osmAttrib});
                this.addLayer(osm)
            },

            addLayer: function(layer){
                this.mapInstance.addLayer(layer);
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