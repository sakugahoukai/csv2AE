# 🔄 csv2AE: Clip Studio CSV to AE Time Remap

A ScriptUI panel for Adobe After Effects that automatically converts Clip Studio Paint CSV timesheets into Time Remap keyframes. Optimized for 24fps anime production pipelines.

### 📥 [Download `csv2AE_Panel.jsx`](https://raw.githubusercontent.com/sakugahoukai/csv2AE/refs/heads/main/csv2AE_Panel.jsx)

---

## ✨ Features
* **Direct Import:** Reads Clip Studio CSV timesheets directly within After Effects without the need for external web converters.
* **Smart Auto-Mapping:** Automatically matches CSV column headers with your AE layer names. *(Recommended workflow: Use `Animation Folder + Cell Name` for your layer names).*
* **Symbol Recognition:** Fully supports standard Japanese animation timing symbols (`●`, `○`, and `x`). For instance, frames marked with `x` (kara) will automatically have their Opacity set to 0%.
* **Hold Interpolation:** All generated Time Remap and Opacity keyframes are strictly set to Hold interpolation to preserve crisp 2D animation timing.
* **Auto-Extension:** Automatically extends the `outPoint` of the target layers to match the entire composition duration.

## 📂 Installation
Download the `.jsx` script and place it in your After Effects `ScriptUI Panels` folder:

* **Windows:** `C:\Program Files\Adobe\Adobe After Effects <Version>\Support Files\Scripts\ScriptUI Panels`
* **Mac OS:** `Applications/Adobe After Effects <Version>/Scripts/ScriptUI Panels`

*Note: You must restart After Effects after placing the script in the folder for it to appear in the menu.*

## 🚀 How to Use
1. Open your After Effects project and **activate the target composition** (click anywhere on its timeline).
2. Go to the top menu bar, click **[Window]**, scroll down to the very bottom, and select **`csv2AE_Panel.jsx`** to open the tool.
3. Verify your **AE FPS** setting in the panel (Default is 24).
4. Click the **[Import CSV & Apply]** button and select your exported Clip Studio CSV file.
5. The script will automatically parse the data, find matching layers, and apply the exact timing!
