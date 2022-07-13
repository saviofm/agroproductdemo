sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "../model/mMatrix",
    "sap/ui/core/Fragment",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    "sap/m/Text",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller, UIComponent, mMatrix, Fragment, Filter, FilterOperator, Text, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("agroproductdemo.app.matrixparam.controller.Matrix", {
        onInit: function () {
            UIComponent.getRouterFor(this).getRoute("RouteMatrix").attachPatternMatched(this._onObjectMatched.bind(this), this);        
        },

        _onObjectMatched: function() {
            this.getModel("matrixParamView").setData(mMatrix.initModel());
            this.getModel("matrixParamView").refresh(true);
        },
        /**
        * Convenience method to define the busy State
        * @public
         @param {Boolean} bBusy Busy State 
        */
        setAppBusy: function(bBusy) {
        this.getModel("appView").setProperty("/busy", bBusy);
        },
        
        /**
         * Convenience method for getting the view model by name.
         * @public
         * @param {string} [sName] the model name
         * @returns {sap.ui.model.Model} the model instance
         */
        getModel : function (sName) {
            return this.getView().getModel(sName);
        },

        /**
         * Convenience method for setting the view model.
         * @public
         * @param {sap.ui.model.Model} oModel the model instance
         * @param {string} sName the model name
         * @returns {sap.ui.mvc.View} the view instance
         */
        setModel : function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },            
        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        onPress: function (oEvent){
            MessageBox.success("Execução do algorítmo iniciada");
        },


        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */
                /**
         * Getter for the resource bundle.
         * @public
         * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
         */
        _getResourceBundle : function () {
            return this.getModel("i18n").getResourceBundle();
        },
        _filtersTableProdutos: function(sValue){
            return new Filter({
                and: false,
                filters: [
                    new Filter("cdProduto",      FilterOperator.Contains, sValue),
                    new Filter("nomeProduto",    FilterOperator.Contains, sValue),
                    new Filter("obsProduto",     FilterOperator.Contains, sValue)
                ]
            })
        },

    });
});
