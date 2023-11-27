<script lang='ts'>
  export let isMain: boolean;
  export let img: string;
  export let name: string;
  export let onClick: () => void;
  export let onExit: () => void;
  export let onFocus: () => void;

  let isContextOpen = false;
  let contextX = 0;
  let contextY = 0;

  const openContextMenu = (e: any) => {
    isContextOpen = true;
    contextX = e.clientX;
    contextY = e.clientY - 38;
  }

  const click = () => {
    onClick();
    if (isContextOpen) isContextOpen = false;
  }

  const formattedName = (name.length > 20
    ? name.slice(0, 18) + '...'
    : name
  );
</script>

<div on:contextmenu|preventDefault={openContextMenu} role='none'>
  <button
    class='footer-file'
    class:footer-file_active={isMain}
    on:focusout={() => isContextOpen = false}
    on:click={click}
  >
    <img class="footer-file_img" src={img} alt={name} />
    <span>{formattedName}</span>
  </button>
  {#if isContextOpen}
    <div style={`top: ${contextY}px; left: ${contextX}px;`} class='footer-file_context'>
      <button class='footer-file_context-button' on:mousedown={onExit}>
        Exit
      </button>
      <button class='footer-file_context-button' on:mousedown={onFocus}>
        Focus
      </button>
    </div>
  {/if}
</div>

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
  @import '../app.scss';

  .footer-file * {
    color: black;
  }

  .footer-file {
    @include border(2px);
    gap: 2px;
    margin: 0 1px;
    padding: 3px 6px;
    width: 150px;
    display: flex;
    align-items: center;
  }

  .footer-file:focus {
    outline: none;
  }

  .footer-file_active {
    @include active-border(2px);
  }

  .footer-file_img {
    width: 15px;
  }

  .footer-file_context {
    @include border(2px);
    text-decoration: none;
    position: fixed;
    background: $main-color;
    list-style-type: none;
    width: 100px;
    margin: 0;
    padding: 1px;
  }

  .footer-file_context-button {
    background: none;
    width: 100%;
    border: none;
    text-align: left;
  }

  .footer-file_context-button:hover {
    background: $select-color;
    color: white;
  }
</style>