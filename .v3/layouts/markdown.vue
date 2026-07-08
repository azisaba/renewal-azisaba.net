<template>
  <div class="page">
    <Header />
    <div class="content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style>
.page {
  display: flex; /* 子クラスを横並びにする */
  flex-direction: column; /* 子クラスの横並びの方向を縦にする */
  min-height: 100vh; /* 全体の高さを最低でもビューポートの100%にする */
}

.content {
  flex: 1; /* flexに1つだけ数値を指定するとその要素は伸びる */
}

a {
  color: cornflowerblue;
}

/* Base styles for all markdown content */
.markdown-content {
  padding: 1rem;
  line-height: 1.6;
  font-family: Arial, sans-serif;
}

/* Heading Styles */
.markdown-content h1 {
  font-size: 2rem;
}

.markdown-content h2 {
  font-size: 1.75rem;
}

.markdown-content h3 {
  font-size: 1.5rem;
}

.markdown-content h4 {
  font-size: 1.25rem;
}

/* Ensure links within headings maintain a consistent color */
.markdown-content h1 a,
.markdown-content h2 a,
.markdown-content h3 a,
.markdown-content h4 a {
  color: #3e3e3e;
  text-decoration: none; /* Remove underline from links in headings */
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
  margin-bottom: 0.1rem;
  padding-top: 1rem;
}

/* Paragraph Styles */
.markdown-content p {
  margin-top: 0.55rem;
  margin-bottom: 0.55rem;
}

/* Link Styles */
.markdown-content a {
  text-decoration: none; /* Remove default underline */
}

.markdown-content a:hover {
  text-decoration: underline; /* Add underline on hover for better user experience */
}

/* List Styles */
.markdown-content ul {
  padding-left: 1.5rem;
  list-style-type: disc;
}

.markdown-content ol {
  padding-left: 1.5rem;
  list-style-type: decimal;
}

/* Table Styles */
.markdown-content table {
  border-collapse: collapse; /* Collapse borders for a cleaner look */
  width: 100%;
}

.markdown-content table th,
.markdown-content table td {
  border: 1px solid #ddd; /* Add a light border for clarity */
  padding: 0.5rem;
}

/* Image Styles */
.markdown-content img {
  display: block; /* Center images if desired, or prevent inline text wrapping */
  margin: 1rem 0; /* Add some vertical spacing around images */
  max-width: 100%; /* Ensure images don't overflow their container */
  height: auto; /* Maintain aspect ratio */
}

.markdown-content table th,
.markdown-content table td {
  border: 1px solid #a09f9f;
}

.markdown-content table th {
  background-color: #eeeded;
  color: black;
  font-weight: bold;
}

/* Dark Mode */
.dark-mode .markdown-content body {
  background-color: #3e3e3e;
  color: #ebf4f1;
}

/* 見出しのスタイル */
.dark-mode .markdown-content {
  & h1,
  h2,
  h3,
  h4 {
    & a {
      color: #edebeb;
    }
  }
}

/* テーブルのスタイル */
.dark-mode .markdown-content table th,
.dark-mode .markdown-content table td {
  border: 1px solid #ddd;
}

.dark-mode .markdown-content table th {
  background-color: #646464;
  color: rgb(255, 255, 255);
  font-weight: bold;
}

.markdown-element {
  padding-top: 5vh;
  padding-right: 20vh;
  padding-left: 20vh;
}

.markdown-element h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

@media (1100px > width) {
  .markdown-element {
    padding-top: 5vh;
    padding-right: 10vh;
    padding-left: 10vh;
  }
}

@media (850px > width) {
  .markdown-element {
    padding-top: 5vh;
    padding-right: 5vh;
    padding-left: 5vh;
  }
}

@media (750px > width) {
  .markdown-element {
    padding-top: 5vh;
    padding-right: 2vh;
    padding-left: 2vh;
  }
}
</style>
