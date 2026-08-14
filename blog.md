---
layout: default
permalink: /blog/
title: Blog
---
<div class="content-page">
  <div class="section-label">Archive</div>
  <h1><span data-lang="en">Notes & archive</span><span data-lang="ko">기록 · 아카이브</span></h1>
  <p class="lead"><span data-lang="en">Older notes on machine learning, networking, and related topics. These posts are preserved as an archive.</span><span data-lang="ko">머신러닝, 네트워크 등에 관해 과거에 작성한 글을 아카이브로 보존합니다.</span></p>
  <ul class="post-list-clean">
    {% for post in site.posts %}
      <li>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y.%m.%d" }}</time>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
    {% endfor %}
  </ul>
</div>
