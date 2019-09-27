function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/*jshint esversion: 8 */
var parameters = [];
var tables = [];
var tabs = [];
var CONFIG_BUTTON = [
  {
    id: "Restore-Deafault-Configuration",
    code: "HA00"
  },
  {
    id: "Restore-USA-Factory-Configuration",
    code: "AE"
  },
  {
    id: "Restore-EU-Factory-Configuration",
    code: "Ae"
  }
];

function _parsingParameters(xml) {
  var interfaceSelectionSelectTag = $('[_id="Interface-Selection"]');
  $(xml)
    .find("parameter")
    .each(function () {
      var name = $(this).attr("name");

      if (name == "Interface.Selection") {
        var docFragment = [];
        interfaceSelectionSelectTag.append(
          "<option value='selectOption'>" + "Select Option" + "</option>"
        );
        $(this)
          .find("value")
          .each(function () {
            var context = $(this).attr("context");
            var write = $(this).attr("write");
            write = write.replace("$", "");
            docFragment.push(
              "<option value='" + write + "'>" + context + "</option>"
            );
          });
        interfaceSelectionSelectTag.append(docFragment);
      }

      var _name = $(this).attr("name");

      var _code = $(this).attr("code");

      var _tableRef = $(this).attr("tableRef");

      var _maxLen = $(this).attr("maxLen");

      var _id = $(this).attr("id");

      var _min = $(this).attr("min");

      var _max = $(this).attr("max");

      var _value = $(this).attr("value");

      var _tab = $(this).attr("tab");

      var _text = $(this)
        .children()
        .text();

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

function _parsingTables(xml) {
  $(xml)
    .find("table")
    .each(function () {
      var _tableName = $(this).attr("name");

      var _value = "";
      var _elementName = "";
      $(this)
        .find("element")
        .each(function () {
          _elementName = $(this).attr("name");
          _value = $(this).text();
          _type = $(this).attr("type");
          tables.push({
            tableName: _tableName,
            elementName: _elementName,
            value: _value
          });
        });
    });
}

function _parsingTabs(xml) {
  $(xml)
    .find("tab")
    .each(function () {
      var _title = $(this).attr("title");

      var _type = "";
      $(this)
        .find("label")
        .each(function () {
          var _text = $(this).attr("text");

          var _type = $(this).attr("type");

          tabs.push({
            title: _title,
            text: _text,
            type: _type
          });
        });
    });
}

function _parsingXML(_x) {
  return _parsingXML2.apply(this, arguments);
}

function _parsingXML2() {
  _parsingXML2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(xml) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              _context2.next = 2;
              return _parsingParameters(xml);

            case 2:
              _parsingTables(xml);

              _parsingTabs(xml);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })
  );
  return _parsingXML2.apply(this, arguments);
}

function getXML() {
  $.ajax({
    type: "GET",
    url: "./conf/commonConfig.xml",
    dataType: "xml",
    success: (function () {
      var _success = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(xml) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  console.time("parsingxml");
                  _context.next = 3;
                  return _parsingXML(xml);

                case 3:
                  console.timeEnd("parsingxml");
                  console.time("populatingSelectDropdown");
                  populatingSelectDropdown();
                  console.timeEnd("populatingSelectDropdown");
                  console.time("creatingTabElements");
                  creatingTabElements("Symbolology-AIM-ID-Tab");
                  console.timeEnd("creatingTabElements");
                  console.time("createTreeFolder");
                  createTreeFolder("Code Selection", "treeCodeSelection", xml);
                  console.timeEnd("createTreeFolder");
                  console.time("creatingTab");
                  creatingTab();
                  console.timeEnd("creatingTab");
                  console.time("addingInputElements");
                  addingInputElements();
                  console.timeEnd("addingInputElements");
                  console.time("eventInit");
                  eventInit();
                  console.timeEnd("eventInit");

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        })
      );

      function success(_x2) {
        return _success.apply(this, arguments);
      }

      return success;
    })()
  });
}

