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
            addLayer: function(layerInfo){
                // Create a layer of open streetmap tile layer
                var layerFunction = function(type){
                     return type === 'tile' ?  L.TileLayer :
                         type === 'wms' ? L.TileLayer.WMS :
                         type === 'canvas' ? L.TileLayer.Canvas :
                         L.geoJson;
                }(layerInfo.type);

                var mapLayer = new layerFunction(layerInfo.url, layerInfo.settings);
                this.mapInstance.addLayer(mapLayer)
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