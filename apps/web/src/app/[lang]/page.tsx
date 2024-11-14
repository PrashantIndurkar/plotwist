import { Metadata } from 'next'

import { Pattern } from '@/components/pattern'

import { PageProps } from '@/types/languages'
import { getDictionary } from '@/utils/dictionaries'

import { APP_URL } from '../../../constants'

import { SUPPORTED_LANGUAGES } from '../../../languages'
import { BentoGrid } from './_components/bento-grid'
import { Hero } from './_components/hero'
import { Pricing } from '@/components/pricing'

export async function generateMetadata({
  params: { lang },
}: PageProps): Promise<Metadata> {
  const dictionary = await getDictionary(lang)

  const image = `${APP_URL}/images/lp/home.png`
  const canonicalUrl = `${APP_URL}/${lang}`

  const languageAlternates = SUPPORTED_LANGUAGES.reduce(
    (acc, lang) => {
      if (lang.enabled) {
        acc[lang.hreflang] = `${APP_URL}/${lang.value}`
      }
      return acc
    },
    {} as Record<string, string>,
  )

  const title = `${dictionary.organize} ${dictionary.movies_and_series} ${dictionary.never_been_easier}`

  const description = `${dictionary.most_apps_functional} ${dictionary.plotwist_incredible_interface}`

  return {
    title,
    description,
    keywords: dictionary.home.keywords,
    openGraph: {
      title: `Plotwist • ${title}`,
      description,
      siteName: 'Plotwist',
      url: APP_URL,
      images: [
        {
          url: image,
          width: 1280,
          height: 720,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
  }
}

export default async function Home({ params: { lang } }: PageProps) {
  return (
    <>
      <Pattern variant="checkered" />

      <main className="">
        <Hero />
        {/* <TopMovies language={lang} /> */}
        <BentoGrid language={lang} />
        <Pricing />
      </main>
    </>
  )
}
