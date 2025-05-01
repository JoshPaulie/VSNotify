# vsnotify
Simple extension which allows you to send VS Code "notifications," either by message or status bar entry.

<img src="https://github.com/JoshPaulie/VSNotify/blob/main/assets/vsnotify-screenshot.png?raw=true" width="800">

## Usage

### VSCodeVim bindings

Example: encourage user to use better horizontal motions
```jsonc
{
  // settings.json
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
