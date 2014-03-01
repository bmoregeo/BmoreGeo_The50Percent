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

        var

        self.init = function () {
            map.mapInstance.setView(config.map.initialCenter,
                                    config.map.initialZoom);
            /*
              Add Basemap Layer
            */
            map.addLayer(config.map.baseMap);

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