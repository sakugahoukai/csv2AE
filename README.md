# 🔄 csv2AE

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Compatibility](https://img.shields.io/badge/After_Effects-CC_2019+-9999ff.svg?logo=adobe-after-effects)

> **A ScriptUI Panel for Adobe After Effects that automatically converts Clip Studio Paint CSV timesheets into Time Remap keyframes.**

---

## 📥 Download & Installation

### 1. Download
Click the link below to download the latest release:
**[📦 Download `csv2AE_Panel.jsx`](https://github.com/sakugahoukai/csv2AE/releases/download/v1.0/csv2AE_Panel.jsx)**

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

## ✨ Features

* **Direct Import:** Reads Clip Studio CSV timesheets directly within After Effects.
* **Smart Auto-Mapping:** Automatically matches CSV column headers with your AE layer names. *(Recommended: `Folder Name + Cell Name`)*
* **Symbol Recognition:** Fully supports standard Japanese animation timing symbols (`●`, `○`, `x`). `x` (kara) automatically sets Opacity to 0%.
* **Hold Interpolation:** All Time Remap and Opacity keyframes are set to Hold interpolation to preserve crisp 2D timing.
* **Auto-Extension:** Automatically extends the layer outPoints to match the composition duration.

---

### 🔣 Supported Symbols & Text Recognition
* **Numbers (`1`, `2`, `3`...):** Maps to the specific cel. Opacity is set to `100%`.
* **`x` or `×` (Kara / Empty Cel):** Indicates an empty frame. Automatically drops the layer's Opacity to `0%`.
* **`●` or `○` (Hold):** Maintains the current cel. Time Remap values are held without creating extra keyframes.
* **Corrupted Text Support:** Automatically recognizes and processes corrupted symbols (such as `œ`, `›`, `~`) that occasionally occur due to encoding issues when exporting CSVs from Clip Studio Paint.
