/*jshint esversion: 8 */
let parameters = [];
let tables = [];
let tabs = [];

const CONFIG_BUTTON = [{
  id: 'Restore-Deafault-Configuration',
  code: 'HA00'
},
{
  id: 'Restore-USA-Factory-Configuration',
  code: 'AE'
},
{
  id: 'Restore-EU-Factory-Configuration',
  code: 'Ae'
}
];

async function _parsingParameters(xml) {
  const interfaceSelectionSelectTag = $('[_id="Interface-Selection"');
  $(xml).find('parameter').each(function () {
    let name = $(this).attr('name');
    if (name == 'Interface.Selection') {
      console.log(1)
      interfaceSelectionSelectTag.append("<option value='selectOption'>" + "Select Option" + "</option>");
      $(this).find('value').each(function () {
        let context = $(this).attr('context');
        let write = $(this).attr('write');
        write = write.replace("$", "");
        interfaceSelectionSelectTag.append("<option value='" + write + "'>" + context + "</option>");
      });
    }
    let _name = $(this).attr('name');
    let _code = $(this).attr('code');
    let _tableRef = $(this).attr('tableRef');
    let _maxLen = $(this).attr('maxLen');
    let _id = $(this).attr('id');
    let _min = $(this).attr('min');
    let _max = $(this).attr('max');
    let _value = $(this).attr('value');
    let _tab = $(this).attr('tab');
    let _text = $(this).children().text();
    parameters.push({
      name: _name,
      code: _code,
      tableRef: _tableRef,
      maxLen: _maxLen,
      id: _id,
      min: _min,
      max: _max,
      value: _value,
      tab: _tab,
      text: _text
    });
  });
}

function _parsingTables( xml ) {
  $(xml).find('table').each(function () {
    let _tableName = $(this).attr('name');
    let _value = '';
    let _elementName = '';
    $(this).find('element').each(function () {
      _elementName = $(this).attr('name');
      _value = $(this).text();
      _type = $(this).attr('type');
      tables.push({
        tableName: _tableName,
        elementName: _elementName,
        value: _value
      });
    });
  });
}

function _parsingTabs( xml ) {
  $(xml).find('tab').each(function () {
    let _title = $(this).attr('title');
    let _type = '';
    $(this).find('label').each(function () {
      let _text = $(this).attr('text');
      let _type = $(this).attr('type');
      tabs.push({
        title: _title,
        text: _text,
        type: _type
      });
    });
  });
}

async function _parsingXML( xml ) {
  _parsingParameters( xml );
  _parsingTables(xml);
  _parsingTabs(xml);
}

function getXML() {
  $.ajax({
    type: 'GET',
    url: "./conf/commonConfig.xml",
    dataType: 'xml',
    success: async function (xml) {
      
      await _parsingXML(xml);

      populatingSelectDropdown();
      
      creatingTabElements("Symbolology-AIM-ID-Tab");

      await createTreeFolder('Code Selection', 'treeCodeSelection', xml);
      
      await creatingTab();
      
      addingInputElements();
      
      eventInit();
      
    }
  });
}

