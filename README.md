# 三目並べ (Tic-Tac-Toe)

Vue 3とTailwind CSSで作られた、ブラウザで遊べる三目並べゲームです。

## 🎮 機能

- **2人対戦**: 同じデバイスでXとOのプレイヤーが交互にプレイ
- **勝敗判定**: 縦・横・斜めの揃いを自動判定
- **ゲーム履歴**: LocalStorageで最新20件の履歴を保存
- **統計情報**: X勝利、O勝利、引き分けの回数と勝率を表示
- **リッチなアニメーション**: クリック時のエフェクトや勝利時のハイライト

## 🚀 デモ

[こちらからプレイできます](https://your-username.github.io/Codex_tictactoe/)

## 🛠️ 技術スタック

- **Vue 3** (Composition API)
- **Vite** (ビルドツール)
- **Tailwind CSS** (スタイリング)
- **Pinia** (状態管理)
- **@formkit/auto-animate** (アニメーション)
- **tailwindcss-motion** (モーションエフェクト)
- **pnpm** (パッケージ管理)

## 📦 セットアップ

### 必要な環境

- Node.js 20以上
- pnpm 8以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/Codex_tictactoe.git
cd Codex_tictactoe

# 依存関係をインストール
pnpm install
```

## 💻 開発

```bash
# 開発サーバーを起動
pnpm dev
```

開発サーバーが起動したら、ブラウザで `http://localhost:5173` にアクセスしてください。

## 🏗️ ビルド

```bash
# 本番用ビルド
pnpm build

# ビルド結果をプレビュー
pnpm preview
```

## 🌐 デプロイ

このプロジェクトはGitHub Actionsを使用してGitHub Pagesに自動デプロイされます。

`master`ブランチにプッシュすると、自動的にビルドとデプロイが実行されます。

## 📁 プロジェクト構造

```
src/
├── components/          # Vueコンポーネント
│   ├── Board.vue       # ゲームボード
│   ├── Cell.vue        # 各マス目
│   ├── GameStatus.vue  # ゲーム状態表示
│   └── GameHistory.vue # 履歴・統計表示
├── composables/        # Composition API
│   └── useGame.js      # ゲームロジック
├── stores/             # Pinia ストア
│   └── gameHistory.js  # 履歴管理
├── App.vue             # メインアプリケーション
├── main.js             # エントリーポイント
└── style.css           # Tailwindディレクティブ
```

## 🎯 ゲームの遊び方

1. XとOのプレイヤーが交互にマス目をクリック
2. 縦・横・斜めのいずれかに3つ揃えたプレイヤーが勝利
3. すべてのマスが埋まっても勝者が決まらない場合は引き分け
4. 「新しいゲーム」ボタンでリセット

## 📊 履歴機能

- ゲーム終了時に自動的に履歴を保存
- 最新20件の履歴を表示
- X勝利、O勝利、引き分けの統計を表示
- 「履歴をクリア」ボタンで全履歴を削除可能

## 📝 ライセンス

MIT License
