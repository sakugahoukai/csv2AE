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

## ✨ Features

* **Direct Import:** Reads Clip Studio CSV timesheets directly within After Effects.
* **Smart Auto-Mapping:** Automatically matches CSV column headers with your AE layer names. *(Recommended: `Folder Name + Cell Name`)*
* **Symbol Recognition:** Fully supports standard Japanese animation timing symbols (`●`, `○`, `x`). `x` (kara) automatically sets Opacity to 0%.
* **Hold Interpolation:** All Time Remap and Opacity keyframes are set to Hold interpolation to preserve crisp 2D timing.
* **Auto-Extension:** Automatically extends the layer outPoints to match the composition duration.

---

## 🚀 How to Use

1. Open your After Effects project and **activate the target composition** (click anywhere on its timeline).
2. Go to the top menu bar, click **[Window]**, and select **`csv2AE_Panel.jsx`** at the very bottom.
3. Verify your **AE FPS** setting in the panel (Default is 24).
4. Click **[Import CSV & Apply]** and select your Clip Studio CSV file.
5. Done! The script will automatically parse the data and apply the exact timing.
