/* 产引入jsencrypt实现数据RSA加密 */
import JSEncrypt from 'jsencrypt' // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 产引入encryptlong实现数据RSA加密 */
import Encrypt from 'encryptlong' // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEkh/gkEANgXmtP+vLsFkZckak9A7zWnUEEie7Ji3uAOmuMP0Bcqa/9dQWpHEOUDuxX/T+rwLinC6ZiMvKyOi360kopXRefu/Oz+39i70JCmQBQEvHpbqL7eifqxlsNgSGvYmTR5GfMOVpJNI57fLRI2aC8fmLXCFGMfdjxeHo3wIDAQAB'

export default {
  /* JSEncrypt加密 */
  rsaPublicData(data) {
    const jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(publicKey)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    return jsencrypt.encrypt(data)
  },
  /* 加密 */
  encrypt(data) {
    const PUBLIC_KEY = publicKey
    const encryptor = new Encrypt()
    encryptor.setPublicKey(PUBLIC_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    return encryptor.encryptLong(data)
  },

}
