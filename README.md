**TL;DR**: Add a list of links, one on each line, and click shuffle to randomly organise them

[Demo](https://bm9k.github.io/link-organiser)

🐕

TODO: add readme

Plans:
 - Convert to table form & add columns to each link: counter, checkbox, note, date clicked?
 - When link is clicked, check it automatically/increase counter
 - Shuffle only selected
 - Import/export
 - Responsive layout/mobile (basic)


## Appendix

### Randomness

In order to provide the random shuffling functionality, the app utilises a [pseudorandom number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) (prng for short). This is an algorithm which produces a deterministic sequence of numbers that seems random, but is in fact not. See [random number generation](https://en.wikipedia.org/wiki/Random_number_generation).

A prng's sequence is determined completely by it's [seed](https://en.wikipedia.org/wiki/Random_seed). If the same seed is used, the same sequence will be generated. This simplifies the task of reproducing/persisting randomised data (for example, the app keeps the output in the same random order if the page is refreshed). Unfortunately, Javascript's built-in `Math.random` is not seedable by the programmer.

Specifically, the app uses the [sfc32](https://github.com/bryc/code/blob/master/jshash/PRNGs.md#sfc32) prng to power the [fisher-yates shuffling](https://gist.github.com/bm9k/b120d78550444df57af77bfc6f123c12) algorithm.


sfc32 has a 128-bit internal state, which requires 4x 32-bit numbers to seed. The first three are [https://en.wikipedia.org/wiki/Nothing-up-my-sleeve_number]("Nothing-up-my-sleeve") constants:
```
3141592653, // pi
2718281828, // e
1414213562, // sqrt(2)
```
The fourth is generated whenever the user clicks the shuffle button, by using `Math.random` to generate an integer in the range `[0, 2^29)`. This is the number referred to as the seed at the bottom of the app.