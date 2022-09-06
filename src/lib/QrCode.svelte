<script lang="ts">
  import { toDataURL } from 'qrcode';

  export let value = "";
  export let scale = 8;

  let data: Promise<string>;
  $: if(value) { data = toDataURL(value, { margin: 0, scale }); }
</script>

{#await data then src}
  <figure class="inline-flex flex-col my-4 border rounded shadow-md">
    <img {src} alt={value} class="p-4 border-b" />
    <figcaption class="p-4 max-w-fit text-xs text-justify">{value}</figcaption>
  </figure>
{/await}
