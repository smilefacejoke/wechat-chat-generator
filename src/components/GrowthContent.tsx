import { Button } from './ui/button';
import { ArrowUpRight, LayoutTemplate, MousePointerClick } from 'lucide-react';

const templates = [
  {
    id: 'daily-story',
    label: '日常剧情',
    title: '周末碰面',
    description: '适合生活记录、段子和短视频剧情。',
    content: `**【8月12日 上午10:20】**
**我**：周末有空吗？新开的展览看起来不错
**小林**：有空，周六下午怎么样
**我**：可以，我把地址发你
**小林**：[语音]4
**我**：那就两点在门口见`,
  },
  {
    id: 'team-chat',
    label: '多人群聊',
    title: '项目讨论',
    description: '适合产品原型、教学演示和团队场景。',
    content: `**【8月12日 下午14:00】**
**小明**：新版演示链接已经更新，大家帮忙看一下
**小周**：移动端我来检查
**小李**：我负责核对文案和数据
**小明**：[图片]
**小周**：首页在小屏幕上也正常
**小李**：数据更新时间已经补上了
**小明**：收到，晚点统一发布`,
  },
  {
    id: 'creator-script',
    label: '创作脚本',
    title: '反转对话',
    description: '快速搭建短视频分镜和故事对白。',
    content: `**【8月12日 晚上20:31】**
**阿哲**：你到楼下了吗
**我**：到了，但是没看到你
**阿哲**：我穿着蓝色外套
**我**：这里有三个人都穿蓝色外套
**阿哲**：那你看谁手里拿着蛋糕
**我**：原来今天是给我过生日？`,
  },
];

interface GrowthContentProps {
  onUseTemplate: (content: string, templateId: string) => void;
  onOpenEditor?: () => void;
}

export function GrowthContent({ onUseTemplate, onOpenEditor }: GrowthContentProps) {
  return (
    <section className="growth-content" aria-label="微信聊天截图制作指南">
      <div className="growth-section" id="templates">
        <div className="growth-heading">
          <div>
            <span className="growth-eyebrow"><LayoutTemplate size={14} /> 对话模板</span>
            <h2>从一个好用的示例开始</h2>
            <p>选择模板后仍可自由修改人物、消息、头像和手机状态。</p>
          </div>
          <a className="text-link" href="?tool=chat" onClick={event => { if (onOpenEditor && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onOpenEditor(); } }}>自己输入内容 <ArrowUpRight size={15} /></a>
        </div>
        <div className="template-grid">
          {templates.map((template) => (
            <article className="template-card" key={template.id}>
              <span>{template.label}</span>
              <h3>{template.title}</h3>
              <p>{template.description}</p>
              <Button variant="outline" onClick={() => onUseTemplate(template.content, template.id)}>
                使用这个模板 <MousePointerClick size={15} />
              </Button>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}
