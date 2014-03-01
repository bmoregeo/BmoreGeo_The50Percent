/**
 * Created with JetBrains WebStorm.
 * User: christopherfricke
 * Date: 2/15/14
 * Time: 10:11 AM
 * To change this template use File | Settings | File Templates.
 */
define(["jquery", "knockout", "app/vm/headerVM", "app/vm/legendVM", "app/vm/mapVM", 'app/model/map','app/config'],
    function($, ko, headerVM, legendVM, mapVM, map, config) {
        $(function() {
            header = new headerVM();
            legend = new legendVM();
            mapVM.init();

            ko.applyBindings(header, $('#main')[0]);
            ko.applyBindings(legend, $('#legend')[0]);
            ko.applyBindings(mapVM, $('#map')[0]);

            legend.legendItems.push({className:"example 1", classColor:'#FF0000'});
            legend.legendItems.push({className:"example 2", classColor:'#00FF00'});
            legend.legendItems.push({className:"example 3", classColor:'#0000FF'});


        });
    });