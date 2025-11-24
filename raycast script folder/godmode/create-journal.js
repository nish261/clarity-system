var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/create-journal.tsx
var create_journal_exports = {};
__export(create_journal_exports, {
  default: () => Command
});
module.exports = __toCommonJS(create_journal_exports);
var import_api = require("@raycast/api");
var import_react = require("react");
var import_os = require("os");
var import_path = require("path");
var import_fs = require("fs");
var VAULT_PATH = (0, import_path.join)((0, import_os.homedir)(), "Desktop", "Real Niggas Vault");
var VAULT_NAME = "Real Niggas Vault";
var TEMPLATES_FOLDER = "7. Templates";
function Command() {
  const [title, setTitle] = (0, import_react.useState)("");
  async function handleSubmit() {
    const toast = await (0, import_api.showToast)({ style: import_api.Toast.Style.Animated, title: "Creating..." });
    try {
      const now = /* @__PURE__ */ new Date();
      const dateStr = now.toISOString().split("T")[0];
      const timestampPretty = `${dateStr} ${now.toTimeString().substring(0, 5)}`;
      const finalTitle = title.trim() || "Daily Entry";
      const templatePath = (0, import_path.join)(VAULT_PATH, TEMPLATES_FOLDER, "Journal.md");
      let fileContent = (0, import_fs.readFileSync)(templatePath, "utf-8");
      fileContent = fileContent.replace(/\{\{CONTENT\}\}/g, finalTitle);
      fileContent = fileContent.replace(/\{\{DATE\}\}/g, timestampPretty);
      const targetFolder = (0, import_path.join)(VAULT_PATH, "2. Journal");
      if (!(0, import_fs.existsSync)(targetFolder)) (0, import_fs.mkdirSync)(targetFolder, { recursive: true });
      const safeTitle = finalTitle.replace(/[^\w\s-]/g, "").trim().substring(0, 60);
      const filename = `${safeTitle} - ${dateStr}.md`;
      (0, import_fs.writeFileSync)((0, import_path.join)(targetFolder, filename), fileContent);
      const obsidianUri = `obsidian://open?vault=${encodeURIComponent(VAULT_NAME)}&file=${encodeURIComponent("2. Journal/" + filename)}`;
      await (0, import_api.open)(obsidianUri);
      toast.style = import_api.Toast.Style.Success;
      toast.title = "\u2713 Created!";
      await (0, import_api.closeMainWindow)();
    } catch (error) {
      toast.style = import_api.Toast.Style.Failure;
      toast.title = "Failed";
      toast.message = String(error);
    }
  }
  return /* @__PURE__ */ _jsx(
    import_api.Form,
    {
      actions: /* @__PURE__ */ _jsx(import_api.ActionPanel, null, /* @__PURE__ */ _jsx(import_api.Action.SubmitForm, { title: "Create Note", onSubmit: handleSubmit }))
    },
    /* @__PURE__ */ _jsx(
      import_api.Form.TextField,
      {
        id: "title",
        title: "Title",
        placeholder: 'Leave blank for "Daily Entry"',
        value: title,
        onChange: setTitle
      }
    ),
    /* @__PURE__ */ _jsx(import_api.Form.Description, { text: "Creating Journal in 2. Journal" })
  );
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vRGVza3RvcC9nb2Rtb2RlLWV4dGVuc2lvbi9zcmMvY3JlYXRlLWpvdXJuYWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBGb3JtLCBBY3Rpb25QYW5lbCwgQWN0aW9uLCBzaG93VG9hc3QsIFRvYXN0LCBvcGVuLCBjbG9zZU1haW5XaW5kb3cgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaG9tZWRpciB9IGZyb20gXCJvc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMsIGV4aXN0c1N5bmMsIG1rZGlyU3luYyB9IGZyb20gXCJmc1wiO1xuXG5jb25zdCBWQVVMVF9QQVRIID0gam9pbihob21lZGlyKCksIFwiRGVza3RvcFwiLCBcIlJlYWwgTmlnZ2FzIFZhdWx0XCIpO1xuY29uc3QgVkFVTFRfTkFNRSA9IFwiUmVhbCBOaWdnYXMgVmF1bHRcIjtcbmNvbnN0IFRFTVBMQVRFU19GT0xERVIgPSBcIjcuIFRlbXBsYXRlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICBjb25zdCBbdGl0bGUsIHNldFRpdGxlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdCgpIHtcbiAgICBjb25zdCB0b2FzdCA9IGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5BbmltYXRlZCwgdGl0bGU6IFwiQ3JlYXRpbmcuLi5cIiB9KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcFByZXR0eSA9IGAke2RhdGVTdHJ9ICR7bm93LnRvVGltZVN0cmluZygpLnN1YnN0cmluZygwLCA1KX1gO1xuICAgICAgY29uc3QgZmluYWxUaXRsZSA9IHRpdGxlLnRyaW0oKSB8fCBcIkRhaWx5IEVudHJ5XCI7XG5cbiAgICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IGpvaW4oVkFVTFRfUEFUSCwgVEVNUExBVEVTX0ZPTERFUiwgXCJKb3VybmFsLm1kXCIpO1xuICAgICAgbGV0IGZpbGVDb250ZW50ID0gcmVhZEZpbGVTeW5jKHRlbXBsYXRlUGF0aCwgXCJ1dGYtOFwiKTtcbiAgICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQucmVwbGFjZSgvXFx7XFx7Q09OVEVOVFxcfVxcfS9nLCBmaW5hbFRpdGxlKTtcbiAgICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQucmVwbGFjZSgvXFx7XFx7REFURVxcfVxcfS9nLCB0aW1lc3RhbXBQcmV0dHkpO1xuXG4gICAgICBjb25zdCB0YXJnZXRGb2xkZXIgPSBqb2luKFZBVUxUX1BBVEgsIFwiMi4gSm91cm5hbFwiKTtcbiAgICAgIGlmICghZXhpc3RzU3luYyh0YXJnZXRGb2xkZXIpKSBta2RpclN5bmModGFyZ2V0Rm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgY29uc3Qgc2FmZVRpdGxlID0gZmluYWxUaXRsZS5yZXBsYWNlKC9bXlxcd1xccy1dL2csIFwiXCIpLnRyaW0oKS5zdWJzdHJpbmcoMCwgNjApO1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBgJHtzYWZlVGl0bGV9IC0gJHtkYXRlU3RyfS5tZGA7XG5cbiAgICAgIHdyaXRlRmlsZVN5bmMoam9pbih0YXJnZXRGb2xkZXIsIGZpbGVuYW1lKSwgZmlsZUNvbnRlbnQpO1xuXG4gICAgICBjb25zdCBvYnNpZGlhblVyaSA9IGBvYnNpZGlhbjovL29wZW4/dmF1bHQ9JHtlbmNvZGVVUklDb21wb25lbnQoVkFVTFRfTkFNRSl9JmZpbGU9JHtlbmNvZGVVUklDb21wb25lbnQoXCIyLiBKb3VybmFsL1wiICsgZmlsZW5hbWUpfWA7XG4gICAgICBhd2FpdCBvcGVuKG9ic2lkaWFuVXJpKTtcblxuICAgICAgdG9hc3Quc3R5bGUgPSBUb2FzdC5TdHlsZS5TdWNjZXNzO1xuICAgICAgdG9hc3QudGl0bGUgPSBcIlx1MjcxMyBDcmVhdGVkIVwiO1xuICAgICAgYXdhaXQgY2xvc2VNYWluV2luZG93KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRvYXN0LnN0eWxlID0gVG9hc3QuU3R5bGUuRmFpbHVyZTtcbiAgICAgIHRvYXN0LnRpdGxlID0gXCJGYWlsZWRcIjtcbiAgICAgIHRvYXN0Lm1lc3NhZ2UgPSBTdHJpbmcoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEZvcm1cbiAgICAgIGFjdGlvbnM9e1xuICAgICAgICA8QWN0aW9uUGFuZWw+XG4gICAgICAgICAgPEFjdGlvbi5TdWJtaXRGb3JtIHRpdGxlPVwiQ3JlYXRlIE5vdGVcIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSAvPlxuICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgfVxuICAgID5cbiAgICAgIDxGb3JtLlRleHRGaWVsZFxuICAgICAgICBpZD1cInRpdGxlXCJcbiAgICAgICAgdGl0bGU9XCJUaXRsZVwiXG4gICAgICAgIHBsYWNlaG9sZGVyPSdMZWF2ZSBibGFuayBmb3IgXCJEYWlseSBFbnRyeVwiJ1xuICAgICAgICB2YWx1ZT17dGl0bGV9XG4gICAgICAgIG9uQ2hhbmdlPXtzZXRUaXRsZX1cbiAgICAgIC8+XG4gICAgICA8Rm9ybS5EZXNjcmlwdGlvbiB0ZXh0PVwiQ3JlYXRpbmcgSm91cm5hbCBpbiAyLiBKb3VybmFsXCIgLz5cbiAgICA8L0Zvcm0+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFtRjtBQUNuRixtQkFBeUI7QUFDekIsZ0JBQXdCO0FBQ3hCLGtCQUFxQjtBQUNyQixnQkFBbUU7QUFFbkUsSUFBTSxpQkFBYSxzQkFBSyxtQkFBUSxHQUFHLFdBQVcsbUJBQW1CO0FBQ2pFLElBQU0sYUFBYTtBQUNuQixJQUFNLG1CQUFtQjtBQUVWLFNBQVIsVUFBMkI7QUFDaEMsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFTLEVBQUU7QUFFckMsaUJBQWUsZUFBZTtBQUM1QixVQUFNLFFBQVEsVUFBTSxzQkFBVSxFQUFFLE9BQU8saUJBQU0sTUFBTSxVQUFVLE9BQU8sY0FBYyxDQUFDO0FBRW5GLFFBQUk7QUFDRixZQUFNLE1BQU0sb0JBQUksS0FBSztBQUNyQixZQUFNLFVBQVUsSUFBSSxZQUFZLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUM5QyxZQUFNLGtCQUFrQixHQUFHLE9BQU8sSUFBSSxJQUFJLGFBQWEsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3hFLFlBQU0sYUFBYSxNQUFNLEtBQUssS0FBSztBQUVuQyxZQUFNLG1CQUFlLGtCQUFLLFlBQVksa0JBQWtCLFlBQVk7QUFDcEUsVUFBSSxrQkFBYyx3QkFBYSxjQUFjLE9BQU87QUFDcEQsb0JBQWMsWUFBWSxRQUFRLG9CQUFvQixVQUFVO0FBQ2hFLG9CQUFjLFlBQVksUUFBUSxpQkFBaUIsZUFBZTtBQUVsRSxZQUFNLG1CQUFlLGtCQUFLLFlBQVksWUFBWTtBQUNsRCxVQUFJLEtBQUMsc0JBQVcsWUFBWSxFQUFHLDBCQUFVLGNBQWMsRUFBRSxXQUFXLEtBQUssQ0FBQztBQUUxRSxZQUFNLFlBQVksV0FBVyxRQUFRLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUcsRUFBRTtBQUM1RSxZQUFNLFdBQVcsR0FBRyxTQUFTLE1BQU0sT0FBTztBQUUxQyx1Q0FBYyxrQkFBSyxjQUFjLFFBQVEsR0FBRyxXQUFXO0FBRXZELFlBQU0sY0FBYyx5QkFBeUIsbUJBQW1CLFVBQVUsQ0FBQyxTQUFTLG1CQUFtQixnQkFBZ0IsUUFBUSxDQUFDO0FBQ2hJLGdCQUFNLGlCQUFLLFdBQVc7QUFFdEIsWUFBTSxRQUFRLGlCQUFNLE1BQU07QUFDMUIsWUFBTSxRQUFRO0FBQ2QsZ0JBQU0sNEJBQWdCO0FBQUEsSUFDeEIsU0FBUyxPQUFPO0FBQ2QsWUFBTSxRQUFRLGlCQUFNLE1BQU07QUFDMUIsWUFBTSxRQUFRO0FBQ2QsWUFBTSxVQUFVLE9BQU8sS0FBSztBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUVBLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLFNBQ0UscUJBQUMsOEJBQ0MscUJBQUMsa0JBQU8sWUFBUCxFQUFrQixPQUFNLGVBQWMsVUFBVSxjQUFjLENBQ2pFO0FBQUE7QUFBQSxJQUdGO0FBQUEsTUFBQyxnQkFBSztBQUFBLE1BQUw7QUFBQSxRQUNDLElBQUc7QUFBQSxRQUNILE9BQU07QUFBQSxRQUNOLGFBQVk7QUFBQSxRQUNaLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQTtBQUFBLElBQ1o7QUFBQSxJQUNBLHFCQUFDLGdCQUFLLGFBQUwsRUFBaUIsTUFBSyxrQ0FBaUM7QUFBQSxFQUMxRDtBQUVKOyIsCiAgIm5hbWVzIjogW10KfQo=
