# 🔄 csv2AE

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Compatibility](https://img.shields.io/badge/After_Effects-CC_2019+-9999ff.svg?logo=adobe-after-effects)

> **A ScriptUI Panel for Adobe After Effects that automatically converts Clip Studio Paint CSV timesheets into Time Remap keyframes.**

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

---

## 🌏 Multi-language Guide

* [한국어 설명 (Korean)](#한국어-설명)
* [日本語ガイド (Japanese)](#日本語ガイド)

---

### 한국어 설명

**csv2AE**는 클립스튜디오의 애니메이션 타임시트(CSV)를 애프터 이펙트의 타임리맵 키프레임으로 자동 변환해 주는 스크립트입니다.

* **보간 고정:** 모든 키프레임은 '홀드(Hold)'로 생성되어 프레임 간의 잔상을 방지합니다.
* **레이어 자동 확장:** 원본 소스 길이가 짧더라도 레이어 막대를 컴포지션 끝까지 자동으로 늘려줍니다.
* **스마트 매칭:** 레이어 이름 뒤에 붙는 확장자(`.png`)나 시퀀스 번호(`[0-24]`)를 자동으로 무시하고 CSV의 소재명과 연결합니다.
* **오류 복구:** 인코딩 문제로 인해 `●`, `○`, `×` 기호가 `œ`, `›`, `~` 등으로 깨져서 보일 때도 스크립트가 이를 자동으로 인식하여 정상 처리합니다.

### 日本語ガイド

**csv2AE**は、CLIP STUDIO PAINTのタイムシート(CSV)をAfter Effectsのタイムリマップキーフレームに自動変換するスクリプトです。

* **固定補間:** すべてのキーフレームは「固定(Hold)」として生成され、フレーム間のゴースト現象を防ぎます。
* **レイヤーの自動延長:** ソースの長さに関係なく、レイヤーバーをコンポジションの最後まで自動的に延長します。
* **スマートマッチング:** レイヤー名の後ろにある拡張子(`.png`)やシーケンス番号(`[0-24]`)を自動的に無視し、CSVの素材名と照合します。
* **文字化け対応:** エンコードの問題で `●`、`○`、`×` が `œ`、`›`、`~` などに文字化けして保存された場合でも、スクリプトが自動的に判別して正常に処理します。
