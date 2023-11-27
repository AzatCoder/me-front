<script lang='ts'>
  import type { ComponentProps } from 'svelte';
  import type { TFilesStorage } from '$types';
  import File from '../File.svelte';
  import Window from './Window.svelte';

  export let window: ComponentProps<Window>;
  export let files: () => Promise<TFilesStorage>;
  export let onOpen: (extName: string) => void;

  const fetchFiles = files();
</script>

<Window {...window}>
  <div class='folder-window'>
    {#await fetchFiles}
      <div class='folder-window_loading'>
        <span>
          Loading...
        </span>
      </div>
    {:then fetchedFiles}
      {#each Object.keys(fetchedFiles) as fileKey, idx (idx)}
      {@const file = fetchedFiles[fileKey]}
        <File
          name={file.name}
          img={file.img}
          onOpen={() => onOpen(fileKey)}
        />
      {/each}
    {/await}
  </div>
</Window>

<!-- svelte-ignore css-unused-selector -->
<style lang='scss'>
  @import '$src/app.scss';

  .folder-window {
    @include inner-window;
    height: 300px;
    width: 400px;
    display: grid;
    background: white;
  }

  @keyframes AnimateBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .folder-window_loading {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: background-loading 2s ease infinite;
    background-size: 200% 200%;
    background-image: linear-gradient(145deg, rgba(0,47,61,.4) 0%, rgba(9,99,121,.6) 45%, rgba(0,255,151,.4) 100%);
    animation: AnimateBG 2s ease infinite;
    color: white;
  }
</style>