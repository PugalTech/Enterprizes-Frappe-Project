// Copyright (c) 2025, New and contributors
// For license information, please see license.txt

frappe.ui.form.on('Purchase Order', {
	// refresh: function(frm) {

	// }
	
});


frappe.ui.form.on('Purchase Order Details', {
	// refresh: function(frm) {

	// }
	
	"qty":function(frm,cdt,cdn){
		var child = locals[cdt][cdn];
		calculate_total(frm);
		frappe.model.set_value(cdt,cdn,"amount",child.qty*child.rate);
	}
	
});

var calculate_total = function(frm){
	var dtls = frm.doc.details;
	var tot_qty = 0;
	for (var i in dtls){
		tot_qty = tot_qty + Number(dtls[i].qty);
	}
	frm.set_value('total_qty',tot_qty);
}