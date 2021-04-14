import JSEncrypt from 'jsencrypt/bin/jsencrypt'

const PUBLIC_KEY =
	'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIUgR9/zBvzksH5H6bCGKlyX5iDgxgBhuvDv1r5DZ5qdPoA4jFPumtDcmm0tJlfnWCDRCYWFx8jAktJ9ANrWPotH6MD5N7Nmi5RXb0k6VXp/4an4sVDY4yLbvMaKdeMpiCFLvigrYuH5qF7vCdgBLNmlWA/3hAg3icnt2FQHP3vwIDAQAB'

const encryptor = new JSEncrypt() // 新建JSEncrypt对象
encryptor.setPublicKey(PUBLIC_KEY)

export function encrypt(arg) {
  const rsaContent = encryptor.encrypt(arg)
  return rsaContent
}
export function decrypt(arg) {
  const rsaContent = encryptor.decrypt(arg)
  return rsaContent
}
