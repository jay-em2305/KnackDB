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
            console.log('Error:', error);
            //console.log('Status Code:', xhr.status);
            //console.log('Response:', xhr.responseText);
            //alert('Error: ' + xhr.status + ' - Check console for details');
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
    let incorpDate = null;
    try {
    const rawDate = record.field_179;
    if (typeof rawDate === 'string' && rawDate.includes('/')) {
        const [day, month, year] = rawDate.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(parsedDate.getTime())) {
        incorpDate = parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        }
    }
    } catch (e) {
    console.error("Date parse error:", e);
    }
        let Last_agm = null;
    try {
    const rawDateLGM = record.field_564;
    if (typeof rawDateLGM === 'string' && rawDateLGM.includes('/')) {
        const [day, month, year] = rawDateLGM.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(parsedDate.getTime())) {
        Last_agm = parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        }
    }
    } catch (e) {
    console.error("Date parse error:", e);
    }
    const commonSealNo = String(record.field_180) || "";
    const nomineeDirector = String(record.field_182) || "";
    const currentFYE = parseInt(record.field_563 || 0);
    const created_at = String(record.field_1685) || "";
    const end_clients_name = String(record.field_49) || ""
    const formData = {
        end_clients_name: end_clients_name,
        uen: uen,
        company_name: companyName,
        services_rendered: servicesRendered,
        formerly_known_as: fka,
        financial_year_end: fye,
        group: workingGroup,
        status: status,
        internal_reference_number: internalRefNo,
        incorporation_date: incorpDate,
        last_annual_general_meeting: Last_agm,
        common_seal_number: commonSealNo,
        nominee_director: nomineeDirector,
        current_fye: currentFYE,
        created_at: created_at
    };
    $.ajax({
        url: `https://xpjg-p6rt-dhkq.s2.xano.io/api:silPPn_p/end_clients/${end_clients_name}`, 
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
            //console.log('Response:', xhr.responseText);
            //alert('Error: ' + xhr.status + ' - Check console for details');
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////
/* MANAGEMENT PANEL - EDIT CLIENT DATABASE INFORMATION - SAVE TO XANO */
/*Location: Management Pane/ Secretarial / Edit Client Database*/
/////////////////////////////////////////////////////////////////////////////////
// GLOBAL variable to store row data
// Store row data when clicking a cell
var lastClickedRowData = {};

$(document).on('knack-view-render.any', function () {
  $('.kn-table td.cell-edit').off('mousedown').on('mousedown', function () {
    const $row = $(this).closest('tr');
    const rowData = {};

    $row.find('td').each(function () {
      const key = $(this).data('field-key');
      const value = $(this).text().trim();
      if (key) rowData[key] = value;
    });

    lastClickedRowData = rowData;
    //console.log('Stored row data:', lastClickedRowData);
  });
});

// Real-time inline modal capture + fallback
$(document).on('click', '.drop .submit .kn-button.save', function (e) {
  e.preventDefault();

  // Real-time values from modal
  const getFieldValue = (fieldId) => $(`#cell-editor-form #${fieldId}`).val()?.trim() || lastClickedRowData[fieldId] || "";
  
    const getFieldValueSelect = (fieldId) => {
  // Prefer real-time modal field
  const $field = $(`#cell-editor-form [name="${fieldId}"]`);
  if ($field.length) {
    if ($field.is('select')) {
      return $field.find('option:selected').val()?.trim() || "";
    }
    return $field.val()?.trim() || "";
  }
  // Fallback to lastClickedRowData
  return lastClickedRowData[fieldId] || "";
};
  let  end_clients_name = (lastClickedRowData["field_49"] || "").trim();
  let  end_clients_uen = (lastClickedRowData["field_25"] || "").trim(); 
  if ( !end_clients_name) {
   end_clients_name = "No Value";
  }
    if (!end_clients_uen) {
    end_clients_uen = 123+"NoValue";

  }
 let incorpDate = null;
    try {
    const rawDate = getFieldValue("field_179");
    if (typeof rawDate === 'string' && rawDate.includes('/')) {
        const [day, month, year] = rawDate.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(parsedDate.getTime())) {
        incorpDate = parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        }
    }
    } catch (e) {
    console.error("Date parse error:", e);
    }
    let Last_agm = null;
    try {
    const rawDateLGM = getFieldValue("field_564");
    if (typeof rawDateLGM === 'string' && rawDateLGM.includes('/')) {
        const [day, month, year] = rawDateLGM.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(parsedDate.getTime())) {
        Last_agm = parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        }
    }
    } catch (e) {
    console.error("Date parse error:", e);
    }
        const last_updated_at = new Date().toISOString(); 
    let FYE = null;
  if(getFieldValueSelect("field_178") == "Other FYE"){
    FYE = getFieldValue("field_559");
  }else{
    FYE = getFieldValueSelect("field_178");
  }
  const payload = {
    end_clients_name,
    end_clients_uen: end_clients_uen,
    uen:getFieldValue("field_25"),
    company_name: getFieldValue("field_49"),
    fomerly_known_as: getFieldValue("field_525"),
    financial_year_end: FYE,
    group: getFieldValueSelect("field_1900"),
    status: getFieldValue("field_29"),
    internal_reference_number: getFieldValue("field_26"),
    incorporation_date: incorpDate,
    last_annual_general_meeting: Last_agm,
    common_seal_number: getFieldValue("field_180"),
    nominee_director: getFieldValue("field_182"),
    current_fye: parseInt(getFieldValue("field_563") || "0"),
    created_at: getFieldValue("field_1685"),
    services_rendered: getFieldValue("field_183"),
    updated_value: getFieldValue("field_49"), // real-time value
    last_updated_at: last_updated_at,
    clicked_row_data: lastClickedRowData
  };

  const fullUrl = `https://xpjg-p6rt-dhkq.s2.xano.io/api:silPPn_p/end_clients/${encodeURIComponent(end_clients_name)}/${encodeURIComponent(end_clients_uen)}`;

  //console.log("📤 Sending to Xano:", fullUrl);
  //console.log("🧾 Payload:", payload);

  $.ajax({
    url: fullUrl,
    type: 'PATCH',
    headers: {
            'Authorization': 'Bearer {{XANO-KNACK ACCESSTOKEN}}',
            'Content-Type': 'application/json'
    },
    data: JSON.stringify(payload),
    success: function (response) {
      console.log('Data successfully patched to Xano:', response);
    },
    error: function (xhr, status, error) {
      console.error('Xano update failed:', error);
      try {
        const parsed = JSON.parse(xhr.responseText);
        console.log('Xano Error:', parsed);
      } catch {
        console.log('Raw response:', xhr.responseText);
      }
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////
/* SEC PANEL - ADD NEW CLIENT - SAVE TO XANO */
/*Location: Work Panel/ SEC Panel / Ticket / Add New Client */
/////////////////////////////////////////////////////////////////////////////////
$(document).on('knack-record-create.view_280', function(event, view, record) {
    const safe = value => (value && value.trim() !== "" ? value : null);
    const companyName = String(record.field_49 || "");
    const status = String(record.field_29 || "");
    const formData = {
        company_name: safe(companyName),
        status: safe(status),
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
            console.log('Error:', error);
            //console.log('Status Code:', xhr.status);
            //console.log('Response:', xhr.responseText);
            //alert('Error: ' + xhr.status + ' - Check console for details');
        }
    });
});
/////////////////////////////////////////////////////////////////////////////////
/* HR PANEL - ADD NEW CLIENT - SAVE TO XANO */
/*Location: Work Panel/ HR Panel / Payroll & Recruit / Add New Client */
/////////////////////////////////////////////////////////////////////////////////
$(document).on('knack-record-create.view_1783', function(event, view, record) {
    const safe = value => (value && value.trim() !== "" ? value : null);
    const companyName = String(record.field_49 || "");
    const status = String(record.field_29 || "");
    const formData = {
        company_name: safe(companyName),
        status: safe(status),
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
            console.log('Error:', error);
            //console.log('Status Code:', xhr.status);
            //console.log('Response:', xhr.responseText);
            //alert('Error: ' + xhr.status + ' - Check console for details');
        }
    });
});