---
title: CreativePro
---

Plotなしのシンプルなクリエイティブサーバー。1日1回参加時にゲーム内ポイントが1ポイント(Nitroランク保有者の場合は2ポイント)もらえます。(※下記の「ランクと使える機能」参照)

接続可能バージョン: v1.9 ~ v1.21.11 (サーバーバージョン: 1.21.11)

※推奨: 1.18以上

## ルール

以下の行為が発覚した場合、**CreativePro全体での処罰またはポイントの剥奪、またはその両方**がなされます。

- バグの利用及びバグを運営に報告しない行為 (例: 通常保護されているスポーン地点を保護貫通したうえで破壊するなど)
- サーバーを破壊する行為全般
    - バグ利用によってサーバーをダウンさせる行為や、高い負荷をかけてサーバーをダウンまたはプレイ不可能にさせる行為を含みます
- 設置した人の了承を得ずに自分で設置していないブロック・アイテムを破壊する行為
- 水と溶岩を設置して石の山を作る行為
- 他プレイヤーへの迷惑行為、及び荒らし行為
- 運営が不適切だと判断した行為
    - 上記の行為及び、CreativePro運営・法務部が不適切だと判断した行為を禁じます。

### 附則

2026年1月11日 施行

## ランクと使える機能

Air (0ポイント及びマイナスポイント):
- ゲームモードはスペクテイターモードのみ使用可能
- `/rank` (現在の所持ポイント数の確認)
- `/co i` (クリックした場所のログを表示、再度同じコマンドを打って解除)

Grass (1ポイント):
- `/randomtp` (ランダムな場所にテレポート)
- `/fly` (Fly切り替え)
- `/gamemode` (ゲームモード切り替え)
- `/sethome` 3個まで
- `/tpa` (`/tpa <プレイヤー>`で「プレイヤー」にテレポート申請を送信できる)
- `/minecraft:locate` (バイオームや建造物を探すためのコマンド)
- `/mv list` (ワールド一覧を見る)
- `/mvtp <ワールド>` (ワールド間移動)
- コンパステレポート (WorldEditのコンパス機能)

Dirt (10ポイント):
- `/sethome` 5個まで
- WorldEditの一部コマンド
    - **選択可能ブロック数**: 500000
    - **一度に編集可能なブロック数**: 150
    - 範囲選択系 (`worldedit.selection.*`)
        - 木斧 (`worldedit.wand`と`worldedit.wand.toggle`)
        - `//pos1`
        - `//pos2`
        - `//hpos1`
        - `//hpos2`
        - `//chunk`
        - `//sel`
        - `//size`
        - `//expand`
        - `//shift`
        - `//contract`
        - `//outset`
        - `//inset`
    - `//distr` (`worldedit.analysis.distr`)
    - `//count` (`worldedit.analysis.count`)
    - `//line` (`worldedit.region.line`)
    - `//walls` (`worldedit.region.walls`)
    - `//stack` (`worldedit.region.stack`)
    - `//smooth` (`worldedit.region.smooth`)
    - `//replace` (`worldedit.region.replace`)
    - `//set` (`worldedit.region.set`)
    - `//drain` (`worldedit.drain`)
    - `//snow` (`worldedit.snow`)
    - `//extinguish` (`worldedit.extinguish`)
    - `//undo`
    - `//redo`
    - `//copy`
    - `//download` (schemファイルのダウンロード)
    - ...その他様々なコマンド

Sand (20ポイント):
- `/sethome` 10個まで
- WorldEditの一度に編集可能なブロック数が500になる

Stone (30ポイント):
- `/sethome` 15個まで
- WorldEditの一度に編集可能なブロック数が1500になる

Coal (50ポイント):
- `/sethome` 20個まで
- WorldEditの一度に編集可能なブロック数が5000になる

Iron (75ポイント):
- `/sethome` 30個まで

Gold (100ポイント):
- `/sethome` 40個まで

Diamond (150ポイント):
- `/sethome` 50個まで

## おすすめの遊び方

- `/randomtp`で遠くにテレポートして、誰もいない場所で建築
- 友達を呼びたくなったら、相手に`/tpa <自分の名前>`を打ってもらう
- 満足する建築ができたらWorldEditで範囲選択して`//copy`したあとに`//download`してschemファイルをダウンロードする
