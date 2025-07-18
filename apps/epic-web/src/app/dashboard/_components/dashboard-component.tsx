'use client'

import * as React from 'react'
import { User } from '@/ability'

interface DashboardComponentProps {
	user: User
}

/**
 * Dashboard component for contributors.
 * Shows the user's name and explains content types.
 */
export default function DashboardComponent({ user }: DashboardComponentProps) {
	if (!user) {
		return null
	}

	return (
		<main className="flex w-full justify-between p-10">
			<div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
				<h1 className="fluid-3xl font-heading font-bold">
					Welcome, {user.name}
				</h1>
				<p className="text-muted-foreground text-lg">
					This is your contributor dashboard. Use the navigation on the left to
					manage your posts and tips.
				</p>
				<div className="prose dark:prose-invert rounded-md border p-5">
					<h2 className="!mt-0">Content Types</h2>
					<p>
						There are two types of content you can create: Tips and Posts.
						Here's the difference:
					</p>
					<ul>
						<li>
							<strong>Tips:</strong> These are short, focused tutorials that{' '}
							<strong>must include a video</strong>.
						</li>
						<li>
							<strong>Posts:</strong> These are typically longer-form, written
							articles and tutorials. Posts <strong>cannot have a video</strong>
							.
						</li>
					</ul>
					<p>
						Please choose the appropriate content type when creating new
						content.
					</p>
				</div>
			</div>
		</main>
	)
}
