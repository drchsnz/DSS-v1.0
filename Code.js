/**
 * 1. ROUTING FUNCTION
 * Serves the HTML pages for the Diabetes Screening System.
 * To navigate to different pages, append ?page=filename to the Web App URL.
 */
function doGet(e) {
  var page = e.parameter.page;
  if (!page) page = 'index';

  try {
    var template = HtmlService.createTemplateFromFile(page);
    
    // Pass the Web App URL into the template so index.html can use it for iframes
    template.url = ScriptApp.getService().getUrl();
    
    return template.evaluate()
      .setTitle('Diabetes Screening System')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
      // ALLOWALL is required to allow the GAS web app to embed its own pages in iframes
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      
  } catch (error) {
    console.error("Routing error: " + error.toString());
    return HtmlService.createHtmlOutput("<h2>Error 404: Module '" + page + ".html' not found.</h2><p>Please ensure the HTML file exists in the editor.</p>");
  }
}

/**
 * 2. DATABASE WRITE FUNCTION (CREATE) - FOOT ASSESSMENT
 */
function saveFootAssessmentToSheet(record) {
  if (!record) return false;
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName('Sheet1');
    var d = record.data || {};
    
    var rowData = [
      new Date(), record.id, record.name, record.ic, record.date, record.risk,
      d.dm_type || '', d.dm_other_text || '', d.dm_duration || '',
      d.chk_pad || false, d.chk_renal || false, d.chk_retino || false, d.chk_hx_ulcer || false,
      d.chk_numb || false, d.chk_burn || false, d.chk_claudication || false, d.chk_rest_pain || false,
      d.skin_r || '', d.skin_l || '', d.note_skin || '',
      d.def_r || '', d.def_l || '', d.note_def || '',
      d.callus_r || '', d.callus_l || '', d.note_callus || '',
      d.ulcer_r || '', d.ulcer_l || '', d.note_ulcer || '',
      d.mono_r_val || '', d.mono_r || '', d.mono_l_val || '', d.mono_l || '',
      d.vib_r || '', d.vib_l || '', d.pin_r || '', d.pin_l || '', d.refl_r || '', d.refl_l || '',
      d.dpa_r || '', d.dpa_l || '', d.pta_r || '', d.pta_l || '',
      d.sign_cold || false, d.sign_hair || false, d.sign_shiny || false,
      d.mgt_edu_daily || false, d.mgt_edu_hyg || false, d.mgt_edu_nail || false, d.mgt_edu_shoe || false,
      d.mgt_act_callus || false, d.mgt_act_wound || false, d.mgt_act_offload || false,
      d.mgt_ref_dr || false, d.mgt_ref_pod || false, d.mgt_ref_wound || false,
      record.assessor || '', d.assessor_designation || '', d.assessor_date || '',
      JSON.stringify(d) 
    ];
    
    sheet.appendRow(rowData); 
    return true;
  } catch (error) { 
    console.error("Save error (Foot): " + error.toString());
    throw error; 
  }
}

/**
 * 3. DATABASE UPDATE FUNCTION (EDIT) - FOOT ASSESSMENT
 */
