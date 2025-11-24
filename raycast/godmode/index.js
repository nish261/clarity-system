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

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Command
});
module.exports = __toCommonJS(index_exports);
var import_api = require("@raycast/api");
var import_react = require("react");
var import_os = require("os");
var import_path = require("path");
var import_fs = require("fs");
var VAULT_PATH = (0, import_path.join)((0, import_os.homedir)(), "Desktop", "Real Niggas Vault");
var VAULT_NAME = "Real Niggas Vault";
var TEMPLATES_FOLDER = "7. Templates";
var TEMPLATE_FILE_MAP = {
  "Note": "Notes.md",
  "Business": "Business.md",
  "Journal": "Journal.md",
  "Task": "Task.md"
};
var noteTypes = [
  {
    title: "Create Business Idea",
    icon: "\u{1F4A1}",
    mode: "Business",
    folder: "1. Business",
    defaultTitle: "New Business Idea",
    description: "Capture a business idea"
  },
  {
    title: "Create Journal Entry",
    icon: "\u{1F4D4}",
    mode: "Journal",
    folder: "2. Journal",
    defaultTitle: "Daily Entry",
    description: "Create a journal entry"
  },
  {
    title: "Add Task to Today",
    icon: "\u26A1",
    mode: "QuickTask",
    folder: "3. Tasks",
    defaultTitle: "Quick Task",
    description: "Add task to today's list",
    isQuickTask: true
  },
  {
    title: "Create Task",
    icon: "\u2705",
    mode: "Task",
    folder: "3. Tasks",
    defaultTitle: "New Task",
    description: "Create a new task"
  },
  {
    title: "Create Note",
    icon: "\u{1F4DD}",
    mode: "Note",
    folder: "4. Notes",
    defaultTitle: "Quick Note",
    description: "Create a quick note"
  }
];
function sanitizeFilename(text) {
  return text.replace(/[^\w\s-]/g, "").trim().substring(0, 60);
}
async function addTaskToToday(taskContent) {
  const toast = await (0, import_api.showToast)({
    style: import_api.Toast.Style.Animated,
    title: "Adding task..."
  });
  try {
    const now = /* @__PURE__ */ new Date();
    const dateStr = now.toISOString().split("T")[0];
    const targetFolder = (0, import_path.join)(VAULT_PATH, "3. Tasks");
    const filename = `${dateStr}.md`;
    const fullPath = (0, import_path.join)(targetFolder, filename);
    if (!(0, import_fs.existsSync)(fullPath)) {
      const templatePath = (0, import_path.join)(VAULT_PATH, TEMPLATES_FOLDER, "Task.md");
      let fileContent;
      if ((0, import_fs.existsSync)(templatePath)) {
        fileContent = (0, import_fs.readFileSync)(templatePath, "utf-8");
        const timestampPretty = `${dateStr} ${now.toTimeString().substring(0, 5)}`;
        fileContent = fileContent.replace(/\{\{CONTENT\}\}/g, taskContent);
        fileContent = fileContent.replace(/\{\{DATE\}\}/g, timestampPretty);
      } else {
        fileContent = `# Task

=={{DATE}}==
Tags: #todo
References:

## Today's Tasks

- [ ] ${taskContent}

## Tomorrow's Tasks

`;
      }
      if (!(0, import_fs.existsSync)(targetFolder)) {
        (0, import_fs.mkdirSync)(targetFolder, { recursive: true });
      }
      (0, import_fs.writeFileSync)(fullPath, fileContent);
    } else {
      let fileContent = (0, import_fs.readFileSync)(fullPath, "utf-8");
      const todaysSectionRegex = /(## Today's Tasks\s*\n)/;
      if (todaysSectionRegex.test(fileContent)) {
        fileContent = fileContent.replace(
          todaysSectionRegex,
          `$1- [ ] ${taskContent}
`
        );
      } else {
        fileContent += `
- [ ] ${taskContent}
`;
      }
      (0, import_fs.writeFileSync)(fullPath, fileContent);
    }
    const relativePath = `3. Tasks/${filename}`;
    const obsidianUri = `obsidian://open?vault=${encodeURIComponent(VAULT_NAME)}&file=${encodeURIComponent(relativePath)}`;
    await (0, import_api.open)(obsidianUri);
    toast.style = import_api.Toast.Style.Success;
    toast.title = "\u2713 Task Added!";
    toast.message = taskContent;
    await (0, import_api.closeMainWindow)();
  } catch (error) {
    toast.style = import_api.Toast.Style.Failure;
    toast.title = "Failed to add task";
    toast.message = String(error);
  }
}
async function createNote(noteType, title) {
  const toast = await (0, import_api.showToast)({
    style: import_api.Toast.Style.Animated,
    title: "Creating note..."
  });
  try {
    const now = /* @__PURE__ */ new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timestampPretty = `${dateStr} ${now.toTimeString().substring(0, 5)}`;
    const finalTitle = title.trim() || noteType.defaultTitle;
    const templateFileName = TEMPLATE_FILE_MAP[noteType.mode] || `${noteType.mode}.md`;
    const templatePath = (0, import_path.join)(VAULT_PATH, TEMPLATES_FOLDER, templateFileName);
    let fileContent;
    if ((0, import_fs.existsSync)(templatePath)) {
      fileContent = (0, import_fs.readFileSync)(templatePath, "utf-8");
      fileContent = fileContent.replace(/\{\{CONTENT\}\}/g, finalTitle);
      fileContent = fileContent.replace(/\{\{DATE\}\}/g, timestampPretty);
    } else {
      fileContent = `# ${finalTitle}

(Template '${templateFileName}' not found at ${templatePath})`;
    }
    const targetFolder = (0, import_path.join)(VAULT_PATH, noteType.folder);
    const safeTitle = sanitizeFilename(finalTitle);
    let filename;
    if (noteType.mode === "Task") {
      filename = `${dateStr}.md`;
    } else {
      filename = `${safeTitle} - ${dateStr}.md`;
    }
    if (!(0, import_fs.existsSync)(targetFolder)) {
      (0, import_fs.mkdirSync)(targetFolder, { recursive: true });
    }
    const fullPath = (0, import_path.join)(targetFolder, filename);
    if ((0, import_fs.existsSync)(fullPath)) {
      const timeSuffix = now.toTimeString().substring(0, 8).replace(/:/g, "");
      if (noteType.mode === "Task") {
        filename = `${dateStr}-${timeSuffix}.md`;
      } else {
        filename = `${safeTitle} - ${dateStr} ${timeSuffix}.md`;
      }
    }
    (0, import_fs.writeFileSync)((0, import_path.join)(targetFolder, filename), fileContent);
    const relativePath = `${noteType.folder}/${filename}`;
    const obsidianUri = `obsidian://open?vault=${encodeURIComponent(VAULT_NAME)}&file=${encodeURIComponent(relativePath)}`;
    await (0, import_api.open)(obsidianUri);
    toast.style = import_api.Toast.Style.Success;
    toast.title = "\u2713 Created!";
    toast.message = filename;
    await (0, import_api.closeMainWindow)();
  } catch (error) {
    toast.style = import_api.Toast.Style.Failure;
    toast.title = "Failed to create note";
    toast.message = String(error);
  }
}
function TitleForm({ noteType }) {
  const [title, setTitle] = (0, import_react.useState)("");
  const handleSubmit = async () => {
    if (noteType.isQuickTask) {
      await addTaskToToday(title);
    } else {
      await createNote(noteType, title);
    }
  };
  return /* @__PURE__ */ _jsx(
    import_api.Form,
    {
      actions: /* @__PURE__ */ _jsx(import_api.ActionPanel, null, /* @__PURE__ */ _jsx(
        import_api.Action.SubmitForm,
        {
          title: noteType.isQuickTask ? "Add Task" : "Create Note",
          onSubmit: handleSubmit
        }
      ))
    },
    /* @__PURE__ */ _jsx(
      import_api.Form.TextField,
      {
        id: "title",
        title: noteType.isQuickTask ? "Task" : "Title",
        placeholder: noteType.isQuickTask ? "What do you need to do?" : `Leave blank for "${noteType.defaultTitle}"`,
        value: title,
        onChange: setTitle
      }
    ),
    /* @__PURE__ */ _jsx(import_api.Form.Description, { text: noteType.isQuickTask ? "Adding to today's task list" : `Creating ${noteType.mode} in ${noteType.folder}` })
  );
}
function Command() {
  return /* @__PURE__ */ _jsx(import_api.List, { searchBarPlaceholder: "Choose note type..." }, noteTypes.map((noteType) => /* @__PURE__ */ _jsx(
    import_api.List.Item,
    {
      key: noteType.mode,
      icon: noteType.icon,
      title: noteType.title,
      subtitle: noteType.description,
      accessories: [{ text: noteType.folder }],
      actions: /* @__PURE__ */ _jsx(import_api.ActionPanel, null, noteType.mode === "Task" ? /* @__PURE__ */ _jsx(
        import_api.Action,
        {
          title: "Create Task",
          onAction: async () => {
            await createNote(noteType, "");
          }
        }
      ) : /* @__PURE__ */ _jsx(
        import_api.Action.Push,
        {
          title: noteType.isQuickTask ? "Add Task" : "Enter Title",
          target: /* @__PURE__ */ _jsx(TitleForm, { noteType })
        }
      ))
    }
  )));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vRGVza3RvcC9nb2Rtb2RlLWV4dGVuc2lvbi9zcmMvaW5kZXgudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBBY3Rpb25QYW5lbCwgQWN0aW9uLCBMaXN0LCBGb3JtLCBzaG93VG9hc3QsIFRvYXN0LCBvcGVuLCBwb3BUb1Jvb3QsIGNsb3NlTWFpbldpbmRvdyB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgaG9tZWRpciB9IGZyb20gXCJvc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMsIGV4aXN0c1N5bmMsIG1rZGlyU3luYyB9IGZyb20gXCJmc1wiO1xuXG5jb25zdCBWQVVMVF9QQVRIID0gam9pbihob21lZGlyKCksIFwiRGVza3RvcFwiLCBcIlJlYWwgTmlnZ2FzIFZhdWx0XCIpO1xuY29uc3QgVkFVTFRfTkFNRSA9IFwiUmVhbCBOaWdnYXMgVmF1bHRcIjtcbmNvbnN0IFRFTVBMQVRFU19GT0xERVIgPSBcIjcuIFRlbXBsYXRlc1wiO1xuXG4vLyBNYXAgbW9kZSBuYW1lcyB0byB0ZW1wbGF0ZSBmaWxlIG5hbWVzXG5jb25zdCBURU1QTEFURV9GSUxFX01BUDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgXCJOb3RlXCI6IFwiTm90ZXMubWRcIixcbiAgXCJCdXNpbmVzc1wiOiBcIkJ1c2luZXNzLm1kXCIsXG4gIFwiSm91cm5hbFwiOiBcIkpvdXJuYWwubWRcIixcbiAgXCJUYXNrXCI6IFwiVGFzay5tZFwiXG59O1xuXG5pbnRlcmZhY2UgTm90ZVR5cGUge1xuICB0aXRsZTogc3RyaW5nO1xuICBpY29uOiBzdHJpbmc7XG4gIG1vZGU6IHN0cmluZztcbiAgZm9sZGVyOiBzdHJpbmc7XG4gIGRlZmF1bHRUaXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpc1F1aWNrVGFzaz86IGJvb2xlYW47XG59XG5cbmNvbnN0IG5vdGVUeXBlczogTm90ZVR5cGVbXSA9IFtcbiAge1xuICAgIHRpdGxlOiBcIkNyZWF0ZSBCdXNpbmVzcyBJZGVhXCIsXG4gICAgaWNvbjogXCJcdUQ4M0RcdURDQTFcIixcbiAgICBtb2RlOiBcIkJ1c2luZXNzXCIsXG4gICAgZm9sZGVyOiBcIjEuIEJ1c2luZXNzXCIsXG4gICAgZGVmYXVsdFRpdGxlOiBcIk5ldyBCdXNpbmVzcyBJZGVhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ2FwdHVyZSBhIGJ1c2luZXNzIGlkZWFcIlxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiQ3JlYXRlIEpvdXJuYWwgRW50cnlcIixcbiAgICBpY29uOiBcIlx1RDgzRFx1RENENFwiLFxuICAgIG1vZGU6IFwiSm91cm5hbFwiLFxuICAgIGZvbGRlcjogXCIyLiBKb3VybmFsXCIsXG4gICAgZGVmYXVsdFRpdGxlOiBcIkRhaWx5IEVudHJ5XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIGEgam91cm5hbCBlbnRyeVwiXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJBZGQgVGFzayB0byBUb2RheVwiLFxuICAgIGljb246IFwiXHUyNkExXCIsXG4gICAgbW9kZTogXCJRdWlja1Rhc2tcIixcbiAgICBmb2xkZXI6IFwiMy4gVGFza3NcIixcbiAgICBkZWZhdWx0VGl0bGU6IFwiUXVpY2sgVGFza1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFkZCB0YXNrIHRvIHRvZGF5J3MgbGlzdFwiLFxuICAgIGlzUXVpY2tUYXNrOiB0cnVlXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJDcmVhdGUgVGFza1wiLFxuICAgIGljb246IFwiXHUyNzA1XCIsXG4gICAgbW9kZTogXCJUYXNrXCIsXG4gICAgZm9sZGVyOiBcIjMuIFRhc2tzXCIsXG4gICAgZGVmYXVsdFRpdGxlOiBcIk5ldyBUYXNrXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIGEgbmV3IHRhc2tcIlxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiQ3JlYXRlIE5vdGVcIixcbiAgICBpY29uOiBcIlx1RDgzRFx1RENERFwiLFxuICAgIG1vZGU6IFwiTm90ZVwiLFxuICAgIGZvbGRlcjogXCI0LiBOb3Rlc1wiLFxuICAgIGRlZmF1bHRUaXRsZTogXCJRdWljayBOb3RlXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIGEgcXVpY2sgbm90ZVwiXG4gIH1cbl07XG5cbmZ1bmN0aW9uIHNhbml0aXplRmlsZW5hbWUodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvW15cXHdcXHMtXS9nLCBcIlwiKS50cmltKCkuc3Vic3RyaW5nKDAsIDYwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkVGFza1RvVG9kYXkodGFza0NvbnRlbnQ6IHN0cmluZykge1xuICBjb25zdCB0b2FzdCA9IGF3YWl0IHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkFuaW1hdGVkLFxuICAgIHRpdGxlOiBcIkFkZGluZyB0YXNrLi4uXCJcbiAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBub3cudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG4gICAgY29uc3QgdGFyZ2V0Rm9sZGVyID0gam9pbihWQVVMVF9QQVRILCBcIjMuIFRhc2tzXCIpO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7ZGF0ZVN0cn0ubWRgO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gam9pbih0YXJnZXRGb2xkZXIsIGZpbGVuYW1lKTtcblxuICAgIC8vIENoZWNrIGlmIHRvZGF5J3MgdGFzayBmaWxlIGV4aXN0c1xuICAgIGlmICghZXhpc3RzU3luYyhmdWxsUGF0aCkpIHtcbiAgICAgIC8vIENyZWF0ZSBuZXcgdGFzayBmaWxlIHdpdGggdGVtcGxhdGVcbiAgICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IGpvaW4oVkFVTFRfUEFUSCwgVEVNUExBVEVTX0ZPTERFUiwgXCJUYXNrLm1kXCIpO1xuICAgICAgbGV0IGZpbGVDb250ZW50OiBzdHJpbmc7XG5cbiAgICAgIGlmIChleGlzdHNTeW5jKHRlbXBsYXRlUGF0aCkpIHtcbiAgICAgICAgZmlsZUNvbnRlbnQgPSByZWFkRmlsZVN5bmModGVtcGxhdGVQYXRoLCBcInV0Zi04XCIpO1xuICAgICAgICBjb25zdCB0aW1lc3RhbXBQcmV0dHkgPSBgJHtkYXRlU3RyfSAke25vdy50b1RpbWVTdHJpbmcoKS5zdWJzdHJpbmcoMCwgNSl9YDtcbiAgICAgICAgZmlsZUNvbnRlbnQgPSBmaWxlQ29udGVudC5yZXBsYWNlKC9cXHtcXHtDT05URU5UXFx9XFx9L2csIHRhc2tDb250ZW50KTtcbiAgICAgICAgZmlsZUNvbnRlbnQgPSBmaWxlQ29udGVudC5yZXBsYWNlKC9cXHtcXHtEQVRFXFx9XFx9L2csIHRpbWVzdGFtcFByZXR0eSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlQ29udGVudCA9IGAjIFRhc2tcXG5cXG49PVxce1xce0RBVEVcXH1cXH09PVxcblRhZ3M6ICN0b2RvXFxuUmVmZXJlbmNlczpcXG5cXG4jIyBUb2RheSdzIFRhc2tzXFxuXFxuLSBbIF0gJHt0YXNrQ29udGVudH1cXG5cXG4jIyBUb21vcnJvdydzIFRhc2tzXFxuXFxuYDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFleGlzdHNTeW5jKHRhcmdldEZvbGRlcikpIHtcbiAgICAgICAgbWtkaXJTeW5jKHRhcmdldEZvbGRlciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICB3cml0ZUZpbGVTeW5jKGZ1bGxQYXRoLCBmaWxlQ29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFwcGVuZCB0byBleGlzdGluZyBmaWxlIHVuZGVyIFwiVG9kYXkncyBUYXNrc1wiXG4gICAgICBsZXQgZmlsZUNvbnRlbnQgPSByZWFkRmlsZVN5bmMoZnVsbFBhdGgsIFwidXRmLThcIik7XG5cbiAgICAgIC8vIEZpbmQgdGhlIFwiVG9kYXkncyBUYXNrc1wiIHNlY3Rpb24gYW5kIGFkZCB0aGUgbmV3IHRhc2tcbiAgICAgIGNvbnN0IHRvZGF5c1NlY3Rpb25SZWdleCA9IC8oIyMgVG9kYXkncyBUYXNrc1xccypcXG4pLztcbiAgICAgIGlmICh0b2RheXNTZWN0aW9uUmVnZXgudGVzdChmaWxlQ29udGVudCkpIHtcbiAgICAgICAgZmlsZUNvbnRlbnQgPSBmaWxlQ29udGVudC5yZXBsYWNlKFxuICAgICAgICAgIHRvZGF5c1NlY3Rpb25SZWdleCxcbiAgICAgICAgICBgJDEtIFsgXSAke3Rhc2tDb250ZW50fVxcbmBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHNlY3Rpb24gZG9lc24ndCBleGlzdCwgYXBwZW5kIGF0IHRoZSBlbmRcbiAgICAgICAgZmlsZUNvbnRlbnQgKz0gYFxcbi0gWyBdICR7dGFza0NvbnRlbnR9XFxuYDtcbiAgICAgIH1cblxuICAgICAgd3JpdGVGaWxlU3luYyhmdWxsUGF0aCwgZmlsZUNvbnRlbnQpO1xuICAgIH1cblxuICAgIC8vIE9wZW4gaW4gT2JzaWRpYW5cbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBgMy4gVGFza3MvJHtmaWxlbmFtZX1gO1xuICAgIGNvbnN0IG9ic2lkaWFuVXJpID0gYG9ic2lkaWFuOi8vb3Blbj92YXVsdD0ke2VuY29kZVVSSUNvbXBvbmVudChWQVVMVF9OQU1FKX0mZmlsZT0ke2VuY29kZVVSSUNvbXBvbmVudChyZWxhdGl2ZVBhdGgpfWA7XG4gICAgYXdhaXQgb3BlbihvYnNpZGlhblVyaSk7XG5cbiAgICB0b2FzdC5zdHlsZSA9IFRvYXN0LlN0eWxlLlN1Y2Nlc3M7XG4gICAgdG9hc3QudGl0bGUgPSBcIlx1MjcxMyBUYXNrIEFkZGVkIVwiO1xuICAgIHRvYXN0Lm1lc3NhZ2UgPSB0YXNrQ29udGVudDtcblxuICAgIGF3YWl0IGNsb3NlTWFpbldpbmRvdygpO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdG9hc3Quc3R5bGUgPSBUb2FzdC5TdHlsZS5GYWlsdXJlO1xuICAgIHRvYXN0LnRpdGxlID0gXCJGYWlsZWQgdG8gYWRkIHRhc2tcIjtcbiAgICB0b2FzdC5tZXNzYWdlID0gU3RyaW5nKGVycm9yKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVOb3RlKG5vdGVUeXBlOiBOb3RlVHlwZSwgdGl0bGU6IHN0cmluZykge1xuICBjb25zdCB0b2FzdCA9IGF3YWl0IHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkFuaW1hdGVkLFxuICAgIHRpdGxlOiBcIkNyZWF0aW5nIG5vdGUuLi5cIlxuICB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcbiAgICBjb25zdCB0aW1lc3RhbXBQcmV0dHkgPSBgJHtkYXRlU3RyfSAke25vdy50b1RpbWVTdHJpbmcoKS5zdWJzdHJpbmcoMCwgNSl9YDtcblxuICAgIGNvbnN0IGZpbmFsVGl0bGUgPSB0aXRsZS50cmltKCkgfHwgbm90ZVR5cGUuZGVmYXVsdFRpdGxlO1xuXG4gICAgLy8gTG9hZCB0ZW1wbGF0ZVxuICAgIGNvbnN0IHRlbXBsYXRlRmlsZU5hbWUgPSBURU1QTEFURV9GSUxFX01BUFtub3RlVHlwZS5tb2RlXSB8fCBgJHtub3RlVHlwZS5tb2RlfS5tZGA7XG4gICAgY29uc3QgdGVtcGxhdGVQYXRoID0gam9pbihWQVVMVF9QQVRILCBURU1QTEFURVNfRk9MREVSLCB0ZW1wbGF0ZUZpbGVOYW1lKTtcbiAgICBsZXQgZmlsZUNvbnRlbnQ6IHN0cmluZztcblxuICAgIGlmIChleGlzdHNTeW5jKHRlbXBsYXRlUGF0aCkpIHtcbiAgICAgIGZpbGVDb250ZW50ID0gcmVhZEZpbGVTeW5jKHRlbXBsYXRlUGF0aCwgXCJ1dGYtOFwiKTtcbiAgICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQucmVwbGFjZSgvXFx7XFx7Q09OVEVOVFxcfVxcfS9nLCBmaW5hbFRpdGxlKTtcbiAgICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQucmVwbGFjZSgvXFx7XFx7REFURVxcfVxcfS9nLCB0aW1lc3RhbXBQcmV0dHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlQ29udGVudCA9IGAjICR7ZmluYWxUaXRsZX1cXG5cXG4oVGVtcGxhdGUgJyR7dGVtcGxhdGVGaWxlTmFtZX0nIG5vdCBmb3VuZCBhdCAke3RlbXBsYXRlUGF0aH0pYDtcbiAgICB9XG5cbiAgICAvLyBQcmVwYXJlIGZpbGVuYW1lXG4gICAgY29uc3QgdGFyZ2V0Rm9sZGVyID0gam9pbihWQVVMVF9QQVRILCBub3RlVHlwZS5mb2xkZXIpO1xuICAgIGNvbnN0IHNhZmVUaXRsZSA9IHNhbml0aXplRmlsZW5hbWUoZmluYWxUaXRsZSk7XG5cbiAgICBsZXQgZmlsZW5hbWU6IHN0cmluZztcbiAgICBpZiAobm90ZVR5cGUubW9kZSA9PT0gXCJUYXNrXCIpIHtcbiAgICAgIGZpbGVuYW1lID0gYCR7ZGF0ZVN0cn0ubWRgO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlbmFtZSA9IGAke3NhZmVUaXRsZX0gLSAke2RhdGVTdHJ9Lm1kYDtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgZm9sZGVyIGlmIG5lZWRlZFxuICAgIGlmICghZXhpc3RzU3luYyh0YXJnZXRGb2xkZXIpKSB7XG4gICAgICBta2RpclN5bmModGFyZ2V0Rm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBmdWxsUGF0aCA9IGpvaW4odGFyZ2V0Rm9sZGVyLCBmaWxlbmFtZSk7XG5cbiAgICAvLyBIYW5kbGUgZHVwbGljYXRlc1xuICAgIGlmIChleGlzdHNTeW5jKGZ1bGxQYXRoKSkge1xuICAgICAgY29uc3QgdGltZVN1ZmZpeCA9IG5vdy50b1RpbWVTdHJpbmcoKS5zdWJzdHJpbmcoMCwgOCkucmVwbGFjZSgvOi9nLCBcIlwiKTtcbiAgICAgIGlmIChub3RlVHlwZS5tb2RlID09PSBcIlRhc2tcIikge1xuICAgICAgICBmaWxlbmFtZSA9IGAke2RhdGVTdHJ9LSR7dGltZVN1ZmZpeH0ubWRgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsZW5hbWUgPSBgJHtzYWZlVGl0bGV9IC0gJHtkYXRlU3RyfSAke3RpbWVTdWZmaXh9Lm1kYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXcml0ZSBmaWxlXG4gICAgd3JpdGVGaWxlU3luYyhqb2luKHRhcmdldEZvbGRlciwgZmlsZW5hbWUpLCBmaWxlQ29udGVudCk7XG5cbiAgICAvLyBPcGVuIGluIE9ic2lkaWFuXG4gICAgY29uc3QgcmVsYXRpdmVQYXRoID0gYCR7bm90ZVR5cGUuZm9sZGVyfS8ke2ZpbGVuYW1lfWA7XG4gICAgY29uc3Qgb2JzaWRpYW5VcmkgPSBgb2JzaWRpYW46Ly9vcGVuP3ZhdWx0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KFZBVUxUX05BTUUpfSZmaWxlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlbGF0aXZlUGF0aCl9YDtcbiAgICBhd2FpdCBvcGVuKG9ic2lkaWFuVXJpKTtcblxuICAgIHRvYXN0LnN0eWxlID0gVG9hc3QuU3R5bGUuU3VjY2VzcztcbiAgICB0b2FzdC50aXRsZSA9IFwiXHUyNzEzIENyZWF0ZWQhXCI7XG4gICAgdG9hc3QubWVzc2FnZSA9IGZpbGVuYW1lO1xuXG4gICAgLy8gQ2xvc2UgUmF5Y2FzdCBhZnRlciBjcmVhdGluZyBub3RlXG4gICAgYXdhaXQgY2xvc2VNYWluV2luZG93KCk7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0b2FzdC5zdHlsZSA9IFRvYXN0LlN0eWxlLkZhaWx1cmU7XG4gICAgdG9hc3QudGl0bGUgPSBcIkZhaWxlZCB0byBjcmVhdGUgbm90ZVwiO1xuICAgIHRvYXN0Lm1lc3NhZ2UgPSBTdHJpbmcoZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFRpdGxlRm9ybSh7IG5vdGVUeXBlIH06IHsgbm90ZVR5cGU6IE5vdGVUeXBlIH0pIHtcbiAgY29uc3QgW3RpdGxlLCBzZXRUaXRsZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKG5vdGVUeXBlLmlzUXVpY2tUYXNrKSB7XG4gICAgICBhd2FpdCBhZGRUYXNrVG9Ub2RheSh0aXRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGNyZWF0ZU5vdGUobm90ZVR5cGUsIHRpdGxlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICA8QWN0aW9uLlN1Ym1pdEZvcm1cbiAgICAgICAgICAgIHRpdGxlPXtub3RlVHlwZS5pc1F1aWNrVGFzayA/IFwiQWRkIFRhc2tcIiA6IFwiQ3JlYXRlIE5vdGVcIn1cbiAgICAgICAgICAgIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgIH1cbiAgICA+XG4gICAgICA8Rm9ybS5UZXh0RmllbGRcbiAgICAgICAgaWQ9XCJ0aXRsZVwiXG4gICAgICAgIHRpdGxlPXtub3RlVHlwZS5pc1F1aWNrVGFzayA/IFwiVGFza1wiIDogXCJUaXRsZVwifVxuICAgICAgICBwbGFjZWhvbGRlcj17bm90ZVR5cGUuaXNRdWlja1Rhc2sgPyBcIldoYXQgZG8geW91IG5lZWQgdG8gZG8/XCIgOiBgTGVhdmUgYmxhbmsgZm9yIFwiJHtub3RlVHlwZS5kZWZhdWx0VGl0bGV9XCJgfVxuICAgICAgICB2YWx1ZT17dGl0bGV9XG4gICAgICAgIG9uQ2hhbmdlPXtzZXRUaXRsZX1cbiAgICAgIC8+XG4gICAgICA8Rm9ybS5EZXNjcmlwdGlvbiB0ZXh0PXtub3RlVHlwZS5pc1F1aWNrVGFzayA/IFwiQWRkaW5nIHRvIHRvZGF5J3MgdGFzayBsaXN0XCIgOiBgQ3JlYXRpbmcgJHtub3RlVHlwZS5tb2RlfSBpbiAke25vdGVUeXBlLmZvbGRlcn1gfSAvPlxuICAgIDwvRm9ybT5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAgcmV0dXJuIChcbiAgICA8TGlzdCBzZWFyY2hCYXJQbGFjZWhvbGRlcj1cIkNob29zZSBub3RlIHR5cGUuLi5cIj5cbiAgICAgIHtub3RlVHlwZXMubWFwKChub3RlVHlwZSkgPT4gKFxuICAgICAgICA8TGlzdC5JdGVtXG4gICAgICAgICAga2V5PXtub3RlVHlwZS5tb2RlfVxuICAgICAgICAgIGljb249e25vdGVUeXBlLmljb259XG4gICAgICAgICAgdGl0bGU9e25vdGVUeXBlLnRpdGxlfVxuICAgICAgICAgIHN1YnRpdGxlPXtub3RlVHlwZS5kZXNjcmlwdGlvbn1cbiAgICAgICAgICBhY2Nlc3Nvcmllcz17W3sgdGV4dDogbm90ZVR5cGUuZm9sZGVyIH1dfVxuICAgICAgICAgIGFjdGlvbnM9e1xuICAgICAgICAgICAgPEFjdGlvblBhbmVsPlxuICAgICAgICAgICAgICB7bm90ZVR5cGUubW9kZSA9PT0gXCJUYXNrXCIgPyAoXG4gICAgICAgICAgICAgICAgPEFjdGlvblxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJDcmVhdGUgVGFza1wiXG4gICAgICAgICAgICAgICAgICBvbkFjdGlvbj17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RlKG5vdGVUeXBlLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8QWN0aW9uLlB1c2hcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtub3RlVHlwZS5pc1F1aWNrVGFzayA/IFwiQWRkIFRhc2tcIiA6IFwiRW50ZXIgVGl0bGVcIn1cbiAgICAgICAgICAgICAgICAgIHRhcmdldD17PFRpdGxlRm9ybSBub3RlVHlwZT17bm90ZVR5cGV9IC8+fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvTGlzdD5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQW9HO0FBQ3BHLG1CQUFnQztBQUVoQyxnQkFBd0I7QUFDeEIsa0JBQXFCO0FBQ3JCLGdCQUFtRTtBQUVuRSxJQUFNLGlCQUFhLHNCQUFLLG1CQUFRLEdBQUcsV0FBVyxtQkFBbUI7QUFDakUsSUFBTSxhQUFhO0FBQ25CLElBQU0sbUJBQW1CO0FBR3pCLElBQU0sb0JBQStDO0FBQUEsRUFDbkQsUUFBUTtBQUFBLEVBQ1IsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUNWO0FBWUEsSUFBTSxZQUF3QjtBQUFBLEVBQzVCO0FBQUEsSUFDRSxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQTtBQUFBLElBQ0UsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFPO0FBQUEs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
