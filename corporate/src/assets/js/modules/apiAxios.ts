export function apiAxios(plugin: any) {
  /*
  // axios
  */

  // axiosテスト 外部サーバー取得ならOK。ローカルファイルはだめ。
  async function axiosTest(plugin: any) {
    try {
      const res = await plugin.get('https://jsonplaceholder.typicode.com/posts').then(function (resopnse: { data: any }) {
        console.log('resopnse.data:', resopnse.data);
      });
    } catch (error) {
      console.log('error:', error);
    }
  }
  axiosTest(plugin);
}
