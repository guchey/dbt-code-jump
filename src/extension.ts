import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let provider_ref = vscode.languages.registerDefinitionProvider('sql', {
		provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
		  let range = document.getWordRangeAtPosition(position);
		  let name = document.getText(range);
		  return vscode.workspace.findFiles('**/' + name + '.sql', null, 1, token).then(result => result[0]).then((uri) => {
			return new vscode.Location(uri, new vscode.Position(0, 0));
		  });
		}
	  });
	context.subscriptions.push(provider_ref);

	let provider_source = vscode.languages.registerDefinitionProvider('sql', {
		provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
		  let range = document.getWordRangeAtPosition(position);
		  let name = document.getText(range);
		  return vscode.workspace.findFiles('**/' + 'src_' + name + '.yml', null, 1, token).then(result => result[0]).then((uri) => {
			return new vscode.Location(uri, new vscode.Position(0, 0));
		  });
		}
	  });
	context.subscriptions.push(provider_source);
}

// This method is called when your extension is deactivated
export function deactivate() {}
