/**
 * Created with JetBrains WebStorm.
 * User: christopherfricke
 * Date: 2/15/14
 * Time: 10:24 AM
 * To change this template use File | Settings | File Templates.
 */
define([], function() {
    return {
        "title": "The 50 Percent",
        "default_search": "New York",
        "map": {
            "initialCenter":[40, -77],     // Y,X
            "initialZoom": 5,           // 1 (small) - 18 (big),
            "baseMap":{
                "url": "https://a.tiles.mapbox.com/v3/mapbox.world-print/{z}/{x}/{y}.png",
                "settings": {
                    "attribution": "Map data © OpenStreetMap contributors",
                    "minZoom": 2,
                    "maxZoom": 21
                },
                "type": "tile"
            }
        }
    }
});