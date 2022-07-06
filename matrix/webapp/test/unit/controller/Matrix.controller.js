/*global QUnit*/

sap.ui.define([
	"agroproductdemoapp/matrix/controller/Matrix.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Matrix Controller");

	QUnit.test("I should test the Matrix controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
