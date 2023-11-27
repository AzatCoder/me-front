<script lang='ts'>
  import githubLogo from '$images/github-logo.svg';
  import instagramLogo from '$images/instagram-logo.svg';
  import chessLogo from '$images/chess-logo.png';
  import { onMount } from 'svelte';

  const getNormalizedTime = () => {
    const time = new Date(Date.now());
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  let normalizedTime = getNormalizedTime();

  onMount(() => {
    const interval = setInterval(() => normalizedTime = getNormalizedTime(), 1000);

    return () => clearInterval(interval);
  });
</script>

<div class='footer'>
  <div class='inner-footer'>
    <span>Start</span>
    <div class='footer_links'>
      <a href='https://www.instagram.com/azat_nurr/' target='_blank'>
        <img class='footer_link-img' src={instagramLogo} alt='github' />
      </a>
      <a href='https://www.chess.com/member/azatnew' target='_blank'>
        <img class='footer_link-img' src={chessLogo} alt='github' />
      </a>
      <a href='https://github.com/AzatCoder' target='_blank'>
        <img class='footer_link-img' src={githubLogo} alt='github' />
      </a>
    </div>
    <div class='footer_windows'>
      <slot />
    </div>
    <div class='footer_left-side'>
      <img alt='Time' src='https://win98icons.alexmeub.com/icons/png/time_and_date-1.png' />
      <span>{normalizedTime}</span>
    </div>
  </div>
</div>

<!-- svelte-ignore css-unused-selector -->
<style lang='scss' scoped>
  @import '../app.scss';

  .footer {
    background: $main-color;
    height: 30px;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid white;
  }

  .footer * {
    color: black;
  }

  .inner-footer {
    display: flex;
    padding: 0 10px;
    height: 100%;
    align-items: center;
  }

  .footer_links {
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .footer_links a {
    display: inherit;
  }

  .footer_link-img {
    width: 18px;
  }

  .footer_windows {
    display: flex;
    padding: 0 20px;
  }

  .footer_left-side {
    @include active-border(1px);
    padding: 3px 6px;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-left: auto;
  }
</style>
