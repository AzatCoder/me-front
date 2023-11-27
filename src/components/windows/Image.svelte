<script lang='ts'>
  import type { ComponentProps } from 'svelte';
  import Window from './Window.svelte';

  export let window: ComponentProps<Window>;
  export let img: string;
</script>

<Window {...window}>
  <div class='image-window'>
    <img class='image_img' src={img} alt={window.name} />
  </div>
</Window>

<style lang='scss'>
  .image-window:empty {
    width: 100px;
    height: 100px;
  }

  .image_img {
    max-width: 80vw;
    max-height: 80vh;
    display: block;
    pointer-events: none;
  }
</style>