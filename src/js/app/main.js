/**
 * Created with JetBrains WebStorm.
 * User: christopherfricke
 * Date: 2/15/14
 * Time: 10:11 AM
 * To change this template use File | Settings | File Templates.
 */
define(["jquery","knockout", "app/vm/headerVM", "app/vm/optionsVM", "app/vm/mapVM"],
    function($, ko, headerVM, optionsVM, mapVM) {
        $(function() {
            header = new headerVM();
            options = new optionsVM();

            ko.applyBindings(header, $('#main')[0]);
            ko.applyBindings(options, $('#options')[0]);

            console.log(mapVM.init);
            mapVM.init();
            ko.applyBindings(mapVM, $('#map')[0]);

        });

    });