sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function(JSONModel) {
	"use strict";
    return {	
      initModel: function() {
        return {
          ID: "",
          cdProduto: "",
          nomeProduto: "",
          obsProduto: "",
          Matrix: {
            visible: false,
            composicaoHeader: {},
            composicaoItem: {}
          },
          State: {
            cdProduto: {
              Enabled: true,
              Visible: true,
              ValueState: sap.ui.core.ValueState.None,
              ValueStateText: ""
            },
            nomeProduto: {
              Enabled: true,
              Visible: true,
              ValueState: sap.ui.core.ValueState.None,
              ValueStateText: ""
            },            
            obsProduto: {
              Enabled: true,
              Visible: true,
              ValueState: sap.ui.core.ValueState.None,
              ValueStateText: ""
            }
          }
        };
      }
    };
  }
);