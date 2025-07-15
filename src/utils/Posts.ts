import type { MarkdownInstance } from 'astro-boilerplate-components';

import type { CustomIFrontMatter } from '@/partials/BlogPost';

export const sortByDate = (posts: MarkdownInstance<CustomIFrontMatter>[]) => {
  return posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  );
};
