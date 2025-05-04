import * as vscode from "vscode";

// -------------------------------------------------------------------------- //

export interface StatusArgs {
  message?: string;
  color?: string;
  timeout?: number;
  align?: string;
}

// Registry mapping a serialized key → { item, timeoutHandle }
const activeStatusItems = new Map<
  string,
  { item: vscode.StatusBarItem; timeoutHandle: ReturnType<typeof setTimeout> }
>();

/**
 * Handler for the `vsnotify.status` command.
 */
export function statusCommand(config: vscode.WorkspaceConfiguration) {
  return (userArgs: StatusArgs) => {
    // Get defaults
    const defaults = {
      message: config.get<string>("status.message"),
      color: config.get<string>("status.color"),
      timeout: config.get<number>("status.timeout"),
      align: config.get<string>("status.align"),
    };

    // Merge user args with defaults
    const args = { ...defaults, ...userArgs };

    const key = JSON.stringify({
      message: args.message,
      color: args.color,
      align: args.align,
    }); // JSON.stringify stable for fixed props

    // Check for existing status bar entry with the same text, and if there is one, update its
    // timeout. This way, we're not spamming many indentalical entries
    const existing = activeStatusItems.get(key);
    if (existing) {
      clearTimeout(existing.timeoutHandle); // cancel prior dispose
      existing.item.text = args.message!; // update text
      existing.timeoutHandle = setTimeout(() => {
        existing.item.dispose(); // remove item
        activeStatusItems.delete(key);
      }, args.timeout);
      return;
    }

    // Determine alignment before creating
    const alignment =
      args.align === "right"
        ? vscode.StatusBarAlignment.Right
        : vscode.StatusBarAlignment.Left;

    // Create the entry (item), but is hidden at this point
    const item = vscode.window.createStatusBarItem(alignment, 0);

    // Determine color
    const defaultColor = "green";
    const color = args.color?.toLowerCase() ?? defaultColor;
    const allowed = ["red", "blue", "yellow", "orange", "green", "purple"];
    const safeColor = allowed.includes(color) ? color : defaultColor;

    // Apply text and text color, show entry
    item.color = new vscode.ThemeColor(`charts.${safeColor}`);
    item.text = args.message!;
    item.show();

    // Cleanup after duration functionality
    const timeoutHandle = setTimeout(() => {
      item.dispose(); // remove item
      activeStatusItems.delete(key);
    }, args.timeout);

    // Add our new entry to mapping
    activeStatusItems.set(key, { item, timeoutHandle });
  };
}

// -------------------------------------------------------------------------- //

export interface NotifyArgs {
  message?: string;
  type?: string;
}

/**
 * Handler for the `vsnotify.notify` command.
 */
export function notifyCommand(config: vscode.WorkspaceConfiguration) {
  return (userArgs: NotifyArgs) => {
    // Get defaults from config
    const defaults = {
      message: config.get<string>("notify.message"),
      type: config.get<string>("notify.type"),
    };

    // Merge user args over defaults
    const args = { ...defaults, ...userArgs };

    // Match message type, send it!
    switch (args.type!.toLowerCase()) {
      case "error":
        vscode.window.showErrorMessage(args.message!);
        break;
      case "warning":
        vscode.window.showWarningMessage(args.message!);
        break;
      default:
        vscode.window.showInformationMessage(args.message!);
        break;
    }
  };
}

// -------------------------------------------------------------------------- //

export interface RunTaskArgs {
  taskName: string;
  useStatus?: boolean; // if true, use status bar. else, pop up
}

/**
 * Handler for the `vsnotify.runTask` command.
 */
export function runTaskCommand(config: vscode.WorkspaceConfiguration) {
  return async (userArgs: RunTaskArgs) => {
    const { taskName, useStatus = false } = userArgs;

    // Fetch all tasks
    const tasks = await vscode.tasks.fetchTasks();
    // Find by name
    const task = tasks.find((t) => t.name === taskName);
    if (!task) {
      // No matching task
      return vscode.window.showErrorMessage(`Task '${taskName}' not found`);
    }

    // Execute the task
    const execution = await vscode.tasks.executeTask(task);

    // Listen for process end
    const disposable = vscode.tasks.onDidEndTaskProcess((event) => {
      if (event.execution === execution) {
        disposable.dispose();

        const exitCode = event.exitCode ?? -1;
        // Prep messages
        const successMsg = config
          .get<string>("runTask.successMessage")!
          .replace("{0}", taskName);
        const errorMsg = config
          .get<string>("runTask.errorMessage")!
          .replace("{0}", taskName)
          .replace("{1}", exitCode.toString());

        // Second notification
        if (exitCode === 0) {
          if (useStatus) {
            statusCommand(config)({ message: successMsg, color: "green" });
          } else {
            notifyCommand(config)({ message: successMsg, type: "info" });
          }
        } else {
          if (useStatus) {
            statusCommand(config)({ message: errorMsg, color: "red" });
          } else {
            notifyCommand(config)({ message: errorMsg, type: "error" });
          }
        }
      }
    });
  };
}
