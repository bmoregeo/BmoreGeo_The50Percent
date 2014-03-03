/**
 * Created with JetBrains WebStorm.
 * User: christopherfricke
 * Date: 2/15/14
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */

define(['knockout', 'app/config', 'jquery', 'app/model/map'], function(ko, config, $, map) {
    var mapVM = new function () {
        var self = this;

        self._basemap = ko.observable();
        self._center = ko.observable();
        self._zoom = ko.observable();

        /** * Create a leaflet layer
         @param {Object} layerInfo - config settings including data, layer settings, and type
         to generate a leaflet layer
         @return {Object} - Leaflet Layer Object
         */
        self.createLayer = function(layerInfo){
            var layerFunction = function(type){
                return type === 'tile' ?  L.TileLayer :
                    type === 'wms' ? L.TileLayer.WMS :
                    type === 'canvas' ? L.TileLayer.Canvas :
                    L.geoJson;
            }(layerInfo.type);

            return new layerFunction(layerInfo.data, layerInfo.settings);

        };

        /** * Operational Layers array
         *
         * @param {Object} operationalLayer - Operational Layer Configuration
         */
        self.operationalLayers = ko.observableArray();
        /** * Operational layer subscribable adds or deletes a layer in the map object when it gets
         *      updated in the operationalLayer array
         */
        self.operationalLayers.subscribe(function(changes){
            for (var i = 0; i < changes.length; i++){
                if (changes[i].status === 'added'){
                    map.mapInstance.addLayer(changes[i].value);
                } else if (changes[i].status === 'deleted'){
                    map.mapInstance.removeLayer(changes[i].value);
                }
            }
        }, null, "arrayChange");

        /** * Basemap Layer
         *
         * @param {Object} basemap - Basemap Layer Configuration
         */
        self.basemap = ko.observable();
        /** * Basemap subscribable defines the basemap layer in the map object.
         */
        self.basemap.subscribe(function(value) {
            map.mapInstance.addLayer(self.createLayer(value));
        });

        /** * Map Center coordinates
         *
         * @param {Object} center - Longitude and latitude object
         */
        self.center = ko.observable();
        /** * center subscribable defines the center of the map object.
         */
        self.center.subscribe(function(changes){map.mapInstance.panTo(changes.value)});

        /** * Map Zoom Level
         *
         * @param {int} zoom - Zoom level of map view
         */
        self.zoom = ko.observable();
        /** * zoom subscribable defines the Zoom level of the map object.
         */
        self.zoom.subscribe(function(changes){map.mapInstance.setZoom(changes.value)});


        /** * Initializes the map object and view
         *
         */
        self.init = function () {
            map.mapInstance.setView(config.map.initialCenter,
                                    config.map.initialZoom);
            /* Add Basemap Layer from Config */
            self.basemap(config.map.basemap);

            /* Add Operational Layers from Config*/
            for (var i = 0; i < config.map.operationalLayers.length; i++){
                var operationalLayer = config.map.operationalLayers[i];
                $.ajax({
                    url: config.map.operationalLayers[i].url,
                    success: function (data){
                        operationalLayer.data = data;
                        var mapLayer = self.createLayer(operationalLayer);
                        self.operationalLayers.push(mapLayer);
                    },
                    fail: function (jqXHR, textStatus, errorThrown){
                        console.log(textStatus);
                    }
                });
            }
        }
    };
    return mapVM;
});