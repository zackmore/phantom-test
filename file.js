import phantom from 'phantom'

const url = 'https://h5.m.taobao.com/awp/core/detail.htm?id=524443517351'

async function requestDetail () {
  const instance = await phantom.create([], {

  })
  const page = await instance.createPage()

  // add already logined user cookie
  page.addCookie({
    'name': '_m_h5_tk',
    'value': 'fec3d9f4c52fb1d2fd0c045ff6e90c43_1502095237116',
    'domain': '.taobao.com'
  })

  await page.on('onResourceRequested', requestData => {
    if (requestData.url.indexOf('mtop.taobao.detail.getdetail') >= 0) {
      console.log('Request:')
      console.log(requestData.url)
    }
  })

  await page.on('onResourceReceived', responseData => {
    if (responseData.url.indexOf('mtop.taobao.detail.getdetail') >= 0) {
      console.log('Response:')
      console.log(JSON.stringify(responseData))
    }
  })

  await page.open(url)
  await instance.exit()
}

requestDetail()
