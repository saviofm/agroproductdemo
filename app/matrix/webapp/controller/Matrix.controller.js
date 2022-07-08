sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "../model/mMatrix",
    "sap/ui/core/Fragment",
    'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller, UIComponent, mMatrix, Fragment, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("agroproductdemo.app.matrix.controller.Matrix", {
        onInit: function () {
            UIComponent.getRouterFor(this).getRoute("RouteMatrix").attachPatternMatched(this._onObjectMatched.bind(this), this);        
        },

        _onObjectMatched: function() {
            this.getModel("matrixView").setData(mMatrix.initModel());
            this.getModel("matrixView").refresh(true);
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

        onValueHelpRequestCdProduto: function(oEvent){
            let sInputValue = oEvent.getSource().getValue();
            
            this._oValueHelpCdProduto = null;

            this.getView().destroyDependents();

			this._oValueHelpDialogCdProduto = Fragment.load({
				id: this.getView().getId(),
				name: "agroproductdemo.app.matrix.view.fragments.SearchHelpCdProduto",
				controller: this
			}).then(function (oDialog) {
					this.getView().addDependent(oDialog);
                    
				return oDialog;
			}.bind(this));
			
            this._oValueHelpDialogCdProduto.then(
                function(oDialog){

                    oDialog.getBinding("items").filter(this._filtersTableProdutos(sInputValue));

                    oDialog.open(sInputValue);
                }.bind(this)
            );           
        },
        onSearchCdProduct: function(oEvent){
            let oTable   = this.byId("produtosTable"),
                oBinding = oTable.getBinding("items");

            if(oEvent.getParameters().refreshButtonPressed){
                oBinding.refresh(true);
            }else{
                let aTableSearchState = [];
                let sQuery 			  = oEvent.getParameter("value");

                if (sQuery && sQuery.length > 0) {
                    aTableSearchState = this._filtersTableProdutos(sQuery);
                }
                
                oBinding.filter(aTableSearchState, "Application");
            }
        },

        onChangeCdProduto: function(oEvent){
            let sInputValue = oEvent.getSource().getValue();
            let oModel      = this.getModel("matrixView").getData();
            //Check if is required

            if(!sInputValue) {
               
                oModel.State.cdProduto.ValueState     = sap.ui.core.ValueState.Error;
                oModel.State.cdProduto.ValueStateText = this.getResourceBundle().getText("validationRequiredField");
                oModel.ID           = "";
                oModel.nomeProduto  = "";
                oModel.obsProduto   = "";
            } else {
                oModel.State.cdProduto.ValueState     = sap.ui.core.ValueState.None;
                oModel.State.cdProduto.ValueStateText = "";
                oModel.ID           = "";
                oModel.nomeProduto  = "";
                oModel.obsProduto   = "";
                this.onValueHelpRequestCdProduto(oEvent);
            }
            
            this.getModel("matrixView").refresh(true);
        },

        onPressCdProduct: function(oEvent){
            let oObjectProdutos = oEvent.getParameters().selectedItems[0].getBindingContext().getObject(),
                oModel          = this.getModel("matrixView").getData();

            oModel.ID = oObjectProdutos.ID;
            oModel.cdProduto   = oObjectProdutos.cdProduto;
            oModel.nomeProduto = oObjectProdutos.nomeProduto;
            oModel.obsProduto  = oObjectProdutos.obsProduto;
            
            oModel.State.cdProduto.ValueState     = sap.ui.core.ValueState.None;
            oModel.State.cdProduto.ValueStateText = "";
            this.getModel("matrixView").refresh(true);
        },

        onCloseCdProduct: function(oEvent){},



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