function updateFootAssessmentInSheet(record) {
  if (!record || !record.id) return false;
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName('Sheet1');
    var data = sheet.getDataRange().getValues();
    
    var rowIndex = -1;
    for (var i = 0; i < data.length; i++) {
      if (data[i][1] == record.id) {
        rowIndex = i + 1; break;
      }
    }
    if (rowIndex === -1) return saveFootAssessmentToSheet(record);
    
    var d = record.data || {};
    var rowData = [
      new Date(), record.id, record.name, record.ic, record.date, record.risk,
      d.dm_type || '', d.dm_other_text || '', d.dm_duration || '',
      d.chk_pad || false, d.chk_renal || false, d.chk_retino || false, d.chk_hx_ulcer || false,
      d.chk_numb || false, d.chk_burn || false, d.chk_claudication || false, d.chk_rest_pain || false,
      d.skin_r || '', d.skin_l || '', d.note_skin || '',
      d.def_r || '', d.def_l || '', d.note_def || '',
      d.callus_r || '', d.callus_l || '', d.note_callus || '',
      d.ulcer_r || '', d.ulcer_l || '', d.note_ulcer || '',
      d.mono_r_val || '', d.mono_r || '', d.mono_l_val || '', d.mono_l || '',
      d.vib_r || '', d.vib_l || '', d.pin_r || '', d.pin_l || '', d.refl_r || '', d.refl_l || '',
      d.dpa_r || '', d.dpa_l || '', d.pta_r || '', d.pta_l || '',
      d.sign_cold || false, d.sign_hair || false, d.sign_shiny || false,
      d.mgt_edu_daily || false, d.mgt_edu_hyg || false, d.mgt_edu_nail || false, d.mgt_edu_shoe || false,
      d.mgt_act_callus || false, d.mgt_act_wound || false, d.mgt_act_offload || false,
      d.mgt_ref_dr || false, d.mgt_ref_pod || false, d.mgt_ref_wound || false,
      record.assessor || '', d.assessor_designation || '', d.assessor_date || '',
      JSON.stringify(d)
    ];
    
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    return true;
  } catch (error) { 
    console.error("Update error (Foot): " + error.toString());
    throw error; 
  }
}

/**
 * 4. DATABASE WRITE FUNCTION (CREATE) - EYE ASSESSMENT
 */
function saveEyeAssessmentToSheet(record) {
  if (!record) return false;
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName('Sheet2');
    var d = record.data || {};
    
    var rowData = [
      new Date(), record.id, record.name, record.ic, d.rn_no || '', d.p_date || '', d.p_age || '', d.p_gender || '',
      d.dm_type || '', d.dm_duration || '', d.hba1c || '',
      d.risk_htn || false, d.risk_chol || false, d.risk_kidney || false, d.risk_fatty || false, d.risk_smoke || false, d.risk_preg || false, d.risk_rapid_hba1c || false,
      d.va_od_unaided || '', d.va_od_ph || '', d.va_os_unaided || '', d.va_os_ph || '',
      d.method || '', d.dr_stage_od || '', d.mac_od || '', d.dr_stage_os || '', d.mac_os || '',
      d.follow_up || '', d.action || '', d.next_appt_date || '', d.comments || '',
      d.screener_name || '', d.designation || '', d.verify_date || '',
      record.grade || '', JSON.stringify(d)
    ];
    
    sheet.appendRow(rowData); 
    return true;
  } catch (error) { 
    console.error("Save error (Eye): " + error.toString());
    throw error; 
  }
}

/**
 * 5. DATABASE UPDATE FUNCTION (EDIT) - EYE ASSESSMENT
 */
function updateEyeAssessmentInSheet(record) {
  if (!record || !record.id) return false;
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName('Sheet2');
    var data = sheet.getDataRange().getValues();
    
    var rowIndex = -1;
    for (var i = 0; i < data.length; i++) {
      if (data[i][1] == record.id) {
        rowIndex = i + 1; break;
      }
    }
    if (rowIndex === -1) return saveEyeAssessmentToSheet(record);
    
    var d = record.data || {};
    var rowData = [
      new Date(), record.id, record.name, record.ic, d.rn_no || '', d.p_date || '', d.p_age || '', d.p_gender || '',
      d.dm_type || '', d.dm_duration || '', d.hba1c || '',
      d.risk_htn || false, d.risk_chol || false, d.risk_kidney || false, d.risk_fatty || false, d.risk_smoke || false, d.risk_preg || false, d.risk_rapid_hba1c || false,
      d.va_od_unaided || '', d.va_od_ph || '', d.va_os_unaided || '', d.va_os_ph || '',
      d.method || '', d.dr_stage_od || '', d.mac_od || '', d.dr_stage_os || '', d.mac_os || '',
      d.follow_up || '', d.action || '', d.next_appt_date || '', d.comments || '',
      d.screener_name || '', d.designation || '', d.verify_date || '',
      record.grade || '', JSON.stringify(d)
    ];
    
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    return true;
  } catch (error) { 
    console.error("Update error (Eye): " + error.toString());
    throw error; 
  }
}

