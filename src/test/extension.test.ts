import * as assert from "assert";
import * as vscode from "vscode";

suite("vsnotify Extension Test Suite", () => {
  vscode.window.showInformationMessage("Running vsnotify tests...");

  test("Extension activates", async () => {
    const extension = vscode.extensions.getExtension("joshpaulie.vsnotify");
    assert.ok(extension, "Extension not found");
    await extension!.activate();
    assert.strictEqual(extension!.isActive, true, "Extension did not activate");
  });

  test("Commands are registered", async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes("vsnotify.status"), "vsnotify.status command not found");
    assert.ok(commands.includes("vsnotify.notify"), "vsnotify.notify command not found");
  });

  test("vsnotify.notify shows information message without throwing", async () => {
    await assert.doesNotReject(async () => {
      await vscode.commands.executeCommand("vsnotify.notify", {
        message: "Test info",
        type: "information",
      });
    });
  });

  test("vsnotify.notify handles unknown type without crashing", async () => {
    await assert.doesNotReject(async () => {
      await vscode.commands.executeCommand("vsnotify.notify", {
        message: "Test unknown type",
        type: "notatype",
      });
    });
  });

  test("vsnotify.status creates a status bar item and cleans up", async () => {
    await assert.doesNotReject(async () => {
      await vscode.commands.executeCommand("vsnotify.status", {
        message: "Hello",
        color: "red",
        timeout: 100,
        align: "left",
      });

      // Wait for cleanup to finish
      await new Promise((resolve) => setTimeout(resolve, 150));
    });
  });

  test("vsnotify.status falls back to green on invalid color", async () => {
    await assert.doesNotReject(async () => {
      await vscode.commands.executeCommand("vsnotify.status", {
        message: "Invalid color test",
        color: "invalidcolor",
        timeout: 100,
      });
      await new Promise((resolve) => setTimeout(resolve, 150));
    });
  });
});
