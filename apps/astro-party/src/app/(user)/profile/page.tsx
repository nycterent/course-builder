import { notFound, redirect } from 'next/navigation'
import { Layout } from '@/components/layout'
import { db } from '@/db'
import { users } from '@/db/schema'
import { getProviders, getServerAuthSession } from '@/server/auth'
import { eq } from 'drizzle-orm'

import EditProfileForm from './_components/edit-profile-form'

export default async function ProfilePage() {
	const { session, ability } = await getServerAuthSession()
	const providers = getProviders()

	if (!ability.can('read', 'User', session?.user?.id)) {
		redirect('/')
	}

	if (!session.user) {
		notFound()
	}

	const user = await db.query.users.findFirst({
		where: eq(users.id, session.user.id),
		with: {
			accounts: true,
		},
	})

	if (!user) {
		notFound()
	}

	const discordProvider = providers?.discord
	const discordConnected = Boolean(
		user.accounts.find((account: any) => account.provider === 'discord'),
	)

	if (ability.can('read', 'User', session?.user?.id)) {
		return (
			<Layout>
				<div className="max-w-(--breakpoint-lg) mx-auto flex w-full flex-col items-start gap-8 px-5 py-20 sm:gap-10 sm:py-16 md:flex-row lg:gap-16">
					<header className="w-full md:max-w-[230px]">
						<h1 className="fluid-xl text-center font-bold md:text-left">
							Your Profile
						</h1>
					</header>
					<main className="flex w-full flex-col space-y-10 md:max-w-md">
						<EditProfileForm
							user={session.user}
							discordConnected={discordConnected}
							discordProvider={discordProvider}
						/>
					</main>
				</div>
			</Layout>
		)
	}

	redirect('/')
}