function populatingSelectDropdown() {
  /* Power Save */
  _populatingSelectDropdown("Battery-Profiles", "General.Battery.CI_BATTERY_PROFILES");

  /* Global Interface Features */
  _populatingSelectDropdown('Host-Commands', 'Interface.CI_IGNORE_HOST_COMMANDS');

  /* USB COM */
  _populatingSelectDropdown('Handshaking-Control-USB-COM', 'Interface.RS232-USB-COM.CI_RS232_HANDSHAKE_CONTROL');
  _populatingSelectDropdown('Beep-On-ASCII-BEL-USB-COM', 'Interface.RS232-USB-COM.CI_BEEP_ON_ASCII_BEL');
  _populatingSelectDropdown('Beep-On-Not-on-File-USB-COM', 'Interface.RS232-USB-COM.CI_BEEP_ON_NOT_ON_FILE');
  _populatingSelectDropdown('ACK-NAK-Options-USB-COM', 'Interface.RS232-USB-COM.CI_RS232_ACK_NAK_ENABLE');
  _populatingSelectDropdown('ACK-NAK-Error-Handling-USB-COM', 'Interface.RS232-USB-COM.CI_RS232_ACK_NAK_ENABLE');

  /* USB Keyboard */
  _populatingSelectDropdown('Keyboard-Country-Mode', 'Interface.USB-KBD-Wedge.CI_KEYBOARD_COUNTRY_MODE');
  _populatingSelectDropdown('Encoding-Type', 'Interface.USB-KBD-Wedge.CI_ENCODING_TYPE');
  _populatingSelectDropdown('Keyboard-Caps-Lock-State', 'Interface.USB-KBD-Wedge.CI_KEYBOARD_CAPS_LOCK_STATE');
  _populatingSelectDropdown('Keyboard-Numlock-State', 'Interface.USB-KBD-Wedge.CI_WEDGE_NUMLOCK');
  _populatingSelectDropdown('Keyboard-Numeric-Keypad', 'Interface.USB-KBD-Wedge.CI_KEYBOARD_NUMERIC_KEYPAD');
  _populatingSelectDropdown('Keyboard-Send-Control-Characters', 'Interface.USB-KBD-Wedge.CI_KEYBOARD_SEND_CTRL_CHARACTERS');
  _populatingSelectDropdown('USBKB-Suspend-Enable', 'Interface.USB.CI_USB_SUSPEND_ENABLE');

  /* USB Keyboard Wedge */
  _populatingSelectDropdown('Keyboard-Country-Mode-Wedge', 'Interface.USB-KBD-Wedge.CI_KEYBOARD_COUNTRY_MODE');
  _populatingSelectDropdown('Encoding-Type-Wedge', 'Interface.USB-KBD-Wedge.CI_ENCODING_TYPE');
  _populatingSelectDropdown('Keyboard-Caps-Lock-State-Wedge', 'Interface.RS232.CI_RS232_NUMBER_OF_DATA_BITS');
  _populatingSelectDropdown('Keyboard-Numlock-State-Wedge', 'Interface.RS232.CI_RS232_NUMBER_OF_STOP_BITS');
  _populatingSelectDropdown('Keyboard-Numeric-Keypad-Wedge', 'Interface.RS232-USB-COM.CI_RS232_HANDSHAKE_CONTROL');
  _populatingSelectDropdown('Keyboard-Send-Control-Characters-Wedge', 'Interface.RS232-USB-COM.CI_BEEP_ON_ASCII_BEL');

  /* USB-OEM */
  _populatingSelectDropdown('USB-OEM-Device-Usage', 'Interface.USB-OEM.CI_USB_IBM_SCANNER_DEVICE_USAGE_TYPE');
  _populatingSelectDropdown('USB-Suspend-Enable', 'Interface.USB.CI_USB_SUSPEND_ENABLE');

  /* IBM46XX Parameters */
  _populatingSelectDropdown('IBM-46XX-Parameters', 'Interface.IBM46xx.CI_INTERFACE_OPTIONS');

  /* RS232 Paramaters */
  _populatingSelectDropdown('Baud-Rate', 'Interface.RS232.CI_RS232_BAUD_RATE');
  _populatingSelectDropdown('Parity', 'Interface.RS232.CI_RS232_PARITY');
  _populatingSelectDropdown('Data-bits', 'Interface.RS232.CI_RS232_NUMBER_OF_DATA_BITS');
  _populatingSelectDropdown('Stop-bits', 'Interface.RS232.CI_RS232_NUMBER_OF_STOP_BITS');
  _populatingSelectDropdown('Handshaking-Control-RS232', 'Interface.RS232-USB-COM.CI_RS232_HANDSHAKE_CONTROL');
  _populatingSelectDropdown('Beep-On-ASCII-BEL-RS232', 'Interface.RS232-USB-COM.CI_BEEP_ON_ASCII_BEL');
  _populatingSelectDropdown('Beep-On-Not-on-File-RS232', 'Interface.RS232-USB-COM.CI_BEEP_ON_NOT_ON_FILE');
  _populatingSelectDropdown('ACK-NAK-Options-RS232', 'Interface.RS232-USB-COM.CI_RS232_ACK_NAK_ENABLE');
  _populatingSelectDropdown('ACK-NAK-Error-Handling-RS232', 'Interface.RS232-USB-COM.CI_RS232_ACK_NAK_ERROR_HANDLING');

  /* Radio Parameters */
  _populatingSelectDropdown('Transmission-Mode', 'Interface.Star.CI_STAR_TX_MODE');
  _populatingSelectDropdown('RF-Batch-Mode-Transmit-Delay', 'Interface.BT.CI_RF_BATCH_TX_DELAY');
  _populatingSelectDropdown('Batch-Mode', 'Interface.BT.CI_RF_BATCH_MODE');
  _populatingSelectDropdown('Source-Radio-Address-Transmit', 'Interface.Radio.CI_RF_ADDRESS_STAMPING');
  _populatingSelectDropdown('Source-Radio-Address-Delimiter-Character', 'Interface.Radio.CI_RF_ADDRESS_STAMPING_DELIMITER');

  /* Radio Beeper */
  _populatingSelectDropdown('Disconnect-Beep', 'General.Beeper.RadioBeeper.CI_BT_DISCONNECT_BEEP');
  _populatingSelectDropdown('Beep-Volume', 'General.Beeper.RadioBeeper.CI_RF_BEEP_VOLUME');
  _populatingSelectDropdown('Beep-Frequency', 'General.Beeper.RadioBeeper.CI_RF_BEEP_FREQUENCY');
  _populatingSelectDropdown('ACK-Beep', 'General.Beeper.RadioBeeper.CI_RF_ACK_BEEP');

  /* Compatibility Mode */
  _populatingSelectDropdown('Compatible-Mode-System-Speed', 'Interface.Star.CI_STAR_COMPATIBILITY');

  /* Reading Parameters */
  _populatingSelectDropdown('Scan-Mode', 'General.Read Mode.CI_READ_MODE');
  _populatingSelectDropdown('Stand-Mode-Sensitivity', 'Stand Mode.CI_STAND_MODE_SENSITIVITY');
  _populatingSelectDropdown('Stand-Base-Detection', 'General.Read Mode.CI_STAND_DETECTION');
  _populatingSelectDropdown('Stand-Mode-Flash', 'General.LED.CI_STAND_MODE_FLASH_ENABLE');
  _populatingSelectDropdown('Mobile-Phone-Mode', 'General.Read Mode.CI_MOBILE_PHONE_ENABLE');
  _populatingSelectDropdown('Pick-Mode-Aiming-Duration-Timer', 'General.Read Mode.CI_PICK_MODE_AIMING_DURATION_TIME');
  _populatingSelectDropdown('Pick-Mode-Enable', 'General.Read Mode.CI_PICK_MODE_ENABLE');

  /* Audio */
  _populatingSelectDropdown('Audio-Jingle-Enable', 'Audio Settings.CI_JINGLE_AUDIO_ENABLE');

  /* Button */
  _populatingSelectDropdown('Base-Station-Button-Enable-Disable', 'General.Button.CI_BASE_BUTTON_ENABLE');

  /* Beeper */
  _populatingSelectDropdown('Dock-Detect-Beep', 'General.Beeper.CI_DOCK_DETECT_BEEP_ENABLE');
  _populatingSelectDropdown('Good-Read-Beep-Volume', 'General.Beeper.CI_GOOD_READ_BEEP_VOLUME');
  _populatingSelectDropdown('Good-Read-Beep-Type', 'General.Beeper.CI_GOOD_READ_BEEP_TYPE');
  _populatingSelectDropdown('Power-On-Alert', 'General.Beeper.CI_POWERUP_BEEP_ENABLE');
  _populatingSelectDropdown('Good-Read-Beep-Frequency', 'General.Beeper.CI_GOOD_READ_BEEP_FREQUENCY');

  /* Motion */
  _populatingSelectDropdown('Corded-Stand-Mode', 'Stand Mode.CI_VIRTUAL_STAND_ENABLE');
  _populatingSelectDropdown('Motion-Sensitivity', 'Motion.CI_MOTION_SENSITIVITY');
  _populatingSelectDropdown('High-Motion-Immunity-Enable-Disable', 'Motion.CI_HIGH_MOTION_IMMUNITY');
  _populatingSelectDropdown('Motion-Aiming-Control', 'Motion.CI_MOTION_AIMING_CONTROL');

  /* LED */
  _populatingSelectDropdown('RGB-Good-Read-Enable', 'RGB Led Settings.CI_GOOD_READ_RGB_LED_ENABLE');
  _populatingSelectDropdown('RGB-Good-Read-Color', 'RGB Led Settings.CI_GOOD_READ_RGB_LED_COLOR');
  _populatingSelectDropdown('Good-Read-When-to-Indicate', 'General.LED.CI_GOOD_READ_WHEN_TO_INDICATE');
  _populatingSelectDropdown('Green-Spot-Duration', 'General.LED.CI_GREEN_SPOT_DURATION');

  /* Camera Control */
  _populatingSelectDropdown('llumination-System-Power-Enable', 'Decoding Signal Processing.CI_MANUAL_ILLUMINATOR_CONTROL');
  _populatingSelectDropdown('Aiming-Pointer', 'Camera Control.CI_AIMING_POINTER_ENABLE');
  _populatingSelectDropdown('Exposure-Mode', 'Decoding.Signal Processing.CI_EXPOSURE_MODE');

  /* Vibration */
  _populatingSelectDropdown('Good-Read-Vibration-Duration', 'Vibration Settings.CI_VIBRATION_GOODREAD_LENGTH');
  _populatingSelectDropdown('Good-Read-Vibration-Enable', 'Vibration Settings.CI_VIBRATION_GOODREAD_ENABLE');

  /* Decoding */
  _populatingSelectDropdown('Decode-Negative-Image', 'General.Label Reading.CI_IMAGE_DECODING_VL_REVERSE');
  _populatingSelectDropdown('Programming-Mode-Enable-Disable', 'General.Factory.CI_PROG_MODE_SWITCH_ENABLE');

  /* Data Format */
  _populatingSelectDropdown('Case-Conversion', 'Label Formatting.CI_CASE_CONVERSION');
  _populatingSelectDropdown("Global-Prefix", "Suffix.CI_GLOBAL_PREFIX");
  _populatingSelectDropdown("Global-Suffix", "Suffix.CI_GLOBAL_SUFFIX");
  _populatingSelectDropdown("Character-Conversion", "Label Formatting.CI_CHARACTER_CONVERSION");

  /* Code identifiers */
  _populatingSelectDropdown('Global-AIM-ID', 'Label Formatting.AIM ID.CI_ALL_AIM_ID_ENABLE');
  _populatingSelectDropdown("Set-Global-Mid-Label-ID-Characters", "Label Formatting.EAN Two Label.CI_GLOBAL_MID_LABEL_ID");
  _populatingSelectDropdown("Label-ID-Control", "Label Formatting.CI_LABEL_ID_CONTROL");
}

