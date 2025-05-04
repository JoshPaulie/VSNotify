---
title: VSCode Tasks
layout: default
parent: Examples
---
## Notification after task completion
The following example is great for tasks unlikely to fail, but are bit longer so you'd like a notification.

{: .tip }
For a way to run tasks and send different notifications based on if it failed or not, check out the [next example](#vsnotifyruntask-example)

```jsonc
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build Project",
      "type": "shell",
      "command": "tsc",
      "problemMatcher": "$tsc",
      "group": "build",
      "dependsOn": ["Notify Build Complete"], // Trigger notification after build
      "dependsOrder": "sequence"
    },
    {
      "label": "Notify Build Complete",
      "type": "command",
      "command": "vsnotify.notify",
      "args": {
        "message": "Build completed",
      }
    }
  ]
}
```

## `vsnotify.runTask` example

{: .note }
You can edit the success/error message used by `runTask`, [noted here](../commands.md#global-settings).

```jsonc
  "vim.normalModeKeyBindings": [
    // Status bar notification
    {
      "before": ["leader", "leader", "t"],
      "commands": [{ "command": "vsnotify.runTask", "args": { "taskName": "pytest", "useStatus": true } }]
    },
    // Pop up notification
    {
      "before": ["leader", "leader", "t"],
      "commands": [{ "command": "vsnotify.runTask", "args": { "taskName": "pytest", "useStatus": false } }]
    },
  ]
```
