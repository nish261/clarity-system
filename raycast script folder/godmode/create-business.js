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

// src/create-business.tsx
var create_business_exports = {};
__export(create_business_exports, {
  default: () => Command
});
module.exports = __toCommonJS(create_business_exports);
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
      const finalTitle = title.trim() || "New Business Idea";
      const templatePath = (0, import_path.join)(VAULT_PATH, TEMPLATES_FOLDER, "Business.md");
      let fileContent = (0, import_fs.readFileSync)(templatePath, "utf-8");
      fileContent = fileContent.replace(/\{\{CONTENT\}\}/g, finalTitle);
      fileContent = fileContent.replace(/\{\{DATE\}\}/g, timestampPretty);
      const targetFolder = (0, import_path.join)(VAULT_PATH, "1. Business");
      if (!(0, import_fs.existsSync)(targetFolder)) (0, import_fs.mkdirSync)(targetFolder, { recursive: true });
      const safeTitle = finalTitle.replace(/[^\w\s-]/g, "").trim().substring(0, 60);
      const filename = `${safeTitle} - ${dateStr}.md`;
      (0, import_fs.writeFileSync)((0, import_path.join)(targetFolder, filename), fileContent);
      const obsidianUri = `obsidian://open?vault=${encodeURIComponent(VAULT_NAME)}&file=${encodeURIComponent("1. Business/" + filename)}`;
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
        placeholder: 'Leave blank for "New Business Idea"',
        value: title,
        onChange: setTitle
      }
    ),
    /* @__PURE__ */ _jsx(import_api.Form.Description, { text: "Creating Business in 1. Business" })
  );
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vRGVza3RvcC9nb2Rtb2RlLWV4dGVuc2lvbi9zcmMvY3JlYXRlLWJ1c2luZXNzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgRm9ybSwgQWN0aW9uUGFuZWwsIEFjdGlvbiwgc2hvd1RvYXN0LCBUb2FzdCwgb3BlbiwgY2xvc2VNYWluV2luZG93IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGhvbWVkaXIgfSBmcm9tIFwib3NcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jLCB3cml0ZUZpbGVTeW5jLCBleGlzdHNTeW5jLCBta2RpclN5bmMgfSBmcm9tIFwiZnNcIjtcblxuY29uc3QgVkFVTFRfUEFUSCA9IGpvaW4oaG9tZWRpcigpLCBcIkRlc2t0b3BcIiwgXCJSZWFsIE5pZ2dhcyBWYXVsdFwiKTtcbmNvbnN0IFZBVUxUX05BTUUgPSBcIlJlYWwgTmlnZ2FzIFZhdWx0XCI7XG5jb25zdCBURU1QTEFURVNfRk9MREVSID0gXCI3LiBUZW1wbGF0ZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAgY29uc3QgW3RpdGxlLCBzZXRUaXRsZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoKSB7XG4gICAgY29uc3QgdG9hc3QgPSBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuQW5pbWF0ZWQsIHRpdGxlOiBcIkNyZWF0aW5nLi4uXCIgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IGRhdGVTdHIgPSBub3cudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG4gICAgICBjb25zdCB0aW1lc3RhbXBQcmV0dHkgPSBgJHtkYXRlU3RyfSAke25vdy50b1RpbWVTdHJpbmcoKS5zdWJzdHJpbmcoMCwgNSl9YDtcbiAgICAgIGNvbnN0IGZpbmFsVGl0bGUgPSB0aXRsZS50cmltKCkgfHwgXCJOZXcgQnVzaW5lc3MgSWRlYVwiO1xuXG4gICAgICBjb25zdCB0ZW1wbGF0ZVBhdGggPSBqb2luKFZBVUxUX1BBVEgsIFRFTVBMQVRFU19GT0xERVIsIFwiQnVzaW5lc3MubWRcIik7XG4gICAgICBsZXQgZmlsZUNvbnRlbnQgPSByZWFkRmlsZVN5bmModGVtcGxhdGVQYXRoLCBcInV0Zi04XCIpO1xuICAgICAgZmlsZUNvbnRlbnQgPSBmaWxlQ29udGVudC5yZXBsYWNlKC9cXHtcXHtDT05URU5UXFx9XFx9L2csIGZpbmFsVGl0bGUpO1xuICAgICAgZmlsZUNvbnRlbnQgPSBmaWxlQ29udGVudC5yZXBsYWNlKC9cXHtcXHtEQVRFXFx9XFx9L2csIHRpbWVzdGFtcFByZXR0eSk7XG5cbiAgICAgIGNvbnN0IHRhcmdldEZvbGRlciA9IGpvaW4oVkFVTFRfUEFUSCwgXCIxLiBCdXNpbmVzc1wiKTtcbiAgICAgIGlmICghZXhpc3RzU3luYyh0YXJnZXRGb2xkZXIpKSBta2RpclN5bmModGFyZ2V0Rm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgY29uc3Qgc2FmZVRpdGxlID0gZmluYWxUaXRsZS5yZXBsYWNlKC9bXlxcd1xccy1dL2csIFwiXCIpLnRyaW0oKS5zdWJzdHJpbmcoMCwgNjApO1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBgJHtzYWZlVGl0bGV9IC0gJHtkYXRlU3RyfS5tZGA7XG5cbiAgICAgIHdyaXRlRmlsZVN5bmMoam9pbih0YXJnZXRGb2xkZXIsIGZpbGVuYW1lKSwgZmlsZUNvbnRlbnQpO1xuXG4gICAgICBjb25zdCBvYnNpZGlhblVyaSA9IGBvYnNpZGlhbjovL29wZW4/dmF1bHQ9JHtlbmNvZGVVUklDb21wb25lbnQoVkFVTFRfTkFNRSl9JmZpbGU9JHtlbmNvZGVVUklDb21wb25lbnQoXCIxLiBCdXNpbmVzcy9cIiArIGZpbGVuYW1lKX1gO1xuICAgICAgYXdhaXQgb3BlbihvYnNpZGlhblVyaSk7XG5cbiAgICAgIHRvYXN0LnN0eWxlID0gVG9hc3QuU3R5bGUuU3VjY2VzcztcbiAgICAgIHRvYXN0LnRpdGxlID0gXCJcdTI3MTMgQ3JlYXRlZCFcIjtcbiAgICAgIGF3YWl0IGNsb3NlTWFpbldpbmRvdygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0b2FzdC5zdHlsZSA9IFRvYXN0LlN0eWxlLkZhaWx1cmU7XG4gICAgICB0b2FzdC50aXRsZSA9IFwiRmFpbGVkXCI7XG4gICAgICB0b2FzdC5tZXNzYWdlID0gU3RyaW5nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxGb3JtXG4gICAgICBhY3Rpb25zPXtcbiAgICAgICAgPEFjdGlvblBhbmVsPlxuICAgICAgICAgIDxBY3Rpb24uU3VibWl0Rm9ybSB0aXRsZT1cIkNyZWF0ZSBOb3RlXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gLz5cbiAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgIH1cbiAgICA+XG4gICAgICA8Rm9ybS5UZXh0RmllbGRcbiAgICAgICAgaWQ9XCJ0aXRsZVwiXG4gICAgICAgIHRpdGxlPVwiVGl0bGVcIlxuICAgICAgICBwbGFjZWhvbGRlcj0nTGVhdmUgYmxhbmsgZm9yIFwiTmV3IEJ1c2luZXNzIElkZWFcIidcbiAgICAgICAgdmFsdWU9e3RpdGxlfVxuICAgICAgICBvbkNoYW5nZT17c2V0VGl0bGV9XG4gICAgICAvPlxuICAgICAgPEZvcm0uRGVzY3JpcHRpb24gdGV4dD1cIkNyZWF0aW5nIEJ1c2luZXNzIGluIDEuIEJ1c2luZXNzXCIgLz5cbiAgICA8L0Zvcm0+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFtRjtBQUNuRixtQkFBeUI7QUFDekIsZ0JBQXdCO0FBQ3hCLGtCQUFxQjtBQUNyQixnQkFBbUU7QUFFbkUsSUFBTSxpQkFBYSxzQkFBSyxtQkFBUSxHQUFHLFdBQVcsbUJBQW1CO0FBQ2pFLElBQU0sYUFBYTtBQUNuQixJQUFNLG1CQUFtQjtBQUVWLFNBQVIsVUFBMkI7QUFDaEMsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFTLEVBQUU7QUFFckMsaUJBQWUsZUFBZTtBQUM1QixVQUFNLFFBQVEsVUFBTSxzQkFBVSxFQUFFLE9BQU8saUJBQU0sTUFBTSxVQUFVLE9BQU8sY0FBYyxDQUFDO0FBRW5GLFFBQUk7QUFDRixZQUFNLE1BQU0sb0JBQUksS0FBSztBQUNyQixZQUFNLFVBQVUsSUFBSSxZQUFZLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUM5QyxZQUFNLGtCQUFrQixHQUFHLE9BQU8sSUFBSSxJQUFJLGFBQWEsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3hFLFlBQU0sYUFBYSxNQUFNLEtBQUssS0FBSztBQUVuQyxZQUFNLG1CQUFlLGtCQUFLLFlBQVksa0JBQWtCLGFBQWE7QUFDckUsVUFBSSxrQkFBYyx3QkFBYSxjQUFjLE9BQU87QUFDcEQsb0JBQWMsWUFBWSxRQUFRLG9CQUFvQixVQUFVO0FBQ2hFLG9CQUFjLFlBQVksUUFBUSxpQkFBaUIsZUFBZTtBQUVsRSxZQUFNLG1CQUFlLGtCQUFLLFlBQVksYUFBYTtBQUNuRCxVQUFJLEtBQUMsc0JBQVcsWUFBWSxFQUFHLDBCQUFVLGNBQWMsRUFBRSxXQUFXLEtBQUssQ0FBQztBQUUxRSxZQUFNLFlBQVksV0FBVyxRQUFRLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUcsRUFBRTtBQUM1RSxZQUFNLFdBQVcsR0FBRyxTQUFTLE1BQU0sT0FBTztBQUUxQyx1Q0FBYyxrQkFBSyxjQUFjLFFBQVEsR0FBRyxXQUFXO0FBRXZELFlBQU0sY0FBYyx5QkFBeUIsbUJBQW1CLFVBQVUsQ0FBQyxTQUFTLG1CQUFtQixpQkFBaUIsUUFBUSxDQUFDO0FBQ2pJLGdCQUFNLGlCQUFLLFdBQVc7QUFFdEIsWUFBTSxRQUFRLGlCQUFNLE1BQU07QUFDMUIsWUFBTSxRQUFRO0FBQ2QsZ0JBQU0sNEJBQWdCO0FBQUEsSUFDeEIsU0FBUyxPQUFPO0FBQ2QsWUFBTSxRQUFRLGlCQUFNLE1BQU07QUFDMUIsWUFBTSxRQUFRO0FBQ2QsWUFBTSxVQUFVLE9BQU8sS0FBSztBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUVBLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLFNBQ0UscUJBQUMsOEJBQ0MscUJBQUMsa0JBQU8sWUFBUCxFQUFrQixPQUFNLGVBQWMsVUFBVSxjQUFjLENBQ2pFO0FBQUE7QUFBQSxJQUdGO0FBQUEsTUFBQyxnQkFBSztBQUFBLE1BQUw7QUFBQSxRQUNDLElBQUc7QUFBQSxRQUNILE9BQU07QUFBQSxRQUNOLGFBQVk7QUFBQSxRQUNaLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQTtBQUFBLElBQ1o7QUFBQSxJQUNBLHFCQUFDLGdCQUFLLGFBQUwsRUFBaUIsTUFBSyxvQ0FBbUM7QUFBQSxFQUM1RDtBQUVKOyIsCiAgIm5hbWVzIjogW10KfQo=