function _populatingSelectDropdown(selectID, nameNodeInXML) {
  let select = $('[_id="' + selectID + '"]');
  let parameterNames = parameters.map(parameter => parameter.name);
  var tableNames = tables.map(table => table.tableName);
  for( let parameterName of parameterNames) {
    if (parameterName == nameNodeInXML) {
      let index = parameters.findIndex(parameter => parameter.name == nameNodeInXML);
      let tableRef = parameters[index].tableRef;
      let code = parameters[index].code;
      let maxLen = parameters[index].maxLen;
      if (tableRef != 'ASCIITable' && select.children().length == 0) {
        select.append("<option value='selectOption'>" + "Select Option" + "</option>");
        for (let tableName of tableNames) {
          if (tableName == tableRef) {
            let elements = tables.filter(table => {
              if (table.tableName == tableRef) {
                return table.elementName;
              }
            });
            let elementNames = elements.map(element => element.elementName);
            let elementValues = elements.map(element => element.value);
            for (let i = 0; i < elementNames.length; i++) {
              let write = code + elementValues[i];
              select.append("<option value='" + write + "'>" + elementNames[i] + "</option>");
            }
            break;
          }
        }
      } else if (tableRef == 'ASCIITable' && select.children().length == 0) {
        select.append("<option value='selectOption'>" + "ASCII Character" + "</option>");
        for (let tableName of tableNames) {
          if (tableName == tableRef) {
            let elements = tables.filter(table => {
              if (table.tableName == tableRef) {
                return table.elementName;
              }
            });
            let elementNames = elements.map(element => element.elementName);
            let elementValues = elements.map(element => element.value);
            for (let i = 0; i < elementNames.length; i++) {
              select.append("<option value='" + elementValues[i] + "' code='" + code + "' maxLen='" + maxLen + "' >" + '[' + elementNames[i] + ']' + "</option>");
            }
            break;
          }
        }
      }
    }
  }
}


