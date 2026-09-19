interface SeoInput {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  image?: string
}

export function useSeo({ title, description, path, type = 'website', image }: SeoInput) {
  const { siteUrl } = useRuntimeConfig().public
  const url = new URL(path, siteUrl).href
  const imageUrl = new URL(image ?? '/og_image.png', siteUrl).href

  useHead({
    title,
    link: [{ rel: 'canonical', href: url }],
  })

  useSeoMeta({
    description,
    ogUrl: url,
    ogType: type,
    ogTitle: title,
    ogDescription: description,
    ogImage: imageUrl,
    ogSiteName: 'ctrlaltdelrue.be',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
  })
}
