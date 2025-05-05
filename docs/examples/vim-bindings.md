---
title: Vim Bindings
layout: default
parent: Examples
---
## Encouraging better vim motions
The following example is why I made this extension, to force myself to use better vim motions. It's exactly what I use in my config.

```jsonc
// settings.json
{
  "vim.normalModeKeyBindings": [
    {
      "before": ["h"],
      "commands": [
        {
          "command": "vsnotify.status",
          "args": { "message": "Use a better motion! (b, ge, F)", "color": "red" }
        }
      ],
      "silent": true
    },
    {
      "before": ["l"],
      "commands": [
        {
          "command": "vsnotify.status",
          "args": { "message": "Use a better motion! (w, e, f)", "color": "red" }
        }
      ],
      "silent": true
    }
  ]
}
```

## Colorful saves

Fun example of how you can chain multiple commands to one keybind

```jsonc
{
"vim.normalModeKeyBindingsNonRecursive": [
  {
    "before": ["leader", "w"],
    "commands": [
      { "command": "workbench.action.files.save" },
      { "command": "vsnotify.status", "args": { "message": "Saved!" } }
    ],
    "silent": true
  }
}
```
