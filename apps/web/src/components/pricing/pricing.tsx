'use client'

import { Badge } from '@plotwist/ui/components/ui/badge'
import { Price } from './price'
import { Button } from '@plotwist/ui/components/ui/button'
import Link from 'next/link'
import { useLanguage } from '@/context/language'
import { useSession } from '@/context/session'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@plotwist/ui/components/ui/tooltip'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@plotwist/ui/components/ui/avatar'
import { tmdbImage } from '@/utils/tmdb/image'
import { Brush } from '@/app/[lang]/_components/hero'
import { BorderBeam } from '@plotwist/ui/components/ui/border-beam'

export const Pricing = () => {
  const { language, dictionary } = useLanguage()
  const { user } = useSession()

  const username = user?.username
  const initial = username ? username?.at(0)?.toUpperCase() : ''

  return (
    <section className="py-32 border-t relative" id="pricing">
      <section className="mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
        <div className="mx-auto flex w-full flex-col items-center space-y-4 max-w-xl">
          <h2 className="text-center text-2xl lg:text-5xl font-semibold">
            {dictionary.choose_the}{' '}
            <span className="relative font-bold">
              {dictionary.perfect_plan}
              <Brush />
            </span>{' '}
            {dictionary.for_you}
          </h2>

          <p className="text-center text-md text-muted-foreground">
            {dictionary.explore_features}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mx-auto">
          <ol className="max-w-4xl grid-col-1 grid gap-8 lg:grid-cols-2 lg:gap-4">
            <Price.Root>
              <Price.Content>
                <Price.Header>
                  <Price.Label>
                    {dictionary.home_prices.free_plan.title}
                  </Price.Label>

                  <Price.Value>
                    {dictionary.home_prices.free_plan.price}
                  </Price.Value>

                  <Price.Description>
                    {dictionary.home_prices.free_plan.description}
                  </Price.Description>
                </Price.Header>

                <Price.Benefits>
                  {dictionary.home_prices.free_plan.benefits.map((benefit) => (
                    <Price.Benefit key={benefit}>{benefit}</Price.Benefit>
                  ))}
                </Price.Benefits>
              </Price.Content>

              <Button asChild>
                <Link href={`/${language}/sign-up`}>
                  {dictionary.home_prices.free_plan.start_now}
                </Link>
              </Button>
            </Price.Root>

            {user ? (
              <form
                action={`/api/checkout_sessions?locale=${language.split('-')[0]}&email=${user.email}&username=${user.username}&redirect=checkout`}
                method="POST"
              >
                <Price.Root>
                  <Price.Content>
                    <Price.Header>
                      <Price.Label>
                        {dictionary.home_prices.pro_plan.title}
                      </Price.Label>

                      <Price.Value className="flex items-center gap-2">
                        {dictionary.home_prices.pro_plan.price}
                        <Badge variant="outline">
                          {dictionary.home_prices.pro_plan.recommended}
                        </Badge>
                      </Price.Value>

                      <Price.Description>
                        {dictionary.home_prices.pro_plan.description}
                      </Price.Description>
                    </Price.Header>

                    <Price.Benefits>
                      {dictionary.home_prices.pro_plan.benefits.map(
                        (benefit) => (
                          <Price.Benefit key={benefit}>{benefit}</Price.Benefit>
                        ),
                      )}
                    </Price.Benefits>
                  </Price.Content>

                  <Button
                    type={user.subscriptionType === 'PRO' ? 'button' : 'submit'}
                    disabled={user.subscriptionType !== 'MEMBER'}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="mr-2 h-6 w-6 border border-muted-foreground text-[10px]">
                            {user.imagePath && (
                              <AvatarImage
                                src={tmdbImage(user.imagePath, 'w500')}
                                className="object-cover"
                              />
                            )}

                            <AvatarFallback className="bg-foreground">
                              {initial}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>

                        <TooltipContent>{username}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {dictionary.get_one_month_free}
                  </Button>
                </Price.Root>
              </form>
            ) : (
              <Price.Root className="relative">
                <BorderBeam
                  duration={8}
                  delay={9}
                  colorFrom="#fff"
                  colorTo="#fff"
                  className="hidden dark:block"
                />

                <BorderBeam
                  duration={8}
                  delay={9}
                  colorFrom="#000"
                  colorTo="#000"
                  className="block dark:hidden"
                />

                <Price.Content>
                  <Price.Header>
                    <Price.Label>
                      {dictionary.home_prices.pro_plan.title}
                    </Price.Label>

                    <Price.Value className="flex items-center gap-2">
                      {dictionary.home_prices.pro_plan.price}
                      <Badge variant="outline">
                        {dictionary.home_prices.pro_plan.recommended}
                      </Badge>
                    </Price.Value>

                    <Price.Description>
                      {dictionary.home_prices.pro_plan.description}
                    </Price.Description>
                  </Price.Header>

                  <Price.Benefits>
                    {dictionary.home_prices.pro_plan.benefits.map((benefit) => (
                      <Price.Benefit key={benefit}>{benefit}</Price.Benefit>
                    ))}
                  </Price.Benefits>
                </Price.Content>

                <Button asChild type="button">
                  <Link href={`/${language}/sign-up?redirect=checkout`}>
                    {dictionary.get_one_month_free}
                  </Link>
                </Button>
              </Price.Root>
            )}
          </ol>
        </div>
      </section>
    </section>
  )
}
