import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function GiscusComments() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('dark')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Set initial
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    return () => observer.disconnect();
  }, []);

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
      theme={theme} // <- dynamic
      lang="en"
      loading="lazy"
    />
  );
}
