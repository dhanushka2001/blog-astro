import Giscus from '@giscus/react';

export default function GiscusComments() {
  return (
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
  );
}
