/////////////////////////////////////////////////////////////////////////////////
/* RO PANEL - ADD RO CLIENT - SAVE TO XANO */
/*Location: Work Panel/ RO Panel / Add RO Client */
/////////////////////////////////////////////////////////////////////////////////

$(document).on('knack-record-create.view_3', function(event, view, record) {
    const safe = value => (value && value.trim() !== "" ? value : null);

    const uen = String(record.field_25 || "");
    const companyName = String(record.field_49 || "");
  const servicesRendered = (record.field_183_raw && Array.isArray(record.field_183_raw) && record.field_183_raw.length > 0)
    ? record.field_183_raw.map(item => item.identifier || String(item)) 
    : null;


    const fka = String(record.field_525 || "");
    const fye = String(record.field_178 || "");
    const workingGroup = String(record.field_1900 || "");
    const status = String(record.field_29 || "");
    const internalRefNo = String(record.field_26 || "");
    const incorpDate = record.field_179 ? new Date(record.field_179).toISOString() : null;
    const commonSealNo = String(record.field_180 || "");
    const nomineeDirector = String(record.field_182 || "");
    const currentFYE = parseInt(record.field_563 || 0);
    const created_at = record.field_1685 
        ? new Date(record.field_1685).toISOString().split("T")[0] 
        : null;

    const formData = {
        uen: safe(uen),
        company_name: safe(companyName),
        services_rendered: servicesRendered,
        formerly_known_as: safe(fka),
        financial_year_end: safe(fye),
        group: safe(workingGroup),
        status: safe(status),
        internal_reference_number: safe(internalRefNo),
        incorporation_date: incorpDate,
        common_seal_number: safe(commonSealNo),
        nominee_director: safe(nomineeDirector),
        current_fye: currentFYE,
        created_at: created_at
    };

    console.log('Sending real data:', formData);

    $.ajax({
        url: 'https://xpjg-p6rt-dhkq.s2.xano.io/api:silPPn_p/end_clients',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer {{XANO-KNACK ACCESSTOKEN}}',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData),
        success: function(response) {
            console.log('data saved to the Platform App');
            //console.log('Response:', response);
            //alert('SUCCESS! Form data saved to the Platform App as well!');
        },
        error: function(xhr, status, error) {
            console.log('❌ Error:', error);
            console.log('Status Code:', xhr.status);
            console.log('Response:', xhr.responseText);
            alert('Error: ' + xhr.status + ' - Check console for details');
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////
/* ENTITY DETAILS - EDIT CLIENT ENTITY - SAVE TO XANO */
/*Location: Databases/ Client Datbases / Entity Details / Edit Client Entity */
/////////////////////////////////////////////////////////////////////////////////

$(document).on('knack-record-update.view_1907', function(event, view, record) {
    const uen = String(record.field_25) || ""; 
    const companyName = String(record.field_49) || "";
    const servicesRendered = (record.field_183_raw && Array.isArray(record.field_183_raw)) 
        ? record.field_183_raw.map(item => item.identifier || String(item)) 
        : [];
    const fka = String(record.field_525) || ""; 
    const fye = String(record.field_178) || "";
    const workingGroup = String(record.field_1900) || "";
    const status = String(record.field_29) || "";
    const internalRefNo = String(record.field_26) || "";
   const incorpDate = (record.field_179 && !isNaN(Date.parse(record.field_179))) 
    ? new Date(record.field_179).toISOString() 
    : null;

    const commonSealNo = String(record.field_180) || "";
    const nomineeDirector = String(record.field_182) || "";
    const currentFYE = parseInt(record.field_563 || 0);
    const created_at = String(record.field_1685) || "";
    const end_clients_uen = parseInt(record.field_25); // Works fine
    const formData = {
        end_client_uen: end_clients_uen,
        uen: uen,
        company_name: companyName,
        services_rendered: servicesRendered,
        formerly_known_as: fka,
        financial_year_end: fye,
        group: workingGroup,
        status: status,
        internal_reference_number: internalRefNo,
        incorporation_date: incorpDate,
        common_seal_number: commonSealNo,
        nominee_director: nomineeDirector,
        current_fye: currentFYE,
        created_at: created_at
    };
    console.log(record.id);
    console.log('Sending UPDATE to Xano with:', formData);

    $.ajax({
        url: `https://xpjg-p6rt-dhkq.s2.xano.io/api:silPPn_p/end_clients/1481`, 
        type: 'PATCH',
        headers: {
            'Authorization': 'Bearer {{XANO-KNACK ACCESSTOKEN}}',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData),
        success: function(response) {
            console.log('✅ SUCCESS! Update sent to Xano');
            console.log('Response:', response);
            alert('SUCCESS! Client record updated on Platform App');
        },
        error: function(xhr, status, error) {
            console.log('❌ Error:', error);
            console.log('Status Code:', xhr.status);
            console.log('Response:', xhr.responseText);
            alert('Error: ' + xhr.status + ' - Check console for details');
        }
    });
});


