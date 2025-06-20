from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

@frappe.whitelist()
def get_previous_colour_code():
    item = frappe.db.sql("select nvl(code,0)+1 as code from `tabColour` order by creation desc limit 1;", as_dict=1)

    return item