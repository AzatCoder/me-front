<script lang='ts'>
  import File from '$components/File.svelte';
  import Footer from '$components/Footer.svelte';
  import FooterFile from '$components/FooterFile.svelte';
  import { filesStore } from '$store/index';

  const { files, openExtensions, openExtensionsByVisibility, mainDirectoryExtensinos } = filesStore;
  let mainWindowKey: string;
  $: mainWindowKey = $openExtensionsByVisibility[$openExtensionsByVisibility.length - 1];
</script>

<svelte:head>
	<title>Azat</title>
	<meta name='description' content="Azat Nurmammedov's pet site" />
</svelte:head>

<div>
  <div class='home'>
    <!-- all files zone -->
    {#each mainDirectoryExtensinos as extensionKey (extensionKey)}
    {@const file = $files[extensionKey]}
      <File
        name={file.name}
        img={file.img}
        text={{
          style: 'color: white;'
        }}
        onOpen={() => filesStore.open(extensionKey)}
      />
    {/each}
  </div>
  <!-- open windows zone -->
  {#each $openExtensionsByVisibility as extensionKey (extensionKey)}
  {@const file = $files[extensionKey]}
    <svelte:component
      this={file.component}
      {...file.props}
      window={{
        img: file.img,
        name: file.name,
        isMain: extensionKey === mainWindowKey,
        onExit: () => filesStore.close(extensionKey),
        onFocus: () => filesStore.focus(extensionKey)
      }}
    />
  {/each}
  <Footer>
    <!-- footer open windows zone -->
    {#each $openExtensions as extensionKey (extensionKey)}
    {@const file = $files[extensionKey]}
      <FooterFile
        name={file.name}
        img={file.img}
        isMain={extensionKey === mainWindowKey}
        onClick={() => filesStore.focus(extensionKey)}
        onFocus={() => filesStore.focus(extensionKey)}
        onExit={() => filesStore.close(extensionKey)}
      />
    {/each}
  </Footer>
</div>

<style scoped>
  @import '../app.scss';

  .home {
    margin: 10px;
    display: grid;
    gap: 15px;
  }
</style>