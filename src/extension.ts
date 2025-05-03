import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("vsnotify");

  interface StatusArgs {
    message?: string;
    color?: string;
    timeout?: number;
    align?: string;
  }

  const statusDisposable = vscode.commands.registerCommand("vsnotify.status", (userArgs: StatusArgs) => {
    // pull defaults from settings, then overlay userArgs
    const defaults = {
      message: config.get<string>("status.message"),
      color: config.get<string>("status.color"),
      timeout: config.get<number>("status.timeout"),
      align: config.get<string>("status.align"),
    };
    const args = { ...defaults, ...userArgs };

    const alignment = args.align === "right" ? vscode.StatusBarAlignment.Right : vscode.StatusBarAlignment.Left;
    const statusBarItem = vscode.window.createStatusBarItem(alignment, 0);

    // Define a default color
    const defaultColor = "green";

    // Use optional chaining and nullish coalescing to safely access and default the color
    const color = args.color?.toLowerCase() ?? defaultColor;

    // Validate the color against the allowed list
    const allowedColors = ["red", "blue", "yellow", "orange", "green", "purple"];
    const safeColor = allowedColors.includes(color) ? color : defaultColor;

    // Apply the color to the status bar item
    statusBarItem.color = new vscode.ThemeColor(`charts.${safeColor}`);

    // ←                            ← MISSING LINE: set the text
    statusBarItem.text = args.message ?? defaults.message!;

    // Show it
    statusBarItem.show();

    // Cleanup after duration
    setTimeout(() => statusBarItem.dispose(), args.timeout);
  });
  context.subscriptions.push(statusDisposable);

  interface NotifyArgs {
    message?: string;
    type?: string;
  }

  const notifyDisposable = vscode.commands.registerCommand("vsnotify.notify", (userArgs: NotifyArgs) => {
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
  });
  context.subscriptions.push(notifyDisposable);
}

export function deactivate() {}
