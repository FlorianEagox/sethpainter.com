---
title: So you wanna write a tech blog?
---

Well, here we are, issue (article? Page? (I still don't know what to call these things)) number one! The easy part of setting this place up is done. Now I've got a fully functioning CMS enviorment for writting. Now it's time to swallow that icky pit of fear and insecurity deep in my stomach and get to cranking out some bangers!Here I'm gonna share all my biggest ideas, things I want to teach, or just personal stories and self-reflections I think are interesting. The topics will most likely be centered around programming, technology, blindness / visual imparement, myself and life experiences, and anything else I have a lot to say about.

I really enjoy writting, and some of the things on here will be very me-centric, and thus will be put into the "personal" category. Others will be more objective or focused on specific topics completely outside of me, however, everything should be considered opinion, and I am not an expert (yet, anyway).

Just like many things in my life, I'm sure I'll look back on much of the content written here and cringe at my utter lack of acumen and humility. However, I feel like I've come a long way in many regaurds and I've got a head full of thoughts I'd like to share on a variety of topics. I'm going to think about some of these writtings like a bucket for a mental leak. Meaning, the thought pipes are flowwing with brain juice, and I desperately need to crack them open. Some of these articles will be like buckets, where I'll tip my skull and let all the juice flow out as quickly as psosible so I won't forget.

## The inner workings of this site
This site runs on Nuxt JS, and this blog uses the new (as of 2020 anyway) Nuxt Content module. Each article is written to a markdown file with some metadata at the top. All querying is handled by Nuxt Content or JS array methods, and it takes very little code to add new content and features to the blog.
Everything is done on a VPS server. I run the nuxt dev server, and then build the entire site staticaly and deploy it with apache. There is a single, small backend node server to handle simple services like the mailing list. The entire site is on github.