/**
 * 6. DATABASE WRITE FUNCTION (CREATE) - REFERRAL
 */
function saveReferralToSheet(record) {
  if (!record) return false;
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName('Sheet3');
    var d = record.data || {};
    
    var rowData = [
      new Date(), record.id, record.name, record.ic, d['pid-mrn'] || '', d['pid-dob'] || '', d['pid-gender'] || '',
      d['cs-dm-type'] || '', d['cs-dm-duration'] || '', d['cs-hba1c'] || '', d['cs-hba1c-date'] || '',
      d['cs-va-od'] || '', d['cs-va-os'] || '', d['cs-meds'] || '', d['cs-nkda'] || false, d['cs-comorb'] || '',
      d['urg-immediate'] || false, d['urg-1week'] || false, d['urg-4weeks'] || false, d['urg-routine'] || false,
      d['remarks'] || '', d['prov-name'] || '', d['prov-designation'] || '', d['prov-id'] || '', d['prov-date'] || '',
      record.outcome || 'Generated', JSON.stringify(d)
    ];
    
    sheet.appendRow(rowData); 
    return true;
  } catch (error) { 
    console.error("Save error (Referral): " + error.toString());
    throw error; 
  }
}

/**
 * 7. DATABASE UPDATE FUNCTION (EDIT) - REFERRAL
 */
function updateReferralInSheet(record) {
  if (!record || !record.id) return false;
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName('Sheet3');
    var data = sheet.getDataRange().getValues();
    
    var rowIndex = -1;
    for (var i = 0; i < data.length; i++) {
      if (data[i][1] == record.id) {
        rowIndex = i + 1; break;
      }
    }
    if (rowIndex === -1) return saveReferralToSheet(record);
    
    var d = record.data || {};
    var rowData = [
      new Date(), record.id, record.name, record.ic, d['pid-mrn'] || '', d['pid-dob'] || '', d['pid-gender'] || '',
      d['cs-dm-type'] || '', d['cs-dm-duration'] || '', d['cs-hba1c'] || '', d['cs-hba1c-date'] || '',
      d['cs-va-od'] || '', d['cs-va-os'] || '', d['cs-meds'] || '', d['cs-nkda'] || false, d['cs-comorb'] || '',
      d['urg-immediate'] || false, d['urg-1week'] || false, d['urg-4weeks'] || false, d['urg-routine'] || false,
      d['remarks'] || '', d['prov-name'] || '', d['prov-designation'] || '', d['prov-id'] || '', d['prov-date'] || '',
      record.outcome || 'Generated', JSON.stringify(d)
    ];
    
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    return true;
  } catch (error) { 
    console.error("Update error (Referral): " + error.toString());
    throw error; 
  }
}

/**
 * 8. DATABASE DELETE FUNCTION (Multi-Sheet Compatible)
 */
function deleteRecordFromSheet(id) {
  if (!id) return false;
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheetsToSearch = ['Sheet1', 'Sheet2', 'Sheet3']; // Searches all 3 tables
    
    for (var s = 0; s < sheetsToSearch.length; s++) {
      var sheet = ss.getSheetByName(sheetsToSearch[s]);
      if (!sheet) continue;
      
      var data = sheet.getDataRange().getValues();
      for (var i = 0; i < data.length; i++) {
        // ID is stored in Column B (index 1) across all modules
        if (data[i][1] == id) {
          sheet.deleteRow(i + 1);
          return true; // Stop searching once deleted
        }
      }
    }
    return false; // Record not found
  } catch (error) { throw error; }
}

/**
 * 9. DATABASE READ FUNCTION (FETCH DASHBOARD DATA)
 */
