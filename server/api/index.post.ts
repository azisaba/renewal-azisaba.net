export default defineEventHandler(async (event) => {
    const body = await readBody(event); // readBodyメソッドを利用
    const data = await fetch('https://www.tachibana.fit-sc.jp');
    console.log(body) // 「{ comment: "test" }」と出力される
});
