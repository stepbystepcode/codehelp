<template>
  <div v-html="content"></div>
</template>

<script>
import { marked } from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

export default {
  name: 'Markdown',
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  computed: {
    content() {
      const renderer = new marked.Renderer()
      renderer.code = (code, language) => {
        const validLang = hljs.getLanguage(language) ? language : 'plaintext'
        return `<pre class="hljs" ><code class="hljs ${validLang}">${hljs.highlight(validLang, code).value}</code></pre>`
      }
      marked.setOptions({
        renderer,
        highlight: code => hljs.highlightAuto(code).value
      })
      return marked(this.markdown)
    }
  }
}
</script>

<style>
</style>