function getDashboardData() {
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  var result = { footData: [], eyeData: [], refData: [] };
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    
    // --- 9A. FETCH FOOT DATA (Sheet1) ---
    var footSheet = ss.getSheetByName('Sheet1');
    if (footSheet) {
      var data = footSheet.getDataRange().getValues();
      // Start at index 1 assuming row 1 is headers
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        if (!row[1] || isNaN(row[1])) continue; // Skip if no ID
        
        var dateVal = row[4]; // Date of visit column E
        if (dateVal instanceof Date) {
          dateVal = Utilities.formatDate(dateVal, Session.getScriptTimeZone(), "yyyy-MM-dd");
        }
        
        var rawData = {};
        try { if(row[59]) rawData = JSON.parse(row[59]); } catch(e) {} // JSON at column BH
        
        result.footData.push({
          id: row[1],
          name: row[2],
          ic: row[3],
          date: dateVal,
          risk: row[5], // Outcome Risk
          assessor: row[56] || "Unknown",
          designation: row[57] || "Healthcare Staff",
          data: rawData
        });
      }
    }

    // --- 9B. FETCH EYE DATA (Sheet2) ---
    var eyeSheet = ss.getSheetByName('Sheet2');
    if (eyeSheet) {
      var eyeRaw = eyeSheet.getDataRange().getValues();
      for (var j = 1; j < eyeRaw.length; j++) {
        var eRow = eyeRaw[j];
        if (!eRow[1] || isNaN(eRow[1])) continue; 
        
        var eDateVal = eRow[5]; // Date of Visit is Column F (index 5)
        if (eDateVal instanceof Date) {
          eDateVal = Utilities.formatDate(eDateVal, Session.getScriptTimeZone(), "yyyy-MM-dd");
        }
        
        var eRawData = {};
        try { if(eRow[35]) eRawData = JSON.parse(eRow[35]); } catch(e) {} // JSON at column AJ
        
        result.eyeData.push({
          id: eRow[1],
          name: eRow[2],
          ic: eRow[3],
          date: eDateVal,
          grade: eRow[34], // Outcome Grade is Column AI (index 34)
          assessor: eRow[31] || "Unknown", // Screener Name is Column AF (index 31)
          designation: eRow[32] || "Healthcare Staff",
          data: eRawData
        });
      }
    }

    // --- 9C. FETCH REFERRAL DATA (Sheet3) ---
    var refSheet = ss.getSheetByName('Sheet3');
    if (refSheet) {
      var refRaw = refSheet.getDataRange().getValues();
      for (var k = 1; k < refRaw.length; k++) {
        var rRow = refRaw[k];
        if (!rRow[1] || isNaN(rRow[1])) continue; 
        
        var rDateVal = rRow[24]; // Referral Date is Column Y (index 24)
        if (rDateVal instanceof Date) {
          rDateVal = Utilities.formatDate(rDateVal, Session.getScriptTimeZone(), "yyyy-MM-dd");
        }
        
        var rRawData = {};
        try { if(rRow[26]) rRawData = JSON.parse(rRow[26]); } catch(e) {} // JSON at column AA
        
        result.refData.push({
          id: rRow[1],
          name: rRow[2],
          ic: rRow[3],
          date: rDateVal,
          outcome: rRow[25], // Outcome Status is Column Z (index 25)
          assessor: rRow[21] || "Unknown", // Provider Name is Column V (index 21)
          designation: rRow[22] || "Healthcare Staff",
          data: rRawData
        });
      }
    }

    return result;
  } catch (error) { 
    console.error("Fetch error: " + error.toString());
    return result; 
  }
}

/**
 * 10. AUTHENTICATION FUNCTION
 * Securely fetches the active user's email.
 */
function getUserEmail() {
  var email = Session.getActiveUser().getEmail();
  if (!email) {
    // Fallback if ActiveUser is not available (common in some restricted environments)
    email = Session.getEffectiveUser().getEmail();
  }
  return email || "Authorized User";
}