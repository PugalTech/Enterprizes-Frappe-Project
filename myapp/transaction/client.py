from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


	
@frappe.whitelist()
def get_enquiry_details(name):
    item = frappe.db.sql("select name,product,product_type,brand,style,size,met_size,colour,sum(qty) as qty from (select tm.name,tm.product,tm.product_type,tm.brand,tx.style,tx.size,tx.met_size,tx.colour,nvl(tx.qty,0) as qty from `tabEnquiry` tm left join `tabEnquiry Details` tx on tm.name=tx.parent  union ALL select tm.enquiry_no as name,tm.product,tm.product_type,tm.brand,tx.style,tx.size,tx.met_size,tx.colour,nvl(-tx.qty,0) as qty from `tabDesign` tm left join `tabDesign Details` tx on tm.name=tx.parent) as x where name=%(string1)s group by name,product,product_type,brand,style,size,met_size,colour having sum(qty)>0",{'string1': name}, as_dict=1)

    return item	
	
@frappe.whitelist()
def get_design_details(name):
    item = frappe.db.sql("select x.name,x.product,x.product_type,x.brand,x.style,x.size,x.met_size,x.colour,y.gst_per,sum(x.qty) as qty from (select tm.enquiry_no as name,tm.product,tm.product_type,tm.brand,tx.style,tx.size,tx.met_size,tx.colour,nvl(tx.qty,0) as qty from `tabDesign` tm left join `tabDesign Details` tx on tm.name=tx.parent union ALL select tm.enquiry_no as name,tm.product,tm.product_type,tm.brand,tx.style,tx.size,tx.met_size,tx.colour,nvl(-tx.qty,0) as qty from `tabSales Order` tm left join `tabSales Order Details` tx on tm.name=tx.parent) as x left join `tabProducts` y on x.product=y.name where x.name=%(string1)s group by x.name,x.product,x.product_type,x.brand,x.style,x.size,x.met_size,x.colour having sum(qty)>0",{'string1': name}, as_dict=1)

    return item