// Copyright (c) 2025, New and contributors
// For license information, please see license.txt

frappe.ui.form.on('Colour', {
	// refresh: function(frm) {
		// alert(frm.doc.code);
		// alert(frm.doc.colour_name);
	// },
	onload : function(frm){
		if (frm.is_new()){
		frappe.call({
			method: "myapp.masters.client.get_previous_colour_code",
			callback: function(r) {
			// console.log(r.message[0])
			if(!r.exc && r.message) {
				var company = r.message[0];

				
				cur_frm.set_value("code",company['code'] );


			   }

		      }
      })
		}
	}
});
