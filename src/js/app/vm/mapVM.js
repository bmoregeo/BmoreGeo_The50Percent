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
        self.operationalLayers = ko.observableArray();

        self.createLayer = function(layerInfo){
            // Create a layer of open streetmap tile layer
            var layerFunction = function(type){
                return type === 'tile' ?  L.TileLayer :
                    type === 'wms' ? L.TileLayer.WMS :
                    type === 'canvas' ? L.TileLayer.Canvas :
                    L.geoJson;
            }(layerInfo.type);

            return new layerFunction(layerInfo.data, layerInfo.settings);

        };

        self.operationalLayers.subscribe(function(changes){
            for (var i = 0; i < changes.length; i++){
                if (changes[i].status === 'added'){
                    map.mapInstance.addLayer(changes[i].value);
                } else if (changes[i].status === 'deleted'){
                    map.mapInstance.removeLayer(changes[i].value);
                }
            }
            console.log(changes);
        }, null, "arrayChange");


        self.basemap = ko.observable();
        self.basemap.subscribe(function(changes) {
            map.mapInstance.addLayer(changes[0].value);
        });

        self.center = ko.observable();
        self.center.subscribe(function(changes){map.mapInstance.panTo(changes[0].value)});

        self.zoom = ko.observable();
        self.zoom.subscribe(function(changes){map.mapInstance.setZoom(changes[0].value)});



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