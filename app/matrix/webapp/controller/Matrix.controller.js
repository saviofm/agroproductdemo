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
                oModel.State.cdProduto.ValueStateText = this._getResourceBundle().getText("validationRequiredField");
                oModel.ID           = "";
                oModel.nomeProduto  = "";
                oModel.obsProduto   = "";
                oModel.Matrix.composicaoHeader = {};
                oModel.Matrix.composicaoItem   = {};
                oModel.Matrix.rows = 0;
                oModel.Matrix.visible = false;
            } else {
                oModel.State.cdProduto.ValueState     = sap.ui.core.ValueState.None;
                oModel.State.cdProduto.ValueStateText = "";
                oModel.ID           = "";
                oModel.nomeProduto  = "";
                oModel.obsProduto   = "";
                oModel.Matrix.composicaoHeader = {};
                oModel.Matrix.composicaoItem   = {};
                oModel.Matrix.rows = 0;
                oModel.Matrix.visible = false;
                this.onValueHelpRequestCdProduto(oEvent);
            }
            
            this.getModel("matrixView").refresh(true);
        },

        onPressCdProduct: async function(oEvent){
            let oObjectProdutos = oEvent.getParameters().selectedItems[0].getBindingContext().getObject(),
                oModel          = this.getModel("matrixView").getData();
            this.setAppBusy(true);
            oModel.ID = oObjectProdutos.ID;
            oModel.cdProduto   = oObjectProdutos.cdProduto;
            oModel.nomeProduto = oObjectProdutos.nomeProduto;
            oModel.obsProduto  = oObjectProdutos.obsProduto;
            oModel.State.cdProduto.ValueState     = sap.ui.core.ValueState.None;
            oModel.State.cdProduto.ValueStateText = "";

            await this._buildMatrix(oModel);
            //Buscar a function import de comparação
            this.getModel("matrixView").refresh(true);
            this.setAppBusy(false);
        },

        onCloseCdProduct: function(oEvent){
            
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
        _buildMatrix: async function(oModel){
            debugger;
            let oMatrix = await this._getMatrix(oModel.ID);
            if (oMatrix) {
                oModel.Matrix.composicaoHeader = oMatrix.composicaoHeader;
                oModel.Matrix.composicaoItem   = oMatrix.composicaoItem;
                oModel.Matrix.rows             = oMatrix.rows;
                oModel.Matrix.visible = true;
            }
        },
        
        _getMatrix: function(productID){
            return new Promise(
               (resolve)=>{
                    //Check if has already a schedule in the desiredDate
                    this.getModel().callFunction('/getMatrix', {
                        method: 'GET',
                        urlParameters: {
                            ID: productID
                        },
                        success: function(res) {
                            resolve(JSON.parse(res.getMatrix));
                        }.bind(this),
                        error: function(error) {
                            console.error(error);
                            resolve(false);
                        }.bind(this)
                    })
                }
            );
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
