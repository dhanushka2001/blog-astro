import type { MarkdownInstance } from 'astro';
import type { IFrontmatter } from 'astro-boilerplate-components';

import { CustomBlogCard } from './CustomBlogCard';

type IRecentPostsProps = {
  postList: MarkdownInstance<IFrontmatter>[];
};

const CustomBlogGallery = ({ postList }: IRecentPostsProps) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {postList.map((post) => (
      <CustomBlogCard key={post.url} instance={post} />
    ))}
  </div>
);

export { CustomBlogGallery };
