# 🔄 csv2AE

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Compatibility](https://img.shields.io/badge/After_Effects-CC_2019+-9999ff.svg?logo=adobe-after-effects)

> **A ScriptUI Panel for Adobe After Effects that automatically converts Clip Studio Paint CSV timesheets into Time Remap keyframes.**

✅ **Tested and confirmed working on the latest macOS and the latest version of After Effects.**

---

## 🌏 Multi-language Guide
* [English](#-csv2ae)
* [한국어 설명 (Korean)](#-한국어-설명-korean)
* [日本語ガイド (Japanese)](#-日本語ガイド-japanese)

---

## 📥 Download & Installation

### 1. Download
**[latest release](https://github.com/sakugahoukai/csv2AE/releases/download/v1.0/csv2AE_Panel.jsx)**

### 2. Install
Place the downloaded `.jsx` file into your After Effects `ScriptUI Panels` folder:
* **Windows:** `C:\Program Files\Adobe\Adobe After Effects <Version>\Support Files\Scripts\ScriptUI Panels`
* **Mac OS:** `Applications/Adobe After Effects <Version>/Scripts/ScriptUI Panels`

*⚠️ Note: You must restart After Effects after placing the script in the folder.*

---

<img width="1352" height="760" alt="test" src="https://github.com/user-attachments/assets/7d004740-52a7-4771-8f3d-778d9a5a4789" />

## 🚀 How to Use

1.  Prepare Composition: Create a composition with your desired size and duration. (Starting timecode **'1'** is recommended.)
2.  Import Assets: Add your animation cell folders to the Project panel, then drag them into the Composition panel.
3. Verify your **AE FPS** setting in the panel (Default is 24).
4. Click **[Import CSV & Apply]** and select your Clip Studio CSV file.
5. Done! The script will automatically parse the data and apply the exact timing.

---

### 🔣 Supported Symbols & Text Recognition
* **Numbers (`1`, `2`, `3`...):** Maps to the specific cel. Opacity is set to `100%`.
* **`x` or `×` (Kara / Empty Cel):** Indicates an empty frame. Automatically drops the layer's Opacity to `0%`.
* **`●` or `○` (Hold):** Maintains the current cel. Time Remap values are held without creating extra keyframes.
* **Corrupted Text Support:** Automatically recognizes and processes corrupted symbols (such as `œ`, `›`, `~`) that occasionally occur due to encoding issues when exporting CSVs from Clip Studio Paint.

---

### 📁 Source Name Processing & Layer Matching
The script automatically matches the CSV column headers to your After Effects layer names. To handle bundled assets and image sequences seamlessly, the script processes layer names using the following internal logic:

* **Automatic Name Cleaning:** When After Effects imports bundled assets or image sequences, it often appends file extensions and frame ranges to the layer name. The script automatically strips these redundant suffixes during the matching process.
    * **Removes Extensions:** Strips suffixes like `.png`, `.psd`, `.jpg` (e.g., `Cell_A.png` → `Cell_A`).
    * **Removes Sequence Brackets:** Strips bracketed frame numbers commonly added by AE, such as `_[001-072]` or `[0-24]`.
* **Matching Example:** If your CSV header (Animation Folder name) is `A`, the script will accurately find and apply Time Remap to an AE layer named `A.png` or `A_[1-24]`. You do not need to manually rename your imported sequence layers.

---

### ⏱️ Keyframe Interpolation & Layer Duration
* **Hold Interpolation:** All generated Time Remap and Opacity keyframes are automatically set to **Hold** interpolation. This prevents unintended smooth transitions or blending between frames, strictly preserving the exact step-timing of the 2D animation.
* **Auto-Extension of Layer Duration:** When applying Time Remapping, the script automatically extends the target layer's `outPoint` to match the total duration of the composition. This ensures the layer remains visible throughout the timeline, even if the original imported source footage is shorter than the composition length.

<br>

---

## 🇰🇷 한국어 설명 (Korean)

> **클립스튜디오(Clip Studio Paint)의 CSV 타임시트를 애프터 이펙트(After Effects)의 타임리맵 키프레임으로 자동 변환해 주는 ScriptUI 패널입니다.**

✅ **최신 macOS 및 최신 버전의 After Effects에서 정상 구동을 확인했습니다.**

### 📥 다운로드 및 설치

#### 1. 다운로드
**[최신 버전 다운로드 (latest release)](https://github.com/sakugahoukai/csv2AE/releases/download/v1.0/csv2AE_Panel.jsx)**

#### 2. 설치
다운로드한 `.jsx` 파일을 애프터 이펙트의 `ScriptUI Panels` 폴더에 넣으세요:
* **Windows:** `C:\Program Files\Adobe\Adobe After Effects <버전>\Support Files\Scripts\ScriptUI Panels`
* **Mac OS:** `Applications/Adobe After Effects <버전>/Scripts/ScriptUI Panels`

*⚠️ 참고: 스크립트를 폴더에 넣은 후 애프터 이펙트를 재시작해야 합니다.*

---

### 🚀 사용법

1.  **컴포지션 준비:** 원하는 크기와 길이로 컴포지션을 생성합니다. (시작 타임코드는 **'1'**을 권장합니다.)
2.  **에셋 불러오기:** 애니메이션 셀 폴더들을 프로젝트 패널에 추가한 뒤, 컴포지션 패널로 드래그합니다.
3.  패널에서 **AE FPS** 설정을 확인합니다 (기본값은 24).
4.  **[CSV 불러오기 및 적용]**을 클릭하고 클립스튜디오 CSV 파일을 선택합니다.
5.  완료! 스크립트가 자동으로 데이터를 분석하여 정확한 타이밍을 적용합니다.

---

### 🔣 지원하는 기호 및 텍스트 인식
* **숫자 (`1`, `2`, `3`...):** 특정 셀에 매칭됩니다. 투명도(Opacity)는 `100%`로 설정됩니다.
* **`x` 또는 `×` (카라 / 빈 셀):** 빈 프레임을 나타냅니다. 자동으로 레이어의 투명도를 `0%`로 낮춥니다.
* **`●` 또는 `○` (홀드):** 현재 셀을 유지합니다. 불필요한 키프레임 생성 없이 타임리맵 값을 유지합니다.
* **깨진 텍스트 지원:** 클립스튜디오에서 CSV를 내보낼 때 인코딩 문제로 간혹 발생하는 깨진 기호(예: `œ`, `›`, `~`)를 자동으로 인식하고 처리합니다.

---

### 📁 소스 이름 처리 및 레이어 매칭
스크립트는 CSV의 열 헤더와 애프터 이펙트의 레이어 이름을 자동으로 매칭합니다. 묶음 소재나 이미지 시퀀스를 원활하게 처리하기 위해, 스크립트는 다음과 같은 내부 로직을 사용하여 레이어 이름을 처리합니다:

* **자동 이름 정제:** 애프터 이펙트에서 묶음 소재나 이미지 시퀀스를 불러올 때 레이어 이름에 파일 확장자나 프레임 범위가 추가되는 경우가 많습니다. 스크립트는 매칭 과정에서 이러한 불필요한 접미사를 자동으로 제거합니다.
    * **확장자 제거:** `.png`, `.psd`, `.jpg` 같은 접미사를 제거합니다 (예: `Cell_A.png` → `Cell_A`).
    * **시퀀스 괄호 제거:** AE가 흔히 추가하는 `_[001-072]` 또는 `[0-24]` 같은 괄호로 묶인 프레임 번호를 자동으로 제거합니다.
* **매칭 예시:** CSV 헤더(애니메이션 폴더명)가 `A`인 경우, 스크립트는 `A.png` 또는 `A_[1-24]`라는 이름의 AE 레이어를 정확하게 찾아 타임리맵을 적용합니다. 불러온 시퀀스 레이어의 이름을 수동으로 바꿀 필요가 없습니다.

---

### ⏱️ 키프레임 보간 및 레이어 길이
* **홀드 보간:** 생성된 모든 타임리맵 및 투명도 키프레임은 자동으로 **Hold(고정)** 보간으로 설정됩니다. 이를 통해 프레임 간의 의도치 않은 부드러운 전환이나 겹침을 방지하고, 2D 애니메이션의 정확한 스텝 타이밍을 엄격하게 보존합니다.
* **레이어 길이 자동 연장:** 타임리맵을 적용할 때, 스크립트는 대상 레이어의 `outPoint`를 컴포지션의 전체 길이에 맞게 자동으로 연장합니다. 이렇게 하면 불러온 원본 소스 푸티지가 컴포지션 길이보다 짧더라도 타임라인 전체에 걸쳐 레이어가 계속 보이도록 보장합니다.

<br>

---

## 🇯🇵 日本語ガイド (Japanese)

> **CLIP STUDIO PAINTのCSVタイムシートをAfter Effectsのタイムリマップキーフレームに自動変換するScriptUIパネルです。**

✅ **最新のmacOSおよび最新バージョンのAfter Effectsでの正常動作を確認済みです。**

### 📥 ダウンロードとインストール

#### 1. ダウンロード
**[最新リリース (latest release)](https://github.com/sakugahoukai/csv2AE/releases/download/v1.0/csv2AE_Panel.jsx)**

#### 2. インストール
ダウンロードした `.jsx` ファイルをAfter Effectsの `ScriptUI Panels` フォルダに配置します。
* **Windows:** `C:\Program Files\Adobe\Adobe After Effects <バージョン>\Support Files\Scripts\ScriptUI Panels`
* **Mac OS:** `Applications/Adobe After Effects <バージョン>/Scripts/ScriptUI Panels`

*⚠️ 注意: スクリプトをフォルダに配置した後、After Effectsを再起動する必要があります。*

---

### 🚀 使い方

1.  **コンポジションの準備:** 希望のサイズとデュレーションでコンポジションを作成します。（開始タイムコードは **'1'** を推奨します。）
2.  **アセットのインポート:** アニメーションのセルフォルダをプロジェクトパネルに追加し、コンポジションパネルにドラッグします。
3.  パネルで **AE FPS** の設定を確認します（デフォルトは24）。
4.  **[CSVを読み込んで適用]** をクリックし、CLIP STUDIOのCSVファイルを選択します。
5.  完了！スクリプトが自動的にデータを解析し、正確なタイミングを適用します。

---

### 🔣 対応記号とテキスト認識
* **数字 (`1`, `2`, `3`...):** 特定のセルにマッピングされます。不透明度(Opacity)は `100%` に設定されます。
* **`x` または `×` (空セル):** 空のフレームを示します。自動的にレイヤーの不透明度を `0%` に下げます。
* **`●` または `○` (保持):** 現在のセルを維持します。不要なキーフレームを作成せずにタイムリマップ値を保持します。
* **文字化け対応:** CLIP STUDIO PAINTからCSVを書き出す際、エンコードの問題でまれに発生する文字化けした記号（例: `œ`、`›`、`~`）を自動的に認識して処理します。

---

### 📁 ソース名の処理とレイヤーのマッチング
スクリプトは、CSVの列ヘッダーとAfter Effectsのレイヤー名を自動的に照合します。連番素材やイメージシーケンスをスムーズに処理するために、スクリプトは以下の内部ロジックを使用してレイヤー名を処理します。

* **自動名前クレンジング:** After Effectsで連番素材やイメージシーケンスをインポートすると、レイヤー名にファイル拡張子やフレーム範囲が追加されることがよくあります。スクリプトはマッチングプロセス中にこれらの不要な接尾辞を自動的に除去します。
    * **拡張子の除去:** `.png`、`.psd`、`.jpg` などの接尾辞を除去します（例: `Cell_A.png` → `Cell_A`）。
    * **シーケンス括弧の除去:** AEがよく追加する `_[001-072]` や `[0-24]` などの括弧付きフレーム番号を除去します。
* **マッチング例:** CSVヘッダー（アニメーションフォルダ名）が `A` の場合、スクリプトは `A.png` または `A_[1-24]` という名前のAEレイヤーを正確に見つけてタイムリマップを適用します。インポートしたシーケンスレイヤーの名前を手動で変更する必要はありません。

---

### ⏱️ キーフレーム補間とレイヤーの長さ
* **固定補間:** 生成されたすべてのタイムリマップと不透明度のキーフレームは、自動的に **固定(Hold)** 補間に設定されます。これにより、フレーム間の意図しない滑らかなトランジションやブレンドを防ぎ、2Dアニメーションの正確なステップタイミングを厳密に保持します。
* **レイヤー長さの自動延長:** タイムリマップを適用する際、スクリプトはターゲットレイヤーの `outPoint` をコンポジションの全体の長さに合わせて自動的に延長します。これにより、インポートした元のソースフッテージがコンポジションの長さより短くても、タイムライン全体でレイヤーが表示されたままになります。
