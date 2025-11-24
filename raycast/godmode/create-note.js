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

// src/create-note.tsx
var create_note_exports = {};
__export(create_note_exports, {
  default: () => Command
});
module.exports = __toCommonJS(create_note_exports);
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
      const finalTitle = title.trim() || "Quick Note";
      const templatePath = (0, import_path.join)(VAULT_PATH, TEMPLATES_FOLDER, "Notes.md");
      let fileContent = (0, import_fs.readFileSync)(templatePath, "utf-8");
      fileContent = fileContent.replace(/\{\{CONTENT\}\}/g, finalTitle);
      fileContent = fileContent.replace(/\{\{DATE\}\}/g, timestampPretty);
      const targetFolder = (0, import_path.join)(VAULT_PATH, "4. Notes");
      if (!(0, import_fs.existsSync)(targetFolder)) (0, import_fs.mkdirSync)(targetFolder, { recursive: true });
      const safeTitle = finalTitle.replace(/[^\w\s-]/g, "").trim().substring(0, 60);
      const filename = `${safeTitle} - ${dateStr}.md`;
      (0, import_fs.writeFileSync)((0, import_path.join)(targetFolder, filename), fileContent);
      const obsidianUri = `obsidian://open?vault=${encodeURIComponent(VAULT_NAME)}&file=${encodeURIComponent("4. Notes/" + filename)}`;
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
        placeholder: 'Leave blank for "Quick Note"',
        value: title,
        onChange: setTitle
      }
    ),
    /* @__PURE__ */ _jsx(import_api.Form.Description, { text: "Creating Note in 4. Notes" })
  );
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vRGVza3RvcC9nb2Rtb2RlLWV4dGVuc2lvbi9zcmMvY3JlYXRlLW5vdGUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBGb3JtLCBBY3Rpb25QYW5lbCwgQWN0aW9uLCBzaG93VG9hc3QsIFRvYXN0LCBvcGVuLCBjbG9zZU1haW5XaW5kb3cgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaG9tZWRpciB9IGZyb20gXCJvc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMsIGV4aXN0c1N5bmMsIG1rZGlyU3luYyB9IGZyb20gXCJmc1wiO1xuXG5jb25zdCBWQVVMVF9QQVRIID0gam9pbihob21lZGlyKCksIFwiRGVza3RvcFwiLCBcIlJlYWwgTmlnZ2FzIFZhdWx0XCIpO1xuY29uc3QgVkFVTFRfTkFNRSA9IFwiUmVhbCBOaWdnYXMgVmF1bHRcIjtcbmNvbnN0IFRFTVBMQVRFU19GT0xERVIgPSBcIjcuIFRlbXBsYXRlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICBjb25zdCBbdGl0bGUsIHNldFRpdGxlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdCgpIHtcbiAgICBjb25zdCB0b2FzdCA9IGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5BbmltYXRlZCwgdGl0bGU6IFwiQ3JlYXRpbmcuLi5cIiB9KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcFByZXR0eSA9IGAke2RhdGVTdHJ9ICR7bm93LnRvVGltZVN0cmluZygpLnN1YnN0cmluZygwLCA1KX1gO1xuICAgICAgY29uc3QgZmluYWxUaXRsZSA9IHRpdGxlLnRyaW0oKSB8fCBcIlF1aWNrIE5vdGVcIjtcblxuICAgICAgY29uc3QgdGVtcGxhdGVQYXRoID0gam9pbihWQVVMVF9QQVRILCBURU1QTEFURVNfRk9MREVSLCBcIk5vdGVzLm1kXCIpO1xuICAgICAgbGV0IGZpbGVDb250ZW50ID0gcmVhZEZpbGVTeW5jKHRlbXBsYXRlUGF0aCwgXCJ1dGYtOFwiKTtcbiAgICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQucmVwbGFjZSgvXFx7XFx7Q09OVEVOVFxcfVxcfS9nLCBmaW5hbFRpdGxlKTtcbiAgICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQucmVwbGFjZSgvXFx7XFx7REFURVxcfVxcfS9nLCB0aW1lc3RhbXBQcmV0dHkpO1xuXG4gICAgICBjb25zdCB0YXJnZXRGb2xkZXIgPSBqb2luKFZBVUxUX1BBVEgsIFwiNC4gTm90ZXNcIik7XG4gICAgICBpZiAoIWV4aXN0c1N5bmModGFyZ2V0Rm9sZGVyKSkgbWtkaXJTeW5jKHRhcmdldEZvbGRlciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgIGNvbnN0IHNhZmVUaXRsZSA9IGZpbmFsVGl0bGUucmVwbGFjZSgvW15cXHdcXHMtXS9nLCBcIlwiKS50cmltKCkuc3Vic3RyaW5nKDAsIDYwKTtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7c2FmZVRpdGxlfSAtICR7ZGF0ZVN0cn0ubWRgO1xuXG4gICAgICB3cml0ZUZpbGVTeW5jKGpvaW4odGFyZ2V0Rm9sZGVyLCBmaWxlbmFtZSksIGZpbGVDb250ZW50KTtcblxuICAgICAgY29uc3Qgb2JzaWRpYW5VcmkgPSBgb2JzaWRpYW46Ly9vcGVuP3ZhdWx0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KFZBVUxUX05BTUUpfSZmaWxlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFwiNC4gTm90ZXMvXCIgKyBmaWxlbmFtZSl9YDtcbiAgICAgIGF3YWl0IG9wZW4ob2JzaWRpYW5VcmkpO1xuXG4gICAgICB0b2FzdC5zdHlsZSA9IFRvYXN0LlN0eWxlLlN1Y2Nlc3M7XG4gICAgICB0b2FzdC50aXRsZSA9IFwiXHUyNzEzIENyZWF0ZWQhXCI7XG4gICAgICBhd2FpdCBjbG9zZU1haW5XaW5kb3coKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdG9hc3Quc3R5bGUgPSBUb2FzdC5TdHlsZS5GYWlsdXJlO1xuICAgICAgdG9hc3QudGl0bGUgPSBcIkZhaWxlZFwiO1xuICAgICAgdG9hc3QubWVzc2FnZSA9IFN0cmluZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICA8QWN0aW9uLlN1Ym1pdEZvcm0gdGl0bGU9XCJDcmVhdGUgTm90ZVwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IC8+XG4gICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICB9XG4gICAgPlxuICAgICAgPEZvcm0uVGV4dEZpZWxkXG4gICAgICAgIGlkPVwidGl0bGVcIlxuICAgICAgICB0aXRsZT1cIlRpdGxlXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9J0xlYXZlIGJsYW5rIGZvciBcIlF1aWNrIE5vdGVcIidcbiAgICAgICAgdmFsdWU9e3RpdGxlfVxuICAgICAgICBvbkNoYW5nZT17c2V0VGl0bGV9XG4gICAgICAvPlxuICAgICAgPEZvcm0uRGVzY3JpcHRpb24gdGV4dD1cIkNyZWF0aW5nIE5vdGUgaW4gNC4gTm90ZXNcIiAvPlxuICAgIDwvRm9ybT5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQW1GO0FBQ25GLG1CQUF5QjtBQUN6QixnQkFBd0I7QUFDeEIsa0JBQXFCO0FBQ3JCLGdCQUFtRTtBQUVuRSxJQUFNLGlCQUFhLHNCQUFLLG1CQUFRLEdBQUcsV0FBVyxtQkFBbUI7QUFDakUsSUFBTSxhQUFhO0FBQ25CLElBQU0sbUJBQW1CO0FBRVYsU0FBUixVQUEyQjtBQUNoQyxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksdUJBQVMsRUFBRTtBQUVyQyxpQkFBZSxlQUFlO0FBQzVCLFVBQU0sUUFBUSxVQUFNLHNCQUFVLEVBQUUsT0FBTyxpQkFBTSxNQUFNLFVBQVUsT0FBTyxjQUFjLENBQUM7QUFFbkYsUUFBSTtBQUNGLFlBQU0sTUFBTSxvQkFBSSxLQUFLO0FBQ3JCLFlBQU0sVUFBVSxJQUFJLFlBQVksRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzlDLFlBQU0sa0JBQWtCLEdBQUcsT0FBTyxJQUFJLElBQUksYUFBYSxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDeEUsWUFBTSxhQUFhLE1BQU0sS0FBSyxLQUFLO0FBRW5DLFlBQU0sbUJBQWUsa0JBQUssWUFBWSxrQkFBa0IsVUFBVTtBQUNsRSxVQUFJLGtCQUFjLHdCQUFhLGNBQWMsT0FBTztBQUNwRCxvQkFBYyxZQUFZLFFBQVEsb0JBQW9CLFVBQVU7QUFDaEUsb0JBQWMsWUFBWSxRQUFRLGlCQUFpQixlQUFlO0FBRWxFLFlBQU0sbUJBQWUsa0JBQUssWUFBWSxVQUFVO0FBQ2hELFVBQUksS0FBQyxzQkFBVyxZQUFZLEVBQUcsMEJBQVUsY0FBYyxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBRTFFLFlBQU0sWUFBWSxXQUFXLFFBQVEsYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRyxFQUFFO0FBQzVFLFlBQU0sV0FBVyxHQUFHLFNBQVMsTUFBTSxPQUFPO0FBRTFDLHVDQUFjLGtCQUFLLGNBQWMsUUFBUSxHQUFHLFdBQVc7QUFFdkQsWUFBTSxjQUFjLHlCQUF5QixtQkFBbUIsVUFBVSxDQUFDLFNBQVMsbUJBQW1CLGNBQWMsUUFBUSxDQUFDO0FBQzlILGdCQUFNLGlCQUFLLFdBQVc7QUFFdEIsWUFBTSxRQUFRLGlCQUFNLE1BQU07QUFDMUIsWUFBTSxRQUFRO0FBQ2QsZ0JBQU0sNEJBQWdCO0FBQUEsSUFDeEIsU0FBUyxPQUFPO0FBQ2QsWUFBTSxRQUFRLGlCQUFNLE1BQU07QUFDMUIsWUFBTSxRQUFRO0FBQ2QsWUFBTSxVQUFVLE9BQU8sS0FBSztBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUVBLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLFNBQ0UscUJBQUMsOEJBQ0MscUJBQUMsa0JBQU8sWUFBUCxFQUFrQixPQUFNLGVBQWMsVUFBVSxjQUFjLENBQ2pFO0FBQUE7QUFBQSxJQUdGO0FBQUEsTUFBQyxnQkFBSztBQUFBLE1BQUw7QUFBQSxRQUNDLElBQUc7QUFBQSxRQUNILE9BQU07QUFBQSxRQUNOLGFBQVk7QUFBQSxRQUNaLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQTtBQUFBLElBQ1o7QUFBQSxJQUNBLHFCQUFDLGdCQUFLLGFBQUwsRUFBaUIsTUFBSyw2QkFBNEI7QUFBQSxFQUNyRDtBQUVKOyIsCiAgIm5hbWVzIjogW10KfQo=