function populatingSelectDropdown() {
  /* Power Save */
  _populatingSelectDropdown(
    "Battery-Profiles",
    "General.Battery.CI_BATTERY_PROFILES"
  );
  /* Global Interface Features */

  _populatingSelectDropdown(
    "Host-Commands",
    "Interface.CI_IGNORE_HOST_COMMANDS"
  );
  /* USB COM */

  _populatingSelectDropdown(
    "Handshaking-Control-USB-COM",
    "Interface.RS232-USB-COM.CI_RS232_HANDSHAKE_CONTROL"
  );

  _populatingSelectDropdown(
    "Beep-On-ASCII-BEL-USB-COM",
    "Interface.RS232-USB-COM.CI_BEEP_ON_ASCII_BEL"
  );

  _populatingSelectDropdown(
    "Beep-On-Not-on-File-USB-COM",
    "Interface.RS232-USB-COM.CI_BEEP_ON_NOT_ON_FILE"
  );

  _populatingSelectDropdown(
    "ACK-NAK-Options-USB-COM",
    "Interface.RS232-USB-COM.CI_RS232_ACK_NAK_ENABLE"
  );

  _populatingSelectDropdown(
    "ACK-NAK-Error-Handling-USB-COM",
    "Interface.RS232-USB-COM.CI_RS232_ACK_NAK_ENABLE"
  );
  /* USB Keyboard */

  _populatingSelectDropdown(
    "Keyboard-Country-Mode",
    "Interface.USB-KBD-Wedge.CI_KEYBOARD_COUNTRY_MODE"
  );

  _populatingSelectDropdown(
    "Encoding-Type",
    "Interface.USB-KBD-Wedge.CI_ENCODING_TYPE"
  );

  _populatingSelectDropdown(
    "Keyboard-Caps-Lock-State",
    "Interface.USB-KBD-Wedge.CI_KEYBOARD_CAPS_LOCK_STATE"
  );

  _populatingSelectDropdown(
    "Keyboard-Numlock-State",
    "Interface.USB-KBD-Wedge.CI_WEDGE_NUMLOCK"
  );

  _populatingSelectDropdown(
    "Keyboard-Numeric-Keypad",
    "Interface.USB-KBD-Wedge.CI_KEYBOARD_NUMERIC_KEYPAD"
  );

  _populatingSelectDropdown(
    "Keyboard-Send-Control-Characters",
    "Interface.USB-KBD-Wedge.CI_KEYBOARD_SEND_CTRL_CHARACTERS"
  );

  _populatingSelectDropdown(
    "USBKB-Suspend-Enable",
    "Interface.USB.CI_USB_SUSPEND_ENABLE"
  );
  /* USB Keyboard Wedge */

  _populatingSelectDropdown(
    "Keyboard-Country-Mode-Wedge",
    "Interface.USB-KBD-Wedge.CI_KEYBOARD_COUNTRY_MODE"
  );

  _populatingSelectDropdown(
    "Encoding-Type-Wedge",
    "Interface.USB-KBD-Wedge.CI_ENCODING_TYPE"
  );

  _populatingSelectDropdown(
    "Keyboard-Caps-Lock-State-Wedge",
    "Interface.RS232.CI_RS232_NUMBER_OF_DATA_BITS"
  );

  _populatingSelectDropdown(
    "Keyboard-Numlock-State-Wedge",
    "Interface.RS232.CI_RS232_NUMBER_OF_STOP_BITS"
  );

  _populatingSelectDropdown(
    "Keyboard-Numeric-Keypad-Wedge",
    "Interface.RS232-USB-COM.CI_RS232_HANDSHAKE_CONTROL"
  );

  _populatingSelectDropdown(
    "Keyboard-Send-Control-Characters-Wedge",
    "Interface.RS232-USB-COM.CI_BEEP_ON_ASCII_BEL"
  );
  /* USB-OEM */

  _populatingSelectDropdown(
    "USB-OEM-Device-Usage",
    "Interface.USB-OEM.CI_USB_IBM_SCANNER_DEVICE_USAGE_TYPE"
  );

  _populatingSelectDropdown(
    "USB-Suspend-Enable",
    "Interface.USB.CI_USB_SUSPEND_ENABLE"
  );
  /* IBM46XX Parameters */

  _populatingSelectDropdown(
    "IBM-46XX-Parameters",
    "Interface.IBM46xx.CI_INTERFACE_OPTIONS"
  );
  /* RS232 Paramaters */

  _populatingSelectDropdown("Baud-Rate", "Interface.RS232.CI_RS232_BAUD_RATE");

  _populatingSelectDropdown("Parity", "Interface.RS232.CI_RS232_PARITY");

  _populatingSelectDropdown(
    "Data-bits",
    "Interface.RS232.CI_RS232_NUMBER_OF_DATA_BITS"
  );

  _populatingSelectDropdown(
    "Stop-bits",
    "Interface.RS232.CI_RS232_NUMBER_OF_STOP_BITS"
  );

  _populatingSelectDropdown(
    "Handshaking-Control-RS232",
    "Interface.RS232-USB-COM.CI_RS232_HANDSHAKE_CONTROL"
  );

  _populatingSelectDropdown(
    "Beep-On-ASCII-BEL-RS232",
    "Interface.RS232-USB-COM.CI_BEEP_ON_ASCII_BEL"
  );

  _populatingSelectDropdown(
    "Beep-On-Not-on-File-RS232",
    "Interface.RS232-USB-COM.CI_BEEP_ON_NOT_ON_FILE"
  );

  _populatingSelectDropdown(
    "ACK-NAK-Options-RS232",
    "Interface.RS232-USB-COM.CI_RS232_ACK_NAK_ENABLE"
  );

  _populatingSelectDropdown(
    "ACK-NAK-Error-Handling-RS232",
    "Interface.RS232-USB-COM.CI_RS232_ACK_NAK_ERROR_HANDLING"
  );
  /* Radio Parameters */

  _populatingSelectDropdown(
    "Transmission-Mode",
    "Interface.Star.CI_STAR_TX_MODE"
  );

  _populatingSelectDropdown(
    "RF-Batch-Mode-Transmit-Delay",
    "Interface.BT.CI_RF_BATCH_TX_DELAY"
  );

  _populatingSelectDropdown("Batch-Mode", "Interface.BT.CI_RF_BATCH_MODE");

  _populatingSelectDropdown(
    "Source-Radio-Address-Transmit",
    "Interface.Radio.CI_RF_ADDRESS_STAMPING"
  );

  _populatingSelectDropdown(
    "Source-Radio-Address-Delimiter-Character",
    "Interface.Radio.CI_RF_ADDRESS_STAMPING_DELIMITER"
  );
  /* Radio Beeper */

  _populatingSelectDropdown(
    "Disconnect-Beep",
    "General.Beeper.RadioBeeper.CI_BT_DISCONNECT_BEEP"
  );

  _populatingSelectDropdown(
    "Beep-Volume",
    "General.Beeper.RadioBeeper.CI_RF_BEEP_VOLUME"
  );

  _populatingSelectDropdown(
    "Beep-Frequency",
    "General.Beeper.RadioBeeper.CI_RF_BEEP_FREQUENCY"
  );

  _populatingSelectDropdown(
    "ACK-Beep",
    "General.Beeper.RadioBeeper.CI_RF_ACK_BEEP"
  );
  /* Compatibility Mode */

  _populatingSelectDropdown(
    "Compatible-Mode-System-Speed",
    "Interface.Star.CI_STAR_COMPATIBILITY"
  );
  /* Reading Parameters */

  _populatingSelectDropdown("Scan-Mode", "General.Read Mode.CI_READ_MODE");

  _populatingSelectDropdown(
    "Stand-Mode-Sensitivity",
    "Stand Mode.CI_STAND_MODE_SENSITIVITY"
  );

  _populatingSelectDropdown(
    "Stand-Base-Detection",
    "General.Read Mode.CI_STAND_DETECTION"
  );

  _populatingSelectDropdown(
    "Stand-Mode-Flash",
    "General.LED.CI_STAND_MODE_FLASH_ENABLE"
  );

  _populatingSelectDropdown(
    "Mobile-Phone-Mode",
    "General.Read Mode.CI_MOBILE_PHONE_ENABLE"
  );

  _populatingSelectDropdown(
    "Pick-Mode-Aiming-Duration-Timer",
    "General.Read Mode.CI_PICK_MODE_AIMING_DURATION_TIME"
  );

  _populatingSelectDropdown(
    "Pick-Mode-Enable",
    "General.Read Mode.CI_PICK_MODE_ENABLE"
  );
  /* Audio */

  _populatingSelectDropdown(
    "Audio-Jingle-Enable",
    "Audio Settings.CI_JINGLE_AUDIO_ENABLE"
  );
  /* Button */

  _populatingSelectDropdown(
    "Base-Station-Button-Enable-Disable",
    "General.Button.CI_BASE_BUTTON_ENABLE"
  );
  /* Beeper */

  _populatingSelectDropdown(
    "Dock-Detect-Beep",
    "General.Beeper.CI_DOCK_DETECT_BEEP_ENABLE"
  );

  _populatingSelectDropdown(
    "Good-Read-Beep-Volume",
    "General.Beeper.CI_GOOD_READ_BEEP_VOLUME"
  );

  _populatingSelectDropdown(
    "Good-Read-Beep-Type",
    "General.Beeper.CI_GOOD_READ_BEEP_TYPE"
  );

  _populatingSelectDropdown(
    "Power-On-Alert",
    "General.Beeper.CI_POWERUP_BEEP_ENABLE"
  );

  _populatingSelectDropdown(
    "Good-Read-Beep-Frequency",
    "General.Beeper.CI_GOOD_READ_BEEP_FREQUENCY"
  );
  /* Motion */

  _populatingSelectDropdown(
    "Corded-Stand-Mode",
    "Stand Mode.CI_VIRTUAL_STAND_ENABLE"
  );

  _populatingSelectDropdown(
    "Motion-Sensitivity",
    "Motion.CI_MOTION_SENSITIVITY"
  );

  _populatingSelectDropdown(
    "High-Motion-Immunity-Enable-Disable",
    "Motion.CI_HIGH_MOTION_IMMUNITY"
  );

  _populatingSelectDropdown(
    "Motion-Aiming-Control",
    "Motion.CI_MOTION_AIMING_CONTROL"
  );
  /* LED */

  _populatingSelectDropdown(
    "RGB-Good-Read-Enable",
    "RGB Led Settings.CI_GOOD_READ_RGB_LED_ENABLE"
  );

  _populatingSelectDropdown(
    "RGB-Good-Read-Color",
    "RGB Led Settings.CI_GOOD_READ_RGB_LED_COLOR"
  );

  _populatingSelectDropdown(
    "Good-Read-When-to-Indicate",
    "General.LED.CI_GOOD_READ_WHEN_TO_INDICATE"
  );

  _populatingSelectDropdown(
    "Green-Spot-Duration",
    "General.LED.CI_GREEN_SPOT_DURATION"
  );
  /* Camera Control */

  _populatingSelectDropdown(
    "llumination-System-Power-Enable",
    "Decoding Signal Processing.CI_MANUAL_ILLUMINATOR_CONTROL"
  );

  _populatingSelectDropdown(
    "Aiming-Pointer",
    "Camera Control.CI_AIMING_POINTER_ENABLE"
  );

  _populatingSelectDropdown(
    "Exposure-Mode",
    "Decoding.Signal Processing.CI_EXPOSURE_MODE"
  );
  /* Vibration */

  _populatingSelectDropdown(
    "Good-Read-Vibration-Duration",
    "Vibration Settings.CI_VIBRATION_GOODREAD_LENGTH"
  );

  _populatingSelectDropdown(
    "Good-Read-Vibration-Enable",
    "Vibration Settings.CI_VIBRATION_GOODREAD_ENABLE"
  );
  /* Decoding */

  _populatingSelectDropdown(
    "Decode-Negative-Image",
    "General.Label Reading.CI_IMAGE_DECODING_VL_REVERSE"
  );

  _populatingSelectDropdown(
    "Programming-Mode-Enable-Disable",
    "General.Factory.CI_PROG_MODE_SWITCH_ENABLE"
  );
  /* Data Format */

  _populatingSelectDropdown(
    "Case-Conversion",
    "Label Formatting.CI_CASE_CONVERSION"
  );

  _populatingSelectDropdown("Global-Prefix", "Suffix.CI_GLOBAL_PREFIX");

  _populatingSelectDropdown("Global-Suffix", "Suffix.CI_GLOBAL_SUFFIX");

  _populatingSelectDropdown(
    "Character-Conversion",
    "Label Formatting.CI_CHARACTER_CONVERSION"
  );
  /* Code identifiers */

  _populatingSelectDropdown(
    "Global-AIM-ID",
    "Label Formatting.AIM ID.CI_ALL_AIM_ID_ENABLE"
  );

  _populatingSelectDropdown(
    "Set-Global-Mid-Label-ID-Characters",
    "Label Formatting.EAN Two Label.CI_GLOBAL_MID_LABEL_ID"
  );

  _populatingSelectDropdown(
    "Label-ID-Control",
    "Label Formatting.CI_LABEL_ID_CONTROL"
  );
}

