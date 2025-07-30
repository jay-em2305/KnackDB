/////////////////////////////////////////////////////////////////////////////////
/* SEc PANEL - ADD CONTACTS CLIENT - SAVE TO XANO */
/*Location: Sec Panel/ Tickets / Add Contact */
/////////////////////////////////////////////////////////////////////////////////

$(document).on('knack-record-create.view_707', function(event, view, record) {
    const safe = value => (value && value.trim() !== "" ? value : null);

    const name = String(record.field_275 || "");
    const type = String(record.field_338 || "");
    
    // Raw phone values
    const rawPhone332 = record.field_332;
    const rawPhone333 = record.field_333;

    // Extract plain phone numbers from <a> tags
    const cleanPhone332 = rawPhone332?.replace(/<[^>]+>/g, '').trim();
    const cleanPhone333 = rawPhone333?.replace(/<[^>]+>/g, '').trim();

    // Build phone_number array for Xano
    const phone_number = [cleanPhone332, cleanPhone333].filter(Boolean); // remove null/empty

    const rawEmail = record.field_330; 
    const extractedEmail = rawEmail?.match(/mailto:([^"]+)/)?.[1] || 
                        rawEmail?.replace(/<[^>]+>/g, '').trim() || null;
    const emailArray = extractedEmail ? [extractedEmail] : [];

    const contact_display = String(record.field_1684 || "")

    const formData = {
        fullname: safe(name),
        type: safe(type),
        phone_number: phone_number,
        email: emailArray,
        emergency_contact: safe(contact_display)
    };

    $.ajax({
        url: 'https://xpjg-p6rt-dhkq.s2.xano.io/api:silPPn_p/contacts',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer {{XANO-KNACK ACCESSTOKEN}}',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData),
        success: function(response) {
            console.log('data saved to the Platform App');
            //console.log('Response:', response);
        },
        error: function(xhr, status, error) {
            console.log(' Error:', error);
            //console.log('Status Code:', xhr.status);
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////
/* SEc PANEL - PATCH CONTACTS CLIENT - SAVE TO XANO */
/*Location: Sec Panel/ Tickets / Contact / Edit Contacts */
/////////////////////////////////////////////////////////////////////////////////
$(document).on('knack-record-update.view_817', function(event, view, record) {
    // Raw phone values
    const rawPhone332 = record.field_332;
    const rawPhone333 = record.field_333;
    // Extract plain phone numbers from <a> tags
    const cleanPhone332 = rawPhone332?.replace(/<[^>]+>/g, '').trim();
    const cleanPhone333 = rawPhone333?.replace(/<[^>]+>/g, '').trim();
    // Build phone_number array for Xano
    const phone_number = [cleanPhone332, cleanPhone333].filter(Boolean); // remove null/empty
     const contact_name = String(record.field_275 || "");
    const last_updated_at = new Date().toISOString(); 

    const formData = {
        contact_name:contact_name,
        last_updated_at:last_updated_at,
        phone_number: phone_number

    };
    $.ajax({
        url: `https://xpjg-p6rt-dhkq.s2.xano.io/api:silPPn_p/contacts/${contact_name}`, 
        type: 'PATCH',
        headers: {
            'Authorization': 'Bearer {{XANO-KNACK ACCESSTOKEN}}',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData),
        success: function(response) {
            console.log('data Update to the Platform App');
            //console.log('Response:', response);
            //alert('SUCCESS! Client record updated on Platform App');
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
            //console.log('Status Code:', xhr.status);
            console.log('Response:', xhr.responseText);
            //alert('Error: ' + xhr.status + ' - Check console for details');
        }
    });
});
/////////////////////////////////////////////////////////////////////////////////
/* DATABSE PANEL - PUT EDIT CONTACTS - SAVE TO XANO */
/*Location: Databases / Contacts Database login / Contact Database / Edit Contacts DB */
/////////////////////////////////////////////////////////////////////////////////
$(document).on('knack-record-update.view_801', function(event, view, record) {
    const safe = value => (value && value.trim() !== "" ? value : null);

    const name = String(record.field_275 || "");
    const type = String(record.field_338 || "");
    
    const contact_display = String(record.field_1684 || "")
    // Raw phone values
    const rawPhone332 = record.field_332;
    const rawPhone333 = record.field_333;
    // Extract plain phone numbers from <a> tags
    const cleanPhone332 = rawPhone332?.replace(/<[^>]+>/g, '').trim();
    const cleanPhone333 = rawPhone333?.replace(/<[^>]+>/g, '').trim();
    // Build phone_number array for Xano
    const phone_number = [cleanPhone332, cleanPhone333].filter(Boolean); // remove null/empty
     const contacts_name = String(record.field_275 || "");
    const last_updated_at = new Date().toISOString(); 
    const rawEmail = record.field_330; 
    const extractedEmail = rawEmail?.match(/mailto:([^"]+)/)?.[1] || 
                        rawEmail?.replace(/<[^>]+>/g, '').trim() || null;
    const emailArray = extractedEmail ? [extractedEmail] : [];
    const formData = {
        contacts_name:contacts_name,
        last_updated_at:last_updated_at,
        fullname: safe(name),
        type: safe(type),
        email: emailArray,
        emergency_contact: safe(contact_display),
        phone_number: phone_number

    };
    $.ajax({
        url: `https://xpjg-p6rt-dhkq.s2.xano.io/api:silPPn_p/contacts/${contacts_name}`, 
        type: 'PUT',
        headers: {
            'Authorization': 'Bearer {{XANO-KNACK ACCESSTOKEN}}',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData),
        success: function(response) {
            console.log('data Update to the Platform App');
            //console.log('Response:', response);
            //alert('SUCCESS! Client record updated on Platform App');
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
            //console.log('Status Code:', xhr.status);
            console.log('Response:', xhr.responseText);
            //alert('Error: ' + xhr.status + ' - Check console for details');
        }
    });
});