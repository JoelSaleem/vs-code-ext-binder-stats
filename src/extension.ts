import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "foo" is now active!');

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("foo-sidebar", sidebarProvider)
  );

  // let disposable = vscode.commands.registerCommand("foo.helloWorld", () => {
  //   // The code you place here will be executed every time your command is executed
  //   // Display a message box to the user
  //   HelloWorldPanel.createOrShow(context.extensionUri);
  // });

  // context.subscriptions.push(disposable);

  context.subscriptions.push(
    vscode.commands.registerCommand("foo.refresh", async () => {
      // HelloWorldPanel.kill();
      // HelloWorldPanel.createOrShow(context.extensionUri);

      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.foo-sidebar-view"
      );
      setTimeout(() => {
        vscode.commands.executeCommand(
          "workbench.action.webview.openDeveloperTools"
        );
      }, 500);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
