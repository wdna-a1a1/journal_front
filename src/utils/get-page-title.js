import defaultSettings from '@/settings'

const title = defaultSettings.title || '上实瑞慈颐养中心 by Hwwwww'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
