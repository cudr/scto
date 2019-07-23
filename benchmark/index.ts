import faker from "faker";

export const genSentences = (iterations = 100) => {
  let text = "",
    i = 0;

  for (i; i < iterations; i++) {
    text += faker.lorem.sentences();
  }

  return text;
};

export const randomizeText = (text = "") => {
  const arr = text.split(" ");

  const randomArr = arr.reduce((acc: any, el) => {
    const rand = Math.random();

    return rand > 0.3 ? [...acc, el] : rand < 0.2 ? acc : [el, ...acc];
  }, []);

  return randomArr.join(" ");
};