function addingInputElements() {
  $('.config').find('.input-parameter').each(function () {
    var _id = $(this).attr('id');
    var parameterIds = parameters.map(parameter => parameter.id);
    for(let parameterId of parameterIds){
      if (_id == parameterId) {
        let index = parameters.findIndex(parameter => parameter.id == _id);
        let code = parameters[index].code;
        let min = parameters[index].min;
        let max = parameters[index].max;
        let defaultValue = parameters[index].value;
        min = parseInt('0x' + min);
        max = parseInt('0x' + max);
        defaultValue = parseInt('0x' + defaultValue);
        $('#' + _id).attr('placeholder', min + ' - ' + max + ' (Default value: ' + defaultValue + ')');
        $('#' + _id).attr('min', min);
        $('#' + _id).attr('max', max);
        $('#' + _id).attr('code', code);
      }
    }
  });
}

async function creatingTab() {
  _creatingTab('CustomLinearCodeIDs');
  _creatingTab('Custom2DCodeIDs');
  _creatingTab('GeneralDecodingProperties');
  _creatingTab('EANUPCGlobalSettings');
  _creatingTab('CodeEANUPC');
  _creatingTab('GS1DataBarOmnidirectional');
  _creatingTab('GS1DataBarExpanded');
  _creatingTab('GS1DataBarLimited');
  _creatingTab('Code39');
  _creatingTab('Code128GS1128');
  _creatingTab('CodeISBT128');
  _creatingTab('CodeStandard2of5');
  _creatingTab('Compressed2of5');
  _creatingTab('Datalogic2of5');
  _creatingTab('Industrial2of5');
  _creatingTab('Interleaved2of5');
  _creatingTab('Matrix2of5');
  _creatingTab('Codabar');
  _creatingTab('Code11');
  _creatingTab('Code93');
  _creatingTab('MSI');
  _creatingTab('Plessey');
  _creatingTab('BC412');
  _creatingTab('Code4');
  _creatingTab('Code5');
  _creatingTab('CodablockF');
  _creatingTab('2DCodeSelection');
  _creatingTab('UCCComposite');
  _creatingTab('Aztec');
  _creatingTab('ChinaSensibleCode');
  _creatingTab('Code49');
  _creatingTab('Code16K');
  _creatingTab('Datamatrix');
  _creatingTab('DotCode');
  _creatingTab('Maxicode');
  _creatingTab('PDF417');
  _creatingTab('MicroPDF');
  _creatingTab('QRCode');
  _creatingTab('MicroQRCode');
  _creatingTab('PostalCodes');
}

