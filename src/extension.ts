import * as vscode from "vscode";
import { notifyCommand, statusCommand, runTaskCommand } from "./commands.js";

export function activate(context: vscode.ExtensionContext) {
  // grab the settings
  const config = vscode.workspace.getConfiguration("vsnotify");

  // register commands
  context.subscriptions.push(
    vscode.commands.registerCommand("vsnotify.status", statusCommand(config)),
    vscode.commands.registerCommand("vsnotify.notify", notifyCommand(config)),
    vscode.commands.registerCommand("vsnotify.runTask", runTaskCommand(config))
  );
}

export function deactivate() {}
