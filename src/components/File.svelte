<script lang='ts'>
  export let img: string;
  export let name: string;
  export let onOpen: (name: string) => void;
  export let text = {};

  const onkeyUp = (event: KeyboardEvent) => event.key === 'Enter' && onOpen(name);
</script>

<button
  class='file'
  on:dblclick={() => onOpen(name)}
  on:keyup={onkeyUp}
>
  <img src={img} alt={name} />
  <p { ...text }>{name}</p>
</button>

<!-- svelte-ignore css-unused-selector -->
<style scoped lang='scss'>
  @import '$src/app.scss';

  .file {
    cursor: pointer;
    background: none;
    border: none;
    width: 70px;
    height: max-content;
  }

  .file:focus > p {
    background: $select-color;
    color: white;
  }

  .file p {
    margin: 0;
  }

  .file img {
    pointer-events: none;
  }
</style>
