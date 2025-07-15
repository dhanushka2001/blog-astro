import type { MarkdownInstance } from 'astro';
import { format } from 'date-fns';

import type { CustomIFrontMatter } from '@/partials/BlogPost';

type IBlogCardProps = {
  instance: MarkdownInstance<CustomIFrontMatter>;
};

const CustomBlogCard = (props: IBlogCardProps) => {
  const { instance } = props;
  const { data, url } = instance;

  // fallback reading time text
  const readingTimeText = data.minutesRead
    ? `${data.minutesRead} min read`
    : '—';

  return (
    <a
      href={url}
      className="block hover:translate-y-1" // block makes whole card clickable
      target="_blank" // temporarily to test
      rel="noopener noreferrer"
    >
      <div className="overflow-hidden rounded-md bg-slate-800">
        <div className="aspect-h-2 aspect-w-3">
          <img
            className="size-full object-cover object-center"
            src={data.imgSrc}
            alt={data.imgAlt}
            loading="lazy"
          />
        </div>

        <div className="px-3 pb-6 pt-4 text-center">
          <h2 className="text-xl font-semibold">{data.title}</h2>

          <div className="mt-1 text-xs text-gray-400">
            {format(new Date(data.pubDate), 'LLL d, yyyy')}
            {' · '}
            {readingTimeText}
          </div>

          <div className="mt-2 text-sm">{data.description}</div>
        </div>
      </div>
    </a>
  );
};

export { CustomBlogCard };
