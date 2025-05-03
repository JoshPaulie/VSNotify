import * as vscode from "vscode";
import { notifyCommand, statusCommand } from "./commands.js";

export function activate(context: vscode.ExtensionContext) {
  // grab the settings
  const config = vscode.workspace.getConfiguration("vsnotify");

  // register status and notify, pushing disposables
  context.subscriptions.push(
    vscode.commands.registerCommand("vsnotify.status", statusCommand(config)),
    vscode.commands.registerCommand("vsnotify.notify", notifyCommand(config))
  );
}

export function deactivate() {}
