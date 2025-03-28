import { tmdb } from '@/services/tmdb'

const DEFAULT_PAGES = 10

export const getMoviesIds = async (pages: number = DEFAULT_PAGES) => {
  const types = ['now_playing', 'popular', 'top_rated', 'upcoming'] as const

  const lists = await Promise.all(
    Array.from({ length: pages }).map(
      async (_, index) =>
        await Promise.all(
          types.map(
            async type =>
              await tmdb.movies.list({
                language: 'en-US',
                list: type,
                page: index + 1,
              })
          )
        )
    )
  )

  const results = lists.flatMap(list => list.map(list => list.results))
  const ids = results.flatMap(result => result.map(movie => movie.id))

  const combinedIds = [...ids]
  const uniqueIds = Array.from(new Set(combinedIds))

  return uniqueIds
}
