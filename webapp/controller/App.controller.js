sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Log, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("opensap.movies.controller.App", {
		onInit: function () {
			Log.info("Controller has been initialized");
		},

		onExit: function () {
			Log.info("Controller will shortly be destroyed");
		},

		onBeforeRendering: function () {
			Log.info("The view will shortly be rendered");
		},

		onAfterRendering: function () {
			Log.info("The view has been rendered");
		},

		onPress: function (sMessage) {
			sap.ui.require(["sap/m/MessageToast"], function(MessageToast) {
				var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
				MessageToast.show(oResourceBundle.getText("search") + sMessage );
			}.bind(this));
			var sCity = this.byId('city').getValue();
			var sGenre = this.byId('genre').getSelectedItem().getKey();
			var oCalendar = this.byId('calendar');
			var oRowBinding = oCalendar.getBinding("rows");
			var oFilterGenre;
			var oFilterCity;

			oFilterGenre = sGenre ? new Filter("genre", FilterOperator.EQ, sGenre) : null;
			oFilterCity = sCity ? new Filter("info", FilterOperator.Contains, sCity) : null;
			oRowBinding.filter(oFilterGenre);

			var aRows = oCalendar.getAggregation("rows");
			aRows.forEach(function (oItem) {
				var oAppointsmentsBinding = oItem.getBinding("appointments");
				oAppointsmentsBinding.filter(oFilterCity);
			});
		},

		formatter: formatter
	});
});
