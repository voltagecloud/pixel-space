<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  const { purchase } = data;
</script>

<pre>{JSON.stringify(purchase, null, 2)}</pre>