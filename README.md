🔗 Knack ↔ Xano Integration (RO Client)

1. Add RO Client
   Location: Work Panel > RO Panel > Add RO Client
   Event: knack-record-create.view_3
   Action: Sends new client data to Xano.
   API Request
   Method: POST
   Endpoint: /end_clients

2. Edit Client Entity
   Location: Databases > Client Databases > Entity Details > Edit Client Entity
   Event: knack-record-update.view_1907
   Action: Updates existing client data in Xano.
   API Request
   Method: PATCH
   Endpoint: /end_clients/{end_clients_name}

🔗 Knack → Xano: Contacts Integration 3. Add Contact
Location: Sec Panel > Add Contact
Trigger: knack-record-create.view_707
Method: POST
Endpoint: /contacts

4. Edit Contact (Sec Panel)
   Location: Sec Panel > Edit Contact
   Trigger: knack-record-update.view_817
   Method: PATCH
   Endpoint: /contacts/{contact_name}

5. Update Contact (Database Panel)
   Location: Database > Edit Contacts DB
   Trigger: knack-record-update.view_801
   Method: PUT
   Endpoint: /contacts/{contacts_name}

📝 Notes
safe() is used to clean empty strings before sending to Xano.
Phone numbers and emails are extracted from <a> tags using regex.
filter(Boolean) ensures empty/null values are removed from arrays.
last_updated_at is generated using new Date().toISOString().
All requests include proper Authorization and Content-Type headers.

✅ Recommendations
🔐 Use unique IDs (not names) in endpoints to avoid update conflicts.
🛡️ Validate inputs in Xano for required fields and formats.
🔁 Debounce or prevent duplicate submissions in Knack when needed.
🔍 Log responses and errors for debugging and monitoring.
📬 Normalize emails and phone numbers for consistency.

👤 Client Entity
This maps fields and names between Knack and Xano.
❗️ = No equivalent in Xano (may need custom handling or ignored).

| Knack Field     | Field Name                     | Xano Field                    |
| --------------- | ------------------------------ | ----------------------------- |
| `field_25`      | UEN                            | `uen`                         |
| `field_26`      | Internal Ref No                | `internal_reference_number`   |
| `field_29`      | Live Status                    | `status`                      |
| `field_49`      | Company Name                   | `company_name`                |
| `field_71`      | Scanning Instruction           | ❗️ No equivalent             |
| `field_72`      | Special Mail Forwarding Instrc | ❗️ No equivalent             |
| `field_73`      | Special Mail Scanning Instrc   | ❗️ No equivalent             |
| `field_107`     | Forwarding Address             | ❗️ No equivalent             |
| `field_163`     | Forwarding Instruction         | ❗️ No equivalent             |
| `field_177`     | Entity Type                    | ❗️ No equivalent             |
| `field_178`     | FYE                            | `financial_year_end`          |
| `field_179`     | Incorporation Date             | `incorporation_date`          |
| `field_180`     | Common Seal No                 | `common_seal_number`          |
| `field_181`     | Nominee Company Secretary      | ❗️ No equivalent             |
| `field_182`     | Nominee Director               | `nominee_director`            |
| `field_183_raw` | Services Rendered              | `services_rendered`           |
| `field_525`     | FKA (Formerly Known As)        | `formerly_known_as`           |
| `field_559`     | Other FYE                      | ❗️ No equivalent             |
| `field_563`     | Current FYE                    | `current_fye`                 |
| `field_564`     | Last AGM                       | `last_annual_general_meeting` |
| `field_1685`    | Created Date                   | `created_at`                  |
| `field_28`      | Client Group                   | ❗️ No equivalent             |
| `field_1900`    | Working Group                  | `group`                       |

📇 Contact Entity
| Knack Field | Field Name | Xano Field |
| ------------------------ | -------------------- | --------------------------- |
| `field_275` | Name | `fullname` |
| `field_338` | Type | `type` |
| `field_335` | Client Entity | `company_name_directclient` |
| `field_337` | Date Added | `created_at` |
| `field_330` | Email | `email` |
| `field_332`, `field_333` | Phone Numbers | `phone_number` |
| `field_1684` | Contact Display Name | `emergency_contact` |

📇 Tickets Table
| Knack Field | Field Name | Xano Field |
| ----------- | -------------------- | --------------------------- |
| `field_319` | Client entity | Merchant |
| `field_292` | staff | assignedto |
| `field_277` | BPO standing order | account_type |
| `field_280` | creation date | created_at |
| `field_293` | category | working_group |
| `field_282` | request description | description |
| `field_283` | status | status |
| `field_285` | conclusion notes | comments |
| `field_326`,| all transaction type | transaction type |
| `field_327`, |
| `field_328` |
| `field_615`, | Docu 1-5 | attachments |
| `field_616`, |
| `field_617`, |
| `field_618`, |
| `field_619` |
| `field_714` | BPO scores | client_satisfaction_score |

📝 Notes
Fields without a direct match (❗️) must be handled manually or added as custom fields in Xano if needed.
Use safe() and data cleaning methods when sending from Knack to avoid empty or malformed values.
Consider consolidating unmatched fields if they serve related purposes (e.g., scanning instructions).
