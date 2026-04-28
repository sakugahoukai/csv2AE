(function(thisObj) {
    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "csv2AE Automation", undefined, {resizeable:true});
        win.orientation = "column";
        win.alignChildren = ["fill", "top"];
        win.spacing = 15;
        win.margins = 20;

        var title = win.add("statictext", undefined, "🔄 csv2AE: 24fps Anime");
        title.graphics.font = ScriptUI.newFont("sans", "Bold", 16);

        var fpsGroup = win.add("group");
        fpsGroup.add("statictext", undefined, "AE FPS: ");
        var fpsInput = fpsGroup.add("edittext", undefined, "24");
        fpsInput.characters = 5;

        var runBtn = win.add("button", undefined, "CSV 불러오기 및 적용");
        runBtn.preferredSize.height = 40;

        runBtn.onClick = function() {
            var comp = app.project.activeItem;
            if (!comp || !(comp instanceof CompItem)) {
                alert("활성화된 컴포지션이 없습니다.\n먼저 타임라인 패널을 클릭해 활성화해 주세요.");
                return;
            }

            var csvFile = File.openDialog("Clip Studio CSV 파일을 선택하세요", "CSV Files:*.csv");
            if (!csvFile) return;

            // --- 인코딩 무차별 대입(Brute-force) 읽기 로직 ---
            var encodings = ["UTF-8", "UTF-16", "UTF-16LE", "UTF-16BE", "SHIFT-JIS", "CP949"];
            var matrix = [];
            var readSuccess = false;

            for (var e = 0; e < encodings.length; e++) {
                csvFile.encoding = encodings[e];
                csvFile.open("r");
                var rawText = csvFile.read();
                csvFile.close();

                if (rawText) {
                    rawText = rawText.replace(/^\uFEFF/, ''); // BOM 기호 제거
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
                alert("데이터 파싱 실패!\n파일 인코딩을 해석할 수 없습니다.\n해결책: CSV 파일을 메모장으로 연 뒤 [다른 이름으로 저장 -> 인코딩: UTF-8]로 저장하고 다시 시도해 주세요.");
                return;
            }
            // ----------------------------------------------------

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

                // 타임리맵 활성화 및 레이어 길이 컴포지션 전체로 확장
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

                    valStr = valStr.replace(/~/g, 'x').replace(/œ/g, '●').replace(/›/g, '○');

                    if (valStr.indexOf('x') !== -1 || valStr.indexOf('×') !== -1) {
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
            alert("✅ 작업 완료!\n총 " + appliedCount + "개의 레이어에 적용되었습니다.");
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