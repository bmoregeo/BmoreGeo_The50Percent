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

        self.basemap = ko.computed({
            read: function () {
                return self._basemap;
            },
            write: function (value) {
                self._basemap = value;
                map.addLayer(value);
            },
            owner: self
        });

        self.center = ko.computed({
            read: function () {
                return self._center;
            },
            write: function (value) {
                self._center = value;
                map.mapInstance.panTo(value);
            },
            owner: self
        });

        self.zoom = ko.computed({
            read: function () {
                return self._zoom;
            },
            write: function (value) {
                self._zoom = value;
                map.mapInstance.setZoom(zoom);
            },
            owner: self
        });



        self.init = function () {
            map.mapInstance.setView(config.map.initialCenter,
                                    config.map.initialZoom);


            /*
              Add Operational Layers
            */
            operationalLayers = config.map.operationalLayers;
            for (var i = 0; i < operationalLayers.length; i++){
                var operationalLayer = operationalLayers[i];

                $.ajax({
                    url: operationalLayers[i].url,
                    success: function (data){
                        operationalLayer.data = data;
                        map.addLayer(operationalLayer);
                    },
                    fail: function (jqXHR, textStatus, errorThrown){console.log(textStatus);}
                });
            }
        }
    };
    return mapVM;
});