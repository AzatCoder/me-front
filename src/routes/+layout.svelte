<script lang='ts'>
  import { onMount } from 'svelte';

  let loading = true;

  onMount(() => loading = false);
</script>

{#if loading}
  <div class='page-loading'>
    <span>Loading...</span>
  </div>
{/if}
<div class:main-loading={loading}>
  <slot />
</div>

<style lang='scss'>
  .page-loading {
    position: absolute;
    color: white;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-loading {
    visibility: hidden;
  }
</style>
