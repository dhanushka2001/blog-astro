export function sortByDate(posts: { frontmatter: { pubDate: string } }[]) {
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter?.pubDate ?? 0).getTime();
    const dateB = new Date(b.frontmatter?.pubDate ?? 0).getTime();
    return dateB - dateA;
  });
}
