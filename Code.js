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
 * 2. DATABASE WRITE FUNCTION (CREATE)
 * Receives the Foot Assessment data from the frontend and appends it to Google Sheets
 */
function saveFootAssessmentToSheet(record) {
  if (!record) return false;
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  var sheetName = 'Sheet1';
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName(sheetName);
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
      JSON.stringify(d) // BH (59): Hidden JSON Payload
    ];
    
    sheet.appendRow(rowData); 
    return true;
  } catch (error) { 
    console.error("Save error: " + error.toString());
    throw error; 
  }
}

/**
 * 3. DATABASE UPDATE FUNCTION (EDIT)
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
    console.error("Update error: " + error.toString());
    throw error; 
  }
}

/**
 * 4. DATABASE DELETE FUNCTION
 */
function deleteRecordFromSheet(id) {
  if (!id) return false;
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName('Sheet1');
    var data = sheet.getDataRange().getValues();
    
    for (var i = 0; i < data.length; i++) {
      if (data[i][1] == id) {
        sheet.deleteRow(i + 1);
        return true;
      }
    }
    return false;
  } catch (error) { throw error; }
}

/**
 * 5. DATABASE READ FUNCTION (FETCH)
 */
function getDashboardData() {
  var sheetId = '114g-cxXH3TG1e6qoDSBT2Fr9hKBJZkzJrZYFly8_MI4';
  var result = { footData: [], eyeData: [], refData: [] };
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var footSheet = ss.getSheetByName('Sheet1');
    if (footSheet) {
      var data = footSheet.getDataRange().getValues();
      // Starts reading from Row 3 (index 2) onwards to skip headers
      for (var i = 2; i < data.length; i++) {
        var row = data[i];
        if (!row[1]) continue; // Skip rows without an ID
        
        var dateVal = row[4];
        if (dateVal instanceof Date) {
          dateVal = Utilities.formatDate(dateVal, Session.getScriptTimeZone(), "yyyy-MM-dd");
        }
        
        var rawData = {};
        try { if(row[59]) rawData = JSON.parse(row[59]); } catch(e) {}
        
        result.footData.push({
          id: row[1],
          name: row[2],
          ic: row[3],
          date: dateVal,
          risk: row[5],
          assessor: row[56] || "Unknown",
          designation: row[57] || "Healthcare Staff",
          data: rawData
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
 * 6. AUTHENTICATION FUNCTION
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