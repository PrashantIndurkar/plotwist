import { PageProps } from '@/types/languages'
import { ProBadge } from '@/components/pro-badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Image as LucideImage } from 'lucide-react'
import { getProfileByUsername } from '@/services/api/profiles'
import { ProfileReviews } from './_components/profile-reviews'
import { ProfileLists } from './_components/profile-lists'

type UserPageProps = PageProps<Record<'username', string>>

const UserPage = async ({ params }: UserPageProps) => {
  const profile = await getProfileByUsername(params.username)
  if (!profile) return <p>cade?</p>

  return (
    <main className="p-0 lg:p-4">
      <div className="mx-auto max-w-6xl">
        <section className="flex h-[50vh] w-full items-center justify-center rounded-none border text-muted lg:rounded-lg">
          <LucideImage />
        </section>

        <div className="grid grid-cols-1 gap-0 space-y-8 p-4 lg:grid-cols-3 lg:gap-8 lg:p-8">
          <aside className="col-span-1 -mt-24 flex flex-col space-y-4">
            <div className="space-y-4">
              <div className="relative flex aspect-square w-32 items-center justify-center rounded-full border bg-muted text-2xl">
                {profile.username[0].toUpperCase()}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{profile.username}</h1>

                  <ProBadge />
                </div>
              </div>

              <div className="space-y-2 rounded-lg border p-4">
                <h3 className="font-semibold">Achievements</h3>

                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 15 }).map((_, index) => {
                    return (
                      <div
                        className="aspect-square rounded-lg bg-muted"
                        key={index}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          <section className="col-span-2">
            <Tabs defaultValue="reviews" className="w-full">
              <div className="md:m-none p-none -mx-4 max-w-[100vw] overflow-x-scroll px-4 scrollbar-hide">
                <TabsList>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="lists">Lists</TabsTrigger>
                  <TabsTrigger value="communities" disabled>
                    Communities <Lock className="ml-1" size={12} />
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="reviews" className="mt-4">
                <ProfileReviews userId={profile.id} language={params.lang} />
              </TabsContent>

              <TabsContent value="lists" className="mt-4">
                <ProfileLists userId={profile.id} />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </main>
  )
}

export default UserPage
