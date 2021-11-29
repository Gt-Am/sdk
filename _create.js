function createScript() {
  let path = [
    'https://static.wfq2020.com/libs/auth/_w_jse.js',
    'https://static.wfq2020.com/libs/auth/_w_a.js',
    'https://static.wfq2020.com/libs/auth/_w_b.js',
    'https://static.wfq2020.com/libs/auth/_w_c.js',
    'https://static.wfq2020.com/libs/auth/_w_d.js',
    'https://static.wfq2020.com/libs/auth/_w_e.js',
    'https://static.wfq2020.com/libs/auth/_w_f.js',
    // 'https://static.wfq2020.com/libs/auth/_w_sdk.js',
    'http://127.0.0.1:821/sdk.js',
  ]
  path.forEach((src, index)=> {
    let script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
    if (index === 7) {
      script.onload = () => {
        load()
      }
    }
  })
}
function load() {
  if (window) {
    let jse = window.JSEncrypt
    window.__proto__.jse = jse;
    delete window.JSEncrypt
    if (window._wload) { // app.js先加载执行
      window._wload()
    }
  }
}
createScript()