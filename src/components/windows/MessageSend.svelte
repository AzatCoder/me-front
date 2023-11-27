<script lang='ts'>
  import type { ComponentProps } from 'svelte';
  import Select from '../Select.svelte';
  import Window from './Window.svelte';
    import { sendMessage } from '$api';
    import type { IAPIMessageInput } from '$types';

  export let window: ComponentProps<Window>;
  let text = '';
  let loading = false;
  const messageMaxLength = 1200;

  const submit = (e: Event) => {
    loading = true;
    const formData = new FormData(e.target as HTMLFormElement);
    const data: IAPIMessageInput = Object.fromEntries(formData) as any;
    sendMessage(data).finally(() => loading = false);
  }
</script>

<Window {...window}>
  <div class='message-window'>
    <form class='message-window_form' on:submit|preventDefault={submit}>
      <div class='message-window_part'>
        <span>By:</span>
        <input name='by' placeholder='Gozel...' class='message-window_by' maxlength={32} />
      </div>
      <div class='message-window_part'>
        <div class='message-window_text-title'>
          <span>Message:</span>
          <span style={messageMaxLength < text.length ? 'color:red' : ''}>{text.length}/{messageMaxLength}</span>
        </div>
        <textarea
          bind:value={text}
          name='text'
          placeholder='Goresim gelya seni...'
          class='message-window_text'
          maxlength={560}
        />
      </div>
      <div class='message-window_part'>
        <span>How can I reach you?</span>
        <div class='message-window_reaching'>
          <Select
            input= {{
              style: 'width: 90px; font-size: 18px',
              name: 'messenger'
            }}
            options={[ 'e-mail', 'telegram', 'linkedin', 'instagram' ]}
          />
          <input name='username' class='message-window_account' />
        </div>
      </div>
      <div class='message-window_part'>
        <button disabled={loading} class='message-window_submit' type='submit'>{loading ? 'Sending...' : 'Send'}</button>
      </div>
    </form>
  </div>
</Window>

<!-- svelte-ignore css-unused-selector -->
<style lang='scss' scoped>
  @import '$src/app.scss';

  .message-window {
    @include inner-window;
    height: 320px;
    width: 250px;
    padding: 5px 10px;
  }

  .message-window * {
    color: black;
    font-size: 18px
  }

  .message-window_form {
    display: grid;
    gap: 10px;
  }

  .message-window_part {
    display: grid;
    gap: 5px;
  }

  .message-window_by {
    @include active-border(1px);
  }

  .message-window_text-title {
    display: flex;
    justify-content: space-between;
  }

  .message-window_text {
    @include active-border(1px);
    resize: none;
    height: 130px;
  }

  .message-window_reaching {
    display: flex;
    justify-content: space-between;
  }
  
  .message-window_account {
    @include active-border(1px);
    width: 120px;
  }

  .message-window_submit {
    @include border(1px);
    cursor: pointer;
  }

  .message-window_submit:active {
    @include active-border(1px);
  }

  .message-window_submit:disabled {
    cursor: auto;
    border: 0;
  }

  .message-window_submit:disabled:active {
    border: 0;
  }
</style>
