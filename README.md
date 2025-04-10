## Usage

利用するツールに合わせて以下のように設定ファイルを準備してください。

```json
{
  "mcpServers": {
    "esa-mcp-server": {
      "command": "npx",
      "args": ["-y", "esa-mcp-server@latest"],
      "env": {
        "ESA_API_KEY": "your api key here",
        "DEFAULT_ESA_TEAM": "your default esa team"
      }
    }
  }
}
```
