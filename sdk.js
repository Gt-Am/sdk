function _r(method, url, params, isSync, isJse) {
    let promise = new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      if (!isJse) {
        let jseKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwvPLXnx8o7ku4iMD+XtsnnXGw+Ix+bMlbFSyuQJIPovo4LKbbLRPAeu7SW0KmJj9AWwNMpLAsMeQDmJPNYg7dA1yOKPIPR0uGbSOVTs+0YdFzcACc+oxMWmvE9A7sKtmTpjxJZ3qc7XY3fMJHc7CAfnTS7q9HXyT5evHM/xk8XwIDAQAB'
        let Encrypt = new jse();
        Encrypt.setPublicKey(jseKey);
        let cert = params.cert ? params.cert : false
        let clientAuth = params.clientAuth ? params.clientAuth : false
        if (cert) delete params.cert;
        if (clientAuth) delete params.clientAuth;
        let enParams = {...params}
        params = Encrypt.encrypt(JSON.stringify(enParams));
          if (!params) {
            params = Encrypt.encryptLong(encodeURIComponent(JSON.stringify(enParams)))
            Encrypt.setPrivateKey('MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALC88tefHyjuS7iIwP5e2yedcbD4jH5syVsVLK5Akg+i+jgsptstE8B67tJbQqYmP0BbA0yksCwx5AOYk81iDt0DXI4o8g9HS4ZtI5VOz7Rh0XNwAJz6jExaa8T0Duwq2ZOmPElnepztdjd8wkdzsIB+dNLur0dfJPl68cz/GTxfAgMBAAECgYAnfG99AQ4DJQpB1jvYGPU5qpFmCoHJFSD/eoGbBM4dNDpXJpK40R9il5SX5s/DMzRaensIOpsppJPewc3zyv6qvwnY0FfZdlYZkB8sfaX6iH0lSe1/lGQx0QnZWPDF6ixTr+N756chmgn9MvlfjL+mfES8kIUv3aYMKaw4+txEEQJBAOGMOJPKvzYSPtgml//9Pn59JdDIBIA5hz3yLi/vD1qk4VbXK8D0VUbepTMwXW8leETq9fR/xZs/YmsOLMgVloUCQQDIma6bioUlMrUY+qu/ldui7I6trxxGFdE5OXN4PfR4U8kSCnKaRISvKpb9v+NETbY5+MRNjaswBOPAZn/Q0PaTAkAMkYfFlJK7LKEb4mqt9Sq6Wbb1v2+gxZPnu8sfGK8+WdnEwRDLG9J0tIt4IsXSH8Bn9r/l9AjK8elGFfAg5jMRAkEAmzd/Cc93Er9XrYpY1peIKVrNU8sJH5nGGHdBx6p4vZpnHNSEtKWL3VYhGxsdKT7QX68Dhda2vSMrbzZgdB0cjQJBAI5GFjF6VIz0sx18soq1s4H7H0eJaESCqO5mnGcil2ftYaoGfSaksI0xU8t4FjPo3GX4TiJYJLNLA6+8+xM7YHs=')
          }
          params = {
            sdkEncrypt: params
          }
          // if (enParams.manner === 2) {
          //   params = { ukEncrypt: params }
          // } else {
          //   params = { encrypt: params }
          // }
          if (cert) params.cert = cert;
          if (clientAuth) params.clientAuth = clientAuth;
      }
      if (method === 'POST') {
        xhr.open(method, url, isSync)
        xhr.setRequestHeader('Content-Type', 'application/json')
      } else if (method === 'GET') {
        let str = '';
        for(let key in params){
          str += key+'='+params[key]+'&';
        }
        if (params !== '') {
          url = `${url}?${str.replace(/&$/,'')}`
        }
        xhr.open(method, url, isSync)
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status < 400) {
            if (!isJse) {
              let res = JSON.parse(xhr.response)
              let decrypt = new jse()
              decrypt.setPrivateKey('MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKnU80xQiWYG7Js9xNDFg20itb5hrlBFtDilRHyhFuRtsiCDNzflpULFGtMeHBfkLmyemTb9SM0xgWGh43JqUYdonU0FlcE9KpbxQAVJAJ0RmxqcxhDh/iVnNmeeYs2VMO1xwV48ivEsHevw/l+KcOakA5N9hQQx1ZtV27IVrfKfAgMBAAECgYAOkEhc3vspWKapmV5rWMSwcy2Kqe28zH1r7iA1X8sKw61mxFnT3UmStDxcplRaaCLjBaa15Hp9viUOLkfG4/8hrV7VmxBqfUJv7L20G7pXnd3NYZLRN1lhZdap09I5L8JAU4+ghlFpZZdqeIXt+pNHfNV5iNBlUTTGbqT2cx0wQQJBAPEuiF9L+rq4dz1aQWNjo1lWwEu64c+FBfUoLKGs/MZbLMuUkGBRzuwnmwLia9ETe6cCdw21R82HW/hclL9nHfkCQQC0RC2yOMJsuJVyC/1osK8BcwgrgAiHJi9VQ6HSElSilZysAftSwFgL0GoTzsPH4lWqPSGd0l82HLQvm6vRpZtXAkAwek71ALusDmoBTgP4q01pJrPORQkggjd5WJLoCHJimG7/mKQQiEEUXL2erc5IHydqoWc2vSpqmHuXB1zqwBpZAkEAgXfaDf9f/C/R/bgIx5DmEDdq7bsl5NMS+bz6UuMhcCfd/1fpBjTox4tnNFSzHjM7bWo8Y5o9EaMp8mtuysKTPwJAG6fo0CkeAMCrjSBBAsSbhiKIbWKJU/TM7tDobVWQ8wnwU+0WfcIgukxP5F7P65L/MSxfeBpGmFedOhNzlR+ltQ==');
              let decryptMsg = decrypt.decrypt(res.key);
              const cryKey = CryptoJS.enc.Utf8.parse(decryptMsg);
              resolve(JSON.parse(Decrypt(res.data, cryKey)))
            }
            try {
              if (method === 'GET' && params === '') {
                resolve(xhr.response)
              } else {
                resolve(xhr.response);
              }
            } catch (e) { return }
          } else if (xhr.status >= 400) {
            try {
              resolve(JSON.parse(xhr.response));
             } catch (e) { return }
          }
        }
      }
      xhr.send(JSON.stringify(params));
    })
    return promise;
  }
  
  function Decrypt(word, key) {
    let decrypt = CryptoJS.AES.decrypt(word, key, { mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
  
  function proxy(obj, source, key) {
    Object.defineProperty(obj, key, {
      enumerable: false,
      get() {
        return obj[source][key]
      },
      set(value) {
        obj[source][key] = value;
      }
    })
  }
  
  var SDK = {
    version: '1.5.2',
    _w: {
      getLoginInfo(params) {
        return _f().Info(params)
      },
      getTaxInfo(params) {
        return _f().TaxInfo(params)
      },
      getBsr(params) {
        return _f().Bsr(params)
      },
      sendCAPTCHA(params) {
        return _f().CAPTCHA(params)
      },
      getAuthStatus(params) {
        return _f().Status(params)
      },
      authLogin(params) {
        return _f().Login(params)
      },
      authPoll(params) {
        return _f().Poll(params)
      },
      uKeyLogin(params) {
       return parseUKeyInfo(params)
      }
    },
  }
  
  var proxyObj = SDK._w
  
  for (let key in proxyObj) {
    proxy(SDK, '_w', key)
  }
  
  function _f() {
    const t  = 'POST'
    // const l = 'https://ai0a.com/wuneng-user-web/core/authorization/'
    // const l = 'http://bbl:9008/core/authorization/'
    const l = 'https://api-test.wfq2020.com/wuneng-user-web/core/authorization/'
    return {
      Info(params) {
        // return _r(t, 'https://ai0a.com/wuneng-platform-web/platform/channeldigitalV/getWebAuthorizeInfoScript', params, false)
        // return _r(t, 'http://bbl:9007/platform/channeldigitalV/getWebAuthorizeInfoV', params, false)
        return _r(t, 'https://api-test.wfq2020.com/wuneng-platform-web/platform/channeldigitalV/getWebAuthorizeInfoV', params, false)
      },
      TaxInfo(params) {
        return _r('GET', `${l}getBasicMsg`, params, false)
      },
      Bsr(params) {
        return _r(t, `${l}getIdentityInfo`, params, false)
      },
      CAPTCHA(params) {
        return _r(t, `${l}sendVerificationCode`, params, false)
      },
      Status(params) {
        return _r(t, `${l}authorizeCheck`, params, false)
      },
      Login(params) {
        return _r(t, `${l}authorizeLogin`, params, false)
      },
      Poll(params) {
        return _r('GET', `${l}authorizationResults`, params, false)
      }
    }
  }

  function _ukeyR(method) {
    return (url, params) => {
      const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        const requestUrl = `https://127.0.0.1:28000/api/${url}`
        xhr.open(method, requestUrl, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('成功')
              resolve(xhr.response)
            } else {
              console.log('err')
              reject({code: 500, message: '未检测到数字证书, 请确认下载插件并插入数字证书后重试'})
            }
          }
        }
        let str = ''; 
        for(let key in params){ // 序列化
          str += key+'='+params[key]+'&';
        }
        xhr.send(str)
      })
      return promise
    }
  }
  let uKeyLoginParams = {
    manner: 2,
    taxSiteUsername: "Default",
    version: "3.3.1.0430",
  }
  function parseUKeyInfo(params) {
    let key = ['webAuthorizeChannelCode', 'enumtaxSite', 'taxpayerId', 'taxSitePwd', 'taxNo'];
    let errorKey
    const isPass = key.some(key => {
      if (!params[key]) {
        errorKey = key
        return true
      }
    })
    if(isPass) return Promise.reject({code: 500, message: `缺少必要参数${errorKey}`})
    if(params.enumtaxSite !== '湖北') return Promise.reject({code: 500, message: `不支持当前省份`})
    uKeyLoginParams = {
      ...params,
      ...uKeyLoginParams,
    }
    const deviceParams = {
      strProvider: '',
      strContainer: '',
      dwProvType: 1,
      crosFlag: 1,
      authType: 1,
    }
    const clientParams = {
      crosFlag: 1,
      strProvider: '',
      strContainer: '',
      dwProvType: 1,
    }
    const certParams = {
      dwCertNum: 1,
      crosFlag: 1,
      strProvider: '',
      strContainer: '',
      dwProvType: 1,
      dwFlag: ''
    }
    const getUkeyInfo = _ukeyR('POST')
    const getDevice = [getUkeyInfo('getDeviceNum',deviceParams), getUkeyInfo('clientHello',deviceParams)]
    return handlePromiseAll(getDevice).then((res) => {
      if (res[0].includes('未插USBKEY')) {
        return Promise.reject({code: 500, message: '未检测到数字证书, 请确认下载插件并插入数字证书后重试'})
      }
      // 1. 保存ukey授权参数
      const deviceNum = indexSub(res[0], 'deviceNum')
      const clientHello = indexSub(res[1], 'clientHello')
      uKeyLoginParams.deviceNum = deviceNum
      // 2. 获取hellostr后 获取clientAuth 和 readCert
      return getApprove(deviceNum, clientHello, params).then(res => {
        clientParams.serverHello = res.data.serverHello1
        const getAuthAndCert = [
          getUkeyInfo('clientAuth',{...clientParams, password: params.taxSitePwd}), 
          getUkeyInfo('readCert',certParams)
        ]
        return handlePromiseAll(getAuthAndCert).then(res => {
          uKeyLoginParams.clientAuth = indexSub(res[0], 'clientAuth')
          uKeyLoginParams.cert = indexSub(res[1], 'cert')
          return uKeyAuthLogin(uKeyLoginParams, true)
        })
      })
    })
  }

  function handlePromiseAll(requestArr) {
    return Promise.all(requestArr)
  }

  function indexSub(str, key) { // 处理结果获取设备号
    let bIndex = str.indexOf('{')
    let aIndex = str.indexOf('}') + 1
    return key = JSON.parse(str.substring(bIndex, aIndex))[key]
  }

  function getApprove(deviceNum, clientHello, params) {
    let { taxNo, taxpayerId, webAuthorizeChannelCode} = params
    let approveParams = {
      bureau: "HUBEI",
      deviceNum,
      helloStr: clientHello,
      taxNo,
      taxpayerId,
      webAuthorizeChannelCode,
    }
    // return _r('POST', `https://ai0a.com/wuneng-user-web/core/authorization/approve`, approveParams, false)
    return _r('POST', `https://api-test.wfq2020.com/wuneng-user-web/web/authorize/approve`, approveParams, false)
    // return _r('POST', `http://bbl:9008/core/authorization/approve`, approveParams, false)
  }

  function uKeyAuthLogin(params) {
    // return _r('POST', `http://bbl:9008/web/authorize/authorizeLogin`, params, false)
    // return _r('POST', `https://ai0a.com/wuneng-user-web//web/authorize/authorizeLogin`, params, false)
    // return _r('POST', `https://api-test.wfq2020.com.com/wuneng-user-web//web/authorize/authorizeLogin`, params, false)
    return _r('POST', `https://api-test.wfq2020.com/wuneng-user-web/web/authorize/authorizeLogin`, params, false).then(res => {
      if (res.result === '01') {
        let { data } = res
        let newData = {}
        Object.keys(data).forEach(key => {
          newData[filterKey(key)] = data[key]
        })
        res.data = newData
        return Promise.resolve(res)
      } else {
        return Promise.resolve(res)
      }
    })
  }

  function filterKey(key) {
    return key.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
  }

  window.__proto__._wf = SDK