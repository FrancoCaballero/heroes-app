import { heroes } from '../data/heroes'

export const getHeroesByPublisher = (publisher) => {
  console.log('getHeroesByPublisher', publisher)
  const validPublishers = ['DC Comics', 'Marvel Comics']
  if (!validPublishers.includes(publisher)) {
    throw new Error(`Invalid publisher: ${publisher}`)
  }

  return heroes.filter((hero) => hero.publisher === publisher)
}
