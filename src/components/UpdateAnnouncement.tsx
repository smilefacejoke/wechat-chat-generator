import { useState } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { BookOpen, Megaphone, MousePointerClick, Search, ShieldCheck, X } from 'lucide-react'
import { Button } from './ui/button'
import './UpdateAnnouncement.css'

const announcementId = 'welcome-v1'
const readKey = 'wechat-dialog-generator:announcement-read'

export function UpdateAnnouncement({ blocked = false, onOpenGuide }: { blocked?: boolean; onOpenGuide?: () => void }) {
  const [unread, setUnread] = useState(() => {
    try { return localStorage.getItem(readKey) !== announcementId }
    catch { return true }
  })
  const [open, setOpen] = useState(unread)
  function changeOpen(next: boolean) {
    setOpen(next)
    if (!next) {
      setUnread(false)
      try { localStorage.setItem(readKey, announcementId) } catch { /* Keep the dismissal for this page even if storage is unavailable. */ }
    }
  }

  return <Dialog.Root open={open && !blocked} onOpenChange={changeOpen}>
    <Dialog.Trigger disabled={blocked} render={<Button variant="outline" className="announcement-trigger" aria-label="更新公告" title="更新公告" />}>
      <Megaphone size={16} /><span>公告</span>{unread && <i aria-label="未读公告" />}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Backdrop className="announcement-backdrop" />
      <Dialog.Popup className="announcement-dialog">
        <div className="announcement-topline"><span><Megaphone size={15} /> 更新公告</span><time dateTime="2026-11-05">2026.11.05</time><Dialog.Close render={<Button variant="ghost" size="icon" aria-label="关闭更新公告" />}><X size={18} /></Dialog.Close></div>
        <Dialog.Title className="announcement-title">欢迎使用微信聊天生成器</Dialog.Title>
        <Dialog.Description className="announcement-description">免登录即可使用全部功能，编辑、预览与导出都在本地完成。</Dialog.Description>
        <div className="announcement-body">
          <section><MousePointerClick size={18} /><div><h3>七个创作工作页</h3><p>聊天生成器、批量聊天图、朋友圈、支付与转账、红包详情、个人资料和群信息，各有独立编辑与预览区。</p></div></section>
          <section><Search size={18} /><div><h3>导入、手动添加或 AI 生成</h3><p>粘贴聊天文本一键解析，也可逐条添加消息；还可以把模板 Prompt 复制给 AI，再导入返回的文本。</p></div></section>
          <section><ShieldCheck size={18} /><div><h3>本地处理，无需登录</h3><p>聊天内容、头像与生成图片都在浏览器本地处理，导出次数不受限制，草稿保存在当前浏览器。</p></div></section>
          <section><BookOpen size={18} /><div><h3>完整功能教程</h3><p>教程可从左侧【模板与指南】查找，工作页顶部【使用教程】直达对应功能。</p></div></section>
        </div>
        <footer className="announcement-footer"><p>关闭后不再自动弹出，可从顶部“公告”重新查看。</p>{onOpenGuide && <Dialog.Close render={<Button variant="outline" onClick={onOpenGuide} />}>查看完整教程</Dialog.Close>}<Dialog.Close render={<Button />}>我知道了</Dialog.Close></footer>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>
}
