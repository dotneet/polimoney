# 仮設ページ作成マニュアル

# ！注意！
- 収支データを無許可でGitHubにアップロードすると問題があるらしいので、依頼者(議員さん)もしくはボードメンバー・PMなどの責任者の許可があるまで、すべてのローカルでの作業にとどめてください。
- forkしたご自身のリポジトリにcommitするのも控えてください。
- [2025/6/8 上記の指示がありました](https://dd2030.slack.com/archives/C08FL5L6GSH/p1749463090711729?thread_ts=1749362917.916339&cid=C08FL5L6GSH)
   > あと、信用の問題があるので、できればローカルにデータを置いておいて、公開レポジトリ上からは削除頂きたいです。

## このマニュアルについて
このマニュアルでは、政治家の収支報告書を表示する新しいデモページを作成する方法を説明します。既存の藤崎剛暉氏のページ（[`data/demo-kokifujisaki.ts`](../data/demo-kokifujisaki.ts)）を参考として、同じような構造のページを作る手順を詳しく解説します。

## 作成するページの概要
作成するページには以下の要素が含まれます：
- 政治家の基本情報（名前、所属政党、選挙区など）
- 年度別の収支報告書
- 収入と支出の詳細な内訳
- 資金の流れを示すチャート

## 必要なファイルと役割

### 1. データファイル（.tsファイル）
**場所**: `data/demo-{政治家名}.ts`
**役割**: 政治家の情報と収支データをすべて格納するファイル

### 2. ページファイル（page.tsxファイル）
**場所**: `app/demo-{政治家名}-{年度}/page.tsx`
**役割**: 実際にブラウザに表示されるページの構造を定義するファイル

### 3. 画像ファイル（.jpgファイル）
**場所**: `public/demo-{政治家名}.jpg`
**役割**: 政治家の顔写真

## 作成手順

### ステップ1: 基本情報の整理

まず、以下の情報を整理してください（原則すべて収支報告書に書いてある）

#### 基本情報
- **氏名**: 政治家のフルネーム
- **肩書**: 「衆議院議員」「参議院議員」など
- **所属政党**: 「自由民主党」「立憲民主党」など
- **選挙区**: 「東京都1区」「比例代表」など

#### 組織情報
- **政治団体名**: 報告書を提出している政治団体の正式名称
- **団体の種類**: 「政党の支部」「後援会」「政治資金管理団体」など
- **活動区域**: 「東京都内」「全国」など
- **代表者**: 団体の代表者名（通常は政治家本人）
- **会計責任者**: 会計を担当する人の名前
- **事務担当者**: 事務処理を担当する人の名前

#### 収支データ
各年度について以下の情報が必要です：
- **総収入**: その年の収入の合計金額
- **総支出**: その年の支出の合計金額
- **年間収支**: 収入から支出を差し引いた金額
- **最終更新日**: 報告書が提出された日付

### ステップ2: データファイルの作成

**ぶっちゃけAIにぶん投げれば95%くらいの精度で作れる**

#### ファイル名の決定
`data/demo-{政治家名}.ts`という名前でファイルを作成します。
例：田中太郎という政治家の場合 → `data/demo-tanakatarou.ts`

#### ファイルの基本構造
データファイルは以下の5つの主要部分で構成されます：

1. **政治家の基本情報（Profile）**
   - 名前、肩書、政党、選挙区、写真のパスを定義

2. **報告書の基本情報（Reports）**
   - 年度ごとの収支総額や組織情報を定義

3. **資金の流れ（Flows）**
   - 収入がどこから来て、支出がどこに向かったかの流れを定義

4. **収入の詳細（Income Transactions）**
   - 収入の項目別詳細（党費、寄附、交付金など）

5. **支出の詳細（Expense Transactions）**
   - 支出の項目別詳細（人件費、事務所費、宣伝費など）

#### 重要な計算ルール

**パーセンテージの計算**
各収入・支出項目の割合は以下の式で計算します：
```
割合 = (項目の金額 ÷ 総額) × 100
```
小数点第1位で四捨五入して表示されます。

### ステップ3: ページファイルの作成

#### ディレクトリの作成
`app/demo-{政治家名}-{年度}/`というフォルダを作成します。
例：田中太郎の2024年データの場合 → `app/demo-tanakatarou-2024/`

#### ページファイルの役割
このファイルは、データファイルからデータを読み込んで、実際の画面に表示する役割を持ちます。基本的な構造は既存のページと同じで、以下の要素を含みます：

- **ヘッダー**: サイト全体で共通のヘッダー部分
- **サマリー**: 政治家情報と収支の概要
- **収入詳細**: 収入の項目別内訳
- **支出詳細**: 支出の項目別内訳
- **メタデータ**: 報告書の詳細情報
- **注意事項**: データの取り扱いに関する注意
- **フッター**: サイト全体で共通のフッター部分

### ステップ4: 画像ファイルの準備

#### 画像の仕様
- **ファイル形式**: JPEG（.jpg）or PNG
- **ファイル名**: `demo-{政治家名}.jpg` or png
- **推奨サイズ**: 縦横比1:1の正方形、最低300×300ピクセル
- **配置場所**: `public/`フォルダ直下

#### 画像の注意点
- 政治家の顔がはっきりと識別できる写真を使用
- 著作権に問題がない画像を使用
- 画像が無い場合は `public\demo-example.png` で代替を推奨

### ステップ5: 作成後の確認

#### 動作確認
1. **開発サーバーの起動**: `npm run dev`コマンドでローカルサーバーを起動
2. **ページの表示確認**: ブラウザで`http://localhost:3000/demo-{政治家名}-{年度}`にアクセス
3. **データの表示確認**: すべての数値と情報が正しく表示されているか確認

#### エラーの対処
よくあるエラーとその対処法：

**画像が表示されない**
- ファイル名がデータファイル内のパスと一致しているか確認
- 画像ファイルが`public/`フォルダに正しく配置されているか確認

**数値が正しく表示されない**
- 金額の合計が正しく計算されているか確認
- パーセンテージの計算式が正しいか確認

**ページが表示されない**
- ディレクトリ名が正しいか確認
- ファイル名が`page.tsx`になっているか確認

## データ入力時の注意点

### 金額の扱い
- すべて円単位で入力（カンマは不要）
- 例：100万円の場合 → `1000000`

### 日付の形式
- 年/月/日の形式で入力
- 例：2024年3月31日の場合 → `'2024/3/31'`

### 文字列の扱い
- 日本語の項目名や組織名はそのまま入力
- 引用符（'または"）で囲むことを忘れずに

### IDの命名規則
- 収入項目：`i1`, `i2`, `i3`...
- 支出項目：`e1`, `e2`, `e3`...
- 年度ごとに一意のIDを使用

## 複数年度のデータ管理

### 年度別データの考え方
一人の政治家について複数年のデータを管理する場合：

1. **報告書情報**: 年度ごとに別々のオブジェクトを作成
2. **収支データ**: 年度をキーとした辞書形式で管理
3. **前年繰越**: 前年の「翌年への繰越」と一致させる

### データの整合性
- 各年度の収支が独立して正しく計算されていること

## 型安全性について

このプロジェクトでは**TypeScript**を使用しているため、データの型（文字列、数値、配列など）が事前に定義されています。データを入力する際は、以下の型定義に従ってください：

- **Profile**: 政治家の基本情報
- **Report**: 報告書の基本情報
- **Flow**: 資金の流れ
- **Transaction**: 個別の取引情報

型が正しくない場合、開発時にエラーが表示されるので、エラーメッセージを参考に修正してください。

## チェックリスト

### データファイル作成完了チェック
- [ ] 政治家の基本情報がすべて入力されている
- [ ] 各年度の報告書情報が正しく設定されている
- [ ] 収入項目の金額合計が総収入と一致している
- [ ] 支出項目の金額合計が総支出と一致している
- [ ] パーセンテージがすべて正しく計算されている
- [ ] 前年繰越と翌年繰越の金額が年度間で整合している

### ページファイル作成完了チェック
- [ ] 正しいディレクトリ名でフォルダが作成されている
- [ ] page.tsxファイルが作成されている
- [ ] データファイルから正しい年度のデータを取得している
- [ ] 必要なコンポーネントがすべてインポートされている

### 画像ファイル配置完了チェック
- [ ] 画像ファイルがpublicフォルダに配置されている
- [ ] ファイル名がデータファイル内のパスと一致している
- [ ] 画像が適切なサイズ・形式になっている

### 最終確認チェック
- [ ] 開発サーバーでページが正常に表示される
- [ ] すべての数値が正しく表示されている
- [ ] 画像が正しく表示されている
- [ ] リンクや ナビゲーションが正常に動作する

## 困ったときの対処法

### 参考ファイル
- **データ構造の参考**: [`data/demo-kokifujisaki.ts`](../data/demo-kokifujisaki.ts)
- **ページ実装の参考**: [`app/demo-koki-fujisaki-2024/page.tsx`](../app/demo-koki-fujisaki-2024/page.tsx)
- **型定義の確認**: [`models/type.d.ts`](../models/type.d.ts)

### よくある質問

**Q: 政治団体名が長い場合はどうしますか？**
A: 正式名称をそのまま使用してください。表示時に自動的に調整されます。

**Q: 画像がない場合はどうしますか？**
A: デフォルト画像を使用してください。`demo-example.png`

**Q: 金額が大きすぎてエラーになります**
A: JavaScriptの数値制限内（約9,007兆）であれば問題ありません。カンマや円記号は含めないでください。

このマニュアルに従って作業することで、既存のページと同じ品質の仮設ページを作成できます。不明な点があれば、参考ファイルを確認しながら進めてください。
