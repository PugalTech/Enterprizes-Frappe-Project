# Copyright (c) 2025, New and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Design(Document):
	# pass
    def after_insert(self):
        if self.enquiry_no:
            frappe.db.set_value('Enquiry', self.enquiry_no, 'design_status', 'Design Completed')

    def on_update(self):
        if self.enquiry_no:
            frappe.db.set_value('Enquiry', self.enquiry_no, 'design_status', 'Design Completed')

    def on_trash(self):
        if self.enquiry_no:
            frappe.db.set_value('Enquiry', self.enquiry_no, 'design_status', 'Design Pending')
