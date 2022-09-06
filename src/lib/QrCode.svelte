<script lang="ts">
  import QRCode from 'qrcode';

  const qr = new QRCode();

  export let value = "";
  let data: Promise<string>;

  $: if(value) { data = QRCode.toDataURL(value); }
</script>

{#await data then src}
  <img {src} alt={value} />  
{/await}
