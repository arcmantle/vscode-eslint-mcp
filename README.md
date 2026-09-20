# ESLint MCP

This extension provides the official ESLint MCP server to VS Code. It gives agents the same ESLint tools as this manual MCP configuration:

```json
{
	"servers": {
		"ESLint": {
			"type": "stdio",
			"command": "npx",
			"args": ["--yes", "@eslint/mcp@latest"]
		}
	}
}
```

No workspace `mcp.json` file or MCP registry entry is necessary. The extension registers the server through the VS Code extension API when it starts.

## Requirements

- VS Code 1.136.0 or later
- Node.js and `npx` on `PATH`
- Network access to install the selected `@eslint/mcp` version from npm
- An ESLint configuration in the workspace

The first server start can take more time while `npx` downloads the package. Later starts use the npm cache.

## Usage

1. Install this extension.
2. Open Chat in agent mode.
3. Select **Configure Tools** and enable the ESLint tools.
4. Ask the agent to lint or fix a file.

Use **MCP: List Servers** to view server status and output.

## Settings

Set `eslintMcp.version` to an `@eslint/mcp` package version or npm distribution tag. The default is `latest`.

For example, use this workspace setting to pin version 0.3.12:

```json
{
	"eslintMcp.version": "0.3.12"
}
```

When this setting changes, the extension refreshes its MCP server definition. Restart the ESLint server from **MCP: List Servers** if it is already running.

## TypeScript ESLint Configurations

For `eslint.config.ts`, `eslint.config.mts`, or `eslint.config.cts`, the official server can require extra setup. See the [ESLint MCP documentation](https://eslint.org/docs/latest/use/mcp#use-typescript-configuration-files).

## Security

This extension starts the selected `@eslint/mcp` package through `npx`. The package is maintained by ESLint, but tags such as `latest` can change between starts. Use a fixed version in `eslintMcp.version` for reproducible operation.

## License

MIT
