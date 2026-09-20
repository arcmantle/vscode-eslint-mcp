import * as vscode from 'vscode';

export const providerId = 'vscode-eslint-mcp.eslint';
const versionSetting = 'eslintMcp.version';

export function createServerDefinition(version = 'latest'): vscode.McpStdioServerDefinition {
	const selectedVersion = version.trim() || 'latest';

	return new vscode.McpStdioServerDefinition(
		'ESLint',
		'npx',
		['--yes', `@eslint/mcp@${selectedVersion}`],
	);
}

export function activate(context: vscode.ExtensionContext): void {
	const didChangeDefinitions = new vscode.EventEmitter<void>();

	context.subscriptions.push(
		vscode.lm.registerMcpServerDefinitionProvider(providerId, {
			onDidChangeMcpServerDefinitions: didChangeDefinitions.event,
			provideMcpServerDefinitions: () => {
				const version = vscode.workspace.getConfiguration().get(versionSetting, 'latest');
				return [createServerDefinition(version)];
			},
		}),
		vscode.workspace.onDidChangeConfiguration(event => {
			if (event.affectsConfiguration(versionSetting)) {
				didChangeDefinitions.fire();
			}
		}),
		didChangeDefinitions,
	);
}
