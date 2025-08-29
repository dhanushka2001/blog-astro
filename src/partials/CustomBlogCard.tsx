import type { MarkdownInstance } from 'astro';
import type { IFrontmatter } from 'astro-boilerplate-components';

type IBlogCardProps = {
  instance: MarkdownInstance<IFrontmatter>;
};

const CustomBlogCard = ({ instance }: IBlogCardProps) => {
  const { title, description, pubDate, imgSrc } = instance.frontmatter;

  return (
    <a
      href={instance.url}
      className="flex flex-col self-start overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-transform duration-100 hover:translate-y-2 hover:shadow-lg dark:border-gray-900 dark:bg-slate-800"
    >
      {imgSrc && (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
          <img
            src={imgSrc}
            alt={title}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="mb-1 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <div className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">
          {new Date(pubDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <p className="text-center text-sm text-gray-700 dark:text-gray-200">
          {description}
        </p>
      </div>
    </a>
  );
};

export { CustomBlogCard };
