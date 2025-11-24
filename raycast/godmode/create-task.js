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

// src/create-task.tsx
var create_task_exports = {};
__export(create_task_exports, {
  default: () => Command
});
module.exports = __toCommonJS(create_task_exports);
var import_api = require("@raycast/api");
var import_os = require("os");
var import_path = require("path");
var import_fs = require("fs");
var VAULT_PATH = (0, import_path.join)((0, import_os.homedir)(), "Desktop", "Real Niggas Vault");
var VAULT_NAME = "Real Niggas Vault";
var TEMPLATES_FOLDER = "7. Templates";
async function createTask() {
  const toast = await (0, import_api.showToast)({ style: import_api.Toast.Style.Animated, title: "Creating task..." });
  try {
    const now = /* @__PURE__ */ new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timestampPretty = `${dateStr} ${now.toTimeString().substring(0, 5)}`;
    const templatePath = (0, import_path.join)(VAULT_PATH, TEMPLATES_FOLDER, "Task.md");
    let fileContent = (0, import_fs.readFileSync)(templatePath, "utf-8");
    fileContent = fileContent.replace(/\{\{CONTENT\}\}/g, "New Task");
    fileContent = fileContent.replace(/\{\{DATE\}\}/g, timestampPretty);
    const targetFolder = (0, import_path.join)(VAULT_PATH, "3. Tasks");
    if (!(0, import_fs.existsSync)(targetFolder)) (0, import_fs.mkdirSync)(targetFolder, { recursive: true });
    let filename = `${dateStr}.md`;
    const fullPath = (0, import_path.join)(targetFolder, filename);
    if ((0, import_fs.existsSync)(fullPath)) {
      const timeSuffix = now.toTimeString().substring(0, 8).replace(/:/g, "");
      filename = `${dateStr}-${timeSuffix}.md`;
    }
    (0, import_fs.writeFileSync)((0, import_path.join)(targetFolder, filename), fileContent);
    const obsidianUri = `obsidian://open?vault=${encodeURIComponent(VAULT_NAME)}&file=${encodeURIComponent("3. Tasks/" + filename)}`;
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
function Command() {
  return /* @__PURE__ */ _jsx(import_api.List, null, /* @__PURE__ */ _jsx(
    import_api.List.Item,
    {
      title: "Create New Task",
      subtitle: "Press Enter to create task file for today",
      actions: /* @__PURE__ */ _jsx(import_api.ActionPanel, null, /* @__PURE__ */ _jsx(import_api.Action, { title: "Create Task", onAction: createTask }))
    }
  ));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vRGVza3RvcC9nb2Rtb2RlLWV4dGVuc2lvbi9zcmMvY3JlYXRlLXRhc2sudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBMaXN0LCBBY3Rpb25QYW5lbCwgQWN0aW9uLCBzaG93VG9hc3QsIFRvYXN0LCBvcGVuLCBjbG9zZU1haW5XaW5kb3cgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBob21lZGlyIH0gZnJvbSBcIm9zXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYywgd3JpdGVGaWxlU3luYywgZXhpc3RzU3luYywgbWtkaXJTeW5jIH0gZnJvbSBcImZzXCI7XG5cbmNvbnN0IFZBVUxUX1BBVEggPSBqb2luKGhvbWVkaXIoKSwgXCJEZXNrdG9wXCIsIFwiUmVhbCBOaWdnYXMgVmF1bHRcIik7XG5jb25zdCBWQVVMVF9OQU1FID0gXCJSZWFsIE5pZ2dhcyBWYXVsdFwiO1xuY29uc3QgVEVNUExBVEVTX0ZPTERFUiA9IFwiNy4gVGVtcGxhdGVzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRhc2soKSB7XG4gIGNvbnN0IHRvYXN0ID0gYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLkFuaW1hdGVkLCB0aXRsZTogXCJDcmVhdGluZyB0YXNrLi4uXCIgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBub3cudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG4gICAgY29uc3QgdGltZXN0YW1wUHJldHR5ID0gYCR7ZGF0ZVN0cn0gJHtub3cudG9UaW1lU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDUpfWA7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVBhdGggPSBqb2luKFZBVUxUX1BBVEgsIFRFTVBMQVRFU19GT0xERVIsIFwiVGFzay5tZFwiKTtcbiAgICBsZXQgZmlsZUNvbnRlbnQgPSByZWFkRmlsZVN5bmModGVtcGxhdGVQYXRoLCBcInV0Zi04XCIpO1xuICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQucmVwbGFjZSgvXFx7XFx7Q09OVEVOVFxcfVxcfS9nLCBcIk5ldyBUYXNrXCIpO1xuICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQucmVwbGFjZSgvXFx7XFx7REFURVxcfVxcfS9nLCB0aW1lc3RhbXBQcmV0dHkpO1xuXG4gICAgY29uc3QgdGFyZ2V0Rm9sZGVyID0gam9pbihWQVVMVF9QQVRILCBcIjMuIFRhc2tzXCIpO1xuICAgIGlmICghZXhpc3RzU3luYyh0YXJnZXRGb2xkZXIpKSBta2RpclN5bmModGFyZ2V0Rm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgIGxldCBmaWxlbmFtZSA9IGAke2RhdGVTdHJ9Lm1kYDtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGpvaW4odGFyZ2V0Rm9sZGVyLCBmaWxlbmFtZSk7XG5cbiAgICBpZiAoZXhpc3RzU3luYyhmdWxsUGF0aCkpIHtcbiAgICAgIGNvbnN0IHRpbWVTdWZmaXggPSBub3cudG9UaW1lU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDgpLnJlcGxhY2UoLzovZywgXCJcIik7XG4gICAgICBmaWxlbmFtZSA9IGAke2RhdGVTdHJ9LSR7dGltZVN1ZmZpeH0ubWRgO1xuICAgIH1cblxuICAgIHdyaXRlRmlsZVN5bmMoam9pbih0YXJnZXRGb2xkZXIsIGZpbGVuYW1lKSwgZmlsZUNvbnRlbnQpO1xuXG4gICAgY29uc3Qgb2JzaWRpYW5VcmkgPSBgb2JzaWRpYW46Ly9vcGVuP3ZhdWx0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KFZBVUxUX05BTUUpfSZmaWxlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFwiMy4gVGFza3MvXCIgKyBmaWxlbmFtZSl9YDtcbiAgICBhd2FpdCBvcGVuKG9ic2lkaWFuVXJpKTtcblxuICAgIHRvYXN0LnN0eWxlID0gVG9hc3QuU3R5bGUuU3VjY2VzcztcbiAgICB0b2FzdC50aXRsZSA9IFwiXHUyNzEzIENyZWF0ZWQhXCI7XG4gICAgYXdhaXQgY2xvc2VNYWluV2luZG93KCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdG9hc3Quc3R5bGUgPSBUb2FzdC5TdHlsZS5GYWlsdXJlO1xuICAgIHRvYXN0LnRpdGxlID0gXCJGYWlsZWRcIjtcbiAgICB0b2FzdC5tZXNzYWdlID0gU3RyaW5nKGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICByZXR1cm4gKFxuICAgIDxMaXN0PlxuICAgICAgPExpc3QuSXRlbVxuICAgICAgICB0aXRsZT1cIkNyZWF0ZSBOZXcgVGFza1wiXG4gICAgICAgIHN1YnRpdGxlPVwiUHJlc3MgRW50ZXIgdG8gY3JlYXRlIHRhc2sgZmlsZSBmb3IgdG9kYXlcIlxuICAgICAgICBhY3Rpb25zPXtcbiAgICAgICAgICA8QWN0aW9uUGFuZWw+XG4gICAgICAgICAgICA8QWN0aW9uIHRpdGxlPVwiQ3JlYXRlIFRhc2tcIiBvbkFjdGlvbj17Y3JlYXRlVGFza30gLz5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICB9XG4gICAgICAvPlxuICAgIDwvTGlzdD5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQW1GO0FBQ25GLGdCQUF3QjtBQUN4QixrQkFBcUI7QUFDckIsZ0JBQW1FO0FBRW5FLElBQU0saUJBQWEsc0JBQUssbUJBQVEsR0FBRyxXQUFXLG1CQUFtQjtBQUNqRSxJQUFNLGFBQWE7QUFDbkIsSUFBTSxtQkFBbUI7QUFFekIsZUFBZSxhQUFhO0FBQzFCLFFBQU0sUUFBUSxVQUFNLHNCQUFVLEVBQUUsT0FBTyxpQkFBTSxNQUFNLFVBQVUsT0FBTyxtQkFBbUIsQ0FBQztBQUV4RixNQUFJO0FBQ0YsVUFBTSxNQUFNLG9CQUFJLEtBQUs7QUFDckIsVUFBTSxVQUFVLElBQUksWUFBWSxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDOUMsVUFBTSxrQkFBa0IsR0FBRyxPQUFPLElBQUksSUFBSSxhQUFhLEVBQUUsVUFBVSxHQUFHLENBQUMsQ0FBQztBQUV4RSxVQUFNLG1CQUFlLGtCQUFLLFlBQVksa0JBQWtCLFNBQVM7QUFDakUsUUFBSSxrQkFBYyx3QkFBYSxjQUFjLE9BQU87QUFDcEQsa0JBQWMsWUFBWSxRQUFRLG9CQUFvQixVQUFVO0FBQ2hFLGtCQUFjLFlBQVksUUFBUSxpQkFBaUIsZUFBZTtBQUVsRSxVQUFNLG1CQUFlLGtCQUFLLFlBQVksVUFBVTtBQUNoRCxRQUFJLEtBQUMsc0JBQVcsWUFBWSxFQUFHLDBCQUFVLGNBQWMsRUFBRSxXQUFXLEtBQUssQ0FBQztBQUUxRSxRQUFJLFdBQVcsR0FBRyxPQUFPO0FBQ3pCLFVBQU0sZUFBVyxrQkFBSyxjQUFjLFFBQVE7QUFFNUMsWUFBSSxzQkFBVyxRQUFRLEdBQUc7QUFDeEIsWUFBTSxhQUFhLElBQUksYUFBYSxFQUFFLFVBQVUsR0FBRyxDQUFDLEVBQUUsUUFBUSxNQUFNLEVBQUU7QUFDdEUsaUJBQVcsR0FBRyxPQUFPLElBQUksVUFBVTtBQUFBLElBQ3JDO0FBRUEscUNBQWMsa0JBQUssY0FBYyxRQUFRLEdBQUcsV0FBVztBQUV2RCxVQUFNLGNBQWMseUJBQXlCLG1CQUFtQixVQUFVLENBQUMsU0FBUyxtQkFBbUIsY0FBYyxRQUFRLENBQUM7QUFDOUgsY0FBTSxpQkFBSyxXQUFXO0FBRXRCLFVBQU0sUUFBUSxpQkFBTSxNQUFNO0FBQzFCLFVBQU0sUUFBUTtBQUNkLGNBQU0sNEJBQWdCO0FBQUEsRUFDeEIsU0FBUyxPQUFPO0FBQ2QsVUFBTSxRQUFRLGlCQUFNLE1BQU07QUFDMUIsVUFBTSxRQUFRO0FBQ2QsVUFBTSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQzlCO0FBQ0Y7QUFFZSxTQUFSLFVBQTJCO0FBQ2hDLFNBQ0UscUJBQUMsdUJBQ0M7QUFBQSxJQUFDLGdCQUFLO0FBQUEsSUFBTDtBQUFBLE1BQ0MsT0FBTTtBQUFBLE1BQ04sVUFBUztBQUFBLE1BQ1QsU0FDRSxxQkFBQyw4QkFDQyxxQkFBQyxxQkFBTyxPQUFNLGVBQWMsVUFBVSxZQUFZLENBQ3BEO0FBQUE7QUFBQSxFQUVKLENBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFtdCn0K
