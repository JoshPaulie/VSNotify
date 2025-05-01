---
title: Vim Bindings
layout: default
---
## Encouraging better vim motions
The following example is why I made this extension, to force myself to use better vim motions

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
