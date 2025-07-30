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

| Knack Field     | Xano Field                  |
| --------------- | --------------------------- |
| `field_25`      | `uen`                       |
| `field_26`      | `internal_reference_number` |
| `field_29`      | `status`                    |
| `field_49`      | `company_name`              |
| `field_71`      | ❗️ No equivalent           |
| `field_72`      | ❗️ No equivalent           |
| `field_73`      | ❗️ No equivalent           |
| `field_107`     | ❗️ No equivalent           |
| `field_163`     | ❗️ No equivalent           |
| `field_177`     | ❗️ No equivalent           |
| `field_178`     | `financial_year_end`        |
| `field_179`     | `incorporation_date`        |
| `field_180`     | `common_seal_number`        |
| `field_181`     | ❗️ No equivalent           |
| `field_182`     | `nominee_director`          |
| `field_183_raw` | `services_rendered`         |
| `field_525`     | `formerly_known_as`         |
| `field_559`     | ❗️ No equivalent           |
| `field_563`     | `current_fye`               |
| `field_564`     | ❗️ No equivalent           |
| `field_1685`    | `created_at`                |
| `field_28`      | ❗️ No equivalent           |
| `field_1900`    | `group`                     |

📇 Contact Entity

| Knack Field              | Xano Field                  |
| ------------------------ | --------------------------- |
| `field_275`              | `fullname`                  |
| `field_338`              | `type`                      |
| `field_335`              | `company_name_directclient` |
| `field_337`              | `created_at`                |
| `field_330`              | `email`                     |
| `field_332`, `field_333` | `phone_number`              |
| `field_1684`             | `emergency_contact`         |

📝 Notes
Fields without a direct match (❗️) must be handled manually or added as custom fields in Xano if needed.
Use safe() and data cleaning methods when sending from Knack to avoid empty or malformed values.
Consider consolidating unmatched fields if they serve related purposes (e.g., scanning instructions).
