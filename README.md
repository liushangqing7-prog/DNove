# DNove

DNove 是一个基于 **Tauri + Vue 3 + TypeScript** 的离线优先网文创作桌面应用脚手架。

## 目录结构

```text
DNove/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── styles/
│   │   └── theme.css
│   ├── router/
│   │   └── index.ts
│   ├── layouts/
│   │   └── MainLayout.vue
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── EditorView.vue
│   │   └── SettingsView.vue
│   ├── components/
│   │   ├── OutlinePanel.vue
│   │   ├── MarkdownEditorPanel.vue
│   │   ├── AIDraftPanel.vue
│   │   └── GenesisForm.vue
│   ├── stores/
│   │   ├── workspaceStore.ts
│   │   └── editorStore.ts
│   ├── models/
│   │   └── workspace.ts
│   ├── utils/
│   │   └── markdownSettingParser.ts
│   └── services/
│       ├── tauriWorkspaceService.ts
│       └── ai/
│           ├── AIService.ts
│           ├── OpenAIAdapter.ts
│           ├── factory.ts
│           └── types.ts
└── src-tauri/
    ├── Cargo.toml
    ├── build.rs
    ├── tauri.conf.json
    └── src/
        ├── main.rs
        └── workspace.rs
```

## 已实现的核心架构

- **Tauri 主进程职责**：
  - 工作区偏好加载/保存。
  - 工作区文件夹选择（原生对话框）。
  - 作品根目录列表读取。
  - 启动窗口初始化。
- **前端路由与布局**：
  - `Home / Editor / Settings`。
  - 编辑页三栏布局（大纲、编辑器、AI 草案区）。
- **本地模型层**：
  - 工作区、作品元数据、设定实体、AI 配置等 TypeScript 接口。
  - Markdown + YAML Front Matter 解析与回写。
- **AI 抽象层**：
  - `AIService` 抽象基类。
  - `OpenAIAdapter` 示例实现。
  - 工厂方法支持后续扩展 Claude/DeepSeek/通义。
- **核心交互骨架**：
  - 首次启动无工作区时自动引导到设置页。
  - “一句话创世”组件，生成草案进入右侧草案区。
  - 草案“采用”后手动写入正文（不会自动覆盖正文）。

## 下一步建议

1. 在 `workspace.rs` 增加创建/迁移工作区目录结构逻辑。  
2. 把 `GenesisForm.vue` 接到 Prompt 模板系统和 AI API。  
3. 在 `EditorView.vue` 接入可拖拽树组件（如 VueDraggable）并绑定章节文件。  
4. 加入章节快照、diff、回滚命令与 UI。  
5. 引入本地向量检索（可通过 Rust sidecar 或 Python sidecar）。

## 面向普通 Windows 用户的发布方式（带启动器）

为了让非技术用户“下载后就能打开”，建议使用以下发布形态：

1. 用安装包发布（`nsis`/`msi`），用户双击安装即可。  
2. 把仓库中的 `DNove-Launcher.bat` 一并放到发行目录，作为可见的“启动器”。  
3. 启动器会自动尝试以下位置并启动 `DNove.exe`：
   - 与启动器同目录
   - `%LOCALAPPDATA%\Programs\DNove\`
   - `%ProgramFiles%\DNove\`
   - `%ProgramFiles(x86)%\DNove\`

### 构建命令

```bash
npm run build:windows
```

该命令会调用 Tauri 生成 Windows 安装包（NSIS + MSI），适合直接发给普通用户安装使用。
