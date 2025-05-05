---
layout: default
title: Commands
nav_order: 2
hac_toc: true
---
# Commands

- TOC
{:toc}

## Global Settings

Default values can be set in `settings.json`, like the following.

```jsonc
// settings.json
{
  // Status bar notifications
  "vsnotify.status.message": "Notification",      // default status‑bar text
  "vsnotify.status.color": "green",               // red|blue|yellow|orange|green|purple
  "vsnotify.status.timeout": 5000,                // ms before auto‑dismiss
  "vsnotify.status.align": "left",                // left|right
  
  // Popup notifications
  "vsnotify.notify.message": "notification",      // default popup text
  "vsnotify.notify.type": "information",          // information|warning|error
  
  // runTask command messages
  "vsnotify.runTask.successMessage": "Task '{0}' succeeded",      // {0}=task name
  "vsnotify.runTask.errorMessage":   "Task '{0}' failed with exit code {1}"  // {1}=exit code
}
```

---

## Usage

Notifications are intended to be fired by regular keybindings, VSCodeVim mappings, or tasks.

Between the two, VSNotify is best suited VSCodeVim bindings, as you can fire multiple commands per keybind.

### VSCodeVim Mappings

In your **settings.json**, under the `vim.*KeyBindings` section:

```jsonc
"vim.normalModeKeyBindingsNonRecursive": [
  {
    "before": ["leader", "w"],
    "commands": [
      { "command": "workbench.action.files.save" },
      { "command": "vsnotify.status", "args": { "message": "Saved!" } }
    ],
    "silent": true
  },
  {
    "before": ["<leader>", "n"],
    "commands": [
      {
        "command": "vsnotify.notify",
        "args": { "message": "Check this out", "type": "info" }
      }
    ]
  },
  {
    "before": ["<leader>", "r"],
    "commands": [
      {
        "command": "vsnotify.runTask",
        "args": { "taskName": "pytest", "useStatus": false }
      }
    ]
  }
]
```

### Regular VS Code Keybindings

Add entries to your `keybindings.json`:

```jsonc
[
  {
    "key": "ctrl+alt+s",
    "command": "vsnotify.status",
    "args": {
      "message": "All done!",
      "color": "blue",
      "timeout": 3000,
      "align": "right"
    }
  },
  {
    "key": "ctrl+alt+n",
    "command": "vsnotify.notify",
    "args": {
      "message": "Heads up!",
      "type": "warning"
    }
  },
  {
    "key": "ctrl+alt+t",
    "command": "vsnotify.runTask",
    "args": {
      "taskName": "build",
      "useStatus": true
    }
  }
]
```

---

## Command Reference

### `vsnotify.status`

Create a transient status bar entry.

| Argument  | Description                       | Values                              | Default       |
| --------- | --------------------------------- | ----------------------------------- | ------------- |
| `message` | Text shown in status bar          | String                              | from settings |
| `color`   | Status bar text color             | red,blue,yellow,orange,green,purple | from settings |
| `timeout` | Lifespan before auto dismiss (ms) | Integer                             | from settings |
| `align`   | Side of status bar                | left, right                         | from settings |

---

### `vsnotify.notify`

Show a VS Code window notification.

| Argument  | Description           | Values                    | Default       |
| --------- | --------------------- | ------------------------- | ------------- |
| `message` | Text in the popup     | String                    | from settings |
| `type`    | Notification severity | information,warning,error | from settings |

---

### `vsnotify.runTask`

Run a named VS Code task, then notify on success or failure.

| Argument    | Description                                       | Values  | Default      |
| ----------- | ------------------------------------------------- | ------- | ------------ |
| `taskName`  | The exact name of the VS Code task to execute     | String  | **required** |
| `useStatus` | Show result in status bar (true) or popup (false) | Boolean | false        |
