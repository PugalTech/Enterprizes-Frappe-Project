// Copyright (c) 2025, New and contributors
// For license information, please see license.txt

frappe.ui.form.on('Enquiry', {
	refresh: function(frm) {
				 if (!frm.doc.__islocal) {
			   // alert(2)
        frappe.call({
            method: "myapp.transaction.client.get_enquiry_details",
            args: { "name": frm.doc.name },
            callback: function(r) {
                if (!r.exc && r.message && r.message.length >0) {
					// alert(1)
             
				if(frm.doc.workflow_state == "Approved"){
				frm.add_custom_button(__('Create Design'), function(){
			frappe.route_options = {
				"naming_series": "DGN.-.###",
				"product":frm.doc.product,
				"product_type":frm.doc.product_type,
				"brand":frm.doc.brand,
				"company":frm.doc.company,
				"enquiry_no":frm.doc.name,
				"type":frm.doc.type,
				"customer":frm.doc.customer,
				
			};
		frappe.set_route('Form','Design','new-design');
				}, );}
		}

                } 
            
        });
    }

	},
	"load":function(frm){
		calculate_total(frm);
	}
	
	
	
});
frappe.ui.form.on('Enquiry Details', {
	// refresh: function(frm) {

	// }
	"qty":function(frm,cdt,cdn){
		calculate_total(frm);
	}
	
	
});
var calculate_total = function(frm){
	var total=0;
	var dtls = frm.doc.deatils;
	for (var i in dtls){
		if (dtls[i].qty){
			total = total + Number(dtls[i].qty);
		}
		frm.set_value("total_qty",total);
	}
}