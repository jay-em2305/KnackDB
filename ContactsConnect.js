/////////////////////////////////////////////////////////////////////////////////
/* SEc PANEL - ADD CONTACTS CLIENT - SAVE TO XANO */
/*Location: Sec Panel/ Tickets / Add Contact */
/////////////////////////////////////////////////////////////////////////////////
$(document).on('knack-record-create.view_707', function(event, view, record) {
    const safe = value => (value && value.trim() !== "" ? value : null);
    const name = String(record.field_275 || "");
    const type = String(record.field_338 || "");
    const rawPhone332 = record.field_332;
    const rawPhone333 = record.field_333;
    const cleanPhone332 = rawPhone332?.replace(/<[^>]+>/g, '').trim();
    const cleanPhone333 = rawPhone333?.replace(/<[^>]+>/g, '').trim();
    const phone_number = [cleanPhone332, cleanPhone333].filter(Boolean);
    const rawEmail = record.field_330; 
    const extractedEmail = rawEmail?.match(/mailto:([^"]+)/)?.[1] || 
                        rawEmail?.replace(/<[^>]+>/g, '').trim() || null;
    const emailArray = extractedEmail ? [extractedEmail] : [];
    const last_updated_at = new Date().toISOString();
  const contact_display = JSON.stringify([{
  name: safe(name) || "",
  email: safe(extractedEmail) || "",
  contact_number: phone_number.join(", ")
}]);
    const formData = {
        fullname: safe(name),
        type: safe(type),
        phone_number: phone_number,
        email: emailArray,
        last_updated_at:last_updated_at,
        emergency_contact: contact_display
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
            alert('SUCCESS! Form data saved to the Platform App as well!');
        },
        error: function(xhr, status, error) {
            console.log(' Error:', error);
            //console.log('Status Code:', xhr.status);
            console.log('Response:', xhr.responseText);
            alert('Error: ' + xhr.status + ' - Check console for details');
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
    const rawPhone332 = record.field_332;
    const rawPhone333 = record.field_333;
    const cleanPhone332 = rawPhone332?.replace(/<[^>]+>/g, '').trim();
    const cleanPhone333 = rawPhone333?.replace(/<[^>]+>/g, '').trim();
    const phone_number = [cleanPhone332, cleanPhone333].filter(Boolean); 
    const rawEmail = record.field_330; 
    const extractedEmail = rawEmail?.match(/mailto:([^"]+)/)?.[1] || 
                            rawEmail?.replace(/<[^>]+>/g, '').trim() || null;
    const emailArray = extractedEmail ? [extractedEmail] : [];
    const contact_display = JSON.stringify([{
        name: safe(name) || "",
        email: safe(extractedEmail) || "",
        contact_number: phone_number.join(", ")
    }]);
       const contacts_name = safe(record.field_275) || safe(extractedEmail) || "";
    const last_updated_at = new Date().toISOString(); 
    const formData = {
        contacts_name: contacts_name,
        last_updated_at: last_updated_at,
        fullname: safe(name),
        type: safe(type),
        email: emailArray,
        emergency_contact: contact_display,
        phone_number: phone_number
    };

    $.ajax({
        url: `https://xpjg-p6rt-dhkq.s2.xano.io/api:silPPn_p/contacts/${contacts_name}`, 
        type: 'PUT',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJ4YW5vIjp7ImRibyI6Im1hc3Rlcjp1c2VyIiwiaWQiOjg0NDY4LCJhY2Nlc3NfdG9rZW4iOnsia2V5aWQiOiI1MzRkNzViNC00MDI0LTQ3MjQtYjQwZi1kMGIwOTVjYjY3Y2UiLCJzY29wZSI6eyJ0ZW5hbnRfY2VudGVyOmJhY2t1cCI6MCwidGVuYW50X2NlbnRlcjpkZXBsb3kiOjAsInRlbmFudF9jZW50ZXI6aW1wZXJzb25hdGUiOjAsInRlbmFudF9jZW50ZXI6bG9nIjowLCJ0ZW5hbnRfY2VudGVyOnJiYWMiOjAsInRlbmFudF9jZW50ZXI6c2VjcmV0cyI6MCwidGVuYW50X2NlbnRlciI6MCwid29ya3NwYWNlOmFkZG9uIjoxNSwid29ya3NwYWNlOmFwaSI6MTUsIndvcmtzcGFjZTpjb250ZW50IjoxNSwid29ya3NwYWNlOmRhdGFiYXNlIjoxNSwid29ya3NwYWNlOmRhdGFzb3VyY2U6bGl2ZSI6MTUsIndvcmtzcGFjZTpmaWxlIjoxNSwid29ya3NwYWNlOmZ1bmN0aW9uIjoxNSwid29ya3NwYWNlOmxvZyI6MTUsIndvcmtzcGFjZTptaWRkbGV3YXJlIjoxNSwid29ya3NwYWNlOnJlcXVlc3RoaXN0b3J5IjoxNSwid29ya3NwYWNlOnRhc2siOjE1LCJ3b3Jrc3BhY2U6dG9vbCI6MTV9fX0sImlhdCI6MTc0ODk0NzAxMywibmJmIjoxNzQ4OTQ3MDEzLCJhdWQiOiJ4YW5vOm1ldGEifQ.tYxPbi5mM5iBi1wEzATpFSldOsw9Mb_D1QUgv4i9C-ITR5VTjPqxMZlcfRA3F7eqxv278ho1gQTESZmcTlAgEcggJPvTd4D23v42v6SejuNjYS1gYP7K4iBAPn7DCMAwUkqXv31AAeTPoU54Ea_gz7TBeXm5-_ZaDshGXIxRO8FePVyO3PYx5QC7uX4JYBcOUdGLNXPKAzLeQh-Z5b5ivMNvqDDmqNRNsTJOJpSAVWDnLsfPmIQ8ixMoQk7hXjk8-ZcqBIoK5yg4nghcxoeGbMDdES1cF3G55dfAq0YvGF65hu6LEcNKhZncjEFsfxtSqkvX5yNx4D-fPrgWR2D-ZVfOCMfOSoKg7b8f_750dKHFr75wxh5iIRSyNI0uQBchjdM6NC4_IC7mjibiqHI6cX2d-Tz60EHSHhPbv70TEdQe20pPPgGPIPlRyasL43-mOnXtymbcUTQVAGWOMucLIK1JVmy0INqdytFD1W9ho2rqIW2GAy2qpdEpex8C_3edckRwNWGGhaQBnTSpAS5sEqovJlxYQRJNEvQQKH78rrFC0TLbNPIN2UNVB3IbJT4TgeOlZi1y-6_GCkdjGXWt3wjDX_CsCk2Zy-cN_IFgnJQXyt6BjQf4BYmnGgP7UoW1436a20zT4FbJUVrNx9AekIt8xGpHP2nsJer_LtADAw0',
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