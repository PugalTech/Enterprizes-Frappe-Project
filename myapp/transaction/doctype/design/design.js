// Copyright (c) 2025, New and contributors
// For license information, please see license.txt

frappe.ui.form.on('Design', {
	refresh: function(frm) {
		 if (!frm.doc.__islocal) {
			   // alert(2)
        frappe.call({
            method: "myapp.transaction.client.get_design_details",
            args: { "name": frm.doc.enquiry_no },
            callback: function(r) {
                if (!r.exc && r.message && r.message.length >0) {
					// alert(1)
             
				if(frm.doc.workflow_state == "Approved"){
				frm.add_custom_button(__('Create Sales Order'), function(){
			frappe.route_options = {
				"naming_series": "SO.-.###",
				"product":frm.doc.product,
				"product_type":frm.doc.product_type,
				"brand":frm.doc.brand,
				"company":frm.doc.company,
				"enquiry_no":frm.doc.enquiry_no,
				"design_no":frm.doc.name,
				"type":frm.doc.type,
				"customer":frm.doc.customer,
				
			};
		frappe.set_route('Form','Sales Order','new-sales-order');
				}, );}
		}

                } 
            
        });
    }

	},
	
	"enquiry_no":function(frm){
		if (frm.doc.enquiry_no){
			frappe.call({
			method: "myapp.transaction.client.get_enquiry_details",
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
				method: "myapp.transaction.client.get_enquiry_details",
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
									// if(key="rate")d.rate = item[key];
									// if(key="amount")d.amount = item[key];
									
								}
							}
						}
						frm.refresh_field("deatils");
						cal_total(frm);
					}
				}
			})
	  
		}
	}
});
