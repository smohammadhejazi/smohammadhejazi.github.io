---
title: "News"
layout: single
permalink: /news/
---

<ul class="news-list">
  {% assign all_news = site.data.news | sort: "date" | reverse %}
  {% for item in all_news %}
    <li>
      <span class="news-date">{{ item.date | date: "[%Y/%m/%d]" }}</span>
      {{ item.text }}
    </li>
  {% endfor %}
</ul>