# Personal blog

[![Deploy](https://github.com/dhanushka2001/blog-astro/actions/workflows/deploy.yml/badge.svg?label=Deploy)](https://github.com/dhanushka2001/blog-astro/actions)

In development

## 🚀 Live Site

This blog is built from **this** repository and deployed using the [`dhanushka2001/dhanushka2001.github.io`](https://github.com/dhanushka2001/dhanushka2001.github.io) repository to **GitHub Pages** @ [`dhanushka2001.github.io`](https://dhanushka2001.github.io)

## Inspirations:

- **David Li's blog ([Website](https://friendlyuser.github.io/) | [GitHub](https://github.com/FriendlyUser/astro-tech-blog)) (Tailwind Astro) (FORKED)**
- Nguyễn Tạ Minh Trung's blog ([Website](https://trungtmnguyen.com/) | [GitHub](https://github.com/trungntm/trungtmnguyen.com)) (Tailwind Next.js)
- Homing So's blog ([Website](https://homing.so/) | [GitHub](https://github.com/hominsu/blog)) (Tailwind Next.js)

## Updates

<details><summary>Adding author avatar and multiple authors to blogs</summary>

* David Li's blog displays the author name and publication date on the same line using this code inside ``src/partials/BlogPost.tsx``:

  ```tsx
  <div className="mt-2 text-center text-sm text-gray-400">
    By {AppConfig?.author} on {props?.frontmatter?.pubDate}
  ```
  
  ![image](https://github.com/user-attachments/assets/55b2f6a2-19f9-4fcb-96b0-1a694d5878d4)

* I wanted to display a small circular avatar next to the author's name, and allow for multiple authors. I also wanted to put the publication date on a separate line, and on the same line an updated date if the blog was updated later.

  To support multiple authors, I created a ``src/utils/authors.ts`` file:

  ```ts
  export const authors = {
    'David Li': {
      name: 'David Li',
      avatar: '/assets/images/avatars/david.png',
      url: 'https://davidli.com', // optional
    },
    'Dhanushka Jayagoda': {
      name: 'Dhanushka Jayagoda',
      avatar: '/assets/images/avatars/dhanushka.png',
      url: 'https://github.com/dhanushka2001', // optional
    },
    // Add more authors here
  };
  ```

  what the frontmatter of a ``.md`` blog now looks like:

  ```md
  ---
  title: How to use Rust's macros
  description: In this article, we will explore Rust's macros and build a program that demonstrates their usage.
  pubDate: Saturday, 27 December 2024 13:00:00 GMT
  updateDate: 2024-12-28
  tags: ["rust", "ffi"]
  layout: '@/templates/BasePost.astro'
  imgSrc: '/imgs/2023/117117315.png'
  authors: [David Li, Dhanushka Jayagoda]
  ---
  ```

  And updating ``BlogPost.tsx`` like so:
  
  ```tsx
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
  ```

  The result:

  ![image](https://github.com/user-attachments/assets/96b5c317-61b4-493a-90f7-7c820434235e)

</details>

<details><summary>Adding David Li as author to all .md blogs using a Python script</summary>

  To be added
  
</details>

<details><summary>Adding giscus github comments and reactions</summary>

  To be added

</details>