async function _creatingTab(configID) {
  let $this = $('#' + configID);
  for (let tab of tabs) {
    if (tab.title == configID) {
      let _ID = tab.text;
      let ID = _ID.replace(/\//g, ' ').replace(/ /g, '-').replace(/\(|\)/g,'') + '-Tab-' + configID;
      $this.append('<button class="accordion" id="' + ID + '">' + _ID + '</button>');
      $this.append('<div class="panel"></div>');
      creatingTabElements(ID);
    }
  }
}

async function creatingTabElements(tabID) {
  let $this = $('#' + tabID).next('.panel');
  const TABLE_REFERENCE_REG_EXP = /^\w+/;
  for (let parameter of parameters) {
    if (parameter.tab == tabID) {
      let _ID = parameter.text;
      let ID = _ID.replace(/\s|\//g, '-');
      let tableRef = parameter.tableRef;
      tableRef = tableRef.match(TABLE_REFERENCE_REG_EXP).toString();
      let check = $('[_id="' + ID + '"]').length > 0 ? true : false;
      if( check ){
        copyingExistingElement($this, ID);
      } else {
        switch (tableRef) {
          case "CodeTable": _creatingTabElementSelectDropdown( $this, ID, _ID, parameter.name );
          break;
          case "ASCIITable": _creatingTabElementASCIICodeSelection( $this, ID, _ID, parameter.name );
          break;
          case 'exeNumericRange': _creatingTabElementInputBar( $this, ID, _ID );
          break;
        }
      }
    }
  }
}

function _creatingTabElementSelectDropdown ( parentTab, ID, _ID, parameterName){
  parentTab.append("<label> " + _ID + " </label>");
  parentTab.append('<select class="select" _id="' + ID + '"></select>');
  _populatingSelectDropdown(ID, parameterName);
}

function _creatingTabElementASCIICodeSelection( parentTab, ID, _ID, parameterName){
  parentTab.append(`<label>${_ID}</label>
          <div class='character-panel'>
          <select _id='${ID}' class='select character-select' style='width: fit-content;'></select>
          <input type='text' class='input-character-select' value readonly='readonly'>
          <button class='delete-button'>&larr;</button>
          </div>`);
  _populatingSelectDropdown(ID, parameterName);
}

function _creatingTabElementInputBar ( parentTab, ID, _ID ){
  parentTab.append(`<label>${_ID}</label><input type="number" class="input-parameter" id=${ID}>`);
}

function copyingExistingElement ( parentTab, ID ){
  let select = $('[_id="' + ID + '"]');
  let label = select.prev();

  label.clone().appendTo(parentTab);
  select.clone().appendTo(parentTab);
}

// var recurCount = 0;

async function createTreeFolder(pageName, parentID, xml) {
  // recurCount++;
  // console.log('Recursive: ' + recurCount + ' time(s)');
  $(xml).find('page').each(function () {
    let xmlPageName = $(this).attr('title');
    // console.log('finding....');
    if (xmlPageName == pageName) {
      // console.log('success');
      // let findingCount = 0;
      $(this).children('page').each(function () {
        // findingCount++;
        // console.log('Find: ' + findingCount + ' time(s)');
        // console.log('childPage: ' + $(this).attr('title'));
        // console.log('parentTree: ' + parentID);
        let _pageName = $(this).attr('title').replace();
        let _treeID = 'tree' + _pageName.replace(/\/|-|\s|\(|\)/g, '');
        let currentPage = $(this);
        let NESTED_LIST = $('#' + parentID).children('.nested');
        // console.log(NESTED_LIST);
        // console.log($('#' + parentID));
        if (currentPage.children('page').length > 0) {
          // console.log('HAS_CHILD = parentID: ' + _treeID + ' pageName: ' + _pageName);
          NESTED_LIST.append(`<li id='${_treeID}'><span class="caret"></span><a>${_pageName}</a>
          <ul class='nested'></ul></li>`);
          createTreeFolder(_pageName, _treeID, xml);
        } else {
          // console.log('DONT HAVE CHILD = pageName: ' + _pageName);
          NESTED_LIST.append(`<li>${_pageName}</li>`);
        }
      });
    }
  });
}

$(document).ready(function () {
  getXML();
});




function openTab(tabName, tabId) {
  var tabNameId = $('#' + tabName);
  $('.tabcontent').css('display', 'none');
  $('.tablinks').removeClass('active');
  tabNameId.css('display', 'block');
  $('#' + tabId).addClass('active');
}

function openConfig() {
  $('li').on('click', function (event) {
    let configName = '';
    const listElementClicked = $(this);
    const temp = listElementClicked.children('a');
    if (temp.length > 0) {
      configName = temp.text();
    } else {
      configName = listElementClicked.text();
    }
    configName = configName.replace(/-|\s|\(|\)|\//g, '');
    openTab('Configuration-Tab', 'tabConfiguration');
    let config = $('.config');
    config.css('display', 'none'); //config.hide();
    config.removeClass('active');
    event.stopPropagation();
    $('#' + configName).css('display', 'block'); // .show();
  });
}

function treeViewEvent() {
  $('li').click(function () {
    $('li').attr('class', '');
    $(this).attr('class', 'active');
  });
  $(".caret").click(function () {
    const anchor = $(this).next();
    anchor.next(".nested").toggle("active-tree-view");
    $(this).toggleClass("caret-down");
  });
}

function codeSelection(code, id, displayCode, allInOne) {
  if ($('#code-selection').val() == 'code128') {
    $('#barcode-display-1D').children().remove();
    $('#barcode-display-allInOne').children().remove();
    $('#barcode-display-datamatrix').children().remove();
    $('#barcode-display-1D').css('display', 'block');
    allInOne == false ? genCode128Barcode(code, id) : linearBarcodeGenerate();
  } else if ($('#code-selection').val() == 'datamatrix') {
    $('#barcode-display-1D').children().remove();
    $('#barcode-display-allInOne').children().remove();
    $('#barcode-display-datamatrix').children().remove();
    $('#barcode-display-2D').css('display', 'flex');
    allInOne == false ? genDatamatrixBarcode(code, id, displayCode) : twoDemensionBarcodeGenerate();
  }
}

function buttonEvent() {
  $('.configuration-btn').on('click', function () {
    var id = $(this).attr('id');
    CONFIG_BUTTON.forEach(configBtn => {
      if (configBtn.id === id) {
        codeSelection(configBtn.code, configBtn.id, false, false);
      }
    });
  });
  $('#resetButton').on('click', function () {
    $('#barcode-display-1D').children().remove();
    $('#barcode-display-allInOne').children().remove();
    $('#barcode-display-datamatrix').children().remove();
    $('.config').find('.select').each(function () {
      $(this).find('option').each(function () {
        $(this).removeAttr('selected');
        $(this).attr('selected', 'selected');
        return false;
      });
    });
    $('.config').find('.input-parameter').each(function () {
      $(this).val('');
    });
    $('.config').find('.input-character-select').each(function () {
      $(this).attr('value', '');
      $(this).attr('val', '');
    });
  });
  $('#allInOneButton').on('click', function () {
    codeSelection('', '', true, true);
  });
}

function accordion() {
  $('.accordion').on('click', function () {
    // console.log($(this));
    $(this).toggleClass('activeAccordion');
    let panel = $(this).next('.panel');
    let height = panel.prop('scrollHeight').toString() + 'px';
    if (panel.css('max-height') != '0px') {
      panel.css('max-height', '0px');
    } else {
      panel.css('max-height', height);
    }
  });
}

function characterSelection() {
  $('.character-select').on('change', function () {
    let text = $(this).find(":selected").text();
    let _value = $(this).val();
    let id = $(this).attr('_id');
    let code = $('[_id="' + id + '"]' + ' option:last-child').attr('code');
    let maxLen = $('[_id="' + id + '"]' + " option:last-child").attr("maxLen");
    console.log(code + ' ' + maxLen);
    let input = $(this).next();
    let inputValue = input.val();
    let inputVal = input.attr('val');
    if (inputVal == undefined) {
      inputVal = '';
    }
    if ((inputVal.length / 2) < parseInt(maxLen)) {
      input.attr('val', inputVal + _value);
      input.attr('value', inputValue + text);
      input.attr('code', code);
      input.attr('maxLen', maxLen);
      input.attr('_id', id);
    } else {
      alert('Exceeding the permitted character limit')
    }
    $('[_id="' + id + '"]').find('option').each(function () {
      $(this).removeAttr('selected');
      $(this).attr('selected', 'selected');
      return false;
    });
  });
  $('.delete-button').on('click', function () {
    let $this = $(this).prev();
    let val = $this.attr('val');
    let value = $this.attr('value');
    if (val == undefined) return false;
    else {
      val = val.slice(0, val.length - 2);
      value = value.slice(0, -1).slice(0, value.lastIndexOf('['));
    }
    $this.attr('val', val);
    $this.attr('value', value);
  });
}

function eventInit() {
  treeViewEvent();
  openConfig();
  buttonEvent();
  accordion();
  characterSelection();
  $('#treeConfiguration').click();
  $('#caret-start').click();
}

/*
 * END OF EVENTS
 */


/*
 *   BARCODE GENERATOR
 */

const carriageReturn = "\\r";
const carriageReturnCodeWord = "\r";
const escapeSequence = ["\\212", "\\r"];
const escapeSequenceCodeWord = ["\xC9", carriageReturnCodeWord];
var text = "";
var textDatamatrix = "";

function genDatamatrixBarcode(text, id, check) {
  console.log(text);
  text = "\\212$P," + text + ",P\\r";
  textDatamatrix = text;
  for (var i = 0; i < escapeSequence.length; i++) {
    if (text.includes(escapeSequence[i]))
      text = text.replace(escapeSequence[i], escapeSequenceCodeWord[i]);
  }
  textDatamatrix = textDatamatrix.replace("\\212", "");
  textDatamatrix = textDatamatrix.replace(carriageReturn, carriageReturnCodeWord);
  textDatamatrix = "<reader programming>" + textDatamatrix;
  if (id != 'All-In-One') {
    $('#barcode-display-datamatrix').prepend("<div id='" + id + "-datamatrix' style='margin: auto';></div>");
    $('#barcode-display-datamatrix').prepend("<h2>" + id.replace(/-/g, ' ') + "</h2>");
  } else {
    $('#barcode-display-allInOne').prepend("<div id='" + id + "-datamatrix' style='margin: auto';></div>");
    $('#barcode-display-allInOne').prepend("<h2>" + id.replace(/-/g, ' ') + "</h2>");
  }
  check == true ?
    $('#' + id + '-datamatrix').barcode(textDatamatrix, "datamatrix", {
      moduleSize: 10,
      fontSize: 20,
      showHRI: false
    }) :
    $('#' + id + '-datamatrix').barcode(textDatamatrix, "datamatrix", {
      moduleSize: 10,
      fontSize: 20,
      showHRI: true
    });
}

function genCode128Barcode(text, id) {
  text = "\\212$P," + text + ",P\\r";
  for (var i = 0; i < escapeSequence.length; i++) {
    if (text.includes(escapeSequence[i]))
      text = text.replace(escapeSequence[i], escapeSequenceCodeWord[i]);
  }
  $('#barcode-display-1D').prepend("<img id='" + id + "-code128' />");
  $('#barcode-display-1D').prepend("<h2>" + id.replace(/-/g, ' ') + "</h2>");
  JsBarcode("#" + id + "-code128", text);
}

function linearBarcodeGenerate() {
  var selectWriteConfig = '',
    inputWriteConfig = '';
  $('.config').find('.select').each(function () {
    var id = $(this).attr('_id');
    selectWriteConfig = $(this).val();
    if (selectWriteConfig != 'selectOption') {
      if (id == 'Interface-Selection') {
        genCode128Barcode(selectWriteConfig, id);
      } else {
        selectWriteConfig = 'C' + selectWriteConfig;
        genCode128Barcode(selectWriteConfig, id);
      }
    }
  });
  $('.config').find('.input-parameter').each(function () {
    var id = $(this).attr('_id');
    var code = $(this).attr('code');
    inputWriteConfig = $(this).val();
    if (inputWriteConfig != '') {
      inputWriteConfig = parseInt(inputWriteConfig).toString(16).toUpperCase();
      inputWriteConfig.length == 1 ? inputWriteConfig = 'C' + code + '0' + inputWriteConfig : inputWriteConfig = 'C' + code + inputWriteConfig;
      genCode128Barcode(inputWriteConfig, id);
    }
  });
  $('.config').find('.input-character-select').each(function () {
    let id = $(this).attr('_id');
    let code = $(this).attr('code');
    let maxLen = $(this).attr('maxLen');
    let value = $(this).attr('val');
    let inputWriteConfig = '';
    if (value == undefined) {} else if (value != '') {
      for (let i = ((value.length) / 2); i < parseInt(maxLen); i++) {
        value += '00';
      }
      inputWriteConfig = 'C' + code + value;
      genCode128Barcode(inputWriteConfig, id);
    }
  });
}

function twoDemensionBarcodeGenerate() {
  var selectWriteConfig = '',
    inputWriteConfig = '',
    allInOneWriteConfig = '';
  $('.config').find('.select').each(function () {
    var id = $(this).attr('_id');
    selectWriteConfig = $(this).val();
    if (selectWriteConfig != 'selectOption') {
      if (id == 'Interface-Selection') {
        genDatamatrixBarcode(selectWriteConfig, id, false);
        allInOneWriteConfig = allInOneWriteConfig + selectWriteConfig + ',';
      } else {
        selectWriteConfig = 'C' + selectWriteConfig;
        allInOneWriteConfig = allInOneWriteConfig + selectWriteConfig + ',';
        genDatamatrixBarcode(selectWriteConfig, id, false);
      }
    }
  });

  $('.config').find('.input-parameter').each(function () {
    var id = $(this).attr('id');
    var code = $(this).attr('code');
    inputWriteConfig = $(this).val();
    if (inputWriteConfig != '') {
      inputWriteConfig = parseInt(inputWriteConfig).toString(16).toUpperCase();
      inputWriteConfig.length == 1 ? inputWriteConfig = 'C' + code + '0' + inputWriteConfig : inputWriteConfig = 'C' + code + inputWriteConfig;
      allInOneWriteConfig = allInOneWriteConfig + inputWriteConfig + ',';
      genDatamatrixBarcode(inputWriteConfig, id, false);
    }
  });
  $('.config').find('.input-character-select').each(function () {
    let id = $(this).attr('_id');
    let code = $(this).attr('code');
    let maxLen = $(this).attr('maxLen');
    let value = $(this).attr('val');
    let inputWriteConfig = '';
    if (value == undefined) {} else if (value != '') {
      for (let i = (value.length) / 2; i < parseInt(maxLen); i++) {
        value += '00';
      }
      inputWriteConfig = 'C' + code + value;
      allInOneWriteConfig = allInOneWriteConfig + inputWriteConfig + ',';
      genDatamatrixBarcode(inputWriteConfig, id, true);
    }
  });
  allInOneWriteConfig = allInOneWriteConfig.slice(0, -1);
  if (allInOneWriteConfig != '') {
    genDatamatrixBarcode(allInOneWriteConfig, "All-In-One", true);
  }
}

/*
 *   END OF BARCODE GENERATOR
 */

/*
 * TOOLS
 */
let $codeSelectionValue = $('#code-selection').val();
$('#code-selection').on('change', () => {
  $codeSelectionValue = $('#code-selection').val();
});

$('#pdf').click(function () {
  html2canvas($('#barcode-display'), {
    onrendered: function (canvas) {
      var img = canvas.toDataURL('image/png');
      var pdf = new jsPDF('p', 'px', 'a4');
      pdf.addImage(img, 'JPEG', 0, 0);
      pdf.save('Datalogic.pdf');
    }
  });
});

$("#print").on("click", function () {
  var divContents = $(".barcode-display").html();
  var printWindow = window.open('', '', 'height=400,width=800');
  printWindow.document.write('<html><head><title>DIV Contents</title>');
  printWindow.document.write('</head><body>');
  printWindow.document.write(`<style>
  #barcode-display-1D{
    text-align: center;
  }
  #barcode-display-2D{
    justify-content: center;
  }
  </style>`);
  printWindow.document.write(divContents);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
});

const inputCCFFile = document.getElementById("CCFFile");
const CFFFileChooser = document.getElementById("ccf-filechooser");

inputCCFFile.addEventListener("click", () => {
  
  toggleModal();

});

CFFFileChooser.addEventListener("change", function () {
  console.log('ok');
  const GET_CONFIG_REG_EXP = /(\$\w+)(\s?)+(;)(\s+)(.*)/g;
  if (this.files && this.files[0]) {
    var myFile = this.files[0];
    var reader = new FileReader();
    var text = '';
    reader.addEventListener('load', function (e) {
      
      file = e.target.result;

      $('.modal__body--content-areatext').html(file); 
      $('.modal__body--button-generate').on('click', () => {
        file = $('.modal__body--content-areatext').html();
        console.log(file);
        text = file.match(GET_CONFIG_REG_EXP).join().replace(/,/g, '\n');
        // text = file.match()
        name = text.replace(GET_CONFIG_REG_EXP, '$5').replace(/\([A-Za-z0-9\s-.)]+\)/g, '').replace(/:.+/g, '');
        configName = name.match(/.+/g);
        config = text.replace(GET_CONFIG_REG_EXP, '$1').match(/\w+/g);
        configNull = file.match(/\$\w+\n/g).join().match(/\w+/g);
        for (let i = 0; i < configNull.length; i++) {
          config.unshift(configNull[i]);
          configName.unshift('Undefined Config ' + i);
        }
        let allInOneConfig = config.join();


        if ($codeSelectionValue == 'code128') {
          $('#barcode-display-1D').children().remove();
          $('#barcode-display-allInOne').children().remove();
          $('#barcode-display-datamatrix').children().remove();
          $('#barcode-display-1D').css('display', 'block');
          for (let i = 0; i < config.length; i++) {
            configName[i] = configName[i].replace(/\s|\//g, '-');
            genCode128Barcode(config[i], configName[i]);
          }
        } else if ($codeSelectionValue == 'datamatrix') {
          $('#barcode-display-1D').children().remove();
          $('#barcode-display-allInOne').children().remove();
          $('#barcode-display-datamatrix').children().remove();
          $('#barcode-display-2D').css('display', 'flex');
          for (let i = 0; i < config.length; i++) {
            configName[i] = configName[i].replace(/\s|\//g, '-');
            genDatamatrixBarcode(config[i], configName[i], false);
          }
          genDatamatrixBarcode(allInOneConfig, 'All-In-One', true);
        }
        toggleModal();
      });

    });
    reader.readAsBinaryString(myFile);
      
  }
});
/*
 * END OF TOOLS
 */

const modal = document.getElementById('ccf-modal');
const modalButton = document.getElementById('ccf-modal--button');
const modalCloseButton = document.getElementById('ccf-modal--cancel');

const toggleModal = () => {
  modal.classList.toggle("modal-active");
  $('.modal__body--content-areatext').html(''); 
} 
const windowOnClick = (e) => {
  e.target === modal ? toggleModal() : {};
}

// modalButton.addEventListener("click", toggleModal);
modalCloseButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);