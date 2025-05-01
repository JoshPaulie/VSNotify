---
title: Task Examples
layout: default
---
## Notification after task completion
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
