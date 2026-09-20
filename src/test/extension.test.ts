import * as assert from 'assert';
import { createServerDefinition, providerId } from '../extension';

suite('ESLint MCP provider', () => {
	test('provides the official ESLint MCP server over stdio', () => {
		const server = createServerDefinition();

		assert.strictEqual(providerId, 'vscode-eslint-mcp.eslint');
		assert.strictEqual(server.label, 'ESLint');
		assert.strictEqual(server.command, 'npx');
		assert.deepStrictEqual(server.args, ['--yes', '@eslint/mcp@latest']);
	});

	test('uses the selected package version', () => {
		const server = createServerDefinition('0.3.12');

		assert.deepStrictEqual(server.args, ['--yes', '@eslint/mcp@0.3.12']);
	});

	test('uses latest when the selected package version is empty', () => {
		const server = createServerDefinition('  ');

		assert.deepStrictEqual(server.args, ['--yes', '@eslint/mcp@latest']);
	});
});
