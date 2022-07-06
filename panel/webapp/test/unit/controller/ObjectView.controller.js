/*global QUnit*/

sap.ui.define([
	"comagroproductdemo/panel/controller/ObjectView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ObjectView Controller");

	QUnit.test("I should test the ObjectView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
