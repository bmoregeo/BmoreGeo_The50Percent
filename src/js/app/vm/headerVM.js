/**
 * Created with JetBrains WebStorm.
 * User: christopherfricke
 * Date: 2/15/14
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */
define(['knockout', 'app/config', 'jquery'], function(ko, config, $) {
    return function header() {
        var self = this
        this.title = ko.observable(config.title)
        this.map_search = ko.observable(config.default_search)
        this.template = ko.observable("header")
    }
})