<script lang='ts'>
  export let options: string[];
  export let width = '100px';
  export let input: Record<string, any> = {}; 

  let isOpen = false;
  let currentOption = options[0];
</script>

<div class='select'>
  <div
    class='inner-select'
    role='button'
    tabindex={0}
    on:focusout={() => isOpen = false}
    on:click={() => isOpen = !isOpen}
    on:keydown={() => {}}
  >
    <input
      {...input}
      class='select_input'
      bind:value={currentOption}
      readonly
    />
    <span class='select_button'>▼</span>
  </div>
  {#if isOpen}
    <div class='select-options' style='width: {width}'>
      {#each options as option}
        <button
          class='select_option'
          on:mousedown={() => currentOption = option}
        >
          {option}
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- svelte-ignore css-unused-selector -->
<style lang='scss' scoped>
  @import '../app.scss';

  .select * {
    color: black;
    cursor: pointer;
  }

  .inner-select {
    display: flex;
    align-items: center;
  }

  .select_input {
    @include active-border(1px);
    padding: 2px 0;
  }

  .select_button {
    @include border(1px);
    background: $main-color;
    margin-left: -20px;
    padding: 0 4px;
    font-size: 12px;
  }

  .select_button:active {
    @include active-border(1px);
  }

  .select-options {
    @include border(1px);
    position: absolute;
    background: $main-color;
    display: grid;
    padding: 5px 0;
  }

  .select_option {
    padding: 4px 0;
    background: none;
    border: none;
  }
</style>