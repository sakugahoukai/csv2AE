(function(thisObj) {
    // 1. 에펙 프로그램 언어 감지 및 번역 데이터 세팅
    var langCode = app.isoLanguage; // 예: "ko_KR", "ja_JP", "en_US"
    
    var t = {
        title: "🔄 csv2AE Automation",
        fps: "AE FPS: ",
        btnRun: "Import CSV & Apply",
        dlgSelect: "Select Clip Studio CSV Timesheet",
        errNoComp: "No active composition found.\nPlease activate the timeline panel first.",
        errParse: "Data parsing failed!\nCannot decode file encoding.\nFix: Open CSV in Notepad, Save As -> Encoding: UTF-8.",
        success: "✅ Success!\nApplied to %d layers."
    };

    if (langCode.indexOf("ko") !== -1) {
        t.btnRun = "CSV 불러오기 및 적용";
        t.dlgSelect = "Clip Studio CSV 파일을 선택하세요";
        t.errNoComp = "활성화된 컴포지션이 없습니다.\n먼저 타임라인 패널을 클릭해 활성화해 주세요.";
        t.errParse = "데이터 파싱 실패!\n파일 인코딩을 해석할 수 없습니다.\n해결책: CSV 파일을 메모장으로 연 뒤 [다른 이름으로 저장 -> 인코딩: UTF-8]로 저장하고 다시 시도해 주세요.";
        t.success = "✅ 작업 완료!\n총 %d개의 레이어에 적용되었습니다.";
    } else if (langCode.indexOf("ja") !== -1) {
        t.btnRun = "CSVを読み込んで適用";
        t.dlgSelect = "Clip Studio CSVファイルを選択してください";
        t.errNoComp = "アクティブなコンポジションがありません。\n先にタイムラインパネルをアクティブにしてください。";
        t.errParse = "データの解析に失敗しました！\nファイルのエンコーディングをデコードできません。\n解決策: CSVをメモ帳で開き、[名前を付けて保存 -> エンコード: UTF-8] で保存し直してください。";
        t.success = "✅ 作業完了！\n合計 %d 個のレイヤーに適用されました。";
    }

    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", t.title, undefined, {resizeable:true});
        win.orientation = "column";
        win.alignChildren = ["fill", "top"];
        win.spacing = 15;
        win.margins = 20;

        var titleBox = win.add("statictext", undefined, "🔄 csv2AE: 24fps Anime");
        titleBox.graphics.font = ScriptUI.newFont("sans", "Bold", 16);

        var fpsGroup = win.add("group");
        fpsGroup.add("statictext", undefined, t.fps);
        var fpsInput = fpsGroup.add("edittext", undefined, "24");
        fpsInput.characters = 5;

        // 버튼 이름이 언어에 맞게 출력됨
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
            
            // 성공 메시지의 %d 부분에 성공한 레이어 개수 넣기
            var finalSuccessMsg = t.success.replace("%d", appliedCount);
            alert(finalSuccessMsg);
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
