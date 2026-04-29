import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    xmlns: { 
      media: 'http://search.yahoo.com/mrss/',
    },
    items: posts.map((post) => {
		
      const item = {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
      };
      
      if (post.data.heroImage) {
        const imageUrl = new URL(post.data.heroImage.src, context.site).href;
        item.customData = `<media:content url="${imageUrl}" medium="image" />`;
      }
      
      return item;
    }),
    customData: `<language>zh-TW</language>`,
  });
}
