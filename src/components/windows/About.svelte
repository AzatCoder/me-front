<script lang='ts'>
  import { onMount, type ComponentProps } from 'svelte';
  import { createAnimatedText } from '$src/lib';
  import Window from './Window.svelte';

  export let window: ComponentProps<Window>;

  let animatedText = '';

  onMount(() => {
    const { clear } = createAnimatedText({
        delay: 60,
        onChange: text => animatedText = text
      })
      .write('Welcome to my website, dear traveler.')
      .pause(200)
      .put('<br/>')
      .write(`I'm Azat — software engineer and the greatest che`)
      .pause(300)
      .delete(16)
      .write('chess player. Love to play strategy games & read fiction books. ')
      .pause(300)
      .write('Tryna learn in depth math, neurobiology, haskell.')
      .pause(1000)
      .put('<br/>')
      .write('My friend once told me: "Azat, the world is unfair, ')
      .pause(400)
      .write('be careful!". ')
      .pause(100)
      .write('Not gonna lie, it was Rowshen Ayakgap')
      .pause(400)
      .delete(7)
      .write('Rahmedov. ')
      .pause(200)
      .write('Kafka would li')
      .delete(14)
      .write('Thank you for great advice, love you man ;)')
      .start();

    return clear;
  });

  /* 
    const [ myText, setMyText ] = useState('');

    createAnimatedText({
      ...
      onChange: text => setMyText(text)
    })
    .write('bla bla')
    .start();

    return (
      <span>{myText}</span>
    )
  */

</script>

<Window {...window}>
  <div class='about-window'>
    <span bind:innerHTML={animatedText} contenteditable='false' />
  </div>
</Window>

<style lang='scss'>
  .about-window {
    margin: 10px 15px;
    width: 300px;
  }
</style>