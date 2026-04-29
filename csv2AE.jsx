(function(thisObj) {
    // Detect AE language
    var langCode = app.isoLanguage; 
    
    // UI Text (Unicode mapped for encoding safety)
    var t = {
        title: "\uD83D\uDD04 csv2AE Automation",
        fps: "AE FPS: ",
        btnRun: "Import CSV & Apply",
        dlgSelect: "Select Clip Studio CSV Timesheet",
        errNoComp: "No active composition found.\nPlease activate the timeline panel first.",
        errParse: "Data parsing failed!\nCannot decode file encoding.\nFix: Open CSV in Notepad/TextEdit, Save As -> Encoding: UTF-8.",
        success: "\u2705 Success!\nApplied to %d layers."
    };

    if (langCode.indexOf("ko") !== -1) {
        t.btnRun = "CSV \uBD88\uB7EC\uC624\uAE30 \uBC0F \uC801\uC6A9";
        t.dlgSelect = "Clip Studio CSV \uD30C\uC77C\uC744 \uC120\uD0DD\uD558\uC138\uC694";
        t.errNoComp = "\uD65C\uC131\uD654\uB41C \uCEF4\uD3EC\uC9C0\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.\n\uBA3C\uC800 \uD0C0\uC784\uB77C\uC778 \uD328\uB110\uC744 \uD074\uB9AD\uD574 \uD65C\uC131\uD654\uD574 \uC8FC\uC138\uC694.";
        t.errParse = "\uB370\uC774\uD130 \uD30C\uC2F1 \uC2E4\uD328!\n\uD30C\uC77C \uC778\uCF54\uB529\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.\n\uD574\uACB0\uCC45: CSV \uD30C\uC77C\uC744 \uBA54\uBAA8\uC7A5\uC73C\uB85C \uC5F0 \uB4A4 [\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 -> \uC778\uCF54\uB529: UTF-8]\uB85C \uC800\uC7A5\uD558\uACE0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.";
        t.success = "\u2705 \uC791\uC5C5 \uC644\uB8CC!\n\uCD1D %d\uAC1C\uC758 \uB808\uC774\uC5B4\uC5D0 \uC801\uC6A9\uB418\uC5C8\uC2B5\uB2C8\uB2E4.";
    } else if (langCode.indexOf("ja") !== -1) {
        t.btnRun = "CSV\u3092\u8AAD\u307F\u8FBC\u3093\u3067\u9069\u7528";
        t.dlgSelect = "Clip Studio CSV\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044";
        t.errNoComp = "\u30A2\u30AF\u30C6\u30A3\u30D6\u306A\u30B3\u30F3\u30DD\u30B8\u30B7\u30E7\u30F3\u304C\u3042\u308A\u307E\u305B\u3093\u3002\n\u5148\u306B\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3\u30D1\u30CD\u30EB\u3092\u30A2\u30AF\u30C6\u30A3\u30D6\u306B\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
        t.errParse = "\u30C7\u30FC\u30BF\u306E\u89E3\u6790\u306B\u5931\u6557\u3057\u307E\u3057\u305F\uFF01\n\u30D5\u30A1\u30A4\u30EB\u306E\u30A8\u30F3\u30B3\u30FC\u30C7\u30A3\u30F3\u30B0\u3092\u30C7\u30B3\u30FC\u30C9\u3067\u304D\u307E\u305B\u3093\u3002\n\u89E3\u6C7A\u7B56: CSV\u3092\u30E1\u30E2\u5E33\u3067\u958B\u304D\u3001[\u540D\u524D\u3092\u4ED8\u3051\u3066\u4FDD\u5B58 -> \u30A8\u30F3\u30B3\u30FC\u30C9: UTF-8] \u3067\u4FDD\u5B58\u3057\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
        t.success = "\u2705 \u4F5C\u696D\u5B8C\u4E86\uFF01\n\u5408\u8A08 %d \u500B\u306E\u30EC\u30A4\u30E4\u30FC\u306B\u9069\u7528\u3055\u308C\u307E\u3057\u305F\u3002";
    }

    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", t.title, undefined, {resizeable:true});
        win.orientation = "column";
        win.alignChildren = ["fill", "top"];
        win.spacing = 15;
        win.margins = 20;

        var titleBox = win.add("statictext", undefined, "\uD83D\uDD04 csv2AE: 24fps Anime");
        titleBox.graphics.font = ScriptUI.newFont("sans", "Bold", 16);

        var fpsGroup = win.add("group");
        fpsGroup.add("statictext", undefined, t.fps);
        var fpsInput = fpsGroup.add("edittext", undefined, "24");
        fpsInput.characters = 5;

        var runBtn = win.add("button", undefined, t.btnRun);
        runBtn.preferredSize.height = 40;

        runBtn.onClick = function() {
            var comp = app.project.activeItem;
            if (!comp || !(comp instanceof CompItem)) {
                alert(t.errNoComp);
                return;
            }

            var csvFile = File.openDialog(t.dlgSelect, "CSV Files:*.csv");
            if (!csvFile) return;

            var encodings = ["UTF-8", "UTF-16", "UTF-16LE", "UTF-16BE", "SHIFT-JIS", "CP949"];
            var matrix = [];
            var readSuccess = false;

            for (var e = 0; e < encodings.length; e++) {
                csvFile.encoding = encodings[e];
                csvFile.open("r");
                var rawText = csvFile.read();
                csvFile.close();

                if (rawText) {
                    rawText = rawText.replace(/^\uFEFF/, ''); 
                    var lines = rawText.split(/\r\n|\n|\r/);
                    
                    var tempMatrix = [];
                    for (var i = 0; i < lines.length; i++) {
                        var line = lines[i].replace(/^\s+|\s+$/g, '');
                        if (line !== "") {
                            var cols = line.split(',');
                            for (var j = 0; j < cols.length; j++) {
                                cols[j] = cols[j].replace(/^["']|["']$/g, '').replace(/^\s+|\s+$/g, '');
                            }
                            tempMatrix.push(cols);
                        }
                    }

                    if (tempMatrix.length >= 3) {
                        matrix = tempMatrix;
                        readSuccess = true;
                        break;
                    }
                }
            }

            if (!readSuccess) {
                alert(t.errParse);
                return;
            }

            var fps = parseFloat(fpsInput.text) || 24;
            var headers = matrix[1]; 
            var appliedCount = 0;

            app.beginUndoGroup("csv2AE Time Remap");

            for (var colIdx = 1; colIdx < headers.length; colIdx++) {
                var headerName = headers[colIdx];
                if (!headerName) continue;

                var targetLayer = null;
                for (var l = 1; l <= comp.numLayers; l++) {
                    var rawName = comp.layer(l).name;
                    var cleanName = rawName.replace(/\.[a-zA-Z0-9]+$/i, '').replace(/_?\[\d+-\d+\]$/, '');
                    
                    if (rawName === headerName || cleanName === headerName) {
                        targetLayer = comp.layer(l);
                        break;
                    }
                }

                if (!targetLayer) continue;

                targetLayer.timeRemapEnabled = true;
                targetLayer.inPoint = 0;
                targetLayer.outPoint = comp.duration;

                var trProp = targetLayer.property("ADBE Time Remapping");
                var opProp = targetLayer.property("ADBE Transform Group").property("ADBE Opacity");

                var lastSec = null, lastOp = null, lastFrame = null;
                var currentSec = 0, currentOp = 0;

                for (var r = 2; r < matrix.length; r++) {
                    var valStr = (matrix[r][colIdx] || "").toLowerCase();
                    var timelineFrame = r - 2;

                    valStr = valStr.replace(/~/g, 'x').replace(/\u0153/g, '\u25CF').replace(/\u203A/g, '\u25CB');

                    if (valStr.indexOf('x') !== -1 || valStr.indexOf('\u00D7') !== -1) {
                        currentOp = 0; 
                    } else if (valStr !== "" && !isNaN(parseFloat(valStr))) {
                        currentSec = (parseFloat(valStr) - 1) / fps;
                        currentOp = 100; 
                    }

                    if (currentSec !== lastSec || currentOp !== lastOp) {
                        if (lastFrame !== null && timelineFrame > lastFrame + 1) {
                            trProp.setValueAtTime((timelineFrame - 1) / fps, lastSec);
                            opProp.setValueAtTime((timelineFrame - 1) / fps, lastOp);
                        }
                        trProp.setValueAtTime(timelineFrame / fps, currentSec);
                        opProp.setValueAtTime(timelineFrame / fps, currentOp);

                        lastSec = currentSec; 
                        lastOp = currentOp; 
                        lastFrame = timelineFrame;
                    }
                }

                for (var k = 1; k <= trProp.numKeys; k++) {
                    trProp.setInterpolationTypeAtKey(k, KeyframeInterpolationType.HOLD);
                }
                for (var j = 1; j <= opProp.numKeys; j++) {
                    opProp.setInterpolationTypeAtKey(j, KeyframeInterpolationType.HOLD);
                }

                appliedCount++;
            }

            app.endUndoGroup();
            
            var finalSuccessMsg = t.success.replace("%d", appliedCount);
            alert(finalSuccessMsg);
        };

        win.onResizing = win.onResize = function() {
            this.layout.resize();
        };

        win.layout.layout(true);
        return win;
    }

    var scriptWindow = buildUI(thisObj);
    if (scriptWindow instanceof Window) {
        scriptWindow.center();
        scriptWindow.show();
    }
})(this);