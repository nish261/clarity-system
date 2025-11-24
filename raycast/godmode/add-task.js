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

// src/add-task.tsx
var add_task_exports = {};
__export(add_task_exports, {
  default: () => Command
});
module.exports = __toCommonJS(add_task_exports);
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
    const toast = await (0, import_api.showToast)({ style: import_api.Toast.Style.Animated, title: "Adding task..." });
    try {
      const now = /* @__PURE__ */ new Date();
      const dateStr = now.toISOString().split("T")[0];
      const targetFolder = (0, import_path.join)(VAULT_PATH, "3. Tasks");
      const filename = `${dateStr}.md`;
      const fullPath = (0, import_path.join)(targetFolder, filename);
      if (!(0, import_fs.existsSync)(fullPath)) {
        const timestampPretty = `${dateStr} ${now.toTimeString().substring(0, 5)}`;
        const templatePath = (0, import_path.join)(VAULT_PATH, TEMPLATES_FOLDER, "Task.md");
        let fileContent = (0, import_fs.readFileSync)(templatePath, "utf-8");
        fileContent = fileContent.replace(/\{\{CONTENT\}\}/g, title || "Quick Task");
        fileContent = fileContent.replace(/\{\{DATE\}\}/g, timestampPretty);
        if (!(0, import_fs.existsSync)(targetFolder)) (0, import_fs.mkdirSync)(targetFolder, { recursive: true });
        (0, import_fs.writeFileSync)(fullPath, fileContent);
      } else {
        let fileContent = (0, import_fs.readFileSync)(fullPath, "utf-8");
        const todaysSectionRegex = /(## <span style="color: #f44336">Today's Tasks<\/span>\s*\n)/;
        if (todaysSectionRegex.test(fileContent)) {
          fileContent = fileContent.replace(todaysSectionRegex, `$1- [ ] ${title}
`);
        } else {
          fileContent += `
- [ ] ${title}
`;
        }
        (0, import_fs.writeFileSync)(fullPath, fileContent);
      }
      const obsidianUri = `obsidian://open?vault=${encodeURIComponent(VAULT_NAME)}&file=${encodeURIComponent("3. Tasks/" + filename)}`;
      await (0, import_api.open)(obsidianUri);
      toast.style = import_api.Toast.Style.Success;
      toast.title = "\u2713 Task Added!";
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
      actions: /* @__PURE__ */ _jsx(import_api.ActionPanel, null, /* @__PURE__ */ _jsx(import_api.Action.SubmitForm, { title: "Add Task", onSubmit: handleSubmit }))
    },
    /* @__PURE__ */ _jsx(
      import_api.Form.TextField,
      {
        id: "title",
        title: "Task",
        placeholder: "What do you need to do?",
        value: title,
        onChange: setTitle
      }
    ),
    /* @__PURE__ */ _jsx(import_api.Form.Description, { text: "Adding to today's task list" })
  );
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vRGVza3RvcC9nb2Rtb2RlLWV4dGVuc2lvbi9zcmMvYWRkLXRhc2sudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBGb3JtLCBBY3Rpb25QYW5lbCwgQWN0aW9uLCBzaG93VG9hc3QsIFRvYXN0LCBvcGVuLCBjbG9zZU1haW5XaW5kb3cgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaG9tZWRpciB9IGZyb20gXCJvc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMsIGV4aXN0c1N5bmMsIG1rZGlyU3luYyB9IGZyb20gXCJmc1wiO1xuXG5jb25zdCBWQVVMVF9QQVRIID0gam9pbihob21lZGlyKCksIFwiRGVza3RvcFwiLCBcIlJlYWwgTmlnZ2FzIFZhdWx0XCIpO1xuY29uc3QgVkFVTFRfTkFNRSA9IFwiUmVhbCBOaWdnYXMgVmF1bHRcIjtcbmNvbnN0IFRFTVBMQVRFU19GT0xERVIgPSBcIjcuIFRlbXBsYXRlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICBjb25zdCBbdGl0bGUsIHNldFRpdGxlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdCgpIHtcbiAgICBjb25zdCB0b2FzdCA9IGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5BbmltYXRlZCwgdGl0bGU6IFwiQWRkaW5nIHRhc2suLi5cIiB9KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcbiAgICAgIGNvbnN0IHRhcmdldEZvbGRlciA9IGpvaW4oVkFVTFRfUEFUSCwgXCIzLiBUYXNrc1wiKTtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7ZGF0ZVN0cn0ubWRgO1xuICAgICAgY29uc3QgZnVsbFBhdGggPSBqb2luKHRhcmdldEZvbGRlciwgZmlsZW5hbWUpO1xuXG4gICAgICBpZiAoIWV4aXN0c1N5bmMoZnVsbFBhdGgpKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcFByZXR0eSA9IGAke2RhdGVTdHJ9ICR7bm93LnRvVGltZVN0cmluZygpLnN1YnN0cmluZygwLCA1KX1gO1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZVBhdGggPSBqb2luKFZBVUxUX1BBVEgsIFRFTVBMQVRFU19GT0xERVIsIFwiVGFzay5tZFwiKTtcbiAgICAgICAgbGV0IGZpbGVDb250ZW50ID0gcmVhZEZpbGVTeW5jKHRlbXBsYXRlUGF0aCwgXCJ1dGYtOFwiKTtcbiAgICAgICAgZmlsZUNvbnRlbnQgPSBmaWxlQ29udGVudC5yZXBsYWNlKC9cXHtcXHtDT05URU5UXFx9XFx9L2csIHRpdGxlIHx8IFwiUXVpY2sgVGFza1wiKTtcbiAgICAgICAgZmlsZUNvbnRlbnQgPSBmaWxlQ29udGVudC5yZXBsYWNlKC9cXHtcXHtEQVRFXFx9XFx9L2csIHRpbWVzdGFtcFByZXR0eSk7XG4gICAgICAgIGlmICghZXhpc3RzU3luYyh0YXJnZXRGb2xkZXIpKSBta2RpclN5bmModGFyZ2V0Rm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhmdWxsUGF0aCwgZmlsZUNvbnRlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGZpbGVDb250ZW50ID0gcmVhZEZpbGVTeW5jKGZ1bGxQYXRoLCBcInV0Zi04XCIpO1xuICAgICAgICBjb25zdCB0b2RheXNTZWN0aW9uUmVnZXggPSAvKCMjIDxzcGFuIHN0eWxlPVwiY29sb3I6ICNmNDQzMzZcIj5Ub2RheSdzIFRhc2tzPFxcL3NwYW4+XFxzKlxcbikvO1xuICAgICAgICBpZiAodG9kYXlzU2VjdGlvblJlZ2V4LnRlc3QoZmlsZUNvbnRlbnQpKSB7XG4gICAgICAgICAgZmlsZUNvbnRlbnQgPSBmaWxlQ29udGVudC5yZXBsYWNlKHRvZGF5c1NlY3Rpb25SZWdleCwgYCQxLSBbIF0gJHt0aXRsZX1cXG5gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWxlQ29udGVudCArPSBgXFxuLSBbIF0gJHt0aXRsZX1cXG5gO1xuICAgICAgICB9XG4gICAgICAgIHdyaXRlRmlsZVN5bmMoZnVsbFBhdGgsIGZpbGVDb250ZW50KTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2JzaWRpYW5VcmkgPSBgb2JzaWRpYW46Ly9vcGVuP3ZhdWx0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KFZBVUxUX05BTUUpfSZmaWxlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFwiMy4gVGFza3MvXCIgKyBmaWxlbmFtZSl9YDtcbiAgICAgIGF3YWl0IG9wZW4ob2JzaWRpYW5VcmkpO1xuXG4gICAgICB0b2FzdC5zdHlsZSA9IFRvYXN0LlN0eWxlLlN1Y2Nlc3M7XG4gICAgICB0b2FzdC50aXRsZSA9IFwiXHUyNzEzIFRhc2sgQWRkZWQhXCI7XG4gICAgICBhd2FpdCBjbG9zZU1haW5XaW5kb3coKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdG9hc3Quc3R5bGUgPSBUb2FzdC5TdHlsZS5GYWlsdXJlO1xuICAgICAgdG9hc3QudGl0bGUgPSBcIkZhaWxlZFwiO1xuICAgICAgdG9hc3QubWVzc2FnZSA9IFN0cmluZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICA8QWN0aW9uLlN1Ym1pdEZvcm0gdGl0bGU9XCJBZGQgVGFza1wiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IC8+XG4gICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICB9XG4gICAgPlxuICAgICAgPEZvcm0uVGV4dEZpZWxkXG4gICAgICAgIGlkPVwidGl0bGVcIlxuICAgICAgICB0aXRsZT1cIlRhc2tcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIldoYXQgZG8geW91IG5lZWQgdG8gZG8/XCJcbiAgICAgICAgdmFsdWU9e3RpdGxlfVxuICAgICAgICBvbkNoYW5nZT17c2V0VGl0bGV9XG4gICAgICAvPlxuICAgICAgPEZvcm0uRGVzY3JpcHRpb24gdGV4dD1cIkFkZGluZyB0byB0b2RheSdzIHRhc2sgbGlzdFwiIC8+XG4gICAgPC9Gb3JtPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBbUY7QUFDbkYsbUJBQXlCO0FBQ3pCLGdCQUF3QjtBQUN4QixrQkFBcUI7QUFDckIsZ0JBQW1FO0FBRW5FLElBQU0saUJBQWEsc0JBQUssbUJBQVEsR0FBRyxXQUFXLG1CQUFtQjtBQUNqRSxJQUFNLGFBQWE7QUFDbkIsSUFBTSxtQkFBbUI7QUFFVixTQUFSLFVBQTJCO0FBQ2hDLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx1QkFBUyxFQUFFO0FBRXJDLGlCQUFlLGVBQWU7QUFDNUIsVUFBTSxRQUFRLFVBQU0sc0JBQVUsRUFBRSxPQUFPLGlCQUFNLE1BQU0sVUFBVSxPQUFPLGlCQUFpQixDQUFDO0FBRXRGLFFBQUk7QUFDRixZQUFNLE1BQU0sb0JBQUksS0FBSztBQUNyQixZQUFNLFVBQVUsSUFBSSxZQUFZLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUM5QyxZQUFNLG1CQUFlLGtCQUFLLFlBQVksVUFBVTtBQUNoRCxZQUFNLFdBQVcsR0FBRyxPQUFPO0FBQzNCLFlBQU0sZUFBVyxrQkFBSyxjQUFjLFFBQVE7QUFFNUMsVUFBSSxLQUFDLHNCQUFXLFFBQVEsR0FBRztBQUN6QixjQUFNLGtCQUFrQixHQUFHLE9BQU8sSUFBSSxJQUFJLGFBQWEsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3hFLGNBQU0sbUJBQWUsa0JBQUssWUFBWSxrQkFBa0IsU0FBUztBQUNqRSxZQUFJLGtCQUFjLHdCQUFhLGNBQWMsT0FBTztBQUNwRCxzQkFBYyxZQUFZLFFBQVEsb0JBQW9CLFNBQVMsWUFBWTtBQUMzRSxzQkFBYyxZQUFZLFFBQVEsaUJBQWlCLGVBQWU7QUFDbEUsWUFBSSxLQUFDLHNCQUFXLFlBQVksRUFBRywwQkFBVSxjQUFjLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFDMUUscUNBQWMsVUFBVSxXQUFXO0FBQUEsTUFDckMsT0FBTztBQUNMLFlBQUksa0JBQWMsd0JBQWEsVUFBVSxPQUFPO0FBQ2hELGNBQU0scUJBQXFCO0FBQzNCLFlBQUksbUJBQW1CLEtBQUssV0FBVyxHQUFHO0FBQ3hDLHdCQUFjLFlBQVksUUFBUSxvQkFBb0IsV0FBVyxLQUFLO0FBQUEsQ0FBSTtBQUFBLFFBQzVFLE9BQU87QUFDTCx5QkFBZTtBQUFBLFFBQVcsS0FBSztBQUFBO0FBQUEsUUFDakM7QUFDQSxxQ0FBYyxVQUFVLFdBQVc7QUFBQSxNQUNyQztBQUVBLFlBQU0sY0FBYyx5QkFBeUIsbUJBQW1CLFVBQVUsQ0FBQyxTQUFTLG1CQUFtQixjQUFjLFFBQVEsQ0FBQztBQUM5SCxnQkFBTSxpQkFBSyxXQUFXO0FBRXRCLFlBQU0sUUFBUSxpQkFBTSxNQUFNO0FBQzFCLFlBQU0sUUFBUTtBQUNkLGdCQUFNLDRCQUFnQjtBQUFBLElBQ3hCLFNBQVMsT0FBTztBQUNkLFlBQU0sUUFBUSxpQkFBTSxNQUFNO0FBQzFCLFlBQU0sUUFBUTtBQUNkLFlBQU0sVUFBVSxPQUFPLEtBQUs7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFFQSxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxTQUNFLHFCQUFDLDhCQUNDLHFCQUFDLGtCQUFPLFlBQVAsRUFBa0IsT0FBTSxZQUFXLFVBQVUsY0FBYyxDQUM5RDtBQUFBO0FBQUEsSUFHRjtBQUFBLE1BQUMsZ0JBQUs7QUFBQSxNQUFMO0FBQUEsUUFDQyxJQUFHO0FBQUEsUUFDSCxPQUFNO0FBQUEsUUFDTixhQUFZO0FBQUEsUUFDWixPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUE7QUFBQSxJQUNaO0FBQUEsSUFDQSxxQkFBQyxnQkFBSyxhQUFMLEVBQWlCLE1BQUssK0JBQThCO0FBQUEsRUFDdkQ7QUFFSjsiLAogICJuYW1lcyI6IFtdCn0K
