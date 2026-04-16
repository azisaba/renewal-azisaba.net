export interface Menu {
    name: string,
    to: string,
    menu?: Menu[]
}

const rules: Menu[] = [
    { name: "利用規約", to: "/rules/terms" },
    { name: "Minecraftサーバ個別規定", to: "/rules/minecraft-server-policy" },
    { name: "全体サーバールール", to: "/rules/global-server-rules" },
    { name: "各サーバールール", to: "/rules/server-rules" },
    { name: "Discordルール", to: "/rules/discord" },
    { name: "チャットガイドライン", to: "/rules/chat-guidelines" },
    { name: "運営登用規約", to: "/rules/operating-terms-and-conditions" },
    { name: "二次創作ガイドライン", to: "/rules/derivative-works-guidelines" },
]

const connect: Menu[] = [
    { name: "接続方法", to: "/connect" },
    { name: "接続アドレス", to: "/connect/addresses" },
]

const donation: Menu[] = [
    { name: "寄付ページ", to: "https://store.azisaba.net/" },
    { name: "寄付に関する注意事項", to: "/donation/note" },
    { name: "寄付金利用方法について", to: "/donation/usage" },
    { name: "特定商取引法に基づく表記", to: "/donation/commercial-transactions" },
    ]

const other: Menu[] = [
    { name: "サポート", to: "/support" },
    { name: "投票サイト", to: "/links#投票サイト" },
    { name: "開発ブログ(仮)", to: "/devlog" },
    { name: "求人", to: "/recruit" },
    { name: "リンク", to: "/links" },
]

export const menus: Menu[] = [
    { name: "ホーム", to: "/" },
    { name: "お知らせ", to: "/news" },
    { name: "接続する", menu: connect, to: "/connect" },
    { name: "ルール", menu: rules, to: "/rules" },
    { name: "サーバー紹介", to: "/servers" },
    { name: "寄付", menu: donation, to: "/donation" },
    { name: "その他", menu: other, to: "#" },
]