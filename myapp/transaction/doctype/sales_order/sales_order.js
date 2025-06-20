// Copyright (c) 2025, New and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Order', {
	// refresh: function(frm) {

	// }
	
	
	
		"enquiry_no":function(frm){
		if (frm.doc.enquiry_no){
			frappe.call({
			method: "myapp.transaction.client.get_design_details",
			args: {	"name":frm.doc.enquiry_no },
			callback: function(r) {
			// console.log(r.message[0])
			if(!r.exc && r.message) {
				var company = r.message[0];

				
				cur_frm.set_value("product_type",company['product_type'] );
				cur_frm.set_value("product",company['product'] );
				cur_frm.set_value("brand",company['brand'] );
				// cur_frm.set_value("image1",company['image1'] );
				// cur_frm.set_value("image2",company['image2'] );
				// cur_frm.set_value("image3",company['image3'] );


			   }

		      }
      })
	  
	  frappe.call({
				method: "myapp.transaction.client.get_design_details",
				args: {"name": frm.doc.enquiry_no},
				callback: function(r) {
					// alert(1)
					if(!r.exc && r.message) {
						cur_frm.clear_table("deatils");
						for(var i=0; i< r.message.length; i++) {
							var d = frm.add_child("deatils");
							var item = r.message[i];
							for(var key in item) {
								if(!is_null(item[key])) {
									// alert(item['product_type'])
									if(key="product_type")d.product_type = item[key];
									if(key="product")d.product = item[key];
									if(key="size")d.size = item[key];
									if(key="colour")d.colour = item[key];
									if(key="qty")d.qty = item[key];
									if(key="style")d.style = item[key];
									if(key="brand")d.brand = item[key];
									if(key="met_size")d.met_size = item[key];
									if(key="gst_per")d.gst_per = item[key];
									// if(key="rate")d.rate = item[key];
									// if(key="amount")d.amount = item[key];
									
								}
							}
						}
						frm.refresh_field("deatils");
						calculate_total(frm);
					}
				}
			})
	  
		}
	}
	
	
});

frappe.ui.form.on('Sales Order Details', {
	
	"rate":function(frm,cdt,cdn){
		
		calculate_amt(frm,cdt,cdn);
		calculate_total(frm);
	},
	"discount":function(frm,cdt,cdn){
		calculate_amt(frm,cdt,cdn);
		calculate_total(frm);
	},
	
	
	});
	
	
var calculate_amt = function(frm,cdt,cdn){
	
	var child = locals[cdt][cdn];
	// alert(child.qty);
	if (child.qty){
	// alert(Number(child.qty)*Number(child.rate))
	frappe.model.set_value(cdt,cdn,"amount",Number(child.qty)*Number(child.rate));
	frappe.model.set_value(cdt,cdn,"after_dis_amt",Number(child.qty)*Number(child.rate));
	}
	if (child.discount){
		frappe.model.set_value(cdt,cdn,"after_dis_amt",(Number(child.qty)*Number(child.rate))-((Number(child.qty)*Number(child.rate))*child.discount*0.01));
	}
}


var calculate_total = function(frm){
	var dtls = frm.doc.deatils;
	var tot_qty = 0;
	var tot_amt = 0;
	var tot_dis_amt = 0;
	
	for (var i in dtls){
		tot_qty = tot_qty + Number(dtls[i].qty);
		tot_amt = tot_amt + Number(dtls[i].amount);
		tot_dis_amt = tot_dis_amt + Number(dtls[i].after_dis_amt);
		
	}
	frm.set_value("total_qty",tot_qty);
	frm.set_value("total_amount",tot_amt);
	frm.set_value("total_dis_amt",tot_dis_amt);
	
}