# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このプロジェクトは三目並べ(Tic-Tac-Toe)で遊べるWebサイトです。Vue 3とTailwind CSSを使用して構築されており、GitHub Pagesにデプロイされます。

## 言語設定

- **日本語でのコミュニケーション**: このプロジェクトでは日本語でのチャットを推奨します。
- コードコメントやドキュメントも日本語で記述することができます。

## 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# 本番用ビルド
pnpm build

# プレビュー（ビルド後の確認）
pnpm preview
```

## 技術スタック

- **フレームワーク**: Vue 3 (Composition API)
- **パッケージ管理**: pnpm
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **状態管理**: Pinia
- **アニメーション**:
  - @formkit/auto-animate (リストアニメーション)
  - tailwindcss-motion (モーションプリセット)
- **デプロイ**: GitHub Pages (GitHub Actions)

## ディレクトリ構造

```
src/
├── components/          # Vueコンポーネント
│   ├── Board.vue       # ゲームボード (3x3グリッド)
│   ├── Cell.vue        # 各マス目
│   ├── GameStatus.vue  # ゲーム状態表示（ターン、勝敗）
│   └── GameHistory.vue # 履歴・統計表示
├── composables/        # Composition API
│   └── useGame.js      # ゲームロジック（勝敗判定等）
├── stores/             # Pinia ストア
│   └── gameHistory.js  # 履歴管理（LocalStorage）
├── App.vue             # メインアプリケーション
├── main.js             # エントリーポイント
└── style.css           # Tailwindディレクティブ
```

## アーキテクチャ

### ゲームロジック (`useGame.js`)

- 3x3のボード状態管理
- プレイヤー交代（X/O）
- 勝敗判定（8パターン: 横3, 縦3, 斜め2）
- 引き分け判定
- ゲームリセット機能

### 履歴管理 (`gameHistory.js`)

- LocalStorageで永続化（最新20件）
- ゲーム結果の自動保存
- 統計情報の算出（勝率、引き分け率）

### コンポーネント設計

- **Board**: セルの配置とクリックイベント管理
- **Cell**: 個別マス目の表示とアニメーション
- **GameStatus**: 現在の状態表示とリセットボタン
- **GameHistory**: 履歴リストと統計カード

### アニメーション

- `tailwindcss-motion`: プリセットアニメーション（`motion-preset-*`）
- `@formkit/auto-animate`: 履歴リストの自動アニメーション
- 勝利時は勝利ラインのセルが緑色にハイライト

## デプロイ

GitHub Actionsが自動的にビルドとデプロイを実行します:

1. `main`ブランチへのプッシュをトリガー
2. pnpmで依存関係をインストール
3. Viteでビルド (`pnpm build`)
4. GitHub Pagesにデプロイ

**重要**: `vite.config.js`の`base`オプションがリポジトリ名と一致していることを確認してください。

### デプロイワークフローの設定

両方のワークフロー（本番デプロイとPRプレビュー）で以下の設定を使用しています:

- `keep_files: true`: 既存のファイルを保持（他のデプロイで作成されたファイルを削除しない）
- `force_orphan: false`: orphan commitを作成しない（コミット履歴を保持）

**`force_orphan: false`の理由**:
- デフォルトの`force_orphan: true`では、デプロイのたびにgh-pagesブランチの履歴を破棄してorphan commitを作成します
- これにより、本番デプロイ時にPRプレビューフォルダが削除され、PRプレビューデプロイ時に本番コンテンツが削除される問題が発生します
- `force_orphan: false`に設定することで、コミット履歴を保持し、`keep_files: true`と組み合わせて本番環境とプレビュー環境を共存させることができます

## Git・GitHub運用ルール

### コミットメッセージ

- **日本語で記述**すること
- 例: `feat: PRプレビュー環境を追加`、`fix: ゲームリセット時の状態初期化を修正`

### プルリクエスト

- **タイトル・本文ともに日本語で記述**すること
- 変更内容を簡潔に説明
- 必要に応じてスクリーンショットを添付

### PRプレビュー環境

PRを作成すると、自動的にプレビュー環境がデプロイされます:

- **プレビューURL**: `https://kt-seed.github.io/codex-test_tic-tac-toe/pr-preview/pr-{番号}/`
- PRコメントに自動的にプレビューURLが投稿されます
- PRをクローズ（マージまたは却下）すると、プレビュー環境は自動的に削除されます

## GitHub Pages設定

リポジトリの設定で以下を確認してください:

1. Settings > Pages
2. Source: GitHub Actions
3. デプロイ後のURL:
   - 本番: `https://kt-seed.github.io/codex-test_tic-tac-toe/`
   - PRプレビュー: `https://kt-seed.github.io/codex-test_tic-tac-toe/pr-preview/pr-{番号}/`
