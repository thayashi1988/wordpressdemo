export function apiFetch() {
  /*
  // fetch
  */

  // fetchテスト 外部サーバー取得ならOK。ローカルファイルはだめ。
  async function callApiFetch() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const users = await res.json();
      return users;
    } catch (error) {
      console.log('error:', error);
    }
  }
  callApiFetch();
}
