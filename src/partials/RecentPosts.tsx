import type { MarkdownInstance } from 'astro';
import type { IFrontmatter } from 'astro-boilerplate-components';
import {
  // BlogGallery,
  GradientText,
  Section,
} from 'astro-boilerplate-components';

import { CustomBlogGallery } from './CustomBlogGallery';

type IRecentPostsProps = {
  postList: MarkdownInstance<IFrontmatter>[];
};

const RecentPosts = (props: IRecentPostsProps) => (
  <Section
    title={
      <div className="flex items-baseline justify-between">
        <div>
          Recent <GradientText>Posts</GradientText>
        </div>

        <div className="text-sm">
          <a href="/posts">View all Posts →</a>
        </div>
      </div>
    }
  >
    <CustomBlogGallery postList={props.postList} />
  </Section>
);

export { RecentPosts };
