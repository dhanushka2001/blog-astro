import Giscus from '@giscus/react';
import type { IFrontmatter } from 'astro-boilerplate-components';
import { ColorTags, Section, Tags } from 'astro-boilerplate-components';
import type { ReactNode } from 'react';

import { authors as AuthorMap } from '@/utils/authors';

export interface CustomIFrontMatter extends IFrontmatter {
  tags: string[];
  projects?: any[];
}
type IBlogPostProps = {
  frontmatter: CustomIFrontMatter;
  children: ReactNode;
};

const BlogPost = (props: IBlogPostProps) => (
  <Section key={props.frontmatter.title}>
    <div>
      <h1 className="text-center text-3xl font-bold">
        {props.frontmatter.title}
      </h1>
      <div className="text-center text-sm text-gray-400">
        <div className="mt-1">
          Published:{' '}
          {new Date(props.frontmatter.pubDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
          {props.frontmatter.updateDate && (
            <>
              {' '}
              · Updated:{' '}
              {new Date(props.frontmatter.updateDate).toLocaleDateString(
                undefined,
                {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }
              )}
            </>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          {props.frontmatter.authors?.map((name, idx) => {
            const author = AuthorMap[name] || {
              name,
              avatar: '/assets/images/avatars/default.jpg',
            };

            return (
              <div key={idx} className="flex items-center space-x-2">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-6 w-6 rounded-full object-cover"
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
      <div className="flex place-content-center pt-2">
        {props?.frontmatter?.tags?.map((tag) => {
          let color;
          if (['python', 'strapi'].includes(tag)) {
            color = ColorTags.GREEN;
          }
          if (['dash', 'plotly'].includes(tag)) {
            color = ColorTags.BLUE;
          }
          if (tag === 'vuepress') {
            color = ColorTags.FUCHSIA;
          }
          if (tag === 'openapi') {
            color = ColorTags.LIME;
          }
          if (['flutter', 'remotion', 'dart'].includes(tag)) {
            color = ColorTags.SKY;
          }
          if (['golang'].includes(tag)) {
            color = ColorTags.ORANGE;
          }
          if (['javascript', 'strapi'].includes(tag)) {
            color = ColorTags.EMERALD;
          }
          if (['git', 'docker'].includes(tag)) {
            color = ColorTags.ZINC;
          }
          if (['react', 'nextjs', 'astro', 'alfred'].includes(tag)) {
            color = ColorTags.RED;
          }
          if (!color) {
            color = ColorTags.CYAN;
          }
          return (
            <>
              <Tags color={color}>
                {' '}
                <a href={`/tags/${tag}`} style={{ paddingRight: '3px' }}>
                  {' '}
                  <category>{tag} </category>
                </a>
              </Tags>
              &nbsp;
            </>
          );
        })}
      </div>
      <div className="mx-auto mt-5 max-w-prose">
        <div className="aspect-h-2 aspect-w-3">
          <img
            className="h-full w-full rounded-lg object-cover object-center"
            src={props?.frontmatter.imgSrc}
            alt={props?.frontmatter.imgAlt}
            loading="lazy"
          />
        </div>

        <div className="prose prose-invert mt-6 prose-img:rounded-lg">
          <content>{props.children}</content>
        </div>
        <div id="comments">
          <Giscus
            id="comments"
            repo="dhanushka2001/blog-astro"
            repoId="R_kgDOPH5Kxw"
            category="General"
            categoryId="DIC_kwDOPH5Kx84Cso0r"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme="preferred_color_scheme"
            lang="en"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </Section>
);

export default BlogPost;
