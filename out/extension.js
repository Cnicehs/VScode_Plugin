"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "hello" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('hello.ToProperty', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World from Hello!');
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let document = editor.document;
        let selection = editor.selection;
        let text = document.getText(selection);
        // let result = text.split('').reverse().join('');
        let subStrings = text.split(" ");
        if (subStrings.length < 2) {
            return;
        }
        let type = subStrings[subStrings.length - 2];
        let name = subStrings[subStrings.length - 1].split(";")[0];
        let blank = "";
        let num = selection.start.character;
        for (let index = 0; index < num; index++) {
            blank += " ";
        }
        let result = `${blank}[UnityEngine.Serialization.FormerlySerializedAs("${name}")]
${blank}public ${type} _${name};
${blank}public ${type} ${name}
${blank}{
${blank}	get
${blank}	{
${blank}		return _${name};
${blank}	}
${blank}	set
${blank}	{
${blank}		_${name} = value;
${blank}	}
${blank}}
${blank}`;
        editor.edit((eb) => {
            // eb.delete(new vscode.Range(selection.active.line, 0, selection.active.line, selection.active.character));
            eb.delete(new vscode.Range(selection.start, selection.end));
            let pos = new vscode.Position(selection.start.line, 0);
            eb.insert(pos, result);
        });
        // selection.active = selection.active.translate(13, 0);
        // let newSelection = new vscode.Selection(selection.active.line + 13, num, selection.active.line + 13, num);
        let pos = selection.end;
        pos = new vscode.Position(pos.line + 13, num);
        let newSelection = new vscode.Selection(pos, pos);
        editor.selection = newSelection;
        // selection.anchor = new vscode.Position(selection.anchor.line + 13, 0);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map