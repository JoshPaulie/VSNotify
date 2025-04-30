import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  interface StatusArgs {
    message?: string;
    color?: string;
    timeout?: number;
    align?: string;
  }

  const statusDisposable = vscode.commands.registerCommand("vsnotify.status", (userArgs: StatusArgs) => {
    // Merge user input with defaults
    const args = { message: "Notification", color: "green", timeout: 5000, align: "left", ...userArgs };

    // Create entry
    const statusBarEntry = vscode.window.createStatusBarItem(args.align === "left" ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right, 0);

    // Modify and show status bar item
    const safeColor = ["red", "blue", "yellow", "orange", "green", "purple"].includes(args.color.toLowerCase()) ? args.color.toLowerCase() : "green";
    statusBarEntry.color = new vscode.ThemeColor(`charts.${safeColor}`);
    statusBarEntry.text = args.message;
    statusBarEntry.show();

    // Cleanup after duration
    setTimeout(() => {
      statusBarEntry.dispose();
    }, args.timeout);
  });

  context.subscriptions.push(statusDisposable);

  interface NotifyArgs {
    message?: string;
    type?: string;
  }

  const notifyDisposable = vscode.commands.registerCommand("vsnotify.notify", (userArgs: NotifyArgs) => {
    // Merge user input with defaults
    const args = { message: "notification", type: "information", ...userArgs };

    // Match type and show related message
    switch (args.type?.toLowerCase()) {
      case "error":
        vscode.window.showErrorMessage(args.message);
        break;

      case "warning":
        vscode.window.showWarningMessage(args.message);
        break;

      default:
        vscode.window.showInformationMessage(args.message);
        break;
    }
  });

  context.subscriptions.push(notifyDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
