# vsnotify
Simple extension which allows you to send VS Code "notifications," either by message or status bar entry.

<img src="https://github.com/JoshPaulie/VSNotify/blob/main/assets/vsnotify-screenshot.png?raw=true" width="800">

## Commands
### `vsnotify.status`
| Argument  | Description                                      | Values                                       | Default          |
| --------- | ------------------------------------------------ | -------------------------------------------- | ---------------- |
| `message` | The text displayed in the notification           | String                                       | "Notification"   |
| `color`   | The text color in the notification               | String {red,blue,yellow,orange,green,purple} | "green"          |
| `timeout` | How long until the message dismisses itself (ms) | Integer                                      | 5000 (5 seconds) |
| `align`   | Which side of IDE the entry will go on           | String {left,right}                          | "left"           |

### `vsnotify.notify`
| Argument  | Description                            | Values                      | Default        |
| --------- | -------------------------------------- | --------------------------- | -------------- |
| `message` | The text displayed in the notification | String                      | "Notification" |
| `type`    | The VSCode message type                | String {info,warning,error} | "info"         |

## Usage examples
### VSCodeVim bindings

Example: encourage user to use better horizontal motions
```jsonc
// settings.json
{
  "vim.normalModeKeyBindings": [
    {
      "before": ["h"],
      "after": [""],
      "commands": [
        {
          "command": "vsnotify.status",
          "args": {
            "message": "Use a better motion! (b, ge, F)",
            "color": "red",
            "timeout": 1000, // 1 second timeout
          }
        }
      ],
      "silent": true
    },
    {
      "before": ["l"],
      "after": [""],
      "commands": [
        {
          "command": "vsnotify.status",
          "args": {
            "message": "Use a better motion! (w, e, f)",
            "color": "red",
            "align": "right" // Add entry to right side
          }
        }
      ],
      "silent": true
    }
  ]
}
```

### Notification after task completion
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
