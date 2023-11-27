<script lang='ts'>
  import { onMount, type ComponentProps } from 'svelte';
  import Window from './Window.svelte';

  export let onFinish: () => void;
  export let duration: number;
  export let window: ComponentProps<Window>;

  const progressLength = 10;
  let progress = 0;

  onMount(() => {
    const interval = setInterval(() => {
      if (progress === progressLength - 1) {
        onFinish();
        window.onExit();
        clearInterval(interval);
      }

      progress += 1;
    }, duration / progressLength);

    return () => clearInterval(interval);
  });
</script>

<Window {...window}>
  <div class='loading-window'>
    <div class='loading-window_progress-container'>
      {#each new Array(progress) as pr}
        <div class='loading-window_progress' />
      {/each}
    </div>
    <button on:click={window.onExit} class='loading-window_cancel'>Cancel</button>
  </div>
</Window>

<!-- svelte-ignore css-unused-selector -->
<style lang='scss' scoped>
  @import '$src/app.scss';

  .loading-window {
    @include inner-window;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-window_progress-container {
    width: 180px;
    display: flex;
    gap: 2px;
  }

  .loading-window_progress {
    width: 14px;
    height: 20px;
    background: blue;
  }

  .loading-window_cancel {
    font-size: 16px;
    background: $main-color;
    @include border(1px);
  }

  .loading-window_cancel:active {
    @include active-border(1px);
  }
</style>