type Content = {
  write: string;
} | {
  delete: number;
} | {
  pause: number;
} | {
  put: string;
} | {
  changeDelay: number
} | {
  custom: (text: string) => string;
}

interface AnimationArgs {
  content: Content[],
  delay: number,
  onChange: (text: string) => void
}

export const createAnimatedText = (args: Omit<AnimationArgs, 'content'>) => {
  const content: Content[] = [];

  return {
    write(text: string) {
      content.push({ write: text });
      return this;
    },
    put(text: string) {
      content.push({ put: text });
      return this;
    },
    delete(count: number) {
      content.push({ delete: count });
      return this;
    },
    pause(delay: number) {
      content.push({ pause: delay });
      return this;
    },
    changeDelay(delay: number) {
      content.push({ changeDelay: delay });
      return this;
    },
    custom(customFunc: (text: string) => string) {
      content.push({ custom: customFunc });
      return this;
    },
    start: () => init({ content, ...args }, { text: '', levelIdx: 0 })
  }
}

const init = (
  animation: AnimationArgs,
  initial: {
    text: string;
    levelIdx: number;
  },
  result: {
    interval?: number;
    timeout?: number;
  } = {}
) => {
  const { content, delay, onChange } = animation;
  let { text, levelIdx } = initial;
  let deleteCount = 0;
  let letterIdx = 0;
  const move = () => {
    if (deleteCount) {
      deleteCount -= 1;
      text = text.slice(0, -1);
      onChange(text);
      return;
    }

    const level = content[levelIdx];

    if (!level) return clearInterval(result.interval);
    if ('custom' in level) {
      text = level.custom(text);
      levelIdx += 1;
    }
    if ('delete' in level) {
      levelIdx += 1;
      deleteCount = level.delete;
    }
    if ('put' in level) {
      text += level.put;
      levelIdx += 1;
    }
    if ('write' in level) {
      const letter = level.write[letterIdx];

      if (!letter) {
        letterIdx = 0;
        levelIdx += 1;
      } else {
        text += letter;
        letterIdx += 1;
      }
    }
    if ('pause' in level) {
      clearInterval(result.interval);
      result.timeout = setTimeout(() => {
        result.interval = init(
          animation,
          { text, levelIdx: levelIdx + 1 },
          result
        ).interval;
      }, level.pause);
    }
    if ('changeDelay' in level) {
      clearInterval(result.interval);
      result.interval = init(
        { ...animation, delay: level.changeDelay },
        { text, levelIdx: levelIdx + 1 },
        result
      ).interval;
    }

    onChange(text);
  }

  result.interval = setInterval(move, delay);

  return {
    interval: result.interval,
    timeout: result.timeout,
    clear: () => {
      clearInterval(result.interval);
      clearTimeout(result.timeout);
    },
  };
}