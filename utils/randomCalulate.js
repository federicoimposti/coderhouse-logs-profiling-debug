const calculateRandoms = (x) => {
    const calculateNumbers = x ?? 100000000;
    let values = [];
    const randomGenerator = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    for (let i = 1; i <= 1000; i++) {
      values.push({ value: i, occurences: 0 });
    }
  
    for (let i = 0; i <= calculateNumbers; i++) {
      let randomIndex = randomGenerator(1, 1000);
      values[randomIndex - 1].occurences++;
      ;
    }

    return values;
  }

process.on("message", (msg) => {
    if (msg.start == "start") {
      const randoms = calculateRandoms(msg.cant);
      process.send(randoms);
    }
});