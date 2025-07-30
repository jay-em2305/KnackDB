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
