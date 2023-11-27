<script lang='ts'>
  import { draggable } from '$lib';
  import { onMount } from 'svelte';

  export let img: string;
  export let name: string;
  export let onExit: () => void | undefined;
  export let onFocus: () => void | undefined;
  export let isMain: boolean | undefined;

  let draggableElement: HTMLElement;
  let draggableBy: HTMLElement;

  onMount(() => {
    draggable(draggableElement, draggableBy);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={draggableElement}
  class='window'
  on:mousedown={onFocus}
>
  <div
    bind:this={draggableBy}
    class='window_header'
    class:window_header-active={isMain}
  >
    <img class='window_img' src={img} alt={name}>
    <span style='color: white;'>{name}</span>
    <button on:click={onExit} class='window_close'>x</button>
  </div>
  <slot />
</div>

<!-- svelte-ignore css-unused-selector -->
<style lang='scss' scoped>
  @import '$src/app.scss';

  .window {
    @include border(2px);
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 2px;
    transform: translate(-50%,-50%);
    background: $main-color;
  }

  .window_header {
    padding: 2px 5px;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    background: gray;
  }

  .window_header-active {
    background: linear-gradient(90deg, rgba(12,0,221,1) 0%, rgba(0,212,255,1) 100%);
  }

  .window_img {
    width: 15px;
    padding-right: 5px;
  }

  .window_close {
    @include border(1px);
    margin-left: auto;
    color: black;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: bold;
    padding: 0 5px;
    background: #bdbdbd;
    cursor: pointer;
  }

  .window_close:active {
    @include active-border(1px);
  }
</style>