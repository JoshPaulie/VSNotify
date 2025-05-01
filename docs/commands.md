---
layout: default
title: Commands
nav_order: 2
---
# Commands
## `vsnotify.status`
Adds a new status bar entry, which is cleaned up shortly after.

| Argument  | Description                                      | Values                                       | Default          |
| --------- | ------------------------------------------------ | -------------------------------------------- | ---------------- |
| `message` | The text displayed in the notification           | String                                       | "Notification"   |
| `color`   | The text color in the notification               | String {red,blue,yellow,orange,green,purple} | "green"          |
| `timeout` | How long until the message dismisses itself (ms) | Integer                                      | 5000 (5 seconds) |
| `align`   | Which side of IDE the entry will go on           | String {left,right}                          | "left"           |

```jsonc
{
  "command": "vsnotify.status",
  "args": {
    "message": "Action succeeded!",
    "color": "green",
    "timeout": 2000,
    "align": "right"
  }
}
```

## `vsnotify.notify`
Sends VSCode info, warning, or error message.

| Argument  | Description                            | Values                      | Default        |
| --------- | -------------------------------------- | --------------------------- | -------------- |
| `message` | The text displayed in the notification | String                      | "Notification" |
| `type`    | The VSCode message type                | String {info,warning,error} | "info"         |

```jsonc
{
  "command": "vsnotify.notify",
  "args": {
    "message": "You can't do that!",
    "type": "warning"
  }
}
```