function _populatingSelectDropdown(selectID, nameNodeInXML) {
  var select = $('[_id="' + selectID + '"]');
  var parameterNames = parameters.map(function (parameter) {
    return parameter.name;
  });
  var tableNames = tables.map(function (table) {
    return table.tableName;
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = parameterNames[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var parameterName = _step.value;

      if (parameterName == nameNodeInXML) {
        (function () {
          var index = parameters.findIndex(function (parameter) {
            return parameter.name == nameNodeInXML;
          });
          var tableRef = parameters[index].tableRef;
          var code = parameters[index].code;
          var maxLen = parameters[index].maxLen;

          if (tableRef != "ASCIITable" && select.children().length == 0) {
            select.append(
              "<option value='selectOption'>" + "Select Option" + "</option>"
            );
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (
                var _iterator2 = tableNames[Symbol.iterator](), _step2;
                !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
                  .done);
                _iteratorNormalCompletion2 = true
              ) {
                var tableName = _step2.value;

                if (tableName == tableRef) {
                  var elements = tables.filter(function (table) {
                    if (table.tableName == tableRef) {
                      return table.elementName;
                    }
                  });
                  var elementNames = elements.map(function (element) {
                    return element.elementName;
                  });
                  var elementValues = elements.map(function (element) {
                    return element.value;
                  });
                  var docFragment = [];

                  for (var i = 0; i < elementNames.length; i++) {
                    var write = code + elementValues[i];
                    docFragment.push(
                      "<option value='" +
                      write +
                      "'>" +
                      elementNames[i] +
                      "</option>"
                    );
                  }

                  select.append(docFragment);
                  break;
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (
                  !_iteratorNormalCompletion2 &&
                  _iterator2["return"] != null
                ) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          } else if (
            tableRef == "ASCIITable" &&
            select.children().length == 0
          ) {
            select.append(
              "<option value='selectOption'>" + "ASCII Character" + "</option>"
            );
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (
                var _iterator3 = tableNames[Symbol.iterator](), _step3;
                !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next())
                  .done);
                _iteratorNormalCompletion3 = true
              ) {
                var _tableName2 = _step3.value;

                if (_tableName2 == tableRef) {
                  var _elements = tables.filter(function (table) {
                    if (table.tableName == tableRef) {
                      return table.elementName;
                    }
                  });

                  var _elementNames = _elements.map(function (element) {
                    return element.elementName;
                  });

                  var _elementValues = _elements.map(function (element) {
                    return element.value;
                  });

                  var _docFragment = [];

                  for (var _i = 0; _i < _elementNames.length; _i++) {
                    _docFragment.push(
                      "<option value='" +
                      _elementValues[_i] +
                      "' code='" +
                      code +
                      "' maxLen='" +
                      maxLen +
                      "' >" +
                      "[" +
                      _elementNames[_i] +
                      "]" +
                      "</option>"
                    );
                  }

                  select.append(_docFragment);
                  break;
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (
                  !_iteratorNormalCompletion3 &&
                  _iterator3["return"] != null
                ) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        })();
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function addingInputElements() {
  $(".config")
    .find(".input-parameter")
    .each(function () {
      var _id = $(this).attr("id");

      var parameterIds = parameters.map(function (parameter) {
        return parameter.id;
      });
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (
          var _iterator4 = parameterIds[Symbol.iterator](), _step4;
          !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
          _iteratorNormalCompletion4 = true
        ) {
          var parameterId = _step4.value;

          if (_id == parameterId) {
            var index = parameters.findIndex(function (parameter) {
              return parameter.id == _id;
            });
            var code = parameters[index].code;
            var min = parameters[index].min;
            var max = parameters[index].max;
            var defaultValue = parameters[index].value;
            min = parseInt("0x" + min);
            max = parseInt("0x" + max);
            defaultValue = parseInt("0x" + defaultValue);
            $("#" + _id).attr(
              "placeholder",
              min + " - " + max + " (Default value: " + defaultValue + ")"
            );
            $("#" + _id).attr("min", min);
            $("#" + _id).attr("max", max);
            $("#" + _id).attr("code", code);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    });
}

function creatingTab() {
  _creatingTab("CustomLinearCodeIDs");

  _creatingTab("Custom2DCodeIDs");

  _creatingTab("GeneralDecodingProperties");

  _creatingTab("EANUPCGlobalSettings");

  _creatingTab("CodeEANUPC");

  _creatingTab("GS1DataBarOmnidirectional");

  _creatingTab("GS1DataBarExpanded");

  _creatingTab("GS1DataBarLimited");

  _creatingTab("Code39");

  _creatingTab("Code128GS1128");

  _creatingTab("CodeISBT128");

  _creatingTab("CodeStandard2of5");

  _creatingTab("Compressed2of5");

  _creatingTab("Datalogic2of5");

  _creatingTab("Industrial2of5");

  _creatingTab("Interleaved2of5");

  _creatingTab("Matrix2of5");

  _creatingTab("Codabar");

  _creatingTab("Code11");

  _creatingTab("Code93");

  _creatingTab("MSI");

  _creatingTab("Plessey");

  _creatingTab("BC412");

  _creatingTab("Code4");

  _creatingTab("Code5");

  _creatingTab("CodablockF");

  _creatingTab("2DCodeSelection");

  _creatingTab("UCCComposite");

  _creatingTab("Aztec");

  _creatingTab("ChinaSensibleCode");

  _creatingTab("Code49");

  _creatingTab("Code16K");

  _creatingTab("Datamatrix");

  _creatingTab("DotCode");

  _creatingTab("Maxicode");

  _creatingTab("PDF417");

  _creatingTab("MicroPDF");

  _creatingTab("QRCode");

  _creatingTab("MicroQRCode");

  _creatingTab("PostalCodes");
}

function _creatingTab(configID) {
  var $this = $("#" + configID);

  var _ID;

  var ID;
  var docFragment = [];
  var IDlist = [];
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (
      var _iterator5 = tabs[Symbol.iterator](), _step5;
      !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
      _iteratorNormalCompletion5 = true
    ) {
      var tab = _step5.value;

      if (tab.title == configID) {
        _ID = tab.text;
        ID =
          _ID
            .replace(/\//g, " ")
            .replace(/ /g, "-")
            .replace(/\(|\)/g, "") +
          "-Tab-" +
          configID;
        docFragment.push(
          '<button class="accordion" id="' + ID + '">' + _ID + "</button>"
        );
        docFragment.push('<div class="panel"></div>');
        IDlist.push(ID);
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  $this.append(docFragment);

  for (var index in IDlist) {
    creatingTabElements(IDlist[index]);
  }
}

function creatingTabElements(tabID) {
  var $this = $("#" + tabID).next(".panel");
  var TABLE_REFERENCE_REG_EXP = /^\w+/;
  var docFragmentCodeTable = [];
  var docFragmentASCIITable = [];
  var docFragmentExeNumericRange = [];
  var codeTableIDList = [];
  var ASCIITableIDList = [];
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (
      var _iterator6 = parameters[Symbol.iterator](), _step6;
      !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
      _iteratorNormalCompletion6 = true
    ) {
      var parameter = _step6.value;

      if (parameter.tab == tabID) {
        var _ID = parameter.text;

        var ID = _ID.replace(/\s|\//g, "-");

        var tableRef = parameter.tableRef;
        tableRef = tableRef.match(TABLE_REFERENCE_REG_EXP).toString();
        /*use for ascii table */

        var maxLen = parameter.maxLen;
        var code = parameter.code;
        /*use for ascii table */

        var check = $('[_id="' + ID + '"]').length > 0 ? true : false;

        if (check) {
          copyingExistingElement($this, ID);
        } else {
          switch (tableRef) {
            case "CodeTable":
              {
                docFragmentCodeTable.push("<label> " + _ID + " </label>");
                docFragmentCodeTable.push(
                  '<select class="select" _id="' + ID + '"></select>'
                );
                codeTableIDList.push({
                  id: ID,
                  name: parameter.name
                });
              }
              break;
            // case "ASCIITable": {
            //   docFragmentASCIITable.push(`<label>${_ID}</label>
            //   <div class='character-panel'>
            //   <select _id='${ID}' class='select character-select' style='width: fit-content;'></select>
            //   <input type='text' class='input-character-select' value readonly='readonly'>
            //   <button class='delete-button'>&larr;</button>
            //   </div>`);
            //   ASCIITableIDList.push({
            //     id: ID,
            //     name: parameter.name
            //   })
            // }
            //   break;

            case "ASCIITable": {
              docFragmentASCIITable.push(
                "<label>"
                  .concat(
                    _ID,
                    "</label>\n            <div class='character-panel'>\n            <button data-id='"
                  )
                  .concat(
                    ID,
                    "' class='ASCII-btn'>ASCII Character</button>\n            <input type='text' class='input-character-select' data-maxlen='"
                  )
                  .concat(maxLen, "' data-code='")
                  .concat(
                    code,
                    "' value readonly='readonly'>\n            </div>"
                  )
              );
              ASCIITableIDList.push({
                id: ID,
                name: parameter.name
              });
            }

            case "exeNumericRange":
              {
                docFragmentExeNumericRange.push(
                  "<label>"
                    .concat(
                      _ID,
                      '</label><input type="number" class="input-parameter" id='
                    )
                    .concat(ID, ">")
                );
              }
              break;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  if (docFragmentCodeTable.length > 0) {
    $this.append(docFragmentCodeTable);

    for (var index in codeTableIDList) {
      _populatingSelectDropdown(
        codeTableIDList[index].id,
        codeTableIDList[index].name
      );
    }
  } else if (docFragmentASCIITable.length > 0) {
    $this.append(docFragmentASCIITable); // for (let index in ASCIITableIDList) {
    //   _populatingSelectDropdown(ASCIITableIDList[index].id, ASCIITableIDList[index].name);
    // }
  } else {
    $this.append(docFragmentExeNumericRange);
  }
}

function copyingExistingElement(parentTab, ID) {
  var select = $('[_id="' + ID + '"]');
  var label = select.prev();
  label.clone().appendTo(parentTab);
  select.clone().appendTo(parentTab);
} // var recurCount = 0;

function createTreeFolder(pageName, parentID, xml) {
  // recurCount++;
  // console.log('Recursive: ' + recurCount + ' time(s)');
  $(xml)
    .find("page")
    .each(function () {
      var xmlPageName = $(this).attr("title"); // console.log('finding....');

      if (xmlPageName == pageName) {
        // console.log('success');
        // let findingCount = 0;
        $(this)
          .children("page")
          .each(function () {
            // findingCount++;
            // console.log('Find: ' + findingCount + ' time(s)');
            // console.log('childPage: ' + $(this).attr('title'));
            // console.log('parentTree: ' + parentID);
            var _pageName = $(this)
              .attr("title")
              .replace();

            var _treeID = "tree" + _pageName.replace(/\/|-|\s|\(|\)/g, "");

            var currentPage = $(this);
            var NESTED_LIST = $("#" + parentID).children(".nested"); // console.log(NESTED_LIST);
            // console.log($('#' + parentID));

            if (currentPage.children("page").length > 0) {
              // console.log('HAS_CHILD = parentID: ' + _treeID + ' pageName: ' + _pageName);
              NESTED_LIST.append(
                "<li id='"
                  .concat(_treeID, '\'><span class="caret"></span><a>')
                  .concat(
                    _pageName,
                    "</a>\n          <ul class='nested'></ul></li>"
                  )
              );
              createTreeFolder(_pageName, _treeID, xml);
            } else {
              // console.log('DONT HAVE CHILD = pageName: ' + _pageName);
              NESTED_LIST.append("<li>".concat(_pageName, "</li>"));
            }
          });
      }
    });
}

$(document).ready(function () {
  getXML();
});

function openTab(tabName, tabId) {
  var tabNameId = $("#" + tabName);
  $(".tabcontent").css("display", "none");
  $(".tablinks").removeClass("active");
  tabNameId.css("display", "block");
  $("#" + tabId).addClass("active");
}

function openConfig() {
  $("li").on("click", function (event) {
    var configName = "";
    var listElementClicked = $(this);
    var temp = listElementClicked.children("a");

    if (temp.length > 0) {
      configName = temp.text();
    } else {
      configName = listElementClicked.text();
    }

    configName = configName.replace(/-|\s|\(|\)|\//g, "");
    openTab("Configuration-Tab", "tabConfiguration");
    var config = $(".config");
    config.css("display", "none"); //config.hide();

    config.removeClass("active");
    event.stopPropagation();
    $("#" + configName).css("display", "block"); // .show();
  });
}

function treeViewEvent() {
  $("li").click(function () {
    $("li").attr("class", "");
    $(this).attr("class", "active");
  });
  $(".caret").click(function () {
    var anchor = $(this).next();
    anchor.next(".nested").toggle("active-tree-view");
    $(this).toggleClass("caret-down");
  });
}

function codeSelection(code, id, displayCode, allInOne) {
  if ($("#code-selection").val() == "code128") {
    $("#barcode-display-1D")
      .children()
      .remove();
    $("#barcode-display-allInOne")
      .children()
      .remove();
    $("#barcode-display-datamatrix")
      .children()
      .remove();
    $("#barcode-display-1D").css("display", "block");
    allInOne == false ? genCode128Barcode(code, id) : linearBarcodeGenerate();
  } else if ($("#code-selection").val() == "datamatrix") {
    $("#barcode-display-1D")
      .children()
      .remove();
    $("#barcode-display-allInOne")
      .children()
      .remove();
    $("#barcode-display-datamatrix")
      .children()
      .remove();
    $("#barcode-display-2D").css("display", "flex");
    allInOne == false
      ? genDatamatrixBarcode(code, id, displayCode)
      : twoDemensionBarcodeGenerate();
  }
}

function buttonEvent() {
  $(".configuration-btn").on("click", function () {
    var id = $(this).attr("id");
    CONFIG_BUTTON.forEach(function (configBtn) {
      if (configBtn.id === id) {
        codeSelection(configBtn.code, configBtn.id, false, false);
      }
    });
  });
  $("#resetButton").on("click", function () {
    $("#barcode-display-1D")
      .children()
      .remove();
    $("#barcode-display-allInOne")
      .children()
      .remove();
    $("#barcode-display-datamatrix")
      .children()
      .remove();
    $(".config")
      .find(".select")
      .each(function () {
        $(this)
          .find("option")
          .each(function () {
            $(this).removeAttr("selected");
            $(this).attr("selected", "selected");
            return false;
          });
      });
    $(".config")
      .find(".input-parameter")
      .each(function () {
        $(this).val("");
      });
    $(".config")
      .find(".input-character-select")
      .each(function () {
        $(this).attr("value", "");
        $(this).attr("data-value", "");
      });
  });
  $("#allInOneButton").on("click", function () {
    codeSelection("", "", true, true);
  });
  $(".ASCII-btn").on("click", function () {
    //get max len$('.ASCII-btn').on('click', function () {
    var input = $(this).next();
    var id = $(this).data("id");
    var maxLen = input.data("maxlen");
    $("#ASCII-input-bar").attr("data-maxlen", maxLen);
    $("#ASCII-input-bar").attr("data-value", "");
    $("#ASCII-input-bar").attr("data-id", id);
    toggleASCIIModal();
  });
}

function ASCIEvent() {
  creatingASCIIModal();
  ASCIICharacterSelectionEvent();
  ASCIISelectedEvent();
}

function creatingASCIIModal() {
  var asciiModal = $("#ASCII-modal");
  var content = asciiModal.find(".modal__body--content");
  console.log(content);
  var tempTables = tables.filter(function (table) {
    return table.tableName === "ASCIITable";
  });
  var buttonFragment = tempTables.map(function (table) {
    return "<button class='ASCII-character' data-value='"
      .concat(table.value, "'>")
      .concat(table.elementName, "</button>");
  });
  console.log(buttonFragment);
  content.append(buttonFragment);
}

function ASCIICharacterSelectionEvent() {
  $(".ASCII-character").on("click", function () {
    var inputBar = $("#ASCII-input-bar");
    var value = inputBar.attr("data-value");
    var maxLen = inputBar.data("maxlen");
    var text = inputBar.attr("value");

    if (value == undefined) {
      value = "";
    }

    if (value.length / 2 < parseInt(maxLen)) {
      value += $(this).data("value");
      text += "[" + $(this).text() + "]";
      inputBar.attr("data-value", value);
      inputBar.attr("value", text);
    } else {
      alert(
        "The maximun character is: " +
        maxLen +
        " characters. You cannot add more"
      );
    }
  });
}

function ASCIISelectedEvent() {
  $("#ASCII-ok").on("click", function () {
    //value attr display text and data-value attr display value
    $("button").each(function () {
      var buttonClicked = $(this);
      var input = $("#ASCII-input-bar");
      var value = input.attr("data-value");
      var text = input.attr("value");
      var id = input.attr("data-id");

      if (buttonClicked.attr("data-id") === id) {
        console.log(buttonClicked);
        buttonClicked.next().attr("value", text);
        buttonClicked.next().attr("data-value", value);
        buttonClicked.next().attr("data-id", id);
      }
    });
    $("#ASCII-input-bar").attr("value", "");
    $("#ASCII-input-bar").attr("data-maxLen", "");
    $("#ASCII-input-bar").attr("data-value", "");
    $("#ASCII-input-bar").attr("data-id", ""); // $('button').data('id') === $('#' + id).next().attr('value', text);
    // $('#' + id).next().attr('data-value', value);

    toggleASCIIModal();
  });
  $("#ASCII-cancel").on("click", function () {
    toggleASCIIModal();
  });
}

function accordion() {
  $(".accordion").on("click", function () {
    // console.log($(this));
    $(this).toggleClass("activeAccordion");
    var panel = $(this).next(".panel");
    var height = panel.prop("scrollHeight").toString() + "px";

    if (panel.css("max-height") != "0px") {
      panel.css("max-height", "0px");
    } else {
      panel.css("max-height", height);
    }
  });
}

function characterSelection() {
  $(".character-select").on("change", function () {
    var text = $(this)
      .find(":selected")
      .text();

    var _value = $(this).val();

    var id = $(this).attr("_id");
    var code = $('[_id="' + id + '"]' + " option:last-child").attr("code");
    var maxLen = $('[_id="' + id + '"]' + " option:last-child").attr("maxLen");
    console.log(code + " " + maxLen);
    var input = $(this).next();
    var inputValue = input.val();
    var inputVal = input.attr("val");

    if (inputVal == undefined) {
      inputVal = "";
    }

    if (inputVal.length / 2 < parseInt(maxLen)) {
      input.attr("data-value", inputVal + _value);
      input.attr("value", inputValue + text);
      input.attr("data-code", code);
      input.attr("data-maxlen", maxLen);
      input.attr("data-id", id);
    } else {
      alert("Exceeding the permitted character limit");
    }

    $('[_id="' + id + '"]')
      .find("option")
      .each(function () {
        $(this).removeAttr("selected");
        $(this).attr("selected", "selected");
        return false;
      });
  });
  $(".delete-button").on("click", function () {
    var $this = $(this).prev();
    var value = $this.attr("data-value");
    var text = $this.attr("value");
    if (value == undefined) return false;
    else {
      value = value.slice(0, value.length - 2);
      console.log(value);
      var theLastChar = text.charAt(text.length - 1);
      var thePrevLastChar = text.charAt(text.length - 2);
      var thePrevofPrevLastChar = text.charAt(text.length - 3);

      if (
        thePrevLastChar === theLastChar ||
        thePrevLastChar === thePrevofPrevLastChar
      ) {
        text = text.slice(0, -3);
      } else {
        text = text.slice(0, -1).slice(0, text.lastIndexOf("["));
      }

      console.log(text);
    }
    $this.attr("data-value", value);
    $this.attr("value", text);
  });
}

function eventInit() {
  treeViewEvent();
  openConfig();
  buttonEvent();
  ASCIEvent();
  accordion();
  characterSelection();
  $("#treeConfiguration").click();
  $("#caret-start").click();
  CFFEventInit();
}
/*
 * END OF EVENTS
 */

/*
 *   BARCODE GENERATOR
 */

var carriageReturn = "\\r";
var carriageReturnCodeWord = "\r";
var escapeSequence = ["\\212", "\\r"];
var escapeSequenceCodeWord = ["\xC9", carriageReturnCodeWord];
var text = "";
var textDatamatrix = "";

function genDatamatrixBarcode(text, id, check) {
  text = "\\212$P," + text + ",P\\r";
  textDatamatrix = text;

  for (var i = 0; i < escapeSequence.length; i++) {
    if (text.includes(escapeSequence[i]))
      text = text.replace(escapeSequence[i], escapeSequenceCodeWord[i]);
  }

  textDatamatrix = textDatamatrix.replace("\\212", "");
  textDatamatrix = textDatamatrix.replace(
    carriageReturn,
    carriageReturnCodeWord
  );
  textDatamatrix = "<reader programming>" + textDatamatrix;

  if (id != "All-In-One") {
    $("#barcode-display-datamatrix").prepend(
      "<div id='" + id + "-datamatrix' style='margin: auto';></div>"
    );
    $("#barcode-display-datamatrix").prepend(
      "<h2>" + id.replace(/-/g, " ") + "</h2>"
    );
  } else {
    $("#barcode-display-allInOne").prepend(
      "<div id='" + id + "-datamatrix' style='margin: auto';></div>"
    );
    $("#barcode-display-allInOne").prepend(
      "<h2>" + id.replace(/-/g, " ") + "</h2>"
    );
  }

  check == true
    ? $("#" + id + "-datamatrix").barcode(textDatamatrix, "datamatrix", {
      moduleSize: 10,
      fontSize: 20,
      showHRI: false
    })
    : $("#" + id + "-datamatrix").barcode(textDatamatrix, "datamatrix", {
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

  $("#barcode-display-1D").prepend("<img id='" + id + "-code128' />");
  $("#barcode-display-1D").prepend("<h2>" + id.replace(/-/g, " ") + "</h2>");
  JsBarcode("#" + id + "-code128", text);
}

function linearBarcodeGenerate() {
  var selectWriteConfig = "",
    inputWriteConfig = "";
  $(".config")
    .find(".select")
    .each(function () {
      var id = $(this).attr("_id");
      selectWriteConfig = $(this).val();

      if (selectWriteConfig != "selectOption") {
        if (id == "Interface-Selection") {
          genCode128Barcode(selectWriteConfig, id);
        } else {
          selectWriteConfig = "C" + selectWriteConfig;
          genCode128Barcode(selectWriteConfig, id);
        }
      }
    });
  $(".config")
    .find(".input-parameter")
    .each(function () {
      var id = $(this).attr("_id");
      var code = $(this).attr("code");
      inputWriteConfig = $(this).val();

      if (inputWriteConfig != "") {
        inputWriteConfig = parseInt(inputWriteConfig)
          .toString(16)
          .toUpperCase();
        inputWriteConfig.length == 1
          ? (inputWriteConfig = "C" + code + "0" + inputWriteConfig)
          : (inputWriteConfig = "C" + code + inputWriteConfig);
        genCode128Barcode(inputWriteConfig, id);
      }
    });
  $(".config")
    .find(".input-character-select")
    .each(function () {
      var id = $(this).attr("data-id");
      var code = $(this).attr("data-code");
      var maxLen = $(this).attr("data-maxlen");
      var value = $(this).attr("data-value");
      var inputWriteConfig = "";

      if (value == undefined) {
      } else if (value != "") {
        for (var i = value.length / 2; i < parseInt(maxLen); i++) {
          value += "00";
        }

        inputWriteConfig = "C" + code + value;
        genCode128Barcode(inputWriteConfig, id);
      }
    });
}

function twoDemensionBarcodeGenerate() {
  var selectWriteConfig = "",
    inputWriteConfig = "",
    allInOneWriteConfig = "";
  $(".config")
    .find(".select")
    .each(function () {
      var id = $(this).attr("_id");
      selectWriteConfig = $(this).val();

      if (selectWriteConfig != "selectOption") {
        if (id == "Interface-Selection") {
          genDatamatrixBarcode(selectWriteConfig, id, false);
          allInOneWriteConfig = allInOneWriteConfig + selectWriteConfig + ",";
        } else {
          selectWriteConfig = "C" + selectWriteConfig;
          allInOneWriteConfig = allInOneWriteConfig + selectWriteConfig + ",";
          genDatamatrixBarcode(selectWriteConfig, id, false);
        }
      }
    });
  $(".config")
    .find(".input-parameter")
    .each(function () {
      var id = $(this).attr("id");
      var code = $(this).attr("code");
      inputWriteConfig = $(this).val();

      if (inputWriteConfig != "") {
        inputWriteConfig = parseInt(inputWriteConfig)
          .toString(16)
          .toUpperCase();
        inputWriteConfig.length == 1
          ? (inputWriteConfig = "C" + code + "0" + inputWriteConfig)
          : (inputWriteConfig = "C" + code + inputWriteConfig);
        allInOneWriteConfig = allInOneWriteConfig + inputWriteConfig + ",";
        genDatamatrixBarcode(inputWriteConfig, id, false);
      }
    });
  $(".config")
    .find(".input-character-select")
    .each(function () {
      var id = $(this).attr("data-id");
      var code = $(this).attr("data-code");
      var maxLen = $(this).attr("data-maxlen");
      var value = $(this).attr("data-value");
      var inputWriteConfig = "";

      if (value == undefined) {
      } else if (value != "") {
        for (var i = value.length / 2; i < parseInt(maxLen); i++) {
          value += "00";
        }

        inputWriteConfig = "C" + code + value;
        allInOneWriteConfig = allInOneWriteConfig + inputWriteConfig + ",";
        genDatamatrixBarcode(inputWriteConfig, id, false);
      }
    });
  allInOneWriteConfig = allInOneWriteConfig.slice(0, -1);

  if (allInOneWriteConfig != "") {
    genDatamatrixBarcode(allInOneWriteConfig, "All-In-One", true);
  }
}
/*
 *   END OF BARCODE GENERATOR
 */

/*
 * TOOLS
 */

var importCCFFile = document.getElementById("import-CCFFile");
var CFFFileChooser = document.getElementById("ccf-filechooser");
var import_modal = document.getElementById("import-ccf-modal");
var import_modalCloseButton = document.getElementById(
  "import-ccf-modal--cancel"
);
var exportCCFFile = document.getElementById("export-CCFFile");
var export_modal = document.getElementById("export-ccf-modal");
var export_button = document.getElementById("export-button");
var export_modalCloseButton = document.getElementById(
  "export-ccf-modal--cancel"
);
var ASCIImodal = document.getElementById("ASCII-modal");

function toggleASCIIModal() {
  ASCIImodal.classList.toggle("modal-active");
}

function toggleModal(target) {
  switch (target) {
    case "import":
      {
        import_modal.classList.toggle("modal-active");
        $("#import-textarea").html("");
      }
      break;

    case "export":
      {
        var items = exportCustomConfiguration();
        var textBox = document.getElementById("export-textarea");
        var _text2 = "";

        for (var i = 0; i < items.length; i++) {
          _text2 = _text2 + items[i] + "\n";
        }

        textBox.textContent = _text2;
        export_modal.classList.toggle("modal-active");
      }
      break;
  }
}

function windowOnClick(e) {
  e.target === import_modal ? toggleModal("import") : {};
  e.target === export_modal ? toggleModal("export") : {};
}

function exportCustomConfiguration() {
  var configs = [];
  var configNames = [];
  var items = [];

  if ($("#code-selection").val() == "code128") {
  } else if ($("#code-selection").val() == "datamatrix") {
    $("#barcode-display-datamatrix")
      .children("h2")
      .each(function () {
        configNames.push($(this).text() + ":");
      });
    $("#barcode-display-datamatrix")
      .find("reader")
      .each(function () {
        var temp = $(this).text(); //remove $P, ,P

        temp = temp.substring(temp.indexOf(",") + 1, temp.lastIndexOf(","));
        temp = "$" + temp;
        configs.push(temp);
      });
  }

  for (var i in configs) {
    var temp = configs[i] + " ; " + configNames[i];

    if (temp.includes("Undefined Config")) {
      temp = temp.slice(0, temp.indexOf(";") - 1);
    }

    items.push(temp);
  }

  return items;
}

function CFFEventInit() {
  var $codeSelectionValue = $("#code-selection").val();
  $("#code-selection").on("change", function () {
    $codeSelectionValue = $("#code-selection").val();
  });
  import_modalCloseButton.addEventListener("click", function () {
    toggleModal("import");
  });
  export_modalCloseButton.addEventListener("click", function () {
    toggleModal("export");
  });
  importCCFFile.addEventListener("click", function () {
    toggleModal("import");
  });
  exportCCFFile.addEventListener("click", function () {
    toggleModal("export");
  }); // window.addEventListener("click", windowOnClick);

  CFFFileChooser.addEventListener("change", function () {
    console.log("ok");
    var GET_CONFIG_REG_EXP = /(\$\w+)(\s?)+(;)(\s+)(.*)/g;

    if (this.files && this.files[0]) {
      console.log("success");
      var myFile = this.files[0];
      var reader = new FileReader();
      var text = "";
      reader.addEventListener("load", function (e) {
        file = e.target.result;
        $("#import-textarea").val("");
        $("#import-textarea").val(file);
        $("#import-button").on("click", function () {
          console.log("now-click");
          file = $("#import-textarea").val();
          console.log(file);

          if (file.match(GET_CONFIG_REG_EXP) != null) {
            text = file
              .match(GET_CONFIG_REG_EXP)
              .join()
              .replace(/,/g, "\n");
            name = text
              .replace(GET_CONFIG_REG_EXP, "$5")
              .replace(/\([A-Za-z0-9\s-.)]+\)/g, "")
              .replace(/:.+/g, "")
              .replace(/:/g, "");
            configName = name.match(/.+/g);
            config = text.replace(GET_CONFIG_REG_EXP, "$1").match(/\w+/g);
          }

          if (file.match(/\$\w+\n/g) != null) {
            configNull = file
              .match(/\$\w+\n/g)
              .join()
              .match(/\w+/g);

            for (var i = 0; i < configNull.length; i++) {
              config.unshift(configNull[i]);
              configName.unshift("Undefined Config " + i);
            }
          }

          var allInOneConfig = config.join();

          if ($codeSelectionValue == "code128") {
            $("#barcode-display-1D")
              .children()
              .remove();
            $("#barcode-display-allInOne")
              .children()
              .remove();
            $("#barcode-display-datamatrix")
              .children()
              .remove();
            $("#barcode-display-1D").css("display", "block");

            for (var _i2 = 0; _i2 < config.length; _i2++) {
              configName[_i2] = configName[_i2].replace(/\s|\//g, "-");
              genCode128Barcode(config[_i2], configName[_i2]);
            }
          } else if ($codeSelectionValue == "datamatrix") {
            $("#barcode-display-1D")
              .children()
              .remove();
            $("#barcode-display-allInOne")
              .children()
              .remove();
            $("#barcode-display-datamatrix")
              .children()
              .remove();
            $("#barcode-display-2D").css("display", "flex");

            for (var _i3 = 0; _i3 < config.length; _i3++) {
              configName[_i3] = configName[_i3].replace(/\s|\//g, "-");
              genDatamatrixBarcode(config[_i3], configName[_i3], false);
            } // genDatamatrixBarcode(allInOneConfig, 'All-In-One', true);
          }

          toggleModal("import");
        });
      });
      reader.readAsText(myFile);
    }
  });
  export_button.addEventListener("click", function () {
    var textBox = document.getElementById("export-textarea");
    var content = textBox.textContent;
    var blob = new Blob([content], {
      type: "text/plain;character=utf-8"
    });
    saveAs(blob, "DatalogicCCF.txt");
  });
}
/*
 * END OF TOOLS
 */

/*
 * TOOLS
 */

$("#pdf").click(function () {
  //    html2canvas($('#barcode-display-2D'), {
  //        onrendered: function onrendered(canvas) {
  //            var img = canvas.toDataURL('image/png');
  //            var pdf = new jsPDF('p', 'px', 'a4');
  //            pdf.addImage(img, 'JPEG', 0, 0);
  //            pdf.save('Datalogic.pdf');
  //        }
  //    });
  //    $('body').scrollTop(0);
  //    createPDF();
  makePDF(); //    makePDFMultiPage();
});
$("#print").on("click", function () {
  var divContents = $(".barcode-display").html();
  var printWindow = window.open("", "", "height=400,width=800");
  printWindow.document.write("<html><head><title>DIV Contents</title>");
  printWindow.document.write("</head><body>");
  printWindow.document.write(
    "<style>\n  #barcode-display-1D{\n    text-align: center;\n  }\n  #barcode-display-2D{\n    justify-content: center;\n  }\n  </style>"
  );
  printWindow.document.write(divContents);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}); //create pdf

function createPDF() {
  var form = $("#barcode-display-2D"),
    cache_width = form.width(),
    a4 = [595.28, 841.89]; // for a4 size paper width and height

  form.width(a4[0] * 1.33333 - 80).css("max-width", "none");
  html2canvas(form, {
    imageTimeout: 2000,
    removeContainer: true,
    onrendered: function onrendered(canvas) {
      var img = canvas.toDataURL("image/png"),
        doc = new jsPDF({
          unit: "px",
          format: "a4"
        });
      doc.addImage(img, "JPEG", 20, 20);
      doc.save("hungnguyen_test.pdf");
      form.width(cache_width);
    }
  });
}

function makePDF() {
  var quotes = document.getElementById("barcode-display-2D"); //var quotes = $('#barcode-display-2D');

  if ($("#code-selection").val() == "code128") {
    //quotes = $('#barcode-display-1D');
    quotes = document.getElementById("barcode-display-1D");
  } else if ($("#code-selection").val() == "datamatrix") {
    //quotes = $('#barcode-display-2D');
    quotes = document.getElementById("barcode-display-2D");
  } //html2canvas($('#barcode-display-1D'), {

  html2canvas(quotes, {
    imageTimeout: 2000,
    removeContainer: true,
    onrendered: function onrendered(canvas) {
      //document.body.appendChild(canvas);
      var imgData = canvas.toDataURL("image/png");
      /*
      Here are the numbers (paper width and height) that I found to work.
      It still creates a little overlap part between the pages, but good enough for me.
      if you can find an official number from jsPDF, use them.
      */

      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF("p", "mm");
      var position = 0;
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save("file.pdf");
    }
  });
}

var base64Img = null;
imgToBase64("./css/images/logo.png", function (base64) {
  base64Img = base64;
});
var margins = {
  top: 70,
  bottom: 40,
  left: 30,
  width: 550
};

function makePDFMultiPage() {
  var quotes = document.getElementById("barcode-display-2D"); //var quotes = $('#barcode-display-2D');

  if ($("#code-selection").val() == "code128") {
    //quotes = $('#barcode-display-1D');
    quotes = document.getElementById("barcode-display-1D");
    console.log($("#barcode-display-1D").html());
  } else if ($("#code-selection").val() == "datamatrix") {
    //quotes = $('#barcode-display-2D');
    quotes = document.getElementById("barcode-display-2D");
    console.log($("#barcode-display-2D").html());
  } //  var divContents = $(".barcode-display").html();
  //  var printWindow = window.open('', '', 'height=400,width=800');
  //  printWindow.document.write('<html><head><title>DIV Contents</title>');
  //  printWindow.document.write('</head><body>');
  //  printWindow.document.write("<style>\n  #barcode-display-1D{\n    text-align: center;\n  }\n  #barcode-display-2D{\n    justify-content: center;\n  }\n  </style>");
  //  printWindow.document.write(divContents);
  //  printWindow.document.write('</body></html>');
  //  printWindow.document.close();
  //  var quotes = printWindow.document.body;

  var pdf = new jsPDF("p", "pt", "a4");
  pdf.setFontSize(18);
  pdf.fromHTML(
    quotes,
    margins.left, // x coord
    margins.top,
    {
      // y coord
      width: margins.width // max width of content on PDF
    },
    function (dispose) {
      headerFooterFormatting(pdf, pdf.internal.getNumberOfPages());
    },
    margins
  );
  var iframe = document.createElement("iframe");
  iframe.setAttribute(
    "style",
    "position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;"
  );
  document.body.appendChild(iframe);
  iframe.src = pdf.output("datauristring");
}

function headerFooterFormatting(doc, totalPages) {
  for (var i = totalPages; i >= 1; i--) {
    doc.setPage(i); //header

    header(doc);
    footer(doc, i, totalPages);
    doc.page++;
  }
}

function header(doc) {
  doc.setFontSize(30);
  doc.setTextColor(40);
  doc.setFontStyle("normal");

  if (base64Img) {
    doc.addImage(base64Img, "JPEG", margins.left, 10, 40, 40);
  }

  doc.text("Report Header Template", margins.left + 50, 40);
  doc.setLineCap(2);
  doc.line(3, 70, margins.width + 43, 70); // horizontal line
} // You could either use a function similar to this or pre convert an image with for example http://dopiaza.org/tools/datauri

// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript

function imgToBase64(url, callback, imgVariable) {
  if (!window.FileReader) {
    callback(null);
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.responseType = "blob";

  xhr.onload = function () {
    var reader = new FileReader();

    reader.onloadend = function () {
      imgVariable = reader.result.replace("text/xml", "image/jpeg");
      callback(imgVariable);
    };

    reader.readAsDataURL(xhr.response);
  };

  xhr.open("GET", url);
  xhr.send();
}

function footer(doc, pageNumber, totalPages) {
  var str = "Page " + pageNumber + " of " + totalPages;
  doc.setFontSize(10);
  doc.text(str, margins.left, doc.internal.pageSize.height - 20);
}
