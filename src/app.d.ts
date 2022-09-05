/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
declare namespace App {
	interface Locals {
		prisma: import('@prisma/client').PrismaClient;
	}

	// interface PageData {}

	// interface Platform {}
}
