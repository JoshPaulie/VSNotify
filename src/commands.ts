import * as vscode from "vscode";

export interface StatusArgs {
  message?: string;
  color?: string;
  timeout?: number;
  align?: string;
}

/**
 * Handler for the `vsnotify.status` command.
 */
export function statusCommand(config: vscode.WorkspaceConfiguration) {
  return (userArgs: StatusArgs) => {
    const defaults = {
      message: config.get<string>("status.message"),
      color: config.get<string>("status.color"),
      timeout: config.get<number>("status.timeout"),
      align: config.get<string>("status.align"),
    };
    const args = { ...defaults, ...userArgs };

    const alignment =
      args.align === "right"
        ? vscode.StatusBarAlignment.Right
        : vscode.StatusBarAlignment.Left;

    const item = vscode.window.createStatusBarItem(alignment, 0);

    const defaultColor = "green";
    const color = args.color?.toLowerCase() ?? defaultColor;
    const allowed = ["red", "blue", "yellow", "orange", "green", "purple"];
    const safeColor = allowed.includes(color) ? color : defaultColor;

    item.color = new vscode.ThemeColor(`charts.${safeColor}`);
    item.text = args.message ?? defaults.message!;
    item.show();

    setTimeout(() => item.dispose(), args.timeout);
  };
}

export interface NotifyArgs {
  message?: string;
  type?: string;
}

/**
 * Handler for the `vsnotify.notify` command.
 */
export function notifyCommand(config: vscode.WorkspaceConfiguration) {
  return (userArgs: NotifyArgs) => {
    const defaults = {
      message: config.get<string>("notify.message"),
      type: config.get<string>("notify.type"),
    };
    const args = { ...defaults, ...userArgs };

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
