export interface WikiContentViewProps {
  content: string;
}

const PROSE_CLASS =
  'prose max-w-none rounded-[10px] border border-gray-200 bg-white p-4 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pb-3 [&_h2]:border-b [&_h2]:border-gray-300 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#474D66] [&_h2:first-child]:mt-0 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:pb-2 [&_h3]:border-b [&_h3]:border-gray-200 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#474D66] [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[#474D66] [&_blockquote]:border-l-4 [&_blockquote]:border-gray-800 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-3 [&_blockquote]:text-gray-600 [&_blockquote]:min-h-[1em] [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-0.5 [&_.video-wrapper]:relative [&_.video-wrapper]:h-0 [&_.video-wrapper]:overflow-hidden [&_.video-wrapper]:pb-[56.25%] [&_iframe]:absolute [&_iframe]:left-0 [&_iframe]:top-0 [&_iframe]:h-full [&_iframe]:w-full';

export function WikiContentView({ content }: WikiContentViewProps) {
  return <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: content ?? '' }} />;
}
