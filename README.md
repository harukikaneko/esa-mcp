## Usage

利用するツールに合わせて以下のように設定ファイルを準備してください。

```json
{
  "mcpServers": {
    "esa-mcp-server": {
      "command": "/Users/~/.local/share/mise/shims/node", // 絶対PATHにしておく方が無難
      "args": ["/Users/~/project/esa-mpc-server/dist/index.js"], // 現在はローカルbuild想定
      "env": {
        "ESA_API_KEY": "ESA API TOKEN",
        "DEFAULT_ESA_TEAM": "kanmu"
      }
    }
  }
}
```
