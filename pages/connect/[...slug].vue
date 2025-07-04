<template>
  <main class="connect-content">
    <ContentDoc >
      <template #not-found>
        <PageNotFound message="page is not found."/>
      </template>
      <template #default="{ doc }">
        <article>
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc" class="markdown-content"/>
        </article>
      </template>
    </ContentDoc>
  </main>
</template>

<style scoped>
.connect-content {
  padding-top: 5vh;
  padding-left: 20vh;
  padding-right: 20vh;
}
</style>
