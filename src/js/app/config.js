/**
 * Created with JetBrains WebStorm.
 * User: christopherfricke
 * Date: 2/15/14
 * Time: 10:24 AM
 * To change this template use File | Settings | File Templates.
 */
define([], function() {
    return {
        title: "The 50 Percent",
        default_search: "New York",
        map: {
            initialCenter:[39, -97],     // Y,X
            initialZoom: 4,           // 1 (small) - 18 (big),
            baseMap:{
                data: "https://a.tiles.mapbox.com/v3/mapbox.world-print/{z}/{x}/{y}.png",
                settings: {
                    attribution: "Map data © OpenStreetMap contributors",
                    minZoom: 2,
                    maxZoom: 21
                },
                type: "tile"
            },
            operationalLayers: [
                {
                    settings: {
                        style: function (feature) {
                            if (feature.properties.density < 5){
                                return {color: '#FF0000'}
                            }
                            else if (feature.properties.density < 10 && feature.properties.density >= 5) {
                                return {color: '#00FF00'}
                            }
                            else {
                                return {color: '#0000FF'}
                            }

                        },
                        onEachFeature: function (feature, layer) {
                            layer.bindPopup(feature.properties.name);
                        }
                    },
                    url:"http://localhost/~christopherfricke/The50Percent/js/data/states.json",
                    type:"geojson"
                }
            ]
        },
        legend: {
            title: 'Legend'
        }
    }
});