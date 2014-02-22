/**
 * Created with JetBrains WebStorm.
 * User: christopherfricke
 * Date: 10/19/13
 * Time: 9:38 AM
 * To change this template use File | Settings | File Templates.
 */
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app": "../app",
        "jquery": "jquery-2.0.3.min",
        "knockout":"knockout-2.3.0",
        "leaflet": "leaflet/leaflet"
    },
    shim: {
        "leaflet": {exports: "L"}
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);