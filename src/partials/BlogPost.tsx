import type { IFrontmatter } from 'astro-boilerplate-components';
import { ColorTags, Section, Tags } from 'astro-boilerplate-components';
import type { ReactNode } from 'react';

import { authors as AuthorMap } from '@/utils/authors';

export interface CustomIFrontMatter extends IFrontmatter {
  tags: string[];
  projects?: any[];
  // minutesRead?: number;
}

type BlogPostProps = {
  frontmatter: CustomIFrontMatter;
  children: ReactNode;
  readingTimeText: string;
};

export default function BlogPost(props: BlogPostProps) {
  const { frontmatter, children, readingTimeText } = props;

  return (
    <Section key={frontmatter.title}>
      <div>
        <h1 className="text-center text-3xl font-bold">{frontmatter.title}</h1>
        <div className="text-center text-sm text-gray-400">
          <div className="mt-1">
            Published:{' '}
            {new Date(frontmatter.pubDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
            {frontmatter.updateDate && (
              <>
                {' '}
                · Updated:{' '}
                {new Date(frontmatter.updateDate).toLocaleDateString(
                  undefined,
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }
                )}
              </>
            )}
            {' · '}
            <span>{readingTimeText}</span>
          </div>
          {/* Author avatars */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            {frontmatter.authors?.map((name, idx) => {
              const author = AuthorMap[name] || {
                name,
                avatar: '/assets/images/avatars/default.jpg',
              };

              return (
                <div key={idx} className="flex items-center space-x-2">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="size-6 rounded-full object-cover"
                    loading="lazy"
                  />
                  {author.url ? (
                    <a
                      href={author.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {author.name}
                    </a>
                  ) : (
                    <span>{author.name}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        <div className="flex place-content-center space-x-2 pt-2">
          {frontmatter?.tags?.map((tag) => {
            let color: ColorTags;
            if (['python', 'strapi'].includes(tag)) color = ColorTags.GREEN;
            else if (['dash', 'plotly'].includes(tag)) color = ColorTags.BLUE;
            else if (tag === 'vuepress') color = ColorTags.FUCHSIA;
            else if (tag === 'openapi') color = ColorTags.LIME;
            else if (['flutter', 'remotion', 'dart'].includes(tag))
              color = ColorTags.SKY;
            else if (['golang'].includes(tag)) color = ColorTags.ORANGE;
            else if (['javascript', 'strapi'].includes(tag))
              color = ColorTags.EMERALD;
            else if (['git', 'docker'].includes(tag)) color = ColorTags.ZINC;
            else if (['react', 'nextjs', 'astro', 'alfred'].includes(tag))
              color = ColorTags.RED;
            else color = ColorTags.CYAN;

            return (
              <span key={tag}>
                <Tags color={color}>
                  <a href={`/tags/${tag}`} style={{ paddingRight: '3px' }}>
                    <category>{tag}</category>
                  </a>
                </Tags>
              </span>
            );
          })}
        </div>

        {/* Blog content */}
        <div className="mx-auto mt-5 max-w-prose">
          <div className="aspect-h-2 aspect-w-3">
            <img
              className="size-full rounded-lg object-cover object-center"
              src={frontmatter.imgSrc}
              alt={frontmatter.imgAlt}
              loading="lazy"
            />
          </div>

          <div className="prose prose-invert mt-6 prose-img:rounded-lg">
            <content>{children}</content>
          </div>
        </div>
      </div>
    </Section>
  );
}
