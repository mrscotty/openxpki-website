---
layout: default
title: Welcome
---

<div class="list-module">
  <h2>Welcome to OpenXPKI</h2>
  <div class="list-body">
    <ul>
      {% for post in site.posts reversed %}
        {% if post.categories contains "frontpage" %}
        <li>
          <a href="{{ post.url }}" id="{{ cat }}">
            <h3>{{ post.title }}</h3>
            <p>{{ post.description }}</p>
          </a>
        </li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
</div>

<br>

<div class="bootcamp-help">
  <h1>OpenXPKI Bootcamp <span>New to Public Key Infrastructure and OpenXPKI? This will get you started.</span>
  </h1>
  <div class="bootcamp-body">
  <ul>
    <li class="concepts">
      <a href="/pki-concepts">
        <div class="image">&nbsp;</div>
        <div class="desc">
          <h2>PKI Concepts</h2>
        </div>
      </a>
    </li>
    <li class="features">
      <a href="/openxpki-features">
        <div class="image">&nbsp;</div>
        <div class="desc">
          <h2>OpenXPKI Features</h2>
        </div>
      </a>
    </li>
    <li class="installing-openxpki">
      <a href="/installing-openxpki">
        <div class="image">&nbsp;</div>
        <div class="desc">
          <h2>Installing OpenXPKI</h2>
        </div>
      </a>
    </li>
  </ul>
  </div> <!-- /bootcamp-body -->
</div>

<div class="list-module">
  <h2>Recent Articles</h2>
  <div class="list-body">
    <ul>
      {% for post in site.posts reversed limit:5 %}
        <li>
          <a href="{{ post.url }}" id="{{ cat }}">
            <h3>{{ post.title }}</h3>
            <p>{{ post.description }}</p>
          </a>
        </li>
      {% endfor %}
    </ul>
  </div>
</div>
